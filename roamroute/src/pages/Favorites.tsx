import { useState } from "react";
import FavoritesList from "../components/favorites/FavoritesList";
import EmptyState from "../components/ui/EmptyState";
import styles from "./Favorites.module.css";

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
    <main className={styles.page}>
      <h1 className={styles.title}>Favorite Bookings</h1>
      {favorites.length === 0 ? (
        <EmptyState message="No favorite bookings yet" />
      ) : (
        <FavoritesList favorites={favorites} />
      )}
    </main>
  );
}
