import { Lato } from "next/font/google";

import type { Metadata } from "next";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "CRED",
  description: "A Next.js app with the new app router",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={lato.variable}>{children}</body>
    </html>
  );
}
