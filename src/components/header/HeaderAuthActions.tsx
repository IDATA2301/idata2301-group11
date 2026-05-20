import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

/** Props for the authenticated/public header action cluster. */
type HeaderAuthActionsProps = {
  isAuthenticated: boolean;
  onNavigate: () => void;
  onLogout: () => void;
};

/** Build the base header link class name with active state styling. */
function getLinkClassName(isActive: boolean) {
  return `${styles.link} ${isActive ? styles.linkActive : ""}`.trim();
}

/** Build the signup link class name with the additional button styling. */
function getSignupLinkClassName(isActive: boolean) {
  return `${getLinkClassName(isActive)} ${styles.signupLink}`.trim();
}

/** Header auth actions for login/signup or profile/logout states. */
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
