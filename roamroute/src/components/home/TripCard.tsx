
import { useState, useEffect } from "react";
import styles from "./TripCard.module.css";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import type { TripCard as TripCardProps } from "../../types/Trip";



function formatDate(dateString: string): string {
  if (!dateString) return "";
  return dateString.includes("T") ? dateString.split("T")[0] : dateString;
}


export default function TripCard({ id, imageUrl, title, city, country, lowestPrice, startDate, endDate, isFavorite }: TripCardProps) {

  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavoriteState(isFavorite);
  }, [isFavorite]);

  function toggleFavorite(tripId: number) {

    const isFav = isFavoriteState;

    const method = isFav ? "DELETE" : "POST";

    const url = isFav
      ? `http://localhost:8080/api/favorites/${tripId}`
      : `http://localhost:8080/api/favorites?tripId=${tripId}`;

    fetch(url, {
      method,
      headers: {
        Authorization: "Basic " + localStorage.getItem("auth")
      }
    })
    .then(() => setIsFavoriteState(!isFav))
    .catch(err => console.error(err));
  }

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <article className={styles.tripCard}
      onClick={(e) => {
        //hvis det ble klikket på button → ikke naviger
        if ((e.target as HTMLElement).closest("button")) return;

        navigate(`/tour/${id}`);
        console.log("ARTICLE CLICK")
      }}
    >
      <img src={`/images/${imageUrl}`} alt={title} className={styles.tripImage} />

      <button className={styles.favoriteButton} onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFavorite(id);
        console.log("BUTTON CLICK");
        }}
      >
      <HeartIcon className={`${styles.heartIcon} ${isFavoriteState ? styles.active : ""}`}/>
      </button>

      <div className={styles.tripOverlay}>
        <h3 className={styles.tripTitle}>{title}</h3>

        <p className={styles.tripLocation}>
          {city}, {country}
        </p>

        <div className={styles.tripMeta}>
          <p className={styles.tripPrice}>From ${lowestPrice}</p>
          <p className={styles.tripDates}>
            {formattedStartDate} - {formattedEndDate}
          </p>
        </div>
      </div>
    </article>
  );
}
