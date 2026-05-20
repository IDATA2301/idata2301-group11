import styles from "./Breadcrumb.module.css";

/** Props for the tour breadcrumb navigation. */
type BreadcrumbProps = {
  city: string;
  country: string;
};

/** Simple breadcrumb trail for the tour details page. */
export default function Breadcrumb({ city, country }: BreadcrumbProps) {
  return (
    <nav className={styles.breadcrumb}>
      <p className={styles.text}>
        Home {">"} Trips {">"} {city}, {country}
      </p>
    </nav>
  );
}
