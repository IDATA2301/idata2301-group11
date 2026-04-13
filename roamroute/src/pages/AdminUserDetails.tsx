import { Link, useParams } from "react-router-dom";
import { adminUsers } from "../data/adminUsers";
import { userBookings } from "../data/userBookings";
import "../assets/styles/pages/adminuserdetails.css";
import BaseCard from "../components/ui/BaseCard";
import EmptyState from "../components/ui/EmptyState";
import SectionHeader from "../components/ui/SectionHeader";
import StatusBadge from "../components/ui/StatusBadge";

export default function AdminUserDetails() {
  const { id } = useParams();
  const userId = Number(id);
  const user = adminUsers.find((entry) => entry.id === userId);

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

      <BaseCard as="section" className="admin-user-details__card" aria-label="Selected user details">
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Username:</strong> {user.user_name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.user_role}
        </p>
        <p>
          <strong>Address:</strong> {user.user_address}
        </p>
        <p>
          <strong>Country:</strong> {user.user_country}
        </p>
      </BaseCard>

      <section className="admin-user-details__bookings" aria-label="User bookings">
        <h2>Bookings</h2>
        {userBookings.filter((booking) => booking.user_id === userId).length === 0 ? (
          <EmptyState message="No bookings yet." />
        ) : (
          <div className="admin-user-details__bookings-list">
            {userBookings
              .filter((booking) => booking.user_id === userId)
              .map((booking) => (
                <BaseCard key={booking.order_id} className="admin-user-details__booking-card">
                  <p>
                    <strong>Order ID:</strong> {booking.order_id}
                  </p>
                  <p>
                    <strong>Trip Name:</strong> {booking.trip_name}
                  </p>
                  <p>
                    <strong>Flight:</strong> {booking.flight}
                  </p>
                  <p>
                    <strong>Hotel:</strong> {booking.hotel}
                  </p>
                  <p>
                    <strong>Price:</strong> ${booking.price}
                  </p>
                  <p>
                    <strong>Date:</strong> {booking.date}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <StatusBadge status={booking.status} />
                  </p>
                </BaseCard>
              ))}
          </div>
        )}
      </section>
    </main>
  );
}
