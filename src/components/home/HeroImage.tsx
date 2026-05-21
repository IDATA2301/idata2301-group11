import styles from "./HeroImage.module.css";

export default function HeroImage() {
  return (
    <div className={styles.heroImage} aria-hidden="true">
      <img
        src="/images/index-hero.webp"
        alt="Tropical beach at sunset with turquoise waves washing onto white sand and palm trees in the distance"
        fetchPriority="high"
        className={styles.heroImageImg}
      />
    </div>
  );
}
