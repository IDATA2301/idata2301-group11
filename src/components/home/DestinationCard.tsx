import styles from "./DestinationCard.module.css";

type DestinationCardProps = {
  destination: string;
  image: string;
};

export default function DestinationCard({ destination, image }: DestinationCardProps) {
  return (
    <article className={styles.destinationCard}>
      <img src={image} alt={destination} className={styles.destinationImage} />
      <p className={styles.destinationName}>{destination}</p>
    </article>
  );
}
