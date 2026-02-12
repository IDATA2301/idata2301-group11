import { Link } from "react-router-dom"
import { useState } from "react"
import "./header.css"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <nav className="nav">
        <button 
          className="hamburger" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={isMenuOpen ? "hamburger-line open" : "hamburger-line"}></span>
          <span className={isMenuOpen ? "hamburger-line open" : "hamburger-line"}></span>
          <span className={isMenuOpen ? "hamburger-line open" : "hamburger-line"}></span>
        </button>
        
        <div className={isMenuOpen ? "nav-links open" : "nav-links"}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
          <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
          <Link to="/favorites" onClick={() => setIsMenuOpen(false)}>Favorites</Link>
          <Link to="/tour/1" onClick={() => setIsMenuOpen(false)}>Tour Details</Link>
        </div>
      </nav>
    </header>
  )
}
