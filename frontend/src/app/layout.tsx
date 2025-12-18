import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRED",
  description: "A Next.js app with the new app router",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
