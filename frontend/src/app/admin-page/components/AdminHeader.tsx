/**
 * AdminHeader Component
 *
 * Displays the header section of the admin page containing:
 * - A personalized welcome message with the admin's name
 * - A search bar for filtering applications
 *
 * @module AdminHeader
 */

import { Search } from "@tritonse/tse-constellation";
import React from "react";

import styles from "./AdminHeader.module.css";

/**
 * Props for the AdminHeader component
 * @property {string} name - The name of the logged-in admin user to display in the welcome message
 */
export type HeaderProps = {
  name: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
} & React.ComponentProps<"h1">;

/**
 * AdminHeader - Renders the top header section of the admin dashboard
 *
 * @param {HeaderProps} props - Component props
 * @param {string} props.name - Admin user's name for personalized greeting
 * @returns {JSX.Element} Header with welcome message and search functionality
 */
export const AdminHeader = function AdminHeader({
  name,
  searchQuery,
  onSearchChange,
}: HeaderProps & { ref?: React.RefObject<HTMLHeadingElement | null> }) {
  return (
    <div className={styles.flexContainer}>
      {/* Welcome message section */}
      <div className={styles.headerColumn}>
        <h1 className={styles.headingStyle}>Welcome, {name}</h1>
      </div>

      {/* Search bar section for filtering applications */}
      <div className={styles.searchColumn}>
        <Search
          placeholder="Search all applications"
          value={searchQuery}
          onChange={(query) => onSearchChange?.(query)}
        />
      </div>
    </div>
  );
};
