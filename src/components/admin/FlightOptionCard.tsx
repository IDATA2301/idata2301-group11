import { useEffect, useState, type SyntheticEvent } from "react";
import FormField from "../forms/FormField";
import TextInput from "../forms/TextInput";
import FlightForm from "./FlightForm";
import Modal from "../ui/Modal";
import type { FlightOption, FlightOptionInput } from "../../services/adminTrips";
import {
  fetchFlight,
  updateFlight,
  type Flight,
  type FlightInput,
} from "../../services/flights";
import styles from "./TripOptionEditor.module.css";

type Props = {
  option: FlightOption;
  busy?: boolean;
  onSave: (input: FlightOptionInput) => Promise<void> | void;
  onDelete: () => Promise<void> | void;
  onFlightUpdated: (flight: Flight) => void;
};

export default function FlightOptionCard({ option, busy, onSave, onDelete, onFlightUpdated }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [provider, setProvider] = useState(option.provider ?? "");
  const [price, setPrice] = useState(option.price != null ? String(option.price) : "");
  const [error, setError] = useState<string | null>(null);

  const [showFlightModal, setShowFlightModal] = useState(false);
  const [flightDetail, setFlightDetail] = useState<Flight | null>(null);
  const [flightLoading, setFlightLoading] = useState(false);
  const [flightBusy, setFlightBusy] = useState(false);

  useEffect(() => {
    setProvider(option.provider ?? "");
    setPrice(option.price != null ? String(option.price) : "");
  }, [option.provider, option.price]);

  async function openFlightEditor() {
    if (option.flightId == null) return;
    setShowFlightModal(true);
    setFlightLoading(true);
    try {
      const data = await fetchFlight(option.flightId);
      setFlightDetail(data);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to load flight.");
      setShowFlightModal(false);
    } finally {
      setFlightLoading(false);
    }
  }

  async function handleFlightSave(input: FlightInput) {
    if (!flightDetail) return;
    setFlightBusy(true);
    try {
      const saved = await updateFlight(flightDetail.id, input);
      onFlightUpdated(saved);
      setShowFlightModal(false);
    } finally {
      setFlightBusy(false);
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
            {option.airline || "Unknown airline"} · {option.departureAirport || "?"} → {option.destinationAirport || "?"}
          </div>
          <div className="admin-trip-edit__option-meta">
            {[
              option.flightDuration,
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
            <FormField id={`flight-${option.id}-provider`} label="Provider">
              <TextInput
                id={`flight-${option.id}-provider`}
                type="text"
                value={provider}
                onChange={(event) => setProvider(event.target.value)}
                disabled={busy}
                required
              />
            </FormField>
            <FormField id={`flight-${option.id}-price`} label="Price">
              <TextInput
                id={`flight-${option.id}-price`}
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
            {option.flightId != null ? (
              <button type="button" className="btn btn--ghost" onClick={openFlightEditor}>
                Edit underlying flight →
              </button>
            ) : null}
            <button type="submit" className="btn" disabled={busy}>
              {busy ? "Saving..." : "Save option"}
            </button>
          </div>
        </form>
      ) : null}

      <Modal
        open={showFlightModal}
        onClose={() => setShowFlightModal(false)}
        title="Edit flight"
        size="lg"
      >
        {flightLoading ? (
          <p>Loading flight…</p>
        ) : flightDetail ? (
          <FlightForm
            initial={flightDetail}
            busy={flightBusy}
            onSubmit={handleFlightSave}
            onCancel={() => setShowFlightModal(false)}
            warning="Editing this flight affects every trip that links to it."
          />
        ) : null}
      </Modal>
    </div>
  );
}
