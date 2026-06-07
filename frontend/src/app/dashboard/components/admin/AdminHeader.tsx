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
