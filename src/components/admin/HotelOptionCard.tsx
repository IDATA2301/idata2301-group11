import { useEffect, useState, type SyntheticEvent } from "react";
import FormField from "../forms/FormField";
import TextInput from "../forms/TextInput";
import AccommodationForm from "./AccommodationForm";
import Modal from "../ui/Modal";
import type { HotelOption, HotelOptionInput } from "../../services/adminTrips";
import {
  fetchAccommodation,
  updateAccommodation,
  type Accommodation,
  type AccommodationInput,
} from "../../services/accommodations";
import styles from "./TripOptionEditor.module.css";

/** Props for a single hotel option card. */
type Props = {
  option: HotelOption;
  busy?: boolean;
  onSave: (input: HotelOptionInput) => Promise<void> | void;
  onDelete: () => Promise<void> | void;
  onAccommodationUpdated: (acc: Accommodation) => void;
};

/** Editable card for a hotel option attached to a trip. */
export default function HotelOptionCard({ option, busy, onSave, onDelete, onAccommodationUpdated }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [provider, setProvider] = useState(option.provider ?? "");
  const [price, setPrice] = useState(option.price != null ? String(option.price) : "");
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [accDetail, setAccDetail] = useState<Accommodation | null>(null);
  const [accLoading, setAccLoading] = useState(false);
  const [accBusy, setAccBusy] = useState(false);

  useEffect(() => {
    setProvider(option.provider ?? "");
    setPrice(option.price != null ? String(option.price) : "");
  }, [option.provider, option.price]);

  async function openAccEditor() {
    if (option.accommodationId == null) return;
    setShowModal(true);
    setAccLoading(true);
    try {
      const data = await fetchAccommodation(option.accommodationId);
      setAccDetail(data);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to load accommodation.");
      setShowModal(false);
    } finally {
      setAccLoading(false);
    }
  }

  async function handleAccSave(input: AccommodationInput) {
    if (!accDetail) return;
    setAccBusy(true);
    try {
      const saved = await updateAccommodation(accDetail.id, input);
      onAccommodationUpdated(saved);
      setShowModal(false);
    } finally {
      setAccBusy(false);
    }
  }

  async function handleOptionSave(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const priceNumber = Number(price);
    if (!provider.trim()) {
      setError("Provider is required.");
      return;
    }
    if (!Number.isFinite(priceNumber) || priceNumber < 0) {
      setError("Price must be a non-negative number.");
      return;
    }
    setError(null);
    try {
      await onSave({ provider: provider.trim(), price: priceNumber });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save option.");
    }
  }

  return (
    <div className="admin-trip-edit__option-card">
      <div className="admin-trip-edit__option-summary">
        <div>
          <div className="admin-trip-edit__option-title">
            {option.hotelName || "Unknown hotel"} · {option.hotelCity || ""}
          </div>
          <div className="admin-trip-edit__option-meta">
            {[
              option.hotelType,
              option.nights ? `${option.nights} nights` : null,
              option.provider,
              `$${option.price?.toLocaleString() ?? "0"}`,
            ]
              .filter(Boolean)
              .join(" · ")}
          </div>
        </div>
        <div className="admin-trip-edit__option-actions">
          <button type="button" className="btn btn--ghost" onClick={() => setExpanded((p) => !p)}>
            {expanded ? "Collapse" : "Edit"}
          </button>
          <button type="button" className="btn btn--danger" onClick={onDelete} disabled={busy}>
            Detach
          </button>
        </div>
      </div>

      {expanded ? (
        <form className="admin-trip-edit__option-expand" onSubmit={handleOptionSave}>
          <div className={styles.row}>
            <FormField id={`hotel-${option.id}-provider`} label="Provider">
              <TextInput
                id={`hotel-${option.id}-provider`}
                type="text"
                value={provider}
                onChange={(event) => setProvider(event.target.value)}
                disabled={busy}
                required
              />
            </FormField>
            <FormField id={`hotel-${option.id}-price`} label="Price">
              <TextInput
                id={`hotel-${option.id}-price`}
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                disabled={busy}
                required
              />
            </FormField>
          </div>

          {error ? <p className={styles.error} role="alert">{error}</p> : null}

          <div className={styles.actions}>
            {option.accommodationId != null ? (
              <button type="button" className="btn btn--ghost" onClick={openAccEditor}>
                Edit underlying accommodation →
              </button>
            ) : null}
            <button type="submit" className="btn" disabled={busy}>
              {busy ? "Saving..." : "Save option"}
            </button>
          </div>
        </form>
      ) : null}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Edit accommodation" size="lg">
        {accLoading ? (
          <p>Loading accommodation…</p>
        ) : accDetail ? (
          <AccommodationForm
            initial={accDetail}
            busy={accBusy}
            onSubmit={handleAccSave}
            onCancel={() => setShowModal(false)}
            warning="Editing this accommodation affects every trip that links to it."
          />
        ) : null}
      </Modal>
    </div>
  );
}
