/**
 * ApplicationTable Component
 *
 * Displays a collapsible table of client applications with columns for:
 * - Client Number
 * - Client Name
 * - Date Submitted
 * - Status (with color-coded labels)
 * - Actions (view/hide details)
 *
 * @module ApplicationTable
 * @todo Style the table to match the color of the figma design
 */
import { Table } from "@tritonse/tse-constellation";
import Image from "next/image";
import React, { useState } from "react";

import styles from "./ApplicationTable.module.css";
import { DetailButton } from "./DetailButton";
import { StatusLabel } from "./StatusLabel";

/**
 * Data structure for a single application row
 */
export type ApplicationRowData = {
  dateSubmitted: string;
  clientNumber: string;
  clientName: string;
  status: "Reviewed" | "Need to Review" | "Under Review";
};

/**
 * Props for the ApplicationTable component
 * @property {string} title - The heading displayed above the table
 * @property {ApplicationRowData[]} data - Array of application records to display
 */
export type ApplicationTableProps = {
  title: string;
  data: ApplicationRowData[];
};

/**
 * ApplicationTable - Renders a collapsible data table for applications
 *
 * @param {ApplicationTableProps} props - Component props
 * @param {string} props.title - Section title (e.g., "Pending Applications")
 * @param {ApplicationRowData[]} props.data - Application data to populate the table
 * @returns {JSX.Element} A collapsible table with application data
 */
export function ApplicationTable({ title, data }: ApplicationTableProps) {
  // State to track whether the table content is visible
  const [shownData, setShownData] = useState<boolean>(true);

  // Type definition for accessing status from row data in cell renderer
  type StatusRow = {
    row: { original: { status: "Reviewed" | "Need to Review" | "Under Review" } };
  };

  /**
   * Toggles the visibility of the table content
   */
  function handleOnclick() {
    setShownData(!shownData);
  }

  // Render expanded table view
  if (shownData) {
    return (
      <div className={styles.tableContainer}>
        {/* Table header with title and collapse button */}
        <div className={styles.tableTitleContainer}>
          <h3 className={styles.tableTitle}>{title}</h3>
          <div className={styles.tableVisibilityButton} onClick={handleOnclick}>
            <Image src="/downCaret.svg" width="25" height="25" alt="Hide Table"></Image>
          </div>
        </div>

        {/* Data table using TSE Constellation component */}
        <Table
          enableGlobalFiltering={false}
          columns={[
            {
              accessorKey: "clientNumber",
              header: "Client Number",
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
              // Custom cell renderer for color-coded status labels
              cell: ({ row }: StatusRow) => (
                <StatusLabel status={row.original.status}></StatusLabel>
              ),
            },
            {
              accessorKey: "actions",
              header: "Actions",
              // Custom cell renderer for action buttons
              cell: () => <DetailButton mode="view"></DetailButton>,
            },
          ]}
          data={data}
        />
      </div>
    );
  } else {
    // Render collapsed view (header only)
    return (
      <div className={styles.tableContainer}>
        <div className={styles.tableTitleContainer}>
          <h3 className={styles.tableTitle}>{title}</h3>
          <div className={styles.tableVisibilityButton} onClick={handleOnclick}>
            <Image src="/upCaret.svg" width="25" height="25" alt="Show Table"></Image>
          </div>
        </div>
      </div>
    );
  }
}
