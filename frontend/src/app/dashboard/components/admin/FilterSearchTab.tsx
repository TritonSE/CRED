"use client";

import { Search } from "@tritonse/tse-constellation";

import styles from "./FilterSearchTab.module.css";

export type DashboardTab = "All" | "New" | "Completed";

export const DASHBOARD_TABS: readonly DashboardTab[] = ["All", "New", "Completed"] as const;

export type FilterSearchTabProps = {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export function FilterSearchTab({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
}: FilterSearchTabProps) {
  return (
    <div className={styles.container}>
      <div className={styles.tabs} role="tablist" aria-label="Application filter">
        {DASHBOARD_TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
              onClick={() => {
                onTabChange(tab);
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>
      <div className={styles.searchColumn}>
        <Search
          placeholder="Search all applications"
          value={searchQuery}
          onChange={(query) => {
            onSearchChange(query);
          }}
          className={styles.searchBar}
        />
      </div>
    </div>
  );
}
