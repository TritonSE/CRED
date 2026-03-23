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

import type { ApplicationRowData } from "./components/ApplicationTable";
const ipData: ApplicationRowData[] = [];
const comData: ApplicationRowData[] = [];

export default function AdminPage() {
  // Application lists – "new" holds pending reviews, "completed" holds reviewed ones.
  const [newApps, setNewApps] = useState<ApplicationRowData[]>(ipData);
  const [completedApps, setCompletedApps] = useState<ApplicationRowData[]>(comData);
  // Shared search query used to filter both tables simultaneously.
  const [searchQuery, setSearchQuery] = useState("");
  // Incrementing this key triggers both tables to re-fetch from the backend.
  const [refreshKey, setRefreshKey] = useState(0);

  /** Called by either table after a successful complete/incomplete toggle. */
  const handleCompleteToggle = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  /** Move a row from the "new" table to "completed" */
  const moveToCompleted = (index: number) => {
    const row = newApps[index];
    setNewApps((prev) => prev.filter((_, i) => i !== index));
    setCompletedApps((prev) => [{ ...row, status: "Reviewed" }, ...prev]);
  };

  /** Move a row from the "completed" table back to "new" */
  const moveToNew = (index: number) => {
    const row = completedApps[index];
    setCompletedApps((prev) => prev.filter((_, i) => i !== index));
    setNewApps((prev) => [{ ...row, status: "Need to Review" }, ...prev]);
  };

  return (
    <main className={styles.mainContent}>
      <AdminHeader name="DeQuan" searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <ApplicationTable
        title="New Applications"
        onRowMove={moveToCompleted}
        globalFilter={searchQuery}
        refreshKey={refreshKey}
        onCompleteToggle={handleCompleteToggle}
      />
      <ApplicationTable
        title="Completed Applications"
        onRowMove={moveToNew}
        isCompleted
        globalFilter={searchQuery}
        refreshKey={refreshKey}
        onCompleteToggle={handleCompleteToggle}
      />
    </main>
  );
}
