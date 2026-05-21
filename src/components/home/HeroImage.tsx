import styles from "./HeroImage.module.css";

export default function HeroImage() {
  return (
    <div className={styles.heroImage} aria-hidden="true">
      <img
        src="/images/index-hero.webp"
        alt=""
        fetchPriority="high"
        className={styles.heroImageImg}
      />
    </div>
  );
}
