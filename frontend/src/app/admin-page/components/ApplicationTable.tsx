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
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import React, { useState } from "react";

import styles from "./ApplicationTable.module.css";
import { ExpandedRowContent } from "./ExpandedRowContent";
import { StatusLabel } from "./StatusLabel";

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
  cdcrNumber?: string;
  email?: string;
  phoneNumber?: string;
  convictionDetails?: string;
  aidRequested?: string[];
  additionalComments?: string;
  todos?: { id: string; label: string; completed: boolean }[];
  notes?: { date: string; content: string }[];
};

/**
 * Props for the ApplicationTable component
 * @property {string} title - The heading displayed above the table
 * @property {ApplicationRowData[]} data - Array of application records to display
 * @property {number} [pageSize] - Number of rows per page (default: 10)
 */
export type ApplicationTableProps = {
  title: string;
  data: ApplicationRowData[];
  pageSize?: number;
  totalApplications?: number;
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
  data,
  pageSize = 6,
  totalApplications,
}: ApplicationTableProps) {
  // State to track whether the table content is visible
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRowExpanded = (rowId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

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
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              // Toggle visibility logic can be added here
            }}
            aria-label="View details"
          >
            <Image
              src={expandedRows[row.id] ? "/eyeWithSlash.svg" : "/eye.svg"}
              width={16}
              height={16}
              alt={expandedRows[row.id] ? "Hide details" : "View details"}
            />
          </button>
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              toggleRowExpanded(row.id);
            }}
            aria-label="Expand row"
          >
            <Image
              src={expandedRows[row.id] ? "/upCaret.svg" : "/downCaret.svg"}
              width={16}
              height={16}
              alt={expandedRows[row.id] ? "Collapse" : "Expand"}
            />
          </button>
          <button
            className={styles.moreButton}
            onClick={(e) => {
              e.stopPropagation();
            }}
            aria-label="More options"
          >
            <Image src="/more.svg" width={16} height={16} alt="More options" />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const totalCount = totalApplications ?? data.length;
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const startRow = table.getState().pagination.pageIndex * pageSize + 1;
  const _endRow = Math.min(startRow + pageSize - 1, data.length);

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
                  let visibleRowIndex = 0;
                  return table.getRowModel().rows.map((row) => {
                    const isExpanded = expandedRows[row.id];
                    let rowClass = styles.tableRow;
                    rowClass += " " + (visibleRowIndex % 2 === 0 ? styles.even : styles.odd);
                    visibleRowIndex++;
                    return (
                      <React.Fragment key={row.id}>
                        <tr
                          className={rowClass}
                          onClick={() => {
                            toggleRowExpanded(row.id);
                          }}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className={styles.tableCell}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                        {isExpanded &&
                          (() => {
                            // Expanded row should also increment the index for striping
                            const expandedClass =
                              visibleRowIndex % 2 === 0 ? styles.even : styles.odd;
                            // visibleRowIndex++; // So that it does not change the alternating colors
                            return (
                              <tr className={styles.expandedDetailRow + " " + expandedClass}>
                                <td colSpan={columns.length} className={styles.expandedDetailCell}>
                                  <ExpandedRowContent row={row.original} />
                                </td>
                              </tr>
                            );
                          })()}
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
              Showing {startRow} of {totalCount} applications
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
                    table.setPageIndex(page);
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
