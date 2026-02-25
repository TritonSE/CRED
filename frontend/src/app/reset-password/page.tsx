"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import ResetPassword from "../components/auth/ResetPassword";

export default function ResetPasswordPage() {
  return (
    <ThemeProvider>
      <ResetPassword />
    </ThemeProvider>
  );
}
