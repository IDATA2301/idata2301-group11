import type { User } from "../../types/User";
import BaseCard from "../ui/BaseCard";
import styles from "./AdminUserDetailsCard.module.css";

type AdminUserDetailsCardProps = {
  user: User;
};

export default function AdminUserDetailsCard({ user }: AdminUserDetailsCardProps) {
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
      <p>
        <strong>Role:</strong> {user.user_role}
      </p>
      <p>
        <strong>Address:</strong> {user.user_address}
      </p>
      <p>
        <strong>Country:</strong> {user.user_country}
      </p>
    </BaseCard>
  );
}
