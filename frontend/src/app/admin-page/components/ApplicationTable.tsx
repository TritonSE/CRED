/**
 * ApplicationTable Component
 *
 * Displays a collapsible table of client applications with columns for:
 * - Client Number
 * - Client Name
 * - Date Submitted
 * - Status (with color-coded labels)
 * - Actions (checkboxes and menu)
 *
 * Features expandable rows with detailed client information including:
 * - Client Profile
 * - Contact Information
 * - Program Needs & Interests
 * - To-Dos
 * - Notes/History Log
 *
 * @module ApplicationTable
 */
"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { updateApplicant } from "../../../api/applicant";

import styles from "./ApplicationTable.module.css";
import { ExpandedRowContent } from "./ExpandedRowContent";
import { StatusLabel } from "./StatusLabel";

import type { Applicant } from "../../../api/applicant";

/**
 * Data structure for a single application row
 */
export type ApplicationRowData = {
  clientNumber: string;
  clientName: string;
  dateSubmitted: string;
  status: "Reviewed" | "Need to Review" | "Under Review";
  // Extended data for expanded view
  dateOfBirth?: string;
  race?: string;
  gender?: string;
  housingStatus?: string;
  education?: string;
  employment?: string;
  address?: string;
  idDocument?: string;
  cdcrNumber?: string;
  email?: string;
  phoneNumber?: string;
  convictionDetails?: string;
  aidRequested?: string[];
  otherAidRequested?: string;
  additionalComments?: string;
  todos?: { id: string; label: string; completed: boolean }[];
  notes?: { date: string; content: string }[];
};

export type TodoItem = NonNullable<ApplicationRowData["todos"]>[number];

/** Valid applicant status values accepted from the API. */
const STATUS_VALUES: readonly ApplicationRowData["status"][] = [
  "Reviewed",
  "Need to Review",
  "Under Review",
];

/**
 * Narrow a raw status string to a known value. Falls back to "Need to Review"
 * (the backend default) if the API returns something unexpected, so the UI
 * can't crash on bad data.
 */
function parseStatus(raw: string): ApplicationRowData["status"] {
  return (STATUS_VALUES as readonly string[]).includes(raw)
    ? (raw as ApplicationRowData["status"])
    : "Need to Review";
}

/**
 * Props for the ApplicationTable component
 * @property {string} title - The heading displayed above the table
 * @property {ApplicationRowData[]} data - Array of application records to display
 * @property {number} [pageSize] - Number of rows per page (default: 10)
 */
export type ApplicationTableProps = {
  title: string;
  pageSize?: number;
  /** If true, all rows render with their checkbox checked */
  isCompleted?: boolean;
  globalFilter?: string;
  /** Pre-filtered applicant data passed from the parent. */
  applicantData: Applicant[];
  /** True while the parent is fetching data. */
  isLoading?: boolean;
  /** Error message from the parent fetch, if any. */
  error?: string | null;
  /** Called after a successful complete/incomplete toggle so the parent can refresh. */
  onCompleteToggle?: () => void;
  /** Optional callback to show a new status update notification. */
  setSuccessAlert?: (message: string) => void;
};

/**
 * Sort indicator component
 */
function SortIndicator({ isSorted }: { isSorted: false | "asc" | "desc" }) {
  return (
    <span className={styles.sortIndicator}>
      <span className={isSorted === "asc" ? styles.sortActive : styles.sortInactive}>▲</span>
      <span className={isSorted === "desc" ? styles.sortActive : styles.sortInactive}>▼</span>
    </span>
  );
}

/**
 * ApplicationTable - Renders a collapsible data table for applications
 *
 * @param {ApplicationTableProps} props - Component props
 * @param {string} props.title - Section title (e.g., "Pending Applications")
 * @param {ApplicationRowData[]} props.data - Application data to populate the table
 * @param {number} props.pageSize - Number of rows per page
 * @returns {JSX.Element} A collapsible table with application data
 */
