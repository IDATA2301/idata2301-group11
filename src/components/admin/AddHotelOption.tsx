import { useEffect, useState, type SyntheticEvent } from "react";
import FormField from "../forms/FormField";
import TextInput from "../forms/TextInput";
import AccommodationForm from "./AccommodationForm";
import Modal from "../ui/Modal";
import type { HotelOptionInput } from "../../services/adminTrips";
import {
  createAccommodation,
  fetchAccommodations,
  type Accommodation,
  type AccommodationInput,
} from "../../services/accommodations";
import styles from "./TripOptionEditor.module.css";

type Props = {
  busy?: boolean;
  onCreate: (input: HotelOptionInput) => Promise<void> | void;
  onCancel: () => void;
};

export default function AddHotelOption({ busy, onCreate, onCancel }: Props) {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [accommodationId, setAccommodationId] = useState<string>("");
  const [provider, setProvider] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchAccommodations()
      .then((data) => {
        if (cancelled) return;
        setAccommodations(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load accommodations");
      })
      .finally(() => {
        if (!cancelled) setLoadingList(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleCreate(input: AccommodationInput) {
    setCreating(true);
    try {
      const created = await createAccommodation(input);
      setAccommodations((prev) => [...prev, created]);
      setAccommodationId(String(created.id));
      setShowCreate(false);
    } finally {
      setCreating(false);
    }
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accommodationId) {
      setError("Pick an accommodation.");
      return;
    }
    if (!provider.trim()) {
      setError("Provider is required.");
      return;
    }
    const priceNumber = Number(price);
    if (!Number.isFinite(priceNumber) || priceNumber < 0) {
      setError("Price must be a non-negative number.");
      return;
    }
    setError(null);
    try {
      await onCreate({
        accommodationId: Number(accommodationId),
        provider: provider.trim(),
        price: priceNumber,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create option.");
    }
  }

  return (
    <form className={styles.editor} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <FormField id="add-hotel-pick" label="Accommodation">
          <select
            id="add-hotel-pick"
            value={accommodationId}
            onChange={(event) => setAccommodationId(event.target.value)}
            disabled={busy || loadingList}
            required
          >
            <option value="">{loadingList ? "Loading…" : "Select an accommodation"}</option>
            {accommodations.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.hotelName} · {acc.hotelCity}
                {acc.hotelType ? ` (${acc.hotelType})` : ""}
              </option>
            ))}
          </select>
        </FormField>
        <FormField id="add-hotel-provider" label="Provider">
          <TextInput
            id="add-hotel-provider"
            type="text"
            value={provider}
            onChange={(event) => setProvider(event.target.value)}
            disabled={busy}
            required
          />
        </FormField>
        <FormField id="add-hotel-price" label="Price">
          <TextInput
            id="add-hotel-price"
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

      <button type="button" className="btn btn--ghost" onClick={() => setShowCreate(true)}>
        + Create new accommodation…
      </button>

      {error ? <p className={styles.error} role="alert">{error}</p> : null}

      <div className={styles.actions}>
        <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
        <button type="submit" className="btn" disabled={busy}>
          {busy ? "Adding..." : "Add hotel option"}
        </button>
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create new accommodation" size="lg">
        <AccommodationForm
          busy={creating}
          onSubmit={handleCreate}
          onCancel={() => setShowCreate(false)}
          submitLabel="Create accommodation"
        />
      </Modal>
    </form>
  );
}
