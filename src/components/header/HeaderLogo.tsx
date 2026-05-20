import { Link } from "react-router-dom";
import styles from "./Header.module.css";

/** Props for the clickable header logo. */
type HeaderLogoProps = {
  onNavigate: () => void;
};

/** Brand logo link that returns to the homepage and closes the menu. */
export default function HeaderLogo({ onNavigate }: HeaderLogoProps) {
  return (
    <Link to="/" className={styles.logo} onClick={onNavigate}>
      <span className={`${styles.logoText} text--heading`}>R.</span>
    </Link>
  );
}
