/**
 * ApplicationTable file
 *
 * @todo Style the table to match the color of the figma design
 */

import { Table } from "@tritonse/tse-constellation";
import Image from "next/image";

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
  type StatusRow = {
    row: { original: { status: "Reviewed" | "Need to Review" | "Under Review" } };
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableTitleContainer}>
        <h3 className={styles.tableTitle}>{title}</h3>
        <Image src="/downCarat.svg" width="16" height="16" alt="Filter Options"></Image>
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
            cell: ({ row }: StatusRow) => <StatusLabel status={row.original.status}></StatusLabel>,
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
}
