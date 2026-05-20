import BaseCard from "../ui/BaseCard";
import styles from "./AdminUsersMobileCard.module.css";

/** Props for the mobile-optimized admin user card. */
type AdminUsersMobileCardProps = {
  name: string;
  email: string;
  role: string;
  onClick: () => void;
};

/** Mobile-friendly user summary card for admin users list. */
export default function AdminUsersMobileCard({
  name,
  email,
  role,
  onClick,
}: AdminUsersMobileCardProps) {
  return (
    <BaseCard as="button" type="button" className={styles.card} onClick={onClick}>
      <span className={styles.name}>{name}</span>
      <span>{email}</span>
      <span>{role}</span>
    </BaseCard>
  );
}
