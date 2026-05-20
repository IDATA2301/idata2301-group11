import styles from "./TourHeader.module.css";
import { getTripImageUrl } from "../../utils/imageUrls";

/** Props for the tour details hero header. */
type TourHeaderProps = {
  title: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
};

/** Header hero for a single tour with background image and dates. */
export default function TourHeader({ title, startDate, endDate, imageUrl }: TourHeaderProps) {
  return (
    <section className={styles.header} style={{ backgroundImage: `url(${getTripImageUrl(imageUrl)})` }}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.date}>
        {startDate} - {endDate}
      </p>
    </section>
  );
}
