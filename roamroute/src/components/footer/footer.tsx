import { Link } from "react-router-dom";
import "../../assets/styles/components/footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <span className="site-footer__logo">RoamRoute</span>
          <p>
            Where every journey begins with clarity, confidence, and a touch of adventure.
            Compare travel prices from 12+ trusted platforms in one place.
          </p>
        </div>

        <div className="site-footer__section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="site-footer__section">
          <h4>Contact</h4>
          <ul>
            <li>
              Email: <a href="mailto:hello@roamroute.no">post@roamroute.org</a>
            </li>
            <li>
              Phone: <a href="tel:+4712345678">+47 929 90 707</a>
            </li>
            <li>Address: C215, NTNU Ålesund</li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        © {year} RoamRoute. All rights reserved.
      </div>
    </footer>
  );
}
