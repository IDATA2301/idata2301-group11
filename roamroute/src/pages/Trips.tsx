import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { TripCard as TripCardProps } from "../types/Trip";
import TripCard from "../components/home/TripCard";


export default function Trips() {

  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const q = searchParams.get("q");
  const normalizedQuery = (q ?? "").trim();
  const shouldFetchAllTrips = normalizedQuery === "" || normalizedQuery === "0";



  const [trips, setTrips] = useState<TripCardProps[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const endpoint = shouldFetchAllTrips
      ? "http://localhost:8080/api/trips/home"
      : "http://localhost:8080/api/trips/search?q=" + encodeURIComponent(normalizedQuery);

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: TripCardProps[]) => setTrips(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

  }, [normalizedQuery, shouldFetchAllTrips]);

  if (loading) return <p>Loading trips...</p>;
  if (error) return <p>{error}</p>;

return (
    <main>
      <h1>Showing results for: {shouldFetchAllTrips ? "all trips" : normalizedQuery}</h1>

      {trips.length === 0 ? (
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
