import BaseCard from "../ui/BaseCard";
import styles from "./AdminContactMessagesTable.module.css";

export type ContactMessageRow = {
  id: number;
  senderEmail: string | null;
  contactmessage_subject: string;
  contactmessage_message: string;
  created_at: string | null;
};

type AdminContactMessagesTableProps = {
  messages: ContactMessageRow[];
  onDelete: (id: number) => void;
  deletingId: number | null;
};

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date);
}

/** Desktop table for the admin contact messages overview. */
export default function AdminContactMessagesTable({ messages, onDelete, deletingId }: AdminContactMessagesTableProps) {
  return (
    <BaseCard as="section" className={styles.tableWrap} aria-label="Contact messages table">
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Date</th>
            <th aria-label="Actions"></th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id} className={styles.row}>
              <td>{msg.id}</td>
              <td>{msg.senderEmail ?? "—"}</td>
              <td>{msg.contactmessage_subject}</td>
              <td>{formatDate(msg.created_at)}</td>
              <td className={styles.actions}>
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={() => onDelete(msg.id)}
                  disabled={deletingId === msg.id}
                >
                  {deletingId === msg.id ? "Deleting…" : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </BaseCard>
  );
}
