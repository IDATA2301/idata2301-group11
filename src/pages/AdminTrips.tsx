import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/pages/admintripedit.css";
import SectionHeader from "../components/ui/SectionHeader";
import { deleteAdminTrip, fetchAdminTrips } from "../services/adminTrips";
import { getTripImageUrl } from "../utils/imageUrls";

type AdminTripRow = {
  id: number;
  title: string;
  imageUrl: string;
  city: string;
  country: string;
  lowestPrice: number;
  startDate: string;
  endDate: string;
};

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatTripDate(value: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return dateFormatter.format(date);
}

/** Admin trip overview. */
export default function AdminTrips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<AdminTripRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  async function handleDelete(trip: AdminTripRow) {
    if (!window.confirm(`Delete trip "${trip.title}"?`)) return;
    setBusyId(trip.id);
    try {
      await deleteAdminTrip(trip.id);
      setTrips((prev) => prev.filter((t) => t.id !== trip.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete trip.");
    } finally {
      setBusyId(null);
    }
  }

  useEffect(() => {
    fetchAdminTrips()
      .then((data) => setTrips(data))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load trips"))
      .finally(() => setLoading(false));
  }, []);

  const formattedTrips = useMemo(
    () =>
      trips.map((trip) => ({
        ...trip,
        startDate: formatTripDate(trip.startDate),
        endDate: formatTripDate(trip.endDate),
      })),
    [trips],
  );

  return (
    <main className="admin-trip-edit">
      <SectionHeader
        title="Trips"
        action={
          <div className="admin-trip-edit__group-header">
            <Link to="/admin/trips/create" className="btn btn--primary">
              Create trip
            </Link>
            <Link to="/admin" className="btn btn--ghost">
              Back to admin
            </Link>
          </div>
        }
        className="admin-trip-edit__header"
      />

      {loading ? (
        <p>Loading trips...</p>
      ) : error ? (
        <p>{error}</p>
      ) : trips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <table className="admin-trip-edit__table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Destination</th>
              <th>Start</th>
              <th>End</th>
              <th>From</th>
              <th aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {formattedTrips.map((trip) => (
              <tr key={trip.id}>
                <td>
                  {trip.imageUrl ? (
                    <img
                      src={getTripImageUrl(trip.imageUrl)}
                      alt={trip.title}
                      style={{ width: 80, height: 56, objectFit: "cover", borderRadius: 6 }}
                    />
                  ) : (
                    <span aria-hidden>—</span>
                  )}
                </td>
                <td>{trip.title}</td>
                <td>{trip.city}, {trip.country}</td>
                <td>{trip.startDate}</td>
                <td>{trip.endDate}</td>
                <td>${trip.lowestPrice}</td>
                <td className="admin-trip-edit__row-actions">
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => navigate(`/admin/trips/${trip.id}/edit`)}
                    disabled={busyId === trip.id}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn--danger"
                    onClick={() => handleDelete(trip)}
                    disabled={busyId === trip.id}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
