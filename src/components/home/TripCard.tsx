
import { useState, useEffect } from "react";
import styles from "./TripCard.module.css";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import type { TripCard as TripCardProps } from "../../types/Trip";
import { useAuth } from "../../context/useAuth";
import { apiFetch } from "../../services/apiFetch";
import { getTripImageUrl } from "../../utils/imageUrls";

/** Format a date string to a compact display value. */
function formatDate(dateString: string): string {
  if (!dateString) return "";
  return dateString.includes("T") ? dateString.split("T")[0] : dateString;
}


/** Homepage trip card with favorite toggle and trip navigation. */
export default function TripCard({ id, imageUrl, title, city, country, lowestPrice, startDate, endDate, isFavorite, onRemoveFavorite }: TripCardProps) {

  const { authUser } = useAuth();
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  const navigate = useNavigate();
  const { favoriteCount, setFavoriteCount } = useAuth();

  useEffect(() => {
    setIsFavoriteState(isFavorite);
  }, [isFavorite]);

  function toggleFavorite(tripId: number) {

    if (!authUser) {
      alert("You must be logged in to manage favorites.");
      return;
    }

    const isFav = isFavoriteState;

    const method = isFav ? "DELETE" : "POST";

    const url = isFav
      ? `/favorites/${tripId}`
      : `/favorites?tripId=${tripId}`;

    apiFetch(url, { method })
    .then(() => {
      setIsFavoriteState(!isFav);
      
      if (isFav && onRemoveFavorite) {  
        onRemoveFavorite(tripId);
      }
      if (isFav) {
        setFavoriteCount(favoriteCount - 1);
      } else {
        setFavoriteCount(favoriteCount + 1);
      }
    })
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
      <img src={getTripImageUrl(imageUrl)} alt={title} className={styles.tripImage} />

      <button
        className={styles.favoriteButton}
        aria-label={isFavoriteState ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
        aria-pressed={isFavoriteState}
        onClick={(e) => {
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
