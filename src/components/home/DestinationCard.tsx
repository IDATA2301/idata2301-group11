import { Link } from "react-router-dom";
import styles from "./DestinationCard.module.css";

/** Props for a featured destination card on the homepage. */
type DestinationCardProps = {
  destination: string;
  image: string;
  image_alt: string;
  lowestPrice?: number;
};

/** Card linking a destination tile to filtered trips. */
export default function DestinationCard({ destination, image, image_alt, lowestPrice }: DestinationCardProps) {
  const to = `/trips?q=${encodeURIComponent(destination)}`;
  const priceLabel = lowestPrice != null ? `From $${lowestPrice.toLocaleString()}` : "";

  return (
    <Link to={to} className={styles.destinationCard}>
      {priceLabel && <span className={styles.priceBadge}>{priceLabel}</span>}
      <img src={image} alt={image_alt} className={styles.destinationImage} />
      <p className={styles.destinationName}>{destination}</p>
    </Link>
  );
}
