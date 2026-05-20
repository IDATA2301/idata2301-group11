import styles from "./Tabs.module.css";

/** Props for the mobile tabs selector on the tour details page. */
type TabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

/** Mobile-only tabs control for switching tour sections. */
export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <section className={styles.tabs}>
      <button
        className={activeTab === "overview" ? styles.active : ""}
        onClick={() => onTabChange("overview")}
      >
        Trip Overview 
      </button>

      <button
        className={activeTab === "flights" ? styles.active : ""}
        onClick={() => onTabChange("flights")}
      >
        Flight Options
      </button>

      <button
        className={activeTab === "hotels" ? styles.active : ""}
        onClick={() => onTabChange("hotels")}
      >
        Hotel Options
      </button>
    </section>
  );
}
