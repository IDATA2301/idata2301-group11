import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../assets/styles/components/header.css";

export default function Header() {
  const navigate = useNavigate();
  const { authUser, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    signOut();
    setIsMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="site-header">
      <nav className="site-header__nav">
        <div className="site-header__row">
          <Link to="/" className="site-header__logo" onClick={() => setIsMenuOpen(false)}>
            <span className="site-header__logo-text text--heading">R.</span>
          </Link>

          <button className="site-header__toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={isMenuOpen ? "site-header__toggle-line site-header__toggle-line--open" : "site-header__toggle-line"}></span>
            <span className={isMenuOpen ? "site-header__toggle-line site-header__toggle-line--open" : "site-header__toggle-line"}></span>
            <span className={isMenuOpen ? "site-header__toggle-line site-header__toggle-line--open" : "site-header__toggle-line"}></span>
          </button>
        </div>

        <div className={isMenuOpen ? "site-header__links site-header__links--open" : "site-header__links"}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
          {authUser ? (
            <>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                Profile
              </Link>
              <button type="button" onClick={handleLogout} className="site-header__logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
