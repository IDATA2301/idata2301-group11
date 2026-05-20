import "../assets/styles/pages/admin.css";
import AdminActionCard from "../components/admin/AdminActionCard";
import SectionHeader from "../components/ui/SectionHeader";

/** Admin dashboard landing page with quick links to management areas. */
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
          actionLabel="View"
          to="/admin/users"
        />
        <AdminActionCard
          title="Trips"
          description="Browse all trips and update their details."
          actionLabel="Manage"
          to="/admin/trips"
        />
        <AdminActionCard
          title="Destinations"
          description="Edit cities, countries, and destination imagery used across trips."
          actionLabel="Manage"
          to="/admin/destinations"
        />
        <AdminActionCard
          title="Flights"
          description="Manage the global flight catalog. Changes apply to every trip linked to a flight."
          actionLabel="Manage"
          to="/admin/flights"
        />
        <AdminActionCard
          title="Accommodations"
          description="Manage the global accommodation catalog used by trips."
          actionLabel="Manage"
          to="/admin/accommodations"
        />
      </section>
    </main>
  );
}
