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
 * Fetches all applicant data once and passes filtered subsets to each table.
 *
 * @module AdminPage
 */
"use client";

import { useCallback, useEffect, useState } from "react";

import { getAllApplicants } from "../../api/applicant";

import styles from "./adminPage.module.css";
import { AdminHeader } from "./components/AdminHeader";
import { ApplicationTable } from "./components/ApplicationTable";

import type { Applicant } from "../../api/applicant";

export default function AdminPage() {
  // Shared search query used to filter both tables simultaneously.
  const [searchQuery, setSearchQuery] = useState("");

  // All applicants fetched from the backend (single source of truth).
  const [allApplicants, setAllApplicants] = useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplicants = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const result = await getAllApplicants();
    if (result.success) {
      const data = Array.isArray(result.data) ? result.data : result.data.data;
      setAllApplicants(data);
    } else {
      setError(typeof result.error === "string" ? result.error : "Failed to load applicants");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void fetchApplicants();
  }, [fetchApplicants]);

  /** Called by either table after a successful complete/incomplete toggle. */
  const handleCompleteToggle = useCallback(() => {
    void fetchApplicants();
  }, [fetchApplicants]);

  // Filter once, pass down.
  const newApplicants = allApplicants.filter((a) => !a.isCompleted);
  const completedApplicants = allApplicants.filter((a) => a.isCompleted);

  return (
    <div className={styles.scrollViewport}>
      <main className={styles.mainContent}>
        {/* TODO: Replace hardcoded name with actual logged-in admin's name once auth is set up. */}
        <AdminHeader name="DeQuan" searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <ApplicationTable
          title="New Applications"
          globalFilter={searchQuery}
          applicantData={newApplicants}
          isLoading={isLoading}
          error={error}
          onCompleteToggle={handleCompleteToggle}
        />
        <ApplicationTable
          title="Completed Applications"
          isCompleted
          globalFilter={searchQuery}
          applicantData={completedApplicants}
          isLoading={isLoading}
          error={error}
          onCompleteToggle={handleCompleteToggle}
        />
      </main>
    </div>
  );
}
