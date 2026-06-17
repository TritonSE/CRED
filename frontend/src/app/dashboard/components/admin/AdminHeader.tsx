/**
 * AdminHeader Component
 *
 * Displays the welcome heading row of the admin dashboard.
 * Search and filter tabs are rendered separately by FilterSearchTab to match
 * the V2 Hifi Prototype layout (Welcome row → Filter+Search row → tables).
 *
 * @module AdminHeader
 */

import styles from "./AdminHeader.module.css";

export type HeaderProps = {
  name: string;
};

export const AdminHeader = function AdminHeader({ name }: HeaderProps) {
  return (
    <div className={styles.flexContainer}>
      <div className={styles.headerColumn}>
        <h1 className={styles.headingStyle}>Welcome, {name}</h1>
      </div>
    </div>
  );
};
