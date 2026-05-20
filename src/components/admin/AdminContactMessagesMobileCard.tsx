import BaseCard from "../ui/BaseCard";
import styles from "./AdminContactMessagesMobileCard.module.css";

type AdminContactMessagesMobileCardProps = {
  senderEmail: string | null;
  subject: string;
  message: string;
  date: string;
  onDelete: () => void;
  deleting: boolean;
};

/** Mobile-friendly contact message card for admin list. */
export default function AdminContactMessagesMobileCard({
  senderEmail,
  subject,
  message,
  date,
  onDelete,
  deleting,
}: AdminContactMessagesMobileCardProps) {
  return (
    <BaseCard as="article" className={styles.card}>
      <div className={styles.header}>
        <div className={styles.meta}>
          <span className={styles.email}>{senderEmail ?? "Unknown sender"}</span>
          <span className={styles.date}>{date}</span>
        </div>
        <button
          type="button"
          className={`btn btn--danger ${styles.deleteBtn}`}
          onClick={onDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
      <span className={styles.subject}>{subject}</span>
      <p className={styles.message}>{message}</p>
    </BaseCard>
  );
}
