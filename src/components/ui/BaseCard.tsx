import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import styles from "./BaseCard.module.css";

/** Props for the polymorphic card container. */
type BaseCardProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/** Merge multiple class names into a single string. */
function mergeClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Shared card surface that can render as different semantic elements. */
export default function BaseCard<T extends ElementType = "div">({
  as,
  children,
  className,
  ...rest
}: BaseCardProps<T>) {
  const Component = as ?? "div";

  return (
    <Component className={mergeClasses(styles.baseCard, className)} {...rest}>
      {children}
    </Component>
  );
}
