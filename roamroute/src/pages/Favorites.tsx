import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import EmptyState from "../components/ui/EmptyState";
import styles from "./Favorites.module.css";
import TripCard from "../components/home/TripCard";


export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const { authUser } = useAuth();

  function removeFavorite(tripId: number) { 
    setFavorites(prev => prev.filter(trip => trip.id !== tripId));
  }

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!authUser || !auth) {
      setFavorites([]);
      return;
    }

    fetch("http://localhost:8080/api/favorites/trips", {
      headers: {
        Authorization: "Basic " + auth
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Fetched favorites:", data);
        setFavorites(data);
      })
      .catch(err => console.error(err));
  }, [authUser]);

  return (  
    <main className={styles.page}>
      <h1 className={styles.title}>Favorite Trips</h1>

      {favorites.length === 0 ? (
        <EmptyState message="No favorites yet. Explore trips and add your favorites!" />
      ) : (
        <div className={styles.favoritesContainer}>
          {favorites.map((trip: any) => {

            return (
              <TripCard
                key={trip.id}
                id={trip.id}
                imageUrl={trip.imageUrl}   
                title={trip.title}
                city={trip.city}
                country={trip.country}
                lowestPrice={trip.lowestPrice} 
                startDate={trip.startDate}
                endDate={trip.endDate}
                isFavorite={true}
                onRemoveFavorite={removeFavorite}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}
