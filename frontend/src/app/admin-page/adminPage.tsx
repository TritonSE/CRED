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

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { getAllApplicants } from "../../api/applicant";

import styles from "./adminPage.module.css";
import { AdminHeader } from "./components/AdminHeader";
import { ApplicationTable } from "./components/ApplicationTable";
import { FilterSearchTab } from "./components/FilterSearchTab";
import { SuccessAlert } from "./components/SuccessAlert";
import alertStyles from "./components/SuccessAlert.module.css";
import { MOCK_APPLICANTS } from "./mockApplicants";

import type { DashboardTab } from "./components/FilterSearchTab";
import type { Applicant } from "../../api/applicant";

type SuccessAlertItem = {
  id: string;
  message: string;
};

export default function AdminPage() {
  // Shared search query used to filter both tables simultaneously.
  const [searchQuery, setSearchQuery] = useState("");
  // Active filter tab — drives which table(s) are visible.
  const [activeTab, setActiveTab] = useState<DashboardTab>("All");

  // All applicants fetched from the backend (single source of truth).
  const [allApplicants, setAllApplicants] = useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successAlerts, setSuccessAlerts] = useState<SuccessAlertItem[]>([]);
  // True when the dashboard is rendering offline mock data instead of live API
  // results. Triggered only in development after a failed fetch so designers/
  // developers can preview the V2 layout without a running backend.
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  const fetchApplicants = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const result = await getAllApplicants();
    if (result.success) {
      const data = Array.isArray(result.data) ? result.data : result.data.data;
      setAllApplicants(data);
      setIsUsingMockData(false);
    } else if (process.env.NODE_ENV === "development") {
      console.warn(
        "[admin-page] Backend fetch failed; falling back to MOCK_APPLICANTS for local preview.",
        result.error,
      );
      setAllApplicants(MOCK_APPLICANTS);
      setIsUsingMockData(true);
    } else {
      setError(typeof result.error === "string" ? result.error : "Failed to load applicants");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void fetchApplicants();
  }, [fetchApplicants]);

  /**
   * Called by either table after a successful complete/incomplete toggle.
   * In mock mode the parent already received the mutation via
   * `onMockApplicantChange`, so skip the re-fetch which would clobber it.
   */
  const handleCompleteToggle = useCallback(() => {
    if (isUsingMockData) return;
    void fetchApplicants();
  }, [fetchApplicants, isUsingMockData]);

  /**
   * Mock-mode mutation channel. Replaces the matching applicant in the
   * single-source-of-truth `allApplicants` so the derived New / Completed
   * splits re-filter correctly (rows move between tables on Mark Complete,
   * status pills update when to-dos are toggled, etc.).
   */
  const handleMockApplicantChange = useCallback((updated: Applicant) => {
    setAllApplicants((prev) => prev.map((a) => (a._id === updated._id ? updated : a)));
  }, []);

  /**
   * Mock-mode delete channel. Drops the applicant from the single source of
   * truth so the row disappears from whichever table it was rendered in.
   */
  const handleMockApplicantDelete = useCallback((id: string) => {
    setAllApplicants((prev) => prev.filter((a) => a._id !== id));
  }, []);

  const alertRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const previousAlertPositions = useRef<Record<string, DOMRect | undefined>>({});

  useLayoutEffect(() => {
    const nextPositions: Record<string, DOMRect> = {};

    Object.entries(alertRefs.current).forEach(([id, element]) => {
      if (element) {
        nextPositions[id] = element.getBoundingClientRect();
      }
    });

    Object.entries(nextPositions).forEach(([id, nextRect]) => {
      const previousRect = previousAlertPositions.current[id];
      if (!previousRect) return;

      const deltaY = previousRect.top - nextRect.top;
      if (!deltaY) return;

      const element = alertRefs.current[id];
      if (!element) return;

      element.style.transform = "translateY(" + deltaY.toString() + "px)";
      element.style.transition = "transform 0s";

      requestAnimationFrame(() => {
        if (!element) return;
        element.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
        element.style.transform = "translateY(0)";
      });
    });

    previousAlertPositions.current = nextPositions;
  }, [successAlerts]);

  const addSuccessAlert = useCallback((message: string) => {
    setSuccessAlerts((prev) => [
      { id: Date.now().toString() + "-" + Math.random().toString(36).slice(2), message },
      ...prev,
    ]);
  }, []);

  const removeSuccessAlert = useCallback((id: string) => {
    setSuccessAlerts((prev) => prev.filter((alert) => alert.id !== id));
    alertRefs.current[id] = null;
    previousAlertPositions.current[id] = undefined;
  }, []);

  // Filter once, pass down.
  const newApplicants = allApplicants.filter((a) => !a.isCompleted);
  const completedApplicants = allApplicants.filter((a) => a.isCompleted);

  const showNew = activeTab === "All" || activeTab === "New";
  const showCompleted = activeTab === "All" || activeTab === "Completed";

  return (
    <div className={styles.scrollViewport}>
      <main className={styles.mainContent}>
        {/* TODO: Replace hardcoded name with actual logged-in admin's name once auth is set up. */}
        <AdminHeader name="DeQuan" />
        <FilterSearchTab
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        {showNew && (
          <ApplicationTable
            title="New Applications"
            globalFilter={searchQuery}
            applicantData={newApplicants}
            isLoading={isLoading}
            error={error}
            onCompleteToggle={handleCompleteToggle}
            setSuccessAlert={addSuccessAlert}
            mockMode={isUsingMockData}
            onMockApplicantChange={handleMockApplicantChange}
            onMockApplicantDelete={handleMockApplicantDelete}
          />
        )}
        {showCompleted && (
          <ApplicationTable
            title="Completed Applications"
            isCompleted
            globalFilter={searchQuery}
            applicantData={completedApplicants}
            isLoading={isLoading}
            error={error}
            onCompleteToggle={handleCompleteToggle}
            setSuccessAlert={addSuccessAlert}
            mockMode={isUsingMockData}
            onMockApplicantChange={handleMockApplicantChange}
            onMockApplicantDelete={handleMockApplicantDelete}
          />
        )}
      </main>
      {successAlerts.length > 0 && (
        <div className={alertStyles.stack}>
          {successAlerts.map((alert) => (
            <div
              key={alert.id}
              className={alertStyles.stackItem}
              ref={(node) => {
                if (node) {
                  alertRefs.current[alert.id] = node;
                } else {
                  alertRefs.current[alert.id] = null;
                }
              }}
            >
              <SuccessAlert
                message={alert.message}
                onClose={() => {
                  removeSuccessAlert(alert.id);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
