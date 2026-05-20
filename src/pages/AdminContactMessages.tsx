import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "../assets/styles/pages/admincontactmessages.css";
import AdminContactMessagesTable, { type ContactMessageRow } from "../components/admin/AdminContactMessagesTable";
import AdminContactMessagesMobileCard from "../components/admin/AdminContactMessagesMobileCard";
import SectionHeader from "../components/ui/SectionHeader";
import { apiFetch } from "../services/apiFetch";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? (value ?? "—") : dateFormatter.format(date);
}

/** Admin page for viewing and deleting contact form submissions. */
export default function AdminContactMessages() {
  const [messages, setMessages] = useState<ContactMessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    apiFetch("/api/contact")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch messages");
        return res.json();
      })
      .then((data) => setMessages(data))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load messages"))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    setDeletingId(id);
    try {
      await apiFetch(`/api/contact/${id}`, { method: "DELETE" });
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Failed to delete message:", err);
    } finally {
      setDeletingId(null);
    }
  }

  const formattedDates = useMemo(
    () => Object.fromEntries(messages.map((m) => [m.id, formatDate(m.created_at)])),
    [messages],
  );

  return (
    <main className="admin-contact">
      <SectionHeader
        title="Contact Messages"
        action={
          <Link to="/admin" className="btn btn--ghost">
            Back to admin
          </Link>
        }
        className="admin-contact__header"
      />

      {loading ? (
        <p>Loading messages...</p>
      ) : error ? (
        <p>{error}</p>
      ) : messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <>
          <section className="admin-contact__mobile-list" aria-label="Contact messages list">
            {messages.map((msg) => (
              <AdminContactMessagesMobileCard
                key={msg.id}
                senderEmail={msg.senderEmail}
                subject={msg.contactmessage_subject}
                message={msg.contactmessage_message}
                date={formattedDates[msg.id]}
                onDelete={() => handleDelete(msg.id)}
                deleting={deletingId === msg.id}
              />
            ))}
          </section>

          <AdminContactMessagesTable
            messages={messages}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        </>
      )}
    </main>
  );
}
