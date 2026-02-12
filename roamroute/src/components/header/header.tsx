import { Link } from "react-router-dom";
import { useState } from "react";
import "../../assets/styles/components/header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="site-header">
      <nav className="site-header__nav">
        <div className="site-header__row">
          <Link to="/" className="site-header__logo" onClick={() => setIsMenuOpen(false)}>
            <span className="site-header__logo-text">R.</span>
          </Link>

          <button className="site-header__toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <span
              className={
                isMenuOpen
                  ? "site-header__toggle-line site-header__toggle-line--open"
                  : "site-header__toggle-line"
              }
            ></span>
            <span
              className={
                isMenuOpen
                  ? "site-header__toggle-line site-header__toggle-line--open"
                  : "site-header__toggle-line"
              }
            ></span>
            <span
              className={
                isMenuOpen
                  ? "site-header__toggle-line site-header__toggle-line--open"
                  : "site-header__toggle-line"
              }
            ></span>
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
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>
            Login
          </Link>
          <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
            Sign Up
          </Link>
          <Link to="/favorites" onClick={() => setIsMenuOpen(false)}>
            Favorites
          </Link>
          <Link to="/tour/1" onClick={() => setIsMenuOpen(false)}>
            Tour Details
          </Link>
        </div>
      </nav>
    </header>
  );
}
