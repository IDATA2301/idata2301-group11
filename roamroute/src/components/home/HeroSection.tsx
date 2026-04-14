import styles from "./HeroSection.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/trips?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className={styles.hero}>
      <h1 className={styles.heroTitle}>
        Dream away at
        <br />
        your destination.
      </h1>
        <form className={styles.search} onSubmit={handleSearch}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Where are you roaming?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        <button className={`btn btn--accent ${styles.searchButton}`}>Search</button>
        </form>

    </section>
  );
}
