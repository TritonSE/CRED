/**
 * @todo This file is temporarily edited so that the admin page can be accessed, update
 * once routes has been setup properly.
 */

"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import Admin from "./admin-page/adminPage";

export default function ExamplePage() {
  return (
    <ThemeProvider>
      <Admin />
    </ThemeProvider>
  );
}
