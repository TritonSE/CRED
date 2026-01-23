/**
 * ApplicationTable file
 *
 * @todo Style the table to match the color of the figma design
 */
import { Table } from "@tritonse/tse-constellation";
import Image from "next/image";
import React, { useState } from "react";

import styles from "./ApplicationTable.module.css";
import { DetailButton } from "./DetailButton";
import { StatusLabel } from "./StatusLabel";

export type ApplicationRowData = {
  dateSubmitted: string;
  clientNumber: string;
  clientName: string;
  status: "Reviewed" | "Need to Review" | "Under Review";
};

export type ApplicationTableProps = {
  title: string;
  data: ApplicationRowData[];
};

export function ApplicationTable({ title, data }: ApplicationTableProps) {
  const [shownData, setShownData] = useState<boolean>(true);
  type StatusRow = {
    row: { original: { status: "Reviewed" | "Need to Review" | "Under Review" } };
  };

  function handleOnclick() {
    setShownData(!shownData);
  }

  if (shownData) {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.tableTitleContainer}>
          <h3 className={styles.tableTitle}>{title}</h3>
          <div className={styles.tableVisibilityButton} onClick={handleOnclick}>
            <Image src="/downCaret.svg" width="25" height="25" alt="Hide Table"></Image>
          </div>
        </div>

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
              cell: ({ row }: StatusRow) => (
                <StatusLabel status={row.original.status}></StatusLabel>
              ),
            },
            {
              accessorKey: "actions",
              header: "Actions",
              cell: () => <DetailButton mode="view"></DetailButton>,
            },
          ]}
          data={data}
        />
      </div>
    );
  } else {
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
