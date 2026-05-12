const TRIP_PREFIX = "/images/trip";
const DESTINATION_PREFIX = "/images/destination";
const PLACEHOLDER = "/images/placeholder.jpg";

function buildUrl(prefix: string, filename: string | undefined | null): string {
  if (!filename) return PLACEHOLDER;
  const trimmed = filename.trim();
  if (!trimmed) return PLACEHOLDER;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  if (trimmed.startsWith("/")) return trimmed;
  if (trimmed.startsWith("images/")) return `/${trimmed}`;
  return `${prefix}/${trimmed}`;
}

export function getTripImageUrl(filename: string | undefined | null): string {
  return buildUrl(TRIP_PREFIX, filename);
}

export function getDestinationImageUrl(filename: string | undefined | null): string {
  return buildUrl(DESTINATION_PREFIX, filename);
}
