import Link from "next/link";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>404</h1>
      <p className={styles.message}>
        This page does not exist. Check the URL or head back to the home page.
      </p>
      <Link href="/" className={styles.homeLink}>
        <div className={styles.homeButton}>
          <p className={styles.homeButtonText}>Back to Home</p>
        </div>
      </Link>
    </div>
  );
}