export function ApplicationTable({
  title,
  pageSize = 6,
  isCompleted,
  globalFilter = "",
  applicantData,
  isLoading: isLoadingProp = false,
  error: errorProp = null,
  onCompleteToggle,
  setSuccessAlert,
}: ApplicationTableProps) {
  // ── UI state ──────────────────────────────────────────────────────────
  /** Whether the entire table section is collapsed (hidden). */
  const [isCollapsed, setIsCollapsed] = useState(false);
  /** Current column sort direction(s). Managed by @tanstack/react-table. */
  const [sorting, setSorting] = useState<SortingState>([]);
  /** Map of row IDs → whether their expanded detail panel is open. */
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  /** Cached pixel heights of each expanded panel (used for CSS transitions). */
  const [expandedHeights, setExpandedHeights] = useState<Record<string, number>>({});

  // ── Data state ───────────────────────────────────────────────────────
  /** Application rows derived from parent-provided applicant data. */
  const [applications, setApplications] = useState<ApplicationRowData[]>([]);
  /** Persisted to-do state keyed by client number so collapse/expand keeps checkbox state. */
  const [todosByClient, setTodosByClient] = useState<Record<string, TodoItem[]>>({});
  /** Applicant objects from the parent (needed for updateApplicant). */
  const [rawApplicants, setRawApplicants] = useState<Applicant[]>([]);

  /** Refs to expanded-row wrapper divs, keyed by row ID, for height measurement. */
  const expandedRefs = useRef<Record<string, HTMLDivElement | null>>({});

  /** Toggle a row's expanded/collapsed state by its unique row ID. */
  const toggleRowExpanded = (rowId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  /** Convert raw API Applicant objects to table row data. */
  const processApplicants = (rows: Applicant[]) => {
    setRawApplicants(rows);

    const tableRows: ApplicationRowData[] = rows.map((a) => ({
      clientNumber: a.applicantNumber,
      clientName: a.applicantName,
      dateSubmitted: a.dateSubmitted.toLocaleDateString("en-CA"),
      status: parseStatus(a.status),
      dateOfBirth: a.dateOfBirth.toLocaleDateString("en-CA"),
      education: a.educationStatus,
      employment: a.employmentStatus,
      race: a.race,
      gender: a.gender,
      address: a.address,
      additionalComments: a.additionalComments,
      aidRequested: a.aidRequested,
      convictionDetails: a.convictionDetails,
      email: a.email,
      housingStatus: a.housingStatus,
      notes: a.notes,
      otherAidRequested: a.otherAidRequested,
      phoneNumber: a.phoneNumber,
      todos: a.todos,
    }));
    setApplications(tableRows);
  };

  // Process applicant data whenever the parent provides new data.
  useEffect(() => {
    processApplicants(applicantData);
  }, [applicantData]);

  // Seed persisted to-do state for each client from backend data exactly once per client.
  useEffect(() => {
    setTodosByClient((prev) => {
      const next = { ...prev };
      applications.forEach((app) => {
        next[app.clientNumber] ??= app.todos ?? [];
      });
      return next;
    });
  }, [applications]);

  /**
   * Toggle a to-do item for a specific client and persist the change to backend.
   * Uses optimistic UI update, then rolls back if the API call fails.
   */
  const handleToggleTodo = async (clientNumber: string, todoId: string) => {
    const applicant = rawApplicants.find((a) => a.applicantNumber === clientNumber);
    if (!applicant) return;

    const previousTodos = todosByClient[clientNumber] ?? applicant.todos ?? [];
    const updatedTodos = previousTodos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
    );

    // Optimistic update so the checkbox responds immediately.
    setTodosByClient((prev) => ({
      ...prev,
      [clientNumber]: updatedTodos,
    }));

    const result = await updateApplicant({
      _id: applicant._id,
      applicantNumber: applicant.applicantNumber,
      applicantName: applicant.applicantName,
      dateSubmitted: applicant.dateSubmitted,
      status: applicant.status,
      dateOfBirth: applicant.dateOfBirth,
      race: applicant.race,
      gender: applicant.gender,
      email: applicant.email,
      address: applicant.address,
      phoneNumber: applicant.phoneNumber,
      housingStatus: applicant.housingStatus,
      educationStatus: applicant.educationStatus,
      employmentStatus: applicant.employmentStatus,
      convictionDetails: applicant.convictionDetails,
      aidRequested: applicant.aidRequested,
      otherAidRequested: applicant.otherAidRequested,
      additionalComments: applicant.additionalComments,
      todos: updatedTodos,
      notes: applicant.notes,
      isCompleted: applicant.isCompleted,
    });

    if (!result.success) {
      // Revert optimistic UI update if persistence fails.
      setTodosByClient((prev) => ({
        ...prev,
        [clientNumber]: previousTodos,
      }));
      alert(
        "Failed to update to-do status. Please try again. Error: " +
          (typeof result.error === "string" ? result.error : "Unknown error"),
      );
      console.error("Failed to update applicant todos:", result.error);
      return;
    }

    // Keep local applicant snapshots consistent with the persisted todos.
    setRawApplicants((prev) =>
      prev.map((a) =>
        a.applicantNumber === clientNumber
          ? {
              ...a,
              todos: updatedTodos,
            }
          : a,
      ),
    );
    setApplications((prev) =>
      prev.map((a) =>
        a.clientNumber === clientNumber
          ? {
              ...a,
              todos: updatedTodos,
            }
          : a,
      ),
    );
  };

  /**
   * Toggle `isCompleted` for the applicant at the given row index.
   * Calls `updateApplicant` to persist the change, then re-fetches.
   */
  const handleToggleComplete = async (rowIndex: number) => {
    const applicant = rawApplicants[rowIndex];
    if (!applicant) return;

    const newIsCompleted = !applicant.isCompleted;
    const newStatus = newIsCompleted ? "Reviewed" : "Need to Review";

    const result = await updateApplicant({
      _id: applicant._id,
      applicantNumber: applicant.applicantNumber,
      applicantName: applicant.applicantName,
      dateSubmitted: applicant.dateSubmitted,
      status: newStatus,
      dateOfBirth: applicant.dateOfBirth,
      race: applicant.race,
      gender: applicant.gender,
      email: applicant.email,
      address: applicant.address,
      phoneNumber: applicant.phoneNumber,
      housingStatus: applicant.housingStatus,
      educationStatus: applicant.educationStatus,
      employmentStatus: applicant.employmentStatus,
      convictionDetails: applicant.convictionDetails,
      aidRequested: applicant.aidRequested,
      otherAidRequested: applicant.otherAidRequested,
      additionalComments: applicant.additionalComments,
      todos: applicant.todos,
      notes: applicant.notes,
      isCompleted: newIsCompleted,
    });

    if (result.success) {
      // Notify parent to re-fetch all applicant data.
      onCompleteToggle?.();
      setSuccessAlert?.("Application status updated successfully!");
    } else {
      alert(
        "Failed to update application status. Please try again. Error: " +
          (typeof result.error === "string" ? result.error : "Unknown error"),
      );
      console.error("Failed to update applicant:", result.error);
    }
  };

  // After the DOM updates, measure the natural height of each expanded panel
  // so we can animate max-height transitions smoothly.
  useLayoutEffect(() => {
    const heights: Record<string, number> = {};
    Object.entries(expandedRefs.current).forEach(([rowId, wrapper]) => {
      if (wrapper) {
        // Get the height of the child content
        const child = wrapper.firstElementChild as HTMLElement;
        if (child) {
          heights[rowId] = child.scrollHeight;
        }
      }
    });
    setExpandedHeights(heights);
  }, [expandedRows]);

  // ── Column definitions for @tanstack/react-table ─────────────────────
  const columns: ColumnDef<ApplicationRowData>[] = [
    {
      accessorKey: "clientNumber",
      header: "Client Number",
      cell: ({ getValue }) => <span className={styles.clientNumber}>{getValue<string>()}</span>,
    },
    {
      accessorKey: "clientName",
      header: "Client Name",
    },
    {
      accessorKey: "dateSubmitted",
      header: "Date Submitted",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusLabel status={row.original.status} />,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className={styles.actionsCell}>
          {!isCompleted ? (
            <button
              className={styles.markCompleteButton}
              onClick={(e) => {
                e.stopPropagation();
                void handleToggleComplete(row.index);
              }}
            >
              <span>
                <Image src="/admin_checkmark_light.svg" alt="Checkmark" width={20} height={20} />
              </span>
              <span>Complete</span>
            </button>
          ) : (
            <button
              className={styles.completedButton}
              onClick={(e) => {
                e.stopPropagation();
                void handleToggleComplete(row.index);
              }}
            >
              <span>
                <Image src="/admin_checkmark_dark.svg" alt="Checkmark" width={20} height={20} />
              </span>
              <span>Completed</span>
            </button>
          )}
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
            }}
            aria-label="Download application"
          >
            <Image
              src={"/ic_download.svg"}
              width={24}
              height={24}
              alt="Download application"
              className={styles.blueFilter}
            />
          </button>
        </div>
      ),
    },
  ];

  // Show an empty table while loading or on error; otherwise use processed data.
  const tableData = isLoadingProp || errorProp ? [] : applications;

  // Initialise the @tanstack/react-table instance with data, columns,
  // sorting, filtering, pagination, and row-expansion capabilities.
  const table = useReactTable<ApplicationRowData>({
    data: tableData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    globalFilterFn: (row, columnId, filterValue) => {
      const clientNameValue = row.getValue("clientName");
      if (typeof clientNameValue !== "string") return false;
      const lowerSearch = String(filterValue).toLowerCase();
      return clientNameValue.toLowerCase().includes(lowerSearch);
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  /** Toggle collapse/expand of the whole table section. */
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // ── Pagination helpers ───────────────────────────────────────────────
  const totalFilteredRows = table.getFilteredRowModel().rows.length;
  const totalCount = totalFilteredRows;
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const startRow = totalCount === 0 ? 0 : table.getState().pagination.pageIndex * pageSize + 1;

  return (
    <div className={styles.tableContainer}>
      {/* Table header with title and collapse button */}
      <div className={styles.tableTitleContainer}>
        <h3 className={styles.tableTitle}>{title}</h3>
        <button
          className={styles.tableVisibilityButton}
          onClick={handleToggleCollapse}
          aria-label={isCollapsed ? "Expand table" : "Collapse table"}
        >
          <Image
            src={isCollapsed ? "/upCaret.svg" : "/downCaret.svg"}
            width={24}
            height={24}
            alt={isCollapsed ? "Expand" : "Collapse"}
          />
        </button>
      </div>

      {!isCollapsed && (
        <>
          {/* Table element */}
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={styles.tableHeader}
                        onClick={
                          header.column.getCanSort()
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                        style={{ cursor: header.column.getCanSort() ? "pointer" : "default" }}
                      >
                        <div className={styles.headerContent}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && header.id !== "actions" && (
                            <SortIndicator isSorted={header.column.getIsSorted()} />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {(() => {
                  return table.getRowModel().rows.map((row) => {
                    const isExpanded = expandedRows[row.id];
                    const clientNumber = row.original.clientNumber;
                    const persistedTodos = todosByClient[clientNumber] ?? row.original.todos ?? [];
                    const rowWithPersistedTodos: ApplicationRowData = {
                      ...row.original,
                      todos: persistedTodos,
                    };
                    return (
                      <React.Fragment key={row.id}>
                        <tr
                          className={styles.tableRow}
                          tabIndex={0}
                          aria-expanded={isExpanded}
                          onClick={() => {
                            toggleRowExpanded(row.id);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              toggleRowExpanded(row.id);
                            }
                          }}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className={styles.tableCell}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                        <tr className={styles.expandedDetailRow}>
                          <td colSpan={columns.length} className={styles.expandedDetailCell}>
                            <div
                              ref={(el) => {
                                if (el) expandedRefs.current[row.id] = el;
                              }}
                              className={`${styles.expandedContentWrapper} ${
                                isExpanded ? styles.open : ""
                              }`}
                              style={{
                                maxHeight: isExpanded
                                  ? `${String(expandedHeights[row.id] || 0)}px`
                                  : "0px",
                              }}
                            >
                              {/* Render content only once expanded (and keep it mounted) for animation */}
                              {(isExpanded || expandedHeights[row.id] !== undefined) && (
                                <ExpandedRowContent
                                  row={rowWithPersistedTodos}
                                  todos={persistedTodos}
                                  onToggleTodo={(todoId) => {
                                    void handleToggleTodo(clientNumber, todoId);
                                  }}
                                />
                              )}
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  });
                })()}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={styles.paginationContainer}>
            <div className={styles.paginationInfo}>
              {totalCount === 0 ? (
                <>No applications to display</>
              ) : (
                <>
                  Showing {startRow}–
                  {Math.min(startRow + table.getRowModel().rows.length - 1, totalCount)} of{" "}
                  {totalFilteredRows} applications
                </>
              )}
            </div>
            <div className={styles.paginationControls}>
              <button
                className={styles.paginationButton}
                onClick={() => {
                  table.previousPage();
                }}
                disabled={!table.getCanPreviousPage()}
              >
                {"<"}
              </button>
              <span className={styles.pageIndicator}>
                page{" "}
                <input
                  type="number"
                  value={currentPage}
                  onChange={(e) => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    const clamped = Math.max(0, Math.min(page, totalPages - 1));
                    table.setPageIndex(clamped);
                  }}
                  className={styles.pageInput}
                  min={1}
                  max={totalPages}
                />{" "}
                of {totalPages}
              </span>
              <button
                className={styles.paginationButton}
                onClick={() => {
                  table.nextPage();
                }}
                disabled={!table.getCanNextPage()}
              >
                {">"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
