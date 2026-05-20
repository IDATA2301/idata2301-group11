import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuth } from "../../context/useAuth";

/** Props for the main navigation links in the header. */
type HeaderNavLinksProps = {
  isAuthenticated: boolean;
  onNavigate: () => void;
};

/** Build the base header link class name with active state styling. */
function getLinkClassName(isActive: boolean) {
  return `${styles.link} ${isActive ? styles.linkActive : ""}`.trim();
}

/** Main navigation links shown in the header, with favorites when signed in. */
export default function HeaderNavLinks({ isAuthenticated, onNavigate }: HeaderNavLinksProps) {
  const { favoriteCount } = useAuth();

  return (
    <div className={styles.linksMain}>
      <NavLink
        to="/"
        end
        className={({ isActive }) => getLinkClassName(isActive)}
        onClick={onNavigate}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => getLinkClassName(isActive)}
        onClick={onNavigate}
      >
        About
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) => getLinkClassName(isActive)}
        onClick={onNavigate}
      >
        Contact
      </NavLink>
      {isAuthenticated && (
        <NavLink
          to="/favorites"
          className={({ isActive }) => getLinkClassName(isActive)}
          onClick={onNavigate}
        >
          Favorites ({favoriteCount})
        </NavLink>
      )}
    </div>
  );
}
