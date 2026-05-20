import BaseCard from "../ui/BaseCard";
import styles from "./AdminUsersTable.module.css";

/** Row data shown in the admin users table. */
export type AdminUserRow = {
  id: number;
  user_name: string;
  email: string;
  user_role: string;
};

type AdminUsersTableProps = {
  users: AdminUserRow[];
  onRowClick: (id: number) => void;
};

/** Desktop users table for the admin users overview. */
export default function AdminUsersTable({ users, onRowClick }: AdminUsersTableProps) {
  return (
    <BaseCard as="section" className={styles.tableWrap} aria-label="Users table">
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={styles.row} onClick={() => onRowClick(user.id)}>
              <td>{user.id}</td>
              <td>{user.user_name}</td>
              <td>{user.email}</td>
              <td>{user.user_role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </BaseCard>
  );
}
