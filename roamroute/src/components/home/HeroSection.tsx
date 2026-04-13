import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heroTitle}>
        Dream away at
        <br />
        your destination.
      </h1>
      <div className={styles.search}>
        <input className={styles.searchInput} type="text" placeholder="Where are you roaming?" />
        <button className={`btn btn--accent ${styles.searchButton}`}>Search</button>
      </div>
    </section>
  );
}
