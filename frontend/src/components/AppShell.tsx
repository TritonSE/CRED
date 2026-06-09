"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";
import { usePathname } from "next/navigation";

import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";
import Navbar from "./Navbar";

type AppShellProps = {
  children: React.ReactNode;
};

/**
 * Renders the navbar/footer for the current route. Dashboard routes get the
 * admin chrome (and the ThemeProvider required by tse-constellation); the login
 * screen renders standalone; everything else gets the public site chrome.
 */
export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard") ?? false;
  const isLogin = pathname === "/login";

  if (isDashboard) {
    return (
      <ThemeProvider>
        <div className="min-h-screen w-full bg-[#faf8f6] flex flex-col overflow-x-hidden">
          <AdminNavbar />
          <main className="flex-1 pt-[70px]">{children}</main>
          <AdminFooter />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#faf8f6] flex flex-col overflow-x-hidden">
      {!isLogin && <Navbar />}
      <main className={isLogin ? "flex-1" : "flex-1 pt-[70px]"}>{children}</main>
      <Footer />
    </div>
  );
}
