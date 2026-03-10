import { Link, useParams } from "react-router-dom";
import { adminUsers } from "../data/adminUsers";
import { userBookings } from "../data/userBookings";
import "../assets/styles/pages/adminuserdetails.css";

export default function AdminUserDetails() {
  const { id } = useParams();
  const userId = Number(id);
  const user = adminUsers.find((entry) => entry.id === userId);

  if (!user) {
    return (
      <main className="admin-user-details">
        <h1>User Not Found</h1>
        <p>Could not find a user with id {id}.</p>
        <Link to="/admin/users" className="btn btn--ghost">
          Back to users
        </Link>
      </main>
    );
  }

  return (
    <main className="admin-user-details">
      <section className="admin-user-details__header">
        <h1>User Details</h1>
        <Link to="/admin/users" className="btn">
          Back to users
        </Link>
      </section>

      <section className="admin-user-details__card" aria-label="Selected user details">
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
      </section>

      <section className="admin-user-details__bookings" aria-label="User bookings">
        <h2>Bookings</h2>
        {userBookings.filter((booking) => booking.user_id === userId).length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <div className="admin-user-details__bookings-list">
            {userBookings
              .filter((booking) => booking.user_id === userId)
              .map((booking) => (
                <div key={booking.order_id} className="admin-user-details__booking-card">
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
                    <span className={`admin-user-details__status admin-user-details__status--${booking.status}`}>
                      {booking.status}
                    </span>
                  </p>
                </div>
              ))}
          </div>
        )}
      </section>
    </main>
  );
}
