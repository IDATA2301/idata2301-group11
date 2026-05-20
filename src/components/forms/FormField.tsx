import type { ReactNode } from "react";
import styles from "./FormPrimitives.module.css";

/** Props for a labeled form field wrapper. */
type FormFieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
};

/** Merge multiple class names into a single string. */
function mergeClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Shared wrapper that renders a label and its form control. */
export default function FormField({
  id,
  label,
  children,
  className,
  labelClassName,
}: FormFieldProps) {
  return (
    <div className={mergeClasses(styles.field, className)}>
      <label htmlFor={id} className={mergeClasses(styles.label, labelClassName)}>
        {label}
      </label>
      {children}
    </div>
  );
}
