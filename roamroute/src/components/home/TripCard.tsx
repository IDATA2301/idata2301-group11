import styles from "./TripCard.module.css";

type TripCardProps = {
  imageUrl: string;
  title: string;
  city: string;
  country: string;
  lowestPrice: number;
};

export default function TripCard({ imageUrl, title, city, country, lowestPrice }: TripCardProps) {
  return (
    <article className={styles.tripCard}>
      <img src={`/images/${imageUrl}`} alt={title} className={styles.tripImage} />

      <div className={styles.tripOverlay}>
        <h3 className={styles.tripTitle}>{title}</h3>

        <p className={styles.tripLocation}>
          {city}, {country}
        </p>

        <p className={styles.tripPrice}>From ${lowestPrice}</p>
      </div>
    </article>
  );
}
