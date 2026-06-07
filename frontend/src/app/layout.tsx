import { Analytics } from "@vercel/analytics/next";
import { Inter, Lato } from "next/font/google";

import LayoutShell from "../components/LayoutShell";

import type { Metadata } from "next";

import "./globals.css";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});

const inter = Inter({
  weight: ["600"],
  subsets: ["latin"],
  variable: "--font-inter",
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
      <body className={`${lato.variable} ${inter.variable} antialiased overflow-x-hidden`}>
        <div className="min-h-screen w-full bg-[#faf8f6] flex flex-col overflow-x-hidden">
          <LayoutShell>{children}</LayoutShell>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
