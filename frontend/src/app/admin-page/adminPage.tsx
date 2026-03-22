/**
 * AdminPage Component
 *
 * Top-level page for the admin dashboard. Fetches all applicants once from
 * the backend, then manages two application tables:
 *   1. "New Applications" – submissions that still need review.
 *   2. "Completed Applications" – submissions that have been reviewed.
 *
 * Admins can move rows between the two tables (mark as completed / revert)
 * and filter both tables with a shared search query.
 *
 * @module AdminPage
 */
"use client";

import { useEffect, useState } from "react";

import { getAllApplicants } from "../../api/applicant";

import styles from "./adminPage.module.css";
import { AdminHeader } from "./components/AdminHeader";
import { ApplicationTable } from "./components/ApplicationTable";

import type { ApplicationRowData } from "./components/ApplicationTable";
import type { Applicant } from "../../api/applicant";

/** Convert a backend Applicant to the frontend ApplicationRowData shape. */
function toRowData(a: Applicant): ApplicationRowData {
  return {
    clientNumber: a.applicantNumber,
    clientName: a.applicantName,
    dateSubmitted: a.dateSubmitted.toISOString().split("T")[0],
    status: a.status as ApplicationRowData["status"],
    dateOfBirth: a.dateOfBirth.toISOString().split("T")[0],
    race: a.race,
    gender: a.gender,
    address: a.address,
    additionalComments: a.additionalComments,
    aidRequested: a.aidRequested,
    convictionDetails: a.convictionDetails,
    education: a.educationStatus,
    email: a.email,
    employment: a.employmentStatus,
    housingStatus: a.housingStatus,
    notes: a.notes,
    otherAidRequested: a.otherAidRequested,
    phoneNumber: a.phoneNumber,
    todos: a.todos,
  };
}

export default function AdminPage() {
  // Application lists – "new" holds pending reviews, "completed" holds reviewed ones.
  const [newApps, setNewApps] = useState<ApplicationRowData[]>([]);
  const [completedApps, setCompletedApps] = useState<ApplicationRowData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Shared search query used to filter both tables simultaneously.
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all applicants once and split into new/completed lists.
  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError(null);
      const result = await getAllApplicants();
      if (result.success) {
        const rows = Array.isArray(result.data) ? result.data : result.data.data;
        setNewApps(rows.filter((a) => !a.isCompleted).map(toRowData));
        setCompletedApps(rows.filter((a) => a.isCompleted).map(toRowData));
      } else {
        setError(typeof result.error === "string" ? result.error : "Failed to load applicants");
      }
      setIsLoading(false);
    }
    void load();
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

  if (error) {
    return (
      <main className={styles.mainContent}>
        <AdminHeader name="DeQuan" searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <p>Error loading applications: {error}</p>
      </main>
    );
  }

  return (
    <main className={styles.mainContent}>
      <AdminHeader name="DeQuan" searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      {isLoading ? (
        <p>Loading applications…</p>
      ) : (
        <>
          <ApplicationTable
            title="New Applications"
            data={newApps}
            totalApplications={newApps.length}
            onRowMove={moveToCompleted}
            globalFilter={searchQuery}
          />
          <ApplicationTable
            title="Completed Applications"
            data={completedApps}
            totalApplications={completedApps.length}
            onRowMove={moveToNew}
            isCompleted
            globalFilter={searchQuery}
          />
        </>
      )}
    </main>
  );
}
