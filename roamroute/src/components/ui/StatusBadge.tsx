import styles from "./StatusBadge.module.css";

type StatusBadgeProps = {
  status: "pending" | "confirmed" | "completed" | "cancelled";
  className?: string;
};

function mergeClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return <span className={mergeClasses(styles.badge, styles[status], className)}>{status}</span>;
}
