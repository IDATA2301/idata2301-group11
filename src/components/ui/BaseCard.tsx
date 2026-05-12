import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import styles from "./BaseCard.module.css";

type BaseCardProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

function mergeClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

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
