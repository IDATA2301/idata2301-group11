import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/pages/admintripedit.css";
import AccommodationForm from "../components/admin/AccommodationForm";
import EmptyState from "../components/ui/EmptyState";
import Modal from "../components/ui/Modal";
import SectionHeader from "../components/ui/SectionHeader";
import {
  createAccommodation,
  deleteAccommodation,
  fetchAccommodations,
  updateAccommodation,
  type Accommodation,
  type AccommodationInput,
} from "../services/accommodations";

/** Admin page for listing, creating, editing, and deleting accommodations. */
export default function AdminAccommodations() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Accommodation | null>(null);
  const [creating, setCreating] = useState(false);
  const [busyId, setBusyId] = useState<number | "new" | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchAccommodations()
      .then((data) => {
        if (!cancelled) setAccommodations(data);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err instanceof Error ? err.message : "Failed to load accommodations");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleCreate(input: AccommodationInput) {
    setBusyId("new");
    try {
      const created = await createAccommodation(input);
      setAccommodations((prev) => [...prev, created]);
      setCreating(false);
    } finally {
      setBusyId(null);
    }
  }

  async function handleUpdate(input: AccommodationInput) {
    if (!editing) return;
    setBusyId(editing.id);
    try {
      const updated = await updateAccommodation(editing.id, input);
      setAccommodations((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      setEditing(null);
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(acc: Accommodation) {
    if (!window.confirm(`Delete accommodation "${acc.hotelName}"?`)) {
      return;
    }
    setBusyId(acc.id);
    try {
      await deleteAccommodation(acc.id);
      setAccommodations((prev) => prev.filter((a) => a.id !== acc.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete accommodation.");
    } finally {
      setBusyId(null);
    }
  }

  if (loading) {
    return (
      <main className="admin-trip-edit">
        <p>Loading accommodations...</p>
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="admin-trip-edit">
        <EmptyState
          title="Could not load accommodations"
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
        title="Accommodations"
        action={
          <div className="admin-trip-edit__group-header">
            <button type="button" className="btn" onClick={() => setCreating(true)}>
              Add accommodation
            </button>
            <Link to="/admin" className="btn btn--ghost">
              Back to admin
            </Link>
          </div>
        }
        className="admin-trip-edit__header"
      />

      {accommodations.length === 0 ? (
        <p>No accommodations yet.</p>
      ) : (
        <table className="admin-trip-edit__table">
          <thead>
            <tr>
              <th>Hotel</th>
              <th>City</th>
              <th>Type</th>
              <th>Nights</th>
              <th aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {accommodations.map((acc) => (
              <tr key={acc.id}>
                <td>{acc.hotelName}</td>
                <td>{acc.hotelCity}</td>
                <td>{acc.hotelType}</td>
                <td>{acc.nights}</td>
                <td className="admin-trip-edit__row-actions">
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => setEditing(acc)}
                    disabled={busyId === acc.id}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn--danger"
                    onClick={() => handleDelete(acc)}
                    disabled={busyId === acc.id}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal open={creating} onClose={() => setCreating(false)} title="Add accommodation" size="lg">
        <AccommodationForm
          busy={busyId === "new"}
          onSubmit={handleCreate}
          onCancel={() => setCreating(false)}
          submitLabel="Create accommodation"
        />
      </Modal>

      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit accommodation" size="lg">
        {editing ? (
          <AccommodationForm
            initial={editing}
            busy={busyId === editing.id}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(null)}
            warning="Changes affect every trip that links to this accommodation."
          />
        ) : null}
      </Modal>
    </main>
  );
}
