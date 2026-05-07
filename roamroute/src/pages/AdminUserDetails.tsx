import { Link, useParams } from "react-router-dom";
import { use, useEffect, useState } from "react";
import "../assets/styles/pages/adminuserdetails.css";
import AdminBookingCard from "../components/admin/AdminBookingCard";
import AdminUserDetailsCard from "../components/admin/AdminUserDetailsCard";
import EmptyState from "../components/ui/EmptyState";
import SectionHeader from "../components/ui/SectionHeader";
import type { User } from "../types/User";
import { apiFetch } from "../services/apiFetch";

export default function AdminUserDetails() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    apiFetch(`http://localhost:8080/api/admin/users/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched user details:", data);
        setUser(data);
      })
      .catch(err => console.error("Error fetching user details:", err));

    apiFetch(`http://localhost:8080/api/admin/users/${id}/orders`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched user bookings:", data);
        setBookings(data);
      })
      .catch(err => console.error("Error fetching user bookings:", err));
  }, [id]);

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <main className="admin-user-details">
      <SectionHeader
        title="User Details"
        action={
          <Link to="/admin/users" className="btn">
            Back to users
          </Link>
        }
        className="admin-user-details__header"
      />

      <AdminUserDetailsCard user={user} />

      <section className="admin-user-details__bookings" aria-label="User bookings">
        <h2>Bookings</h2>
        {bookings.length === 0 ? (
          <EmptyState message="No bookings yet." />
        ) : (
          <div className="admin-user-details__bookings-list">
            {bookings.map((booking) => (
              <AdminBookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
