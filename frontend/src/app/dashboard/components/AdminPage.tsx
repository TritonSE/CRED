"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import styles from "./AdminPage.module.css";
import { AdminHeader } from "./admin/AdminHeader";
import { ApplicationTable } from "./admin/ApplicationTable";
import { FilterSearchTab } from "./admin/FilterSearchTab";
import { SuccessAlert } from "./admin/SuccessAlert";
import alertStyles from "./admin/SuccessAlert.module.css";

import type { DashboardTab } from "./admin/FilterSearchTab";
import type { Applicant } from "@/api/applicant";

import { getAllApplicants } from "@/api/applicant";

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

  const fetchApplicants = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const result = await getAllApplicants();
    if (result.success) {
      setAllApplicants(result.data.data);
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
