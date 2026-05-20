import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/pages/admintripedit.css";
import "../assets/styles/pages/adminmessages.css";
import Modal from "../components/ui/Modal";
import SectionHeader from "../components/ui/SectionHeader";
import {
  deleteContactMessage,
  fetchContactMessages,
  type ContactMessage,
} from "../services/contactMessages";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatDate(value: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return dateFormatter.format(date);
}

function snippet(text: string, max = 90): string {
  if (!text) return "";
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

/** Admin inbox for contact form submissions. */
export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchContactMessages()
      .then((data) => { if (!cancelled) setMessages(data); })
      .catch((err) => { if (!cancelled) setLoadError(err instanceof Error ? err.message : "Failed to load messages"); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  async function handleDelete(msg: ContactMessage) {
    setBusyId(msg.id);
    try {
      await deleteContactMessage(msg.id);
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
      setSelected(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete message.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <main className="admin-trip-edit">
      <SectionHeader
        title="Messages"
        action={
          <Link to="/admin" className="btn btn--ghost">
            Back to admin
          </Link>
        }
        className="admin-trip-edit__header"
      />

      {loading ? (
        <p>Loading messages...</p>
      ) : loadError ? (
        <p>{loadError}</p>
      ) : messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul className="msg-list" role="list">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className="msg-list__item"
              role="button"
              tabIndex={0}
              onClick={() => setSelected(msg)}
              onKeyDown={(e) => e.key === "Enter" && setSelected(msg)}
            >
              <div className="msg-list__from">{msg.senderEmail}</div>
              <div className="msg-list__middle">
                <span className="msg-list__subject">{msg.contactmessage_subject}</span>
                <span className="msg-list__sep" aria-hidden>—</span>
                <span className="msg-list__snippet">{snippet(msg.contactmessage_message)}</span>
              </div>
              <div className="msg-list__date">{formatDate(msg.created_at)}</div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        open={!!selected}
        title={selected?.contactmessage_subject ?? "Message"}
        onClose={() => setSelected(null)}
        size="lg"
        footer={
          selected ? (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                className="btn btn--danger"
                onClick={() => handleDelete(selected)}
                disabled={busyId === selected.id}
              >
                Delete
              </button>
            </div>
          ) : null
        }
      >
        {selected && (
          <div className="msg-detail">
            <div className="msg-detail__meta">
              <div className="msg-detail__row">
                <span className="msg-detail__label">From</span>
                <span className="msg-detail__value">{selected.senderEmail}</span>
              </div>
              <div className="msg-detail__row">
                <span className="msg-detail__label">Subject</span>
                <span className="msg-detail__value">{selected.contactmessage_subject}</span>
              </div>
              <div className="msg-detail__row">
                <span className="msg-detail__label">Date</span>
                <span className="msg-detail__value">{formatDate(selected.created_at)}</span>
              </div>
            </div>
            <hr className="msg-detail__hr" />
            <p className="msg-detail__body">{selected.contactmessage_message}</p>
          </div>
        )}
      </Modal>
    </main>
  );
}
