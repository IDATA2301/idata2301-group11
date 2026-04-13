import { Link, useNavigate } from "react-router-dom";
import { adminUsers } from "../data/adminUsers";
import "../assets/styles/pages/adminusers.css";
import BaseCard from "../components/ui/BaseCard";
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
          <BaseCard
            as="button"
            key={user.id}
            type="button"
            className="admin-users__mobile-card"
            onClick={() => navigate(`/admin/users/${user.id}`)}
          >
            <span className="admin-users__mobile-name">{user.user_name}</span>
            <span>{user.email}</span>
            <span>{user.user_role}</span>
          </BaseCard>
        ))}
      </section>

      <BaseCard as="section" className="admin-users__table-wrap" aria-label="Users table">
        <table className="admin-users__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {adminUsers.map((user) => (
              <tr
                key={user.id}
                className="admin-users__row"
                onClick={() => navigate(`/admin/users/${user.id}`)}
              >
                <td>{user.id}</td>
                <td>{user.user_name}</td>
                <td>{user.email}</td>
                <td>{user.user_role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </BaseCard>
    </main>
  );
}
