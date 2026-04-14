import { Link } from "react-router-dom";
import BaseCard from "../ui/BaseCard";
import styles from "./AdminActionCard.module.css";

type AdminActionCardProps = {
  title: string;
  description: string;
  actionLabel: string;
  to: string;
};

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
