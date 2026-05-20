import {
  HomeIcon,
  InformationCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import styles from "./TripOverview.module.css";

/** Props for the trip overview section. */
type TripOverviewProps = {
  description: string;
  keywords: string[];
  departureAirport: string;
  arrivalAirport: string;
  flightDuration: string;
  hotelName: string;
};

/** Detailed summary section for the selected trip. */
export default function TripOverview({
  description,
  keywords,
  departureAirport,
  arrivalAirport,
  flightDuration,
  hotelName,
}: TripOverviewProps) {
  return (
    <section>
      <h2 className={styles.overviewTitle}>
        <InformationCircleIcon className={`${styles.icon} ${styles.iconInfo}`} aria-hidden="true" />
        Trip Overview
      </h2>

      <div className={styles.overviewContent}>
        <p>{description}</p>

        <div className={styles.overviewMeta}>
          <div className={`${styles.metaGroup} ${styles.keywords}`}>
            {keywords.map((keyword, index) => (
              <span key={index}>{keyword}</span>
            ))}
          </div>

          <div className={styles.metaGroup}>
            <PaperAirplaneIcon className={`${styles.icon} ${styles.iconFlight}`} aria-hidden="true" />
            <p className={styles.metaText}>
              {departureAirport} -{">"} {arrivalAirport}
            </p>
            <strong className={styles.metaStrong}>{flightDuration}</strong>
          </div>

          <div className={styles.metaGroup}>
            <HomeIcon className={`${styles.icon} ${styles.iconHome}`} aria-hidden="true" />
            <p className={styles.metaText}>Accommodation</p>
            <strong className={styles.metaStrong}>{hotelName}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
