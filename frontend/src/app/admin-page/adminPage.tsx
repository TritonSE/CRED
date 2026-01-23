/**
 * admin file
 */
"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import { AdminHeader } from "./components/AdminHeader";
import { ApplicationTable } from "./components/ApplicationTable";

export default function Admin() {
  return (
    <ThemeProvider>
      <AdminHeader name="Admin User" />
      <ApplicationTable title="In-Progress Applications" />
      <ApplicationTable title="Completed Applications" />
    </ThemeProvider>
  );
}
