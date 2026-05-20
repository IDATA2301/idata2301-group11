import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import FormField from "../forms/FormField";
import TextInput from "../forms/TextInput";
import type { AdminDestination, AdminDestinationInput } from "../../services/adminDestinations";
import { uploadAdminImage } from "../../services/adminTrips";
import { camelize, convertImageToWebp } from "../../utils/imageConvert";
import { getDestinationImageUrl } from "../../utils/imageUrls";
import styles from "./TripOptionEditor.module.css";

/** Props for the destination editor form. */
type Props = {
  initial?: AdminDestination;
  busy?: boolean;
  onSubmit: (input: AdminDestinationInput) => Promise<void> | void;
  onCancel?: () => void;
  submitLabel?: string;
};

type Form = {
  city: string;
  country: string;
  imageUrl: string;
  imageAlt: string;
};

/** Convert destination data into editable form state. */
function toForm(destination: AdminDestination | undefined): Form {
  return {
    city: destination?.city ?? "",
    country: destination?.country ?? "",
    imageUrl: destination?.imageUrl ?? "",
    imageAlt: destination?.imageAlt ?? "",
  };
}

/** Form for creating or editing destination details and images. */
export default function DestinationForm({
  initial,
  busy,
  onSubmit,
  onCancel,
  submitLabel,
}: Props) {
  const [form, setForm] = useState<Form>(() => toForm(initial));
  const [error, setError] = useState<string | null>(null);

  const [pendingImage, setPendingImage] = useState<Blob | null>(null);
  const [pendingImageName, setPendingImageName] = useState<string>("");
  const [pendingImagePreview, setPendingImagePreview] = useState<string | null>(null);
  const [previousImageUrl, setPreviousImageUrl] = useState<string>("");
  const [converting, setConverting] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setForm(toForm(initial));
    setPendingImage(null);
    setPendingImageName("");
    setPreviousImageUrl("");
    if (fileRef.current) fileRef.current.value = "";
  }, [initial]);

  useEffect(() => {
    if (!pendingImage) {
      setPendingImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(pendingImage);
    setPendingImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [pendingImage]);

  function update<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError(null);
  }

  function suggestedFilename(city: string): string {
    const slug = camelize(city) || "destination";
    return `${slug}Dest.webp`;
  }

  async function handlePick(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setConverting(true);
    setError(null);
    try {
      const webp = await convertImageToWebp(file);
      const suggested = suggestedFilename(form.city);
      if (!pendingImage) setPreviousImageUrl(form.imageUrl);
      setPendingImage(webp);
      setPendingImageName(suggested);
      update("imageUrl", suggested);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process image.");
      if (fileRef.current) fileRef.current.value = "";
    } finally {
      setConverting(false);
    }
  }

  function clearPending() {
    setPendingImage(null);
    setPendingImageName("");
    update("imageUrl", previousImageUrl);
    setPreviousImageUrl("");
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.city.trim()) {
      setError("City is required.");
      return;
    }

    try {
      let imageUrl = form.imageUrl.trim();
      if (pendingImage) {
        const filename = (imageUrl || pendingImageName).trim();
        imageUrl = await uploadAdminImage(pendingImage, "destination", filename);
      }
      await onSubmit({
        city: form.city.trim(),
        country: form.country.trim(),
        imageUrl,
        imageAlt: form.imageAlt.trim(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save destination.");
    }
  }

  const idPrefix = initial ? `dest-${initial.id}` : "dest-new";

  return (
    <form className={styles.editor} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <FormField id={`${idPrefix}-city`} label="City">
          <TextInput
            id={`${idPrefix}-city`}
            type="text"
            value={form.city}
            onChange={(event) => update("city", event.target.value)}
            disabled={busy}
            required
          />
        </FormField>
        <FormField id={`${idPrefix}-country`} label="Country">
          <TextInput
            id={`${idPrefix}-country`}
            type="text"
            value={form.country}
            onChange={(event) => update("country", event.target.value)}
            disabled={busy}
          />
        </FormField>
      </div>

      <FormField id={`${idPrefix}-alt`} label="Image alt text">
        <TextInput
          id={`${idPrefix}-alt`}
          type="text"
          value={form.imageAlt}
          onChange={(event) => update("imageAlt", event.target.value)}
          disabled={busy}
        />
      </FormField>

      <div className="admin-trip-edit__image">
        {pendingImagePreview ? (
          <img
            src={pendingImagePreview}
            alt={form.imageAlt || "Selected destination image preview"}
            className="admin-trip-edit__image-preview"
          />
        ) : form.imageUrl ? (
          <img
            src={getDestinationImageUrl(form.imageUrl)}
            alt={form.imageAlt || "Current destination preview"}
            className="admin-trip-edit__image-preview"
          />
        ) : null}

        <FormField id={`${idPrefix}-image`} label="Image filename">
          <TextInput
            id={`${idPrefix}-image`}
            type="text"
            value={form.imageUrl}
            onChange={(event) => update("imageUrl", event.target.value)}
            disabled={busy}
          />
        </FormField>

        <div className="admin-trip-edit__file-row">
          <label className="admin-trip-edit__file">
            <span className="btn btn--ghost">
              {converting
                ? "Converting..."
                : pendingImage
                  ? "Choose a different image"
                  : "Choose image"}
            </span>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handlePick}
              disabled={busy || converting}
              hidden
            />
          </label>
          {pendingImage ? (
            <>
              <span className="admin-trip-edit__file-name">
                Ready to upload as {form.imageUrl || pendingImageName} ({Math.round(pendingImage.size / 1024)} KB)
              </span>
              <button type="button" className="btn btn--ghost" onClick={clearPending} disabled={busy}>
                Clear
              </button>
            </>
          ) : null}
        </div>
      </div>

      {error ? <p className={styles.error} role="alert">{error}</p> : null}

      <div className={styles.actions}>
        {onCancel ? (
          <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
        ) : null}
        <button type="submit" className="btn" disabled={busy}>
          {busy
            ? pendingImage
              ? "Uploading & saving..."
              : "Saving..."
            : submitLabel ?? "Save"}
        </button>
      </div>
    </form>
  );
}
