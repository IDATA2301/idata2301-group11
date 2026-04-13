import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.siteFooter}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>RoamRoute</span>
          <p>
            Where every journey begins with clarity, confidence, and a touch of adventure.
            Compare travel prices from 12+ trusted platforms in one place.
          </p>
        </div>

        <div className={styles.section}>
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

        <div className={styles.section}>
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

      <div className={styles.bottom}>
        <p>© {year} RoamRoute. All rights reserved.</p>
        <p className={styles.disclaimer}>
          This website is a result of a university group project, performed in the course IDATA2301
          Web technologies and IDATA2306 Application Development, at NTNU. All the information
          provided here is a result of imagination. Any resemblance with real companies or products
          is a coincidence.
        </p>
      </div>
    </footer>
  );
}
