"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";
import { usePathname } from "next/navigation";

import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";
import Navbar from "./Navbar";

/**
 * Renders the navbar/footer for the current route. Dashboard routes get the
 * admin chrome (and ThemeProvider required by tse-constellation); everything
 * else gets the public site chrome.
 */
export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard") ?? false;

  if (isDashboard) {
    return (
      <ThemeProvider>
        <AdminNavbar />
        <main className="flex-1 pt-[70px]">{children}</main>
        <AdminFooter />
      </ThemeProvider>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[70px]">{children}</main>
      <Footer />
    </>
  );
}
