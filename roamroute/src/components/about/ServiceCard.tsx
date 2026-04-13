import type { ComponentType, SVGProps } from "react";
import styles from "./ServiceCard.module.css";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type ServiceCardProps = {
  title: string;
  description: string;
  icon: IconComponent;
};

export default function ServiceCard({ title, description, icon: IconComponent }: ServiceCardProps) {
  return (
    <div className={styles.serviceItem}>
      <IconComponent width={32} height={32} color="var(--color-primary)" />

      <div className={styles.serviceContent}>
        <h3 className={styles.serviceTitle}>{title}</h3>
        <p className={styles.serviceDescription}>{description}</p>
      </div>
    </div>
  );
}
