import { Search } from "@tritonse/tse-constellation";
import React from "react";

import styles from "./AdminHeader.module.css";

export type HeaderProps = {
  name: string;
} & React.ComponentProps<"h1">;

export const AdminHeader = function AdminHeader({
  name,
}: HeaderProps & { ref?: React.RefObject<HTMLHeadingElement | null> }) {
  return (
    <div className={styles.flexContainer}>
      <div className={styles.headerColumn}>
        <h1 className={styles.headingStyle}>Welcome, {name}</h1>
      </div>
      <div className={styles.searchColumn}>
        <Search placeholder="Search all applications" />
      </div>
    </div>
  );
};
