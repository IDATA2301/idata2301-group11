import styles from "./HeroSection.module.css";

import { useNavigate } from "react-router-dom";
import TripSearchForm from "./TripSearchForm";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <h1 className={styles.heroTitle}>
        Dream away at
        <br />
        your destination.
      </h1>
      <TripSearchForm
        showLiveResults
        onSubmit={({ q, minPrice, maxPrice, destinationId }) => {
          const params = new URLSearchParams();
          if (q) params.set("q", q);
          if (minPrice) params.set("minPrice", minPrice);
          if (maxPrice) params.set("maxPrice", maxPrice);
          if (destinationId) params.set("destinationId", destinationId);
          const qs = params.toString();
          navigate(qs ? `/trips?${qs}` : "/trips");
        }}
      />
    </section>
  );
}
