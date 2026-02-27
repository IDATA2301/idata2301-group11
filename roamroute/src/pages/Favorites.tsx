import { useState, useEffect } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    // TODO: Last favorite bookings fra API?
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  return (
    <div>
      <h1>Favorite Bookings</h1>
      {favorites.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>No favorite bookings yet</p>
        </div>
      ) : (
        <div>
          {/* Favorites content */}
        </div>
      )}
    </div>
  );
}