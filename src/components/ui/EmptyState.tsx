import type { ReactNode } from "react";
import styles from "./EmptyState.module.css";

/** Props for the reusable empty state panel. */
type EmptyStateProps = {
  title?: string;
  message: string;
  action?: ReactNode;
  className?: string;
  titleClassName?: string;
  messageClassName?: string;
};

/** Merge multiple class names into a single string. */
function mergeClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Centered empty state with optional title and action content. */
export default function EmptyState({
  title,
  message,
  action,
  className,
  titleClassName,
  messageClassName,
}: EmptyStateProps) {
  return (
    <div className={mergeClasses(styles.emptyState, className)}>
      {title ? <h2 className={mergeClasses(styles.title, titleClassName)}>{title}</h2> : null}
      <p className={mergeClasses(styles.message, messageClassName)}>{message}</p>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
