import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../assets/styles/pages/adminuserdetails.css";
import AdminBookingCard from "../components/admin/AdminBookingCard";
import AdminBookingEditModal from "../components/admin/AdminBookingEditModal";
import AdminUserDetailsCard from "../components/admin/AdminUserDetailsCard";
import EmptyState from "../components/ui/EmptyState";
import SectionHeader from "../components/ui/SectionHeader";
import type { AdminUserBookings } from "../types/AdminUserBookings";
import type { User } from "../types/User";
import { apiFetch } from "../services/apiFetch";

/** Admin page for inspecting a user and their bookings. */
export default function AdminUserDetails() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<AdminUserBookings[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editing, setEditing] = useState<AdminUserBookings | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    apiFetch(`/admin/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error("Error fetching user details:", err));

    apiFetch(`/admin/users/${id}/orders`)
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error("Error fetching user bookings:", err));
  }, [id]);

  async function handleDeleteBooking(bookingId: number) {
    if (!window.confirm(`Cancel booking #${bookingId}?`)) return;
    setDeletingId(bookingId);
    try {
      const res = await apiFetch(`/admin/orders/${bookingId}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) throw new Error("Failed to cancel booking");
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to cancel booking.");
    } finally {
      setDeletingId(null);
    }
  }

  function handleBookingSaved(updated: AdminUserBookings) {
    setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <main className="admin-user-details">
      <SectionHeader
        title="User Details"
        action={
          <Link to="/admin/users" className="btn btn--ghost">
            Back to users
          </Link>
        }
        className="admin-user-details__header"
      />

      <AdminUserDetailsCard
        user={user}
        onRoleUpdated={(newRole) => setUser({ ...user, user_role: newRole })}
      />

      <section className="admin-user-details__bookings" aria-label="User bookings">
        <h2>Bookings</h2>
        {bookings.length === 0 ? (
          <EmptyState message="No bookings yet." />
        ) : (
          <div className="admin-user-details__bookings-list">
            {bookings.map((booking) => (
              <AdminBookingCard
                key={booking.id}
                booking={booking}
                onEdit={setEditing}
                onDelete={handleDeleteBooking}
                deleting={deletingId === booking.id}
              />
            ))}
          </div>
        )}
      </section>

      {editing && (
        <AdminBookingEditModal
          booking={editing}
          onClose={() => setEditing(null)}
          onSaved={handleBookingSaved}
        />
      )}
    </main>
  );
}
