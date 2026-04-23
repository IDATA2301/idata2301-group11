import styles from "./TripCard.module.css";

import type { TripCard } from "../../types/Trip";

function formatDate(dateString: string): string {
  if (!dateString) return "";
  return dateString.includes("T") ? dateString.split("T")[0] : dateString;
}

export default function TripCard({ imageUrl, title, city, country, lowestPrice, startDate, endDate }: TripCard) {
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <article className={styles.tripCard}>
      <img src={`/images/${imageUrl}`} alt={title} className={styles.tripImage} />

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
