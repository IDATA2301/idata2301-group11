import type { ComponentType, SVGProps } from "react";
import styles from "./ServiceCard.module.css";

/** Reusable SVG icon type for service cards. */
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Props for rendering a single service highlight card. */
type ServiceCardProps = {
  title: string;
  description: string;
  icon: IconComponent;
};

/**
 * Presentational card used on the About page service grid.
 * Displays an icon, title, and short description.
 */
export default function ServiceCard({
  title,
  description,
  icon: Icon,
}: ServiceCardProps) {
  return (
    <article className={styles.card}>
      <span className={styles.iconBadge} aria-hidden="true">
        <Icon width={24} height={24} />
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  );
}
