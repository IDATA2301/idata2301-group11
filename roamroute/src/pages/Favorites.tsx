import { useState } from "react";
import EmptyState from "../components/ui/EmptyState";

export default function Favorites() {
  const [favorites] = useState<unknown[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (!savedFavorites) return [];

    try {
      return JSON.parse(savedFavorites);
    } catch {
      return [];
    }
  });

  return (
    <div>
      <h1>Favorite Bookings</h1>
      {favorites.length === 0 ? (
        <EmptyState message="No favorite bookings yet" />
      ) : (
        <div>
          {/* Favorites content */}
        </div>
      )}
    </div>
  );
}
