/**
 * admin file
 */

import { Table } from "@tritonse/tse-constellation";

export type ApplicationTableProps = {
  title: string;
};

export function ApplicationTable() {
  return (
    <Table
      columns={[
        {
          accessorKey: "dateSubmitted",
          header: "Date Submitted",
        },
        {
          accessorKey: "clientNumber",
          header: "Client Number",
        },
        {
          accessorKey: "name",
          header: "Name",
        },
        {
          accessorKey: "typeOfAid",
          header: "Type of Aid",
        },
        {
          accessorKey: "status",
          header: "Status",
        },
        {
          accessorKey: "actions",
          header: "Actions",
        },
      ]}
      data={[
        {
          dateSubmitted: "Ori",
          clientNumber: "Rigel",
          name: "Orion",
          typeOfAid: "Hunter",
          status: 7,
          actions: "Hunter",
        },
      ]}
    />
  );
}
