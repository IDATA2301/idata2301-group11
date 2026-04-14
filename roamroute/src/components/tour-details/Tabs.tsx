import styles from "./Tabs.module.css";

export default function Tabs() {
  return (
    <section className={styles.tabs}>
      <button>Overview</button>
      <button>Accomodation</button>
      <button>Itinerary</button>
    </section>
  );
}
