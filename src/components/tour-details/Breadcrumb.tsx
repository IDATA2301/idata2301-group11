import styles from "./Breadcrumb.module.css";

type BreadcrumbProps = {
  city: string;
  country: string;
};

export default function Breadcrumb({ city, country }: BreadcrumbProps) {
  return (
    <nav className={styles.breadcrumb}>
      <p className={styles.text}>
        Home {">"} Trips {">"} {city}, {country}
      </p>
    </nav>
  );
}
