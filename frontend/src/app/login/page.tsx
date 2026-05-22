"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import Login from "@/app/components/auth/Login";

export default function LoginPage() {
  return (
    <ThemeProvider>
      <Login />
    </ThemeProvider>
  );
}
