import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/pages/admintrips.css";
import AdminTripsMobileCard from "../components/admin/AdminTripsMobileCard";
import AdminTripsTable, { type AdminTripRow } from "../components/admin/AdminTripsTable";
import SectionHeader from "../components/ui/SectionHeader";
import { fetchAdminTrips } from "../services/adminTrips";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/** Format a trip date for display in the admin list. */
function formatTripDate(value: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return dateFormatter.format(date);
}

/** Admin trip overview with desktop and mobile list views. */
export default function AdminTrips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<AdminTripRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <main className="admin-trips">
      <SectionHeader
        title="Trips"
        action={
          <div style={{ display: "flex", gap: "var(--space-sm)" }}>
            <Link to="/admin/trips/create" className="btn btn--primary">
              Create trip
            </Link>
            <Link to="/admin" className="btn btn--ghost">
              Back to admin
            </Link>
          </div>
        }
        className="admin-trips__header"
      />

      {loading ? (
        <p>Loading trips...</p>
      ) : error ? (
        <p>{error}</p>
      ) : trips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <>
          <section className="admin-trips__mobile-list" aria-label="Trips list">
            {formattedTrips.map((trip) => (
              <AdminTripsMobileCard
                key={trip.id}
                title={trip.title}
                city={trip.city}
                country={trip.country}
                startDate={trip.startDate}
                endDate={trip.endDate}
                onClick={() => navigate(`/admin/trips/${trip.id}/edit`)}
              />
            ))}
          </section>

          <AdminTripsTable trips={formattedTrips} onRowClick={(id) => navigate(`/admin/trips/${id}/edit`)} />
        </>
      )}
    </main>
  );
}
