"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import ForgotPassword from "../components/auth/ForgotPassword";

export default function ForgotPasswordPage() {
  return (
    <ThemeProvider>
      <ForgotPassword />
    </ThemeProvider>
  );
}
