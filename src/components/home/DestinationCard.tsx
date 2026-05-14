import { Link } from "react-router-dom";
import styles from "./DestinationCard.module.css";

type DestinationCardProps = {
  destination: string;
  image: string;
  image_alt: string;
};

export default function DestinationCard({ destination, image, image_alt }: DestinationCardProps) {
  const to = `/trips?q=${encodeURIComponent(destination)}`;

  return (
    <Link to={to} className={styles.destinationCard}>
      <span className={styles.priceBadge}>$899</span>
      <img src={image} alt={image_alt} className={styles.destinationImage} />
      <p className={styles.destinationName}>{destination}</p>
    </Link>
  );
}
