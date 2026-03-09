import { Lato } from "next/font/google";

import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import "./globals.css";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "CRED - Community Resources for Empowerment and Development",
  description:
    "Disrupting the cycles of recidivism, mass incarceration, homelessness, and poverty by helping people find their way to self-sufficiency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased overflow-x-hidden`}>
        <div className="min-h-screen w-full bg-[#faf8f6] flex flex-col overflow-x-hidden">
          <Navbar />
          <main className="flex-1 pt-[70px]">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
