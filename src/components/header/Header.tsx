import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import HeaderAuthActions from "./HeaderAuthActions";
import HeaderLogo from "./HeaderLogo";
import HeaderMobileToggle from "./HeaderMobileToggle";
import HeaderNavLinks from "./HeaderNavLinks";
import styles from "./Header.module.css";

/** Site header with responsive navigation and auth actions. */
export default function Header() {
  const navigate = useNavigate();
  const { authUser, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    signOut();
    closeMenu();
    navigate("/login");
  };

  return (
    <header className={styles.siteHeader}>
      <nav className={styles.nav}>
        <div className={styles.row}>
          <HeaderLogo onNavigate={closeMenu} />
          <HeaderMobileToggle isOpen={isMenuOpen} onToggle={toggleMenu} />
        </div>

        <div className={`${styles.links} ${isMenuOpen ? styles.linksOpen : ""}`.trim()}>
          <HeaderNavLinks isAuthenticated={Boolean(authUser)} onNavigate={closeMenu} />
          <HeaderAuthActions
            isAuthenticated={Boolean(authUser)}
            onNavigate={closeMenu}
            onLogout={handleLogout}
          />
        </div>
      </nav>
    </header>
  );
}
