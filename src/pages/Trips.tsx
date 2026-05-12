import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { TripCard as TripCardProps } from "../types/Trip";
import TripCard from "../components/home/TripCard";
import TripSearchForm from "../components/home/TripSearchForm";
import { apiFetch } from "../services/apiFetch";


export default function Trips() {

  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trips, setTrips] = useState<TripCardProps[]>([]);

  const q = (searchParams.get("q") ?? "").trim();
  const minParam = searchParams.get("minPrice") ?? "";
  const maxParam = searchParams.get("maxPrice") ?? "";
  const destParam = searchParams.get("destinationId") ?? "";

  const url = useMemo(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (minParam) params.set("minPrice", minParam);
    if (maxParam) params.set("maxPrice", maxParam);
    if (destParam) params.set("destinationId", destParam);
    const qs = params.toString();
    return `/trips/search${qs ? `?${qs}` : ""}`;
  }, [q, minParam, maxParam, destParam]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    apiFetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: TripCardProps[]) => setTrips(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return (
    <main>
      <h1>Browse trips</h1>

      <div style={{ margin: "1rem 0" }}>
        <TripSearchForm
          initialValues={{ q, minPrice: minParam, maxPrice: maxParam, destinationId: destParam }}
          submitLabel="Apply"
          liveSubmit
          onSubmit={({ q: nextQ, minPrice, maxPrice, destinationId }) => {
            const next = new URLSearchParams();
            if (nextQ) next.set("q", nextQ);
            if (minPrice) next.set("minPrice", minPrice);
            if (maxPrice) next.set("maxPrice", maxPrice);
            if (destinationId) next.set("destinationId", destinationId);
            setSearchParams(next, { replace: true });
          }}
        />
      </div>

      {loading ? (
        <p>Loading trips...</p>
      ) : error ? (
        <p>{error}</p>
      ) : trips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <div className="home__trip-list">
          {trips.map((trip) => (
            <Link key={trip.id} to={`/tour/${trip.id}`} className="home__trip-card-link">
              <TripCard {...trip} />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
