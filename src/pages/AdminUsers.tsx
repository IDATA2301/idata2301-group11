import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../assets/styles/pages/admintripedit.css";
import SectionHeader from "../components/ui/SectionHeader";
import { apiFetch } from "../services/apiFetch";

type AdminUserRow = {
  id: number;
  username: string;
  email: string;
  user_role: string;
};

/** Admin page for browsing users. */
export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  useEffect(() => {
    apiFetch("/admin/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(user: AdminUserRow) {
    if (!window.confirm(`Delete user "${user.username || user.email}"?`)) return;
    setBusyId(user.id);
    try {
      const res = await apiFetch(`/admin/users/${user.id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) throw new Error("Failed to delete user");
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete user.");
    } finally {
      setBusyId(null);
    }
  }

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

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>{error}</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="admin-trip-edit__table-wrap">
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
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.user_role}</td>
                <td className="admin-trip-edit__row-actions">
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => navigate(`/admin/users/${user.id}`)}
                    disabled={busyId === user.id}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="btn btn--danger"
                    onClick={() => handleDelete(user)}
                    disabled={busyId === user.id}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </main>
  );
}
