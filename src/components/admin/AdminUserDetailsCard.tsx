import { apiFetch } from "../../services/apiFetch";
import type { User } from "../../types/User";
import BaseCard from "../ui/BaseCard";
import styles from "./AdminUserDetailsCard.module.css";
import { useState } from "react";
import { useAuth } from "../../context/useAuth";

/** Props for the admin user details card. */
type AdminUserDetailsCardProps = {
  user: User;
  onRoleUpdated: (newRole: string) => void;
};

/** Displays the selected user's details and supports admin role updates. */
export default function AdminUserDetailsCard({ user, onRoleUpdated }: AdminUserDetailsCardProps) {
  const [selectedRole, setSelectedRole] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { authUser } = useAuth();
  const isCurrentUser = authUser?.id === user.id;

  async function handleRoleChange(newRole: string) {
    try {
      const res = await apiFetch(`/admin/users/${user.id}/role`, {
        method: "PUT",
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) {
        throw new Error("Failed to update user role");
      }

      onRoleUpdated(newRole);
      setSelectedRole("");
      setSuccessMessage("User role updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); 
    } catch (err) {
      console.error("Error updating user role:", err);
      alert("Failed to update user role.");
    }
  }

  return (
    <BaseCard as="section" className={styles.card} aria-label="Selected user details">
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Username:</strong> {user.user_name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <div className={styles.roleRow}>
        <p>
          <strong>Role:</strong> {user.user_role}
        </p>

        {isCurrentUser ? (
          <p className={styles.selfRoleMessage}>(You cannot change your own role)</p>
        ) : (
        <div className = {styles.roleControls}>

          <select
            value={selectedRole}
            onChange={(e) => {
              handleRoleChange(e.target.value);
              setSelectedRole(e.target.value);
            }}
            className={styles.roleSelect}
          >

            <option value="" disabled>
              Change user role
            </option>
            {user.user_role !== "USER" && (
              <option value="USER">USER</option>
            )}
            {user.user_role !== "ADMIN" && (
              <option value="ADMIN">ADMIN</option>
            )}
          </select>
          {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        </div>
        )}
      </div>
    </BaseCard>
  );
}
