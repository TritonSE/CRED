/**
 * admin file
 */

import { Button, Table } from "@tritonse/tse-constellation";

export type ApplicationTableProps = {
  title: string;
};

export function ApplicationTable() {
  type ApplicationRow = {
    dateSubmitted: string;
    clientNumber: string;
    name: string;
    typeOfAid: string;
    status: number;
    actions: string;
  };

  type CellContext<T = ApplicationRow> = {
    row: { original: T };
  };

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
          cell: (row: CellContext) => (
            <Button
              small
              trailingIcon="ic_caretdown"
              variant="secondary"
              onClick={() => {
                alert(row.row.original.name);
              }}
            >
              {row.row.original.name}
            </Button>
          ),
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
