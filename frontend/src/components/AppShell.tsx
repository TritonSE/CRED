"use client";

import { usePathname } from "next/navigation";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const showNavbar = pathname !== "/";

  return (
    <div className="min-h-screen w-full bg-[#faf8f6] flex flex-col overflow-x-hidden">
      {showNavbar && <Navbar />}
      <main className={showNavbar ? "flex-1 pt-[70px]" : "flex-1"}>{children}</main>
      <Footer />
    </div>
  );
}
