import styles from "./Header.module.css";

type HeaderMobileToggleProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function HeaderMobileToggle({ isOpen, onToggle }: HeaderMobileToggleProps) {
  return (
    <button className={styles.toggle} onClick={onToggle} aria-label="Toggle menu">
      <span className={`${styles.toggleLine} ${isOpen ? styles.toggleLineOpen : ""}`.trim()}></span>
      <span className={`${styles.toggleLine} ${isOpen ? styles.toggleLineOpen : ""}`.trim()}></span>
      <span className={`${styles.toggleLine} ${isOpen ? styles.toggleLineOpen : ""}`.trim()}></span>
    </button>
  );
}
