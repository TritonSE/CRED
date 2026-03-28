/**
 * AdminPage Component
 *
 * Top-level page for the admin dashboard. Manages two application tables:
 *   1. "New Applications" – submissions that still need review.
 *   2. "Completed Applications" – submissions that have been reviewed.
 *
 * Admins can move rows between the two tables (mark as completed / revert)
 * and filter both tables with a shared search query.
 *
 * @module AdminPage
 */
"use client";

import { useCallback, useState } from "react";

import styles from "./adminPage.module.css";
import { AdminHeader } from "./components/AdminHeader";
import { ApplicationTable } from "./components/ApplicationTable";

export default function AdminPage() {
  // Shared search query used to filter both tables simultaneously.
  const [searchQuery, setSearchQuery] = useState("");
  // Incrementing this key triggers both tables to re-fetch from the backend.
  const [refreshKey, setRefreshKey] = useState(0);

  /** Called by either table after a successful complete/incomplete toggle. */
  const handleCompleteToggle = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <div className={styles.scrollViewport}>
      <main className={styles.mainContent}>
        {/* TODO: Replace hardcoded name with actual logged-in admin's name once auth is set up. */}
        <AdminHeader name="DeQuan" searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <ApplicationTable
          title="New Applications"
          globalFilter={searchQuery}
          refreshKey={refreshKey}
          onCompleteToggle={handleCompleteToggle}
        />
        <ApplicationTable
          title="Completed Applications"
          isCompleted
          globalFilter={searchQuery}
          refreshKey={refreshKey}
          onCompleteToggle={handleCompleteToggle}
        />
      </main>
    </div>
  );
}
