import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/pages/admintripedit.css";
import DestinationForm from "../components/admin/DestinationForm";
import EmptyState from "../components/ui/EmptyState";
import Modal from "../components/ui/Modal";
import SectionHeader from "../components/ui/SectionHeader";
import {
  createAdminDestination,
  deleteAdminDestination,
  fetchAdminDestinations,
  updateAdminDestinationById,
  type AdminDestination,
  type AdminDestinationInput,
} from "../services/adminDestinations";
import { getDestinationImageUrl } from "../utils/imageUrls";

/** Admin page for managing destination records and destination imagery. */
export default function AdminDestinations() {
  const [destinations, setDestinations] = useState<AdminDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminDestination | null>(null);
  const [creating, setCreating] = useState(false);
  const [busyId, setBusyId] = useState<number | "new" | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchAdminDestinations()
      .then((data) => {
        if (!cancelled) setDestinations(data);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err instanceof Error ? err.message : "Failed to load destinations");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleCreate(input: AdminDestinationInput) {
    setBusyId("new");
    try {
      const created = await createAdminDestination(input);
      setDestinations((prev) => [...prev, created]);
      setCreating(false);
    } finally {
      setBusyId(null);
    }
  }

  async function handleUpdate(input: AdminDestinationInput) {
    if (!editing) return;
    setBusyId(editing.id);
    try {
      const updated = await updateAdminDestinationById(editing.id, input);
      setDestinations((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
      setEditing(null);
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(destination: AdminDestination) {
    if (!window.confirm(`Delete destination "${destination.city}, ${destination.country}"?`)) {
      return;
    }
    setBusyId(destination.id);
    try {
      await deleteAdminDestination(destination.id);
      setDestinations((prev) => prev.filter((d) => d.id !== destination.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete destination.");
    } finally {
      setBusyId(null);
    }
  }

  if (loading) {
    return (
      <main className="admin-trip-edit">
        <p>Loading destinations...</p>
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="admin-trip-edit">
        <EmptyState
          title="Could not load destinations"
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
        title="Destinations"
        action={
          <div className="admin-trip-edit__group-header">
            <button type="button" className="btn" onClick={() => setCreating(true)}>
              Add destination
            </button>
            <Link to="/admin" className="btn btn--ghost">
              Back to admin
            </Link>
          </div>
        }
        className="admin-trip-edit__header"
      />

      {destinations.length === 0 ? (
        <p>No destinations yet.</p>
      ) : (
        <div className="admin-trip-edit__table-wrap">
        <table className="admin-trip-edit__table">
          <thead>
            <tr>
              <th>Image</th>
              <th>City</th>
              <th>Country</th>
              <th aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((dest) => (
              <tr key={dest.id}>
                <td>
                  {dest.imageUrl ? (
                    <img
                      src={getDestinationImageUrl(dest.imageUrl)}
                      alt={dest.imageAlt || `${dest.city} thumbnail`}
                      style={{ width: 80, height: 56, objectFit: "cover", borderRadius: 6 }}
                    />
                  ) : (
                    <span aria-hidden>—</span>
                  )}
                </td>
                <td>{dest.city}</td>
                <td>{dest.country}</td>
                <td className="admin-trip-edit__row-actions">
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => setEditing(dest)}
                    disabled={busyId === dest.id}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn--danger"
                    onClick={() => handleDelete(dest)}
                    disabled={busyId === dest.id}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}

      <Modal open={creating} onClose={() => setCreating(false)} title="Add destination" size="lg">
        <DestinationForm
          busy={busyId === "new"}
          onSubmit={handleCreate}
          onCancel={() => setCreating(false)}
          submitLabel="Create destination"
        />
      </Modal>

      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit destination" size="lg">
        {editing ? (
          <DestinationForm
            initial={editing}
            busy={busyId === editing.id}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(null)}
          />
        ) : null}
      </Modal>
    </main>
  );
}
