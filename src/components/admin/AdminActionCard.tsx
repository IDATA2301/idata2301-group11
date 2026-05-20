import { Link } from "react-router-dom";
import styles from "./AdminActionCard.module.css";

type AdminActionCardProps = {
  title: string;
  description: string;
  actionLabel: string;
  to: string;
};

/** Row entry on the admin dashboard linking to a management section. */
export default function AdminActionCard({ title, description, actionLabel, to }: AdminActionCardProps) {
  return (
    <li className={styles.row}>
      <div className={styles.text}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </div>
      <Link to={to} className={`btn btn--ghost ${styles.action}`}>
        {actionLabel}
      </Link>
    </li>
  );
}
