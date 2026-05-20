import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/pages/admintripedit.css";
import FormField from "../components/forms/FormField";
import TextInput from "../components/forms/TextInput";
import SectionHeader from "../components/ui/SectionHeader";
import { createAdminTrip, uploadAdminImage } from "../services/adminTrips";
import { fetchAdminDestinations, type AdminDestination } from "../services/adminDestinations";
import { camelize, convertImageToWebp } from "../utils/imageConvert";

/** Form values used when creating a new trip. */
type CreateFields = {
  title: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  keywords: string;
  destinationId: string;
};

/** Default empty form state for trip creation. */
const empty: CreateFields = {
  title: "",
  description: "",
  imageUrl: "",
  startDate: "",
  endDate: "",
  keywords: "",
  destinationId: "",
};

/** Admin page for creating a new trip and optionally linking a destination. */
export default function AdminTripCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateFields>(empty);
  const [destinations, setDestinations] = useState<AdminDestination[]>([]);

  const [pendingImage, setPendingImage] = useState<Blob | null>(null);
  const [pendingImageName, setPendingImageName] = useState("");
  const [pendingImagePreview, setPendingImagePreview] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchAdminDestinations()
      .then(setDestinations)
      .catch(() => {
        // destinations are optional — silently ignore
      });
  }, []);

  useEffect(() => {
    if (!pendingImage) {
      setPendingImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(pendingImage);
    setPendingImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [pendingImage]);

  function set<K extends keyof CreateFields>(key: K, value: CreateFields[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError(null);
  }

  async function handleImagePick(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setConverting(true);
    setError(null);
    try {
      const webp = await convertImageToWebp(file);
      const slug = camelize(form.title.trim()) || "trip";
      const suggested = `${slug}Trip.webp`;
      setPendingImage(webp);
      setPendingImageName(suggested);
      set("imageUrl", suggested);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process image.");
      if (fileRef.current) fileRef.current.value = "";
    } finally {
      setConverting(false);
    }
  }

  function clearPendingImage() {
    setPendingImage(null);
    setPendingImageName("");
    set("imageUrl", "");
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = form.title.trim();
    if (!title) {
      setError("Title is required.");
      return;
    }

    if (form.startDate && form.endDate && form.startDate > form.endDate) {
      setError("Start date must be on or before end date.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      let imageUrl = form.imageUrl.trim() || undefined;
      if (pendingImage) {
        imageUrl = await uploadAdminImage(pendingImage, "trip", form.imageUrl.trim() || pendingImageName);
      }

      const keywords = form.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);

      const created = await createAdminTrip({
        title,
        description: form.description.trim() || undefined,
        imageUrl,
        startDate: form.startDate || undefined,
        endDate: form.endDate || undefined,
        keywords: keywords.length ? keywords : undefined,
        destinationId: form.destinationId ? Number(form.destinationId) : undefined,
      });

      navigate(`/admin/trips/${created.id}/edit`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create trip.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="admin-trip-edit">
      <SectionHeader
        title="Create Trip"
        action={
          <Link to="/admin/trips" className="btn btn--ghost">
            Back to trips
          </Link>
        }
        className="admin-trip-edit__header"
      />

      <form className="admin-trip-edit__form" onSubmit={handleSubmit}>
        <section className="admin-trip-edit__group" aria-label="Trip details">
          <h2 className="admin-trip-edit__group-title">Details</h2>

          <FormField id="trip-title" label="Title">
            <TextInput
              id="trip-title"
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              disabled={saving}
              required
              maxLength={255}
            />
          </FormField>

          <FormField id="trip-description" label="Description">
            <TextInput
              as="textarea"
              id="trip-description"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              disabled={saving}
              rows={5}
            />
          </FormField>

          <div className="admin-trip-edit__image">
            {pendingImagePreview && (
              <img
                src={pendingImagePreview}
                alt="Selected trip image preview"
                className="admin-trip-edit__image-preview"
              />
            )}
            <FormField id="trip-image" label="Image filename">
              <TextInput
                id="trip-image"
                type="text"
                value={form.imageUrl}
                onChange={(e) => set("imageUrl", e.target.value)}
                disabled={saving}
              />
            </FormField>
            <div className="admin-trip-edit__file-row">
              <label className="admin-trip-edit__file">
                <span className="btn btn--ghost">
                  {converting ? "Converting..." : pendingImage ? "Choose a different image" : "Choose image"}
                </span>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImagePick}
                  disabled={saving || converting}
                  hidden
                />
              </label>
              {pendingImage && (
                <>
                  <span className="admin-trip-edit__file-name">
                    Ready to upload as {form.imageUrl || pendingImageName} ({Math.round(pendingImage.size / 1024)} KB)
                  </span>
                  <button type="button" className="btn btn--ghost" onClick={clearPendingImage} disabled={saving}>
                    Clear
                  </button>
                </>
              )}
            </div>
          </div>

          <FormField id="trip-keywords" label="Keywords (comma separated)">
            <TextInput
              id="trip-keywords"
              type="text"
              value={form.keywords}
              onChange={(e) => set("keywords", e.target.value)}
              disabled={saving}
            />
          </FormField>
        </section>

        <section className="admin-trip-edit__group" aria-label="Dates">
          <h2 className="admin-trip-edit__group-title">Dates</h2>

          <div className="admin-trip-edit__row admin-trip-edit__row--two">
            <FormField id="trip-start-date" label="Start date">
              <TextInput
                id="trip-start-date"
                type="date"
                value={form.startDate}
                onChange={(e) => set("startDate", e.target.value)}
                disabled={saving}
              />
            </FormField>

            <FormField id="trip-end-date" label="End date">
              <TextInput
                id="trip-end-date"
                type="date"
                value={form.endDate}
                onChange={(e) => set("endDate", e.target.value)}
                disabled={saving}
              />
            </FormField>
          </div>
        </section>

        {destinations.length > 0 && (
          <section className="admin-trip-edit__group" aria-label="Destination">
            <h2 className="admin-trip-edit__group-title">Destination</h2>

            <FormField id="trip-destination" label="Link to existing destination (optional)">
              <select
                id="trip-destination"
                value={form.destinationId}
                onChange={(e) => set("destinationId", e.target.value)}
                disabled={saving}
              >
                <option value="">— none —</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.city}, {d.country}
                  </option>
                ))}
              </select>
            </FormField>
          </section>
        )}

        {error && <p role="alert" style={{ color: "var(--color-error, #dc2626)" }}>{error}</p>}

        <div className="admin-trip-edit__actions">
          <Link to="/admin/trips" className="btn btn--ghost" tabIndex={saving ? -1 : undefined}>
            Cancel
          </Link>
          <button type="submit" className="btn btn--primary" disabled={saving || converting}>
            {saving ? "Creating..." : "Create trip"}
          </button>
        </div>
      </form>
    </main>
  );
}
