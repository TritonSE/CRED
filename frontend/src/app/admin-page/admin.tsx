/**
 * admin file
 */
"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import { ApplicationTable } from "./ApplicationTable";

export default function Admin() {
  return (
    <ThemeProvider>
      <ApplicationTable />
    </ThemeProvider>
  );
}
