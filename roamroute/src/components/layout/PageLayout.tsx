import type { ReactNode } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./PageLayout.module.css";

type PageLayoutProps = {
  children: ReactNode;
  hideFooter?: boolean;
};

export default function PageLayout({ children, hideFooter = false }: PageLayoutProps) {
  return (
    <>
      <Header />
      <div className={styles.layoutContainer}>{children}</div>
      {!hideFooter && <Footer />}
    </>
  );
}
