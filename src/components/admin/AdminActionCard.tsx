import { Link } from "react-router-dom";
import BaseCard from "../ui/BaseCard";
import styles from "./AdminActionCard.module.css";

/** Props for an admin action card that links to a section. */
type AdminActionCardProps = {
  title: string;
  description: string;
  actionLabel: string;
  to: string;
};

/** Action card displayed on admin dashboard linking to key sections (users, trips, flights, etc.). */
export default function AdminActionCard({ title, description, actionLabel, to }: AdminActionCardProps) {
  return (
    <BaseCard as="article" className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <Link to={to} className={`btn ${styles.action}`}>
        {actionLabel}
      </Link>
    </BaseCard>
  );
}
