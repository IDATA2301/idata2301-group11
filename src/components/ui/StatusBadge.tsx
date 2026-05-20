import styles from "./StatusBadge.module.css";

/** Allowed booking status values. */
type StatusBadgeProps = {
  status: "pending" | "confirmed" | "completed" | "cancelled";
  className?: string;
};

/** Merge multiple class names into a single string. */
function mergeClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Small status pill used to label booking state. */
export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return <span className={mergeClasses(styles.badge, styles[status], className)}>{status}</span>;
}
