import { Link, useNavigate } from "react-router-dom";
import { adminUsers } from "../data/adminUsers";
import "../assets/styles/pages/adminusers.css";
import AdminUsersMobileCard from "../components/admin/AdminUsersMobileCard";
import AdminUsersTable from "../components/admin/AdminUsersTable";
import SectionHeader from "../components/ui/SectionHeader";

export default function AdminUsers() {
  const navigate = useNavigate();

  return (
    <main className="admin-users">
      <SectionHeader
        title="Users"
        action={
          <Link to="/admin" className="btn btn--ghost">
            Back to admin
          </Link>
        }
        className="admin-users__header"
      />

      <section className="admin-users__mobile-list" aria-label="Users list">
        {adminUsers.map((user) => (
          <AdminUsersMobileCard
            key={user.id}
            name={user.user_name}
            email={user.email}
            role={user.user_role}
            onClick={() => navigate(`/admin/users/${user.id}`)}
          />
        ))}
      </section>

      <AdminUsersTable users={adminUsers} onRowClick={(id) => navigate(`/admin/users/${id}`)} />
    </main>
  );
}
