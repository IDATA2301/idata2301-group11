import type { ComponentType, ReactNode, SVGProps } from "react";
import styles from "./ContactInfoItem.module.css";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type ContactInfoItemProps = {
  icon: IconComponent;
  children: ReactNode;
};

export default function ContactInfoItem({ icon: IconComponent, children }: ContactInfoItemProps) {
  return (
    <p className={styles.item}>
      <IconComponent className={styles.icon} />
      <b>{children}</b>
    </p>
  );
}
