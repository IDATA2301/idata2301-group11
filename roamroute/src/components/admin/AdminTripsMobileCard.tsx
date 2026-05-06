import BaseCard from "../ui/BaseCard";
import styles from "./AdminTripsMobileCard.module.css";

type AdminTripsMobileCardProps = {
  title: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  onClick: () => void;
};

export default function AdminTripsMobileCard({
  title,
  city,
  country,
  startDate,
  endDate,
  onClick,
}: AdminTripsMobileCardProps) {
  return (
    <BaseCard as="button" type="button" className={styles.card} onClick={onClick}>
      <span className={styles.title}>{title}</span>
      <span>{city}, {country}</span>
      <span>{startDate} – {endDate}</span>
    </BaseCard>
  );
}
