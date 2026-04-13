import "../assets/styles/pages/admin.css";
import AdminActionCard from "../components/admin/AdminActionCard";
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
        <AdminActionCard
          title="Users"
          description="View all registered users and check key account details."
          actionLabel="View all users"
          to="/admin/users"
        />
      </section>
    </main>
  );
}
