import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { apiFetch } from "../../services/apiFetch";
import type { User } from "../../types/User";
import BaseCard from "../ui/BaseCard";
import styles from "./AdminUserDetailsCard.module.css";

type AdminUserDetailsCardProps = {
  user: User;
  onRoleUpdated: (newRole: string) => void;
};

/** Displays the selected user's details and supports admin role updates. */
export default function AdminUserDetailsCard({ user, onRoleUpdated }: AdminUserDetailsCardProps) {
  const [successMessage, setSuccessMessage] = useState("");
  const { authUser } = useAuth();
  const isCurrentUser = authUser?.id === user.id;

  async function handleRoleChange(newRole: string) {
    if (!newRole) return;
    try {
      const res = await apiFetch(`/admin/users/${user.id}/role`, {
        method: "PUT",
        body: JSON.stringify({ role: newRole }),
      });
      if (!res.ok) throw new Error("Failed to update user role");
      onRoleUpdated(newRole);
      setSuccessMessage("Role updated.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error updating user role:", err);
      alert("Failed to update user role.");
    }
  }

  return (
    <BaseCard as="section" className={styles.card} aria-label="User details">
      <div className={styles.fields}>
        <span className={styles.label}>Username</span>
        <span className={styles.value}>{user.user_name}</span>

        <span className={styles.label}>Email</span>
        <span className={styles.value}>{user.email}</span>

        <span className={styles.label}>Role</span>
        <div className={styles.roleRow}>
          <span className={styles.value}>{user.user_role}</span>
          {isCurrentUser ? (
            <span className={styles.selfRoleMessage}>You cannot change your own role</span>
          ) : (
            <>
              <select
                defaultValue=""
                onChange={(e) => handleRoleChange(e.target.value)}
                className={styles.roleSelect}
              >
                <option value="" disabled>Change role</option>
                {user.user_role !== "USER" && <option value="USER">USER</option>}
                {user.user_role !== "ADMIN" && <option value="ADMIN">ADMIN</option>}
              </select>
              {successMessage && <span className={styles.successMessage}>{successMessage}</span>}
            </>
          )}
        </div>
      </div>
    </BaseCard>
  );
}
