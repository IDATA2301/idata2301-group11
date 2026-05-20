import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../assets/styles/pages/adminusers.css";
import AdminUsersMobileCard from "../components/admin/AdminUsersMobileCard";
import AdminUsersTable from "../components/admin/AdminUsersTable";
import SectionHeader from "../components/ui/SectionHeader";
import type { AdminUserRow } from "../components/admin/AdminUsersTable";
import { apiFetch } from "../services/apiFetch";

/** Admin page for browsing users in mobile and table layouts. */
export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<AdminUserRow[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    apiFetch("/admin/users", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        console.log("Response status:", res.status);
        return res.json();
      })
      .then(data => {
        console.log("Fetched users:", data);
        console.log("AUTH:", localStorage.getItem("auth"));
        setUsers(data);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

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
        {users.map((user) => (
          <AdminUsersMobileCard
            key={user.id}
            name={user.user_name}
            email={user.email}
            role={user.user_role}
            onClick={() => navigate(`/admin/users/${user.id}`)}
          />
        ))}
      </section>

      <AdminUsersTable users={users} onRowClick={(id) => navigate(`/admin/users/${id}`)} />
    </main>
  );
}
