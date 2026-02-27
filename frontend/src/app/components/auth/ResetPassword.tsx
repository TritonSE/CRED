"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import styles from "./ResetPassword.module.css";

import { confirmPasswordResetWithCode } from "@/lib/auth";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!oobCode) {
      setError("Invalid reset link.");
      return;
    }

    setLoading(true);
    const result = await confirmPasswordResetWithCode(oobCode, newPassword);
    setLoading(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setSuccess(true);
  };

  if (!oobCode) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.logoContainer}>
            <Image
              src="/cred_design_logo.png"
              alt="CRED Logo"
              width={450}
              height={260}
              className={styles.logo}
              priority
            />
          </div>
          <p className={styles.invalidLinkMessage}>
            This link is invalid or has expired. Please request a new password reset from the login
            page.
          </p>
          <Link href="/forgot-password" className={styles.backLink}>
            Request new reset link
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.cardSuccess}>
          <div className={styles.logoContainer}>
            <Image
              src="/cred_design_logo.png"
              alt="CRED Logo"
              width={450}
              height={260}
              className={styles.logo}
              priority
            />
          </div>
          <p className={styles.successMessageTitle}>Your password has been successfully changed!</p>
          <Link href="/" className={styles.backButton}>
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <Image
            src="/cred_design_logo.png"
            alt="CRED Logo - Community Redevelopment Education Development"
            width={450}
            height={260}
            className={styles.logo}
            priority
          />
        </div>

        <form
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
          className={styles.form}
        >
          <div className={styles.formGroup}>
            <label htmlFor="newPassword" className={styles.label}>
              New password
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                placeholder="Enter password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (error) setError("");
                }}
                className={styles.input}
                required
                minLength={6}
                autoComplete="new-password"
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => {
                  setShowNewPassword((prev) => !prev);
                }}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm password
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Enter password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError("");
                }}
                className={styles.input}
                required
                minLength={6}
                autoComplete="new-password"
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => {
                  setShowConfirmPassword((prev) => !prev);
                }}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {error && <p className={styles.errorMessage}>{error}</p>}
          </div>

          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={`${styles.button} ${newPassword && confirmPassword && !loading ? styles.buttonActive : ""}`}
              disabled={loading || !newPassword || !confirmPassword}
            >
              {loading ? "Setting password…" : "Reset password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense
      fallback={
        <div className={styles.container}>
          <div className={styles.card}>
            <p className={styles.successMessage}>Loading…</p>
          </div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
