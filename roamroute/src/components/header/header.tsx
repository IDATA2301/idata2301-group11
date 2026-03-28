import { Link, NavLink, useNavigate } from "react-router-dom";
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
          <div className="site-header__links-main">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "site-header__link site-header__link--active" : "site-header__link"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "site-header__link site-header__link--active" : "site-header__link"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "site-header__link site-header__link--active" : "site-header__link"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </NavLink>
            {authUser && (
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive ? "site-header__link site-header__link--active" : "site-header__link"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Favorites
              </NavLink>
            )}
          </div>

          <div className="site-header__links-auth">
            {authUser ? (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? "site-header__link site-header__link--active" : "site-header__link"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </NavLink>
                <button type="button" onClick={handleLogout} className="site-header__logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "site-header__link site-header__link--active" : "site-header__link"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "site-header__link site-header__link--active site-header__signup-link"
                      : "site-header__link site-header__signup-link"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Signup
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
