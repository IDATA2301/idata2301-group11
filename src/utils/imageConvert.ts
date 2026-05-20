const WEBP_QUALITY = 0.85;
const MAX_DIMENSION = 2400;

/**
 * Converts uploaded images to optimized WebP blobs.
 */
export async function convertImageToWebp(file: File): Promise<Blob> {
  if (file.type === "image/webp") {
    return file;
  }

  const bitmap = await loadBitmap(file);

  let { width, height } = bitmap;
  const longest = Math.max(width, height);
  if (longest > MAX_DIMENSION) {
    const scale = MAX_DIMENSION / longest;
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D canvas context");
  ctx.drawImage(bitmap, 0, 0, width, height);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/webp", WEBP_QUALITY),
  );

  if (!blob) throw new Error("Browser failed to encode image as WebP.");
  return blob;
}

/**
 * Loads a bitmap using the fastest available browser path.
 */
async function loadBitmap(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file);
    } catch {
      // fall through to <img>
    }
  }

  return new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not load image for conversion."));
    };
    img.src = url;
  });
}

/**
 * Converts text into a URL-friendly slug.
 */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/**
 * Converts a slug into camelCase.
 */
export function camelize(input: string): string {
  const parts = slugify(input).split("-").filter(Boolean);
  if (parts.length === 0) return "";
  return parts
    .map((part, idx) => (idx === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
}
