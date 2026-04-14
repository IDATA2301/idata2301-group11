import { Link, useParams } from "react-router-dom";
import { adminUsers } from "../data/adminUsers";
import { userBookings } from "../data/userBookings";
import "../assets/styles/pages/adminuserdetails.css";
import AdminBookingCard from "../components/admin/AdminBookingCard";
import AdminUserDetailsCard from "../components/admin/AdminUserDetailsCard";
import EmptyState from "../components/ui/EmptyState";
import SectionHeader from "../components/ui/SectionHeader";

export default function AdminUserDetails() {
  const { id } = useParams();
  const userId = Number(id);
  const user = adminUsers.find((entry) => entry.id === userId);
  const bookings = userBookings.filter((booking) => booking.user_id === userId);

  if (!user) {
    return (
      <main className="admin-user-details">
        <EmptyState
          title="User Not Found"
          message={`Could not find a user with id ${id}.`}
          action={
            <Link to="/admin/users" className="btn btn--ghost">
              Back to users
            </Link>
          }
        />
      </main>
    );
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
              <AdminBookingCard key={booking.order_id} booking={booking} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
