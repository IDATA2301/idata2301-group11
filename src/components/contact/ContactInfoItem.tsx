import type { ComponentType, ReactNode, SVGProps } from "react";
import styles from "./ContactInfoItem.module.css";

/** Reusable SVG icon type for contact info items. */
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Props for a single contact information row. */
type ContactInfoItemProps = {
  icon: IconComponent;
  children: ReactNode;
};

/** Presentational contact info item with an icon and highlighted text. */
export default function ContactInfoItem({ icon: IconComponent, children }: ContactInfoItemProps) {
  return (
    <p className={styles.item}>
      <IconComponent className={styles.icon} />
      <b>{children}</b>
    </p>
  );
}
