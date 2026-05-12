import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuth } from "../../context/useAuth";

type HeaderNavLinksProps = {
  isAuthenticated: boolean;
  onNavigate: () => void;
};

function getLinkClassName(isActive: boolean) {
  return `${styles.link} ${isActive ? styles.linkActive : ""}`.trim();
}

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
