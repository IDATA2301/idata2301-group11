import { HomeIcon } from "@heroicons/react/24/solid";
import styles from "./AccommodationSummary.module.css";

/** Props for the accommodation summary section. */
type AccommodationSummaryProps = {
  hotelName: string;
  hotelType: string;
  hotelLocation: string;
  nights: number | string;
  amenities: string;
};

export default function AccommodationSummary({
  hotelName,
  hotelType,
  hotelLocation,
  nights,
  amenities,
}: AccommodationSummaryProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        <HomeIcon className={styles.icon} aria-hidden="true" />
        Accommodation
      </h2>

      <div className={styles.card}>
        <h3>{hotelName}</h3>
        <p>{hotelType}</p>
        <p>{hotelLocation}</p>
        <p>{nights} nights</p>
        <p className={styles.amenities}>{amenities}</p>
      </div>
    </section>
  );
}
