import { Link } from "react-router-dom";
import styles from "./DestinationCard.module.css";

type DestinationCardProps = {
  destination: string;
  image: string;
};

export default function DestinationCard({ destination, image }: DestinationCardProps) {
  const to = `/trips?q=${encodeURIComponent(destination)}`;

  return (
    <Link to={to} className={styles.destinationCard}>
      <span className={styles.priceBadge}>$899</span>
      <img src={image} alt={destination} className={styles.destinationImage} />
      <p className={styles.destinationName}>{destination}</p>
    </Link>
  );
}
