/**
 * admin file
 */
"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import { AdminHeader } from "./components/AdminHeader";
import { ApplicationTable } from "./components/ApplicationTable";

import type { ApplicationRowData } from "./components/ApplicationTable";

const ipData: ApplicationRowData[] = [
  {
    clientNumber: "#00000000",
    clientName: "Alice Lan",
    dateSubmitted: "January 17, 2026",
    status: "Need to Review",
  },
  {
    clientNumber: "#00000000",
    clientName: "Andrea Labaikka",
    dateSubmitted: "January 15, 2026",
    status: "Need to Review",
  },
  {
    clientNumber: "#00000000",
    clientName: "Irene Joo",
    dateSubmitted: "January 10, 2026",
    status: "Under Review",
  },
];

const comData: ApplicationRowData[] = [
  {
    clientNumber: "#00000000",
    clientName: "Alice Lan",
    dateSubmitted: "January 17, 2026",
    status: "Reviewed",
  },
  {
    clientNumber: "#00000000",
    clientName: "Andrea Labaikka",
    dateSubmitted: "January 15, 2026",
    status: "Reviewed",
  },
  {
    clientNumber: "#00000000",
    clientName: "Irene Joo",
    dateSubmitted: "January 10, 2026",
    status: "Reviewed",
  },
  {
    clientNumber: "#00000000",
    clientName: "Alice Lan",
    dateSubmitted: "January 17, 2026",
    status: "Reviewed",
  },
  {
    clientNumber: "#00000000",
    clientName: "Andrea Labaikka",
    dateSubmitted: "January 15, 2026",
    status: "Reviewed",
  },
  {
    clientNumber: "#00000000",
    clientName: "Irene Joo",
    dateSubmitted: "January 10, 2026",
    status: "Reviewed",
  },
];

export default function Admin() {
  return (
    <ThemeProvider>
      <AdminHeader name="DeQuan" />
      <ApplicationTable title="In-Progress Applications" data={ipData} />
      <ApplicationTable title="Completed Applications" data={comData} />
    </ThemeProvider>
  );
}
