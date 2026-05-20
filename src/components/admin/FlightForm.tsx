import { useEffect, useState, type SyntheticEvent } from "react";
import FormField from "../forms/FormField";
import TextInput from "../forms/TextInput";
import type { Flight, FlightInput } from "../../services/flights";
import styles from "./TripOptionEditor.module.css";

/** Props for the flight editor form. */
type Props = {
  initial?: Flight;
  busy?: boolean;
  onSubmit: (input: FlightInput) => Promise<void> | void;
  onCancel?: () => void;
  submitLabel?: string;
  warning?: string;
};

type Form = {
  airline: string;
  departureCity: string;
  destinationCity: string;
  departureAirport: string;
  destinationAirport: string;
  flightDuration: string;
};

/** Convert flight data into editable form state. */
function toForm(flight: Flight | undefined): Form {
  return {
    airline: flight?.airline ?? "",
    departureCity: flight?.departureCity ?? "",
    destinationCity: flight?.destinationCity ?? "",
    departureAirport: flight?.departureAirport ?? "",
    destinationAirport: flight?.destinationAirport ?? "",
    flightDuration: flight?.flightDuration ?? "",
  };
}

/** Form for creating or editing flight details. */
export default function FlightForm({
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
    if (!form.airline.trim()) {
      setError("Airline is required.");
      return;
    }
    try {
      await onSubmit({
        airline: form.airline.trim(),
        departureCity: form.departureCity.trim(),
        destinationCity: form.destinationCity.trim(),
        departureAirport: form.departureAirport.trim(),
        destinationAirport: form.destinationAirport.trim(),
        flightDuration: form.flightDuration.trim(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save flight.");
    }
  }

  const idPrefix = initial ? `flight-${initial.id}` : "flight-new";

  return (
    <form className={styles.editor} onSubmit={handleSubmit}>
      {warning ? <p className={styles.warning}>{warning}</p> : null}

      <div className={styles.row}>
        <FormField id={`${idPrefix}-airline`} label="Airline">
          <TextInput
            id={`${idPrefix}-airline`}
            type="text"
            value={form.airline}
            onChange={(event) => update("airline", event.target.value)}
            disabled={busy}
            required
          />
        </FormField>
        <FormField id={`${idPrefix}-duration`} label="Flight duration">
          <TextInput
            id={`${idPrefix}-duration`}
            type="text"
            value={form.flightDuration}
            onChange={(event) => update("flightDuration", event.target.value)}
            disabled={busy}
            placeholder="e.g. 3h 25m"
          />
        </FormField>
      </div>

      <div className={styles.row}>
        <FormField id={`${idPrefix}-dep-city`} label="Departure city">
          <TextInput
            id={`${idPrefix}-dep-city`}
            type="text"
            value={form.departureCity}
            onChange={(event) => update("departureCity", event.target.value)}
            disabled={busy}
          />
        </FormField>
        <FormField id={`${idPrefix}-dep-airport`} label="Departure airport">
          <TextInput
            id={`${idPrefix}-dep-airport`}
            type="text"
            value={form.departureAirport}
            onChange={(event) => update("departureAirport", event.target.value)}
            disabled={busy}
          />
        </FormField>
      </div>

      <div className={styles.row}>
        <FormField id={`${idPrefix}-dest-city`} label="Destination city">
          <TextInput
            id={`${idPrefix}-dest-city`}
            type="text"
            value={form.destinationCity}
            onChange={(event) => update("destinationCity", event.target.value)}
            disabled={busy}
          />
        </FormField>
        <FormField id={`${idPrefix}-dest-airport`} label="Destination airport">
          <TextInput
            id={`${idPrefix}-dest-airport`}
            type="text"
            value={form.destinationAirport}
            onChange={(event) => update("destinationAirport", event.target.value)}
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
