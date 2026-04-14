import { Link } from "react-router-dom";
import styles from "./Header.module.css";

type HeaderLogoProps = {
  onNavigate: () => void;
};

export default function HeaderLogo({ onNavigate }: HeaderLogoProps) {
  return (
    <Link to="/" className={styles.logo} onClick={onNavigate}>
      <span className={`${styles.logoText} text--heading`}>R.</span>
    </Link>
  );
}
