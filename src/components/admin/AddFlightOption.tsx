import { useEffect, useState, type SyntheticEvent } from "react";
import FormField from "../forms/FormField";
import TextInput from "../forms/TextInput";
import FlightForm from "./FlightForm";
import Modal from "../ui/Modal";
import type { FlightOptionInput } from "../../services/adminTrips";
import {
  createFlight,
  fetchFlights,
  type Flight,
  type FlightInput,
} from "../../services/flights";
import styles from "./TripOptionEditor.module.css";

/** Props for the add flight option form. */
type Props = {
  busy?: boolean;
  onCreate: (input: FlightOptionInput) => Promise<void> | void;
  onCancel: () => void;
};

/** Form for adding a flight option to a trip, with embedded modal to create new flights on-the-fly. */
export default function AddFlightOption({ busy, onCreate, onCancel }: Props) {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loadingFlights, setLoadingFlights] = useState(true);
  const [flightId, setFlightId] = useState<string>("");
  const [provider, setProvider] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [creatingFlight, setCreatingFlight] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchFlights()
      .then((data) => {
        if (cancelled) return;
        setFlights(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load flights");
      })
      .finally(() => {
        if (!cancelled) setLoadingFlights(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleCreateFlight(input: FlightInput) {
    setCreatingFlight(true);
    try {
      const created = await createFlight(input);
      setFlights((prev) => [...prev, created]);
      setFlightId(String(created.id));
      setShowCreate(false);
    } finally {
      setCreatingFlight(false);
    }
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!flightId) {
      setError("Pick a flight.");
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
        flightId: Number(flightId),
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
        <FormField id="add-flight-pick" label="Flight">
          <select
            id="add-flight-pick"
            value={flightId}
            onChange={(event) => setFlightId(event.target.value)}
            disabled={busy || loadingFlights}
            required
          >
            <option value="">{loadingFlights ? "Loading…" : "Select a flight"}</option>
            {flights.map((flight) => (
              <option key={flight.id} value={flight.id}>
                {flight.airline} · {flight.departureAirport} → {flight.destinationAirport}
                {flight.flightDuration ? ` (${flight.flightDuration})` : ""}
              </option>
            ))}
          </select>
        </FormField>
        <FormField id="add-flight-provider" label="Provider">
          <TextInput
            id="add-flight-provider"
            type="text"
            value={provider}
            onChange={(event) => setProvider(event.target.value)}
            disabled={busy}
            required
          />
        </FormField>
        <FormField id="add-flight-price" label="Price">
          <TextInput
            id="add-flight-price"
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
        + Create new flight…
      </button>

      {error ? <p className={styles.error} role="alert">{error}</p> : null}

      <div className={styles.actions}>
        <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
        <button type="submit" className="btn" disabled={busy}>
          {busy ? "Adding..." : "Add flight option"}
        </button>
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create new flight" size="lg">
        <FlightForm
          busy={creatingFlight}
          onSubmit={handleCreateFlight}
          onCancel={() => setShowCreate(false)}
          submitLabel="Create flight"
        />
      </Modal>
    </form>
  );
}
