import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/pages/admintripedit.css";
import FlightForm from "../components/admin/FlightForm";
import EmptyState from "../components/ui/EmptyState";
import Modal from "../components/ui/Modal";
import SectionHeader from "../components/ui/SectionHeader";
import {
  createFlight,
  deleteFlight,
  fetchFlights,
  updateFlight,
  type Flight,
  type FlightInput,
} from "../services/flights";

export default function AdminFlights() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Flight | null>(null);
  const [creating, setCreating] = useState(false);
  const [busyId, setBusyId] = useState<number | "new" | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchFlights()
      .then((data) => {
        if (!cancelled) setFlights(data);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err instanceof Error ? err.message : "Failed to load flights");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleCreate(input: FlightInput) {
    setBusyId("new");
    try {
      const created = await createFlight(input);
      setFlights((prev) => [...prev, created]);
      setCreating(false);
    } finally {
      setBusyId(null);
    }
  }

  async function handleUpdate(input: FlightInput) {
    if (!editing) return;
    setBusyId(editing.id);
    try {
      const updated = await updateFlight(editing.id, input);
      setFlights((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
      setEditing(null);
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(flight: Flight) {
    if (!window.confirm(`Delete flight "${flight.airline} ${flight.departureAirport} → ${flight.destinationAirport}"?`)) {
      return;
    }
    setBusyId(flight.id);
    try {
      await deleteFlight(flight.id);
      setFlights((prev) => prev.filter((f) => f.id !== flight.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete flight.");
    } finally {
      setBusyId(null);
    }
  }

  if (loading) {
    return (
      <main className="admin-trip-edit">
        <p>Loading flights...</p>
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="admin-trip-edit">
        <EmptyState
          title="Could not load flights"
          message={loadError}
          action={
            <Link to="/admin" className="btn btn--ghost">
              Back to admin
            </Link>
          }
        />
      </main>
    );
  }

  return (
    <main className="admin-trip-edit">
      <SectionHeader
        title="Flights"
        action={
          <div className="admin-trip-edit__group-header">
            <Link to="/admin" className="btn btn--ghost">
              Back to admin
            </Link>
            <button type="button" className="btn" onClick={() => setCreating(true)}>
              Add flight
            </button>
          </div>
        }
        className="admin-trip-edit__header"
      />

      {flights.length === 0 ? (
        <p>No flights yet.</p>
      ) : (
        <table className="admin-trip-edit__table">
          <thead>
            <tr>
              <th>Airline</th>
              <th>Route</th>
              <th>Duration</th>
              <th aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.airline}</td>
                <td>
                  {flight.departureCity} ({flight.departureAirport}) → {flight.destinationCity} ({flight.destinationAirport})
                </td>
                <td>{flight.flightDuration}</td>
                <td className="admin-trip-edit__row-actions">
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => setEditing(flight)}
                    disabled={busyId === flight.id}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn--danger"
                    onClick={() => handleDelete(flight)}
                    disabled={busyId === flight.id}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal open={creating} onClose={() => setCreating(false)} title="Add flight" size="lg">
        <FlightForm
          busy={busyId === "new"}
          onSubmit={handleCreate}
          onCancel={() => setCreating(false)}
          submitLabel="Create flight"
        />
      </Modal>

      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit flight" size="lg">
        {editing ? (
          <FlightForm
            initial={editing}
            busy={busyId === editing.id}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(null)}
            warning="Changes affect every trip that links to this flight."
          />
        ) : null}
      </Modal>
    </main>
  );
}
