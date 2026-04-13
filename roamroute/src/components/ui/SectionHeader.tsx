import type { ReactNode } from "react";
import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  action?: ReactNode;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  eyebrowClassName?: string;
  actionClassName?: string;
  headingTag?: "h1" | "h2" | "h3";
};

function mergeClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function SectionHeader({
  title,
  description,
  eyebrow,
  action,
  className,
  contentClassName,
  titleClassName,
  descriptionClassName,
  eyebrowClassName,
  actionClassName,
  headingTag = "h1",
}: SectionHeaderProps) {
  const Heading = headingTag;

  return (
    <section className={mergeClasses(action ? styles.rootWithAction : undefined, className)}>
      <div className={mergeClasses(styles.content, contentClassName)}>
        {eyebrow ? <p className={eyebrowClassName}>{eyebrow}</p> : null}
        <Heading className={titleClassName}>{title}</Heading>
        {description ? <p className={descriptionClassName}>{description}</p> : null}
      </div>
      {action ? <div className={mergeClasses(styles.action, actionClassName)}>{action}</div> : null}
    </section>
  );
}
