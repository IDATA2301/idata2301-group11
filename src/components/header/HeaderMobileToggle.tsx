import styles from "./Header.module.css";

/** Props for the mobile menu toggle button. */
type HeaderMobileToggleProps = {
  isOpen: boolean;
  onToggle: () => void;
};

/** Hamburger toggle button used to open and close the mobile navigation drawer. */
export default function HeaderMobileToggle({ isOpen, onToggle }: HeaderMobileToggleProps) {
  return (
    <button className={styles.toggle} onClick={onToggle} aria-label="Toggle menu">
      <span className={`${styles.toggleLine} ${isOpen ? styles.toggleLineOpen : ""}`.trim()}></span>
      <span className={`${styles.toggleLine} ${isOpen ? styles.toggleLineOpen : ""}`.trim()}></span>
      <span className={`${styles.toggleLine} ${isOpen ? styles.toggleLineOpen : ""}`.trim()}></span>
    </button>
  );
}
