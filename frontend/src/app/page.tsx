/**
 * @todo This file is temporarily edited so that the admin page can be accessed, update
 * once routes have been set up properly.
 */

"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import AdminPage from "./admin-page/adminPage";

export default function ExamplePage() {
  return (
    <ThemeProvider>
      <AdminPage />
    </ThemeProvider>
  );
}
