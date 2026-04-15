import { Lato } from "next/font/google";

import type { Metadata } from "next";

import AppShell from "@/components/AppShell";

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
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
