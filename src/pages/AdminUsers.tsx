import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../assets/styles/pages/admintripedit.css";
import SectionHeader from "../components/ui/SectionHeader";
import { apiFetch } from "../services/apiFetch";

type AdminUserRow = {
  id: number;
  user_name: string;
  email: string;
  user_role: string;
};

/** Admin page for browsing users. */
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
    <main className="admin-trip-edit">
      <SectionHeader
        title="Users"
        action={
          <Link to="/admin" className="btn btn--ghost">
            Back to admin
          </Link>
        }
        className="admin-trip-edit__header"
      />

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="admin-trip-edit__table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.user_name}</td>
                <td>{user.email}</td>
                <td>{user.user_role}</td>
                <td className="admin-trip-edit__row-actions">
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => navigate(`/admin/users/${user.id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
