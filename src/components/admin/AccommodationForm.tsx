import { useEffect, useState, type SyntheticEvent } from "react";
import FormField from "../forms/FormField";
import TextInput from "../forms/TextInput";
import type { Accommodation, AccommodationInput } from "../../services/accommodations";
import styles from "./TripOptionEditor.module.css";

type Props = {
  initial?: Accommodation;
  busy?: boolean;
  onSubmit: (input: AccommodationInput) => Promise<void> | void;
  onCancel?: () => void;
  submitLabel?: string;
  warning?: string;
};

type Form = {
  hotelName: string;
  hotelType: string;
  hotelCity: string;
  hotelLocation: string;
  amenities: string;
  nights: string;
  latitude: string;
  longitude: string;
};

function toForm(acc: Accommodation | undefined): Form {
  return {
    hotelName: acc?.hotelName ?? "",
    hotelType: acc?.hotelType ?? "",
    hotelCity: acc?.hotelCity ?? "",
    hotelLocation: acc?.hotelLocation ?? "",
    amenities: acc?.amenities ?? "",
    nights: acc?.nights != null ? String(acc.nights) : "",
    latitude: acc?.latitude != null ? String(acc.latitude) : "",
    longitude: acc?.longitude != null ? String(acc.longitude) : "",
  };
}

export default function AccommodationForm({
  initial,
  busy,
  onSubmit,
  onCancel,
  submitLabel,
  warning,
}: Props) {
  const [form, setForm] = useState<Form>(() => toForm(initial));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm(toForm(initial));
  }, [initial]);

  function update<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError(null);
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.hotelName.trim()) {
      setError("Hotel name is required.");
      return;
    }
    const nights = form.nights ? Number(form.nights) : 0;
    if (!Number.isFinite(nights) || nights < 0) {
      setError("Nights must be a non-negative number.");
      return;
    }
    const latitude = form.latitude ? Number(form.latitude) : 0;
    const longitude = form.longitude ? Number(form.longitude) : 0;
    if (form.latitude && !Number.isFinite(latitude)) {
      setError("Latitude must be a number.");
      return;
    }
    if (form.longitude && !Number.isFinite(longitude)) {
      setError("Longitude must be a number.");
      return;
    }

    try {
      await onSubmit({
        hotelName: form.hotelName.trim(),
        hotelType: form.hotelType.trim(),
        hotelCity: form.hotelCity.trim(),
        hotelLocation: form.hotelLocation.trim(),
        amenities: form.amenities.trim(),
        nights,
        latitude,
        longitude,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save accommodation.");
    }
  }

  const idPrefix = initial ? `acc-${initial.id}` : "acc-new";

  return (
    <form className={styles.editor} onSubmit={handleSubmit}>
      {warning ? <p className={styles.warning}>{warning}</p> : null}

      <div className={styles.row}>
        <FormField id={`${idPrefix}-name`} label="Hotel name">
          <TextInput
            id={`${idPrefix}-name`}
            type="text"
            value={form.hotelName}
            onChange={(event) => update("hotelName", event.target.value)}
            disabled={busy}
            required
          />
        </FormField>
        <FormField id={`${idPrefix}-type`} label="Hotel type">
          <TextInput
            id={`${idPrefix}-type`}
            type="text"
            value={form.hotelType}
            onChange={(event) => update("hotelType", event.target.value)}
            disabled={busy}
          />
        </FormField>
        <FormField id={`${idPrefix}-nights`} label="Nights">
          <TextInput
            id={`${idPrefix}-nights`}
            type="number"
            min="0"
            value={form.nights}
            onChange={(event) => update("nights", event.target.value)}
            disabled={busy}
          />
        </FormField>
      </div>

      <div className={styles.row}>
        <FormField id={`${idPrefix}-city`} label="Hotel city">
          <TextInput
            id={`${idPrefix}-city`}
            type="text"
            value={form.hotelCity}
            onChange={(event) => update("hotelCity", event.target.value)}
            disabled={busy}
          />
        </FormField>
        <FormField id={`${idPrefix}-loc`} label="Hotel location/address">
          <TextInput
            id={`${idPrefix}-loc`}
            type="text"
            value={form.hotelLocation}
            onChange={(event) => update("hotelLocation", event.target.value)}
            disabled={busy}
          />
        </FormField>
      </div>

      <FormField id={`${idPrefix}-amenities`} label="Amenities">
        <TextInput
          id={`${idPrefix}-amenities`}
          type="text"
          value={form.amenities}
          onChange={(event) => update("amenities", event.target.value)}
          disabled={busy}
        />
      </FormField>

      <div className={styles.row}>
        <FormField id={`${idPrefix}-lat`} label="Latitude">
          <TextInput
            id={`${idPrefix}-lat`}
            type="number"
            step="0.000001"
            value={form.latitude}
            onChange={(event) => update("latitude", event.target.value)}
            disabled={busy}
          />
        </FormField>
        <FormField id={`${idPrefix}-lng`} label="Longitude">
          <TextInput
            id={`${idPrefix}-lng`}
            type="number"
            step="0.000001"
            value={form.longitude}
            onChange={(event) => update("longitude", event.target.value)}
            disabled={busy}
          />
        </FormField>
      </div>

      {error ? <p className={styles.error} role="alert">{error}</p> : null}

      <div className={styles.actions}>
        {onCancel ? (
          <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
        ) : null}
        <button type="submit" className="btn" disabled={busy}>
          {busy ? "Saving..." : submitLabel ?? "Save"}
        </button>
      </div>
    </form>
  );
}
