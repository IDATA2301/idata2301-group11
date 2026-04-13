import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

type HeaderAuthActionsProps = {
  isAuthenticated: boolean;
  onNavigate: () => void;
  onLogout: () => void;
};

function getLinkClassName(isActive: boolean) {
  return `${styles.link} ${isActive ? styles.linkActive : ""}`.trim();
}

function getSignupLinkClassName(isActive: boolean) {
  return `${getLinkClassName(isActive)} ${styles.signupLink}`.trim();
}

export default function HeaderAuthActions({
  isAuthenticated,
  onNavigate,
  onLogout,
}: HeaderAuthActionsProps) {
  return (
    <div className={styles.linksAuth}>
      {isAuthenticated ? (
        <>
          <NavLink
            to="/profile"
            className={({ isActive }) => getLinkClassName(isActive)}
            onClick={onNavigate}
          >
            Profile
          </NavLink>
          <button type="button" onClick={onLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) => getLinkClassName(isActive)}
            onClick={onNavigate}
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) => getSignupLinkClassName(isActive)}
            onClick={onNavigate}
          >
            Signup
          </NavLink>
        </>
      )}
    </div>
  );
}
