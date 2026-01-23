/**
 * admin file
 */

import { Table } from "@tritonse/tse-constellation";

import { DetailButton } from "./DetailButton";
import { StatusLabel } from "./StatusLabel";

export type ApplicationTableProps = {
  title: string;
};

export function ApplicationTable({ title }: ApplicationTableProps) {
  /*
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
  }
  */

  return (
    <div>
      <h3>{title}</h3>
      <Table
        enableGlobalFiltering={false}
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
            cell: () => <StatusLabel status="Reviewed"></StatusLabel>,
          },
          {
            accessorKey: "actions",
            header: "Actions",
            cell: () => <DetailButton mode="view"></DetailButton>,
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
    </div>
  );
}
