import { Link } from "react-router-dom";
import "../assets/styles/pages/admin.css";

export default function Admin() {
  return (
    <main className="admin-dashboard">
      <section className="admin-dashboard__header">
        <p className="admin-dashboard__eyebrow">Administration</p>
        <h1>Admin Dashboard</h1>
        <p className="admin-dashboard__description">
          Manage users and keep the platform organized from one place.
        </p>
      </section>

      <section className="admin-dashboard__cards" aria-label="Admin actions">
        <article className="admin-dashboard__card">
          <h2>Users</h2>
          <p>View all registered users and check key account details.</p>
          <Link to="/admin/users" className="btn">
            View all users
          </Link>
        </article>
      </section>
    </main>
  );
}