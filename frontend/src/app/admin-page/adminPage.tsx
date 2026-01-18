/**
 * admin file
 */
"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import { ApplicationTable } from "./components/ApplicationTable";

export default function Admin() {
  return (
    <ThemeProvider>
      <h1>CRED Application Dashboard</h1>
      <ApplicationTable title="In-Progress Applications" />
      <ApplicationTable title="Completed Applications" />
    </ThemeProvider>
  );
}
