import { Link } from "react-router-dom";
import "../assets/styles/pages/admin.css";
import BaseCard from "../components/ui/BaseCard";
import SectionHeader from "../components/ui/SectionHeader";

export default function Admin() {
  return (
    <main className="admin-dashboard">
      <SectionHeader
        title="Admin Dashboard"
        eyebrow="Administration"
        description="Manage users and keep the platform organized from one place."
        className="admin-dashboard__header"
        eyebrowClassName="admin-dashboard__eyebrow"
        descriptionClassName="admin-dashboard__description"
      />

      <section className="admin-dashboard__cards" aria-label="Admin actions">
        <BaseCard as="article" className="admin-dashboard__card">
          <h2>Users</h2>
          <p>View all registered users and check key account details.</p>
          <Link to="/admin/users" className="btn">
            View all users
          </Link>
        </BaseCard>
      </section>
    </main>
  );
}
