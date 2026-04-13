import styles from "./OptionComparisonCard.module.css";

type OptionComparisonCardProps = {
  provider: string;
  price: number;
  selected: boolean;
  onSelect: () => void;
};

export default function OptionComparisonCard({
  provider,
  price,
  selected,
  onSelect,
}: OptionComparisonCardProps) {
  return (
    <div className={`${styles.card} ${selected ? styles.selected : ""}`.trim()}>
      <h3 className={styles.title}>
        {provider}
        <span className={styles.note}>Includes taxes & fees</span>
      </h3>

      <p className={styles.price}>${price}</p>

      <button onClick={onSelect} className={styles.button}>
        {selected ? "Selected" : "Select"}
      </button>
    </div>
  );
}
