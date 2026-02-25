"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import styles from "./ForgotPassword.module.css";
import credLogo from "./cred_design_logo.png";

import { sendPasswordReset } from "@/lib/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const err = await sendPasswordReset(email.trim());
    setLoading(false);

    if (err) {
      setError(err);
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <Image
            src={credLogo}
            alt="CRED Logo - Community Redevelopment Education Development"
            width={450}
            height={260}
            className={styles.logo}
            priority
          />
        </div>

        {submitted ? (
          <>
            <p className={styles.successMessage}>
              A reset link has been sent to your email. Check your inbox and follow the link to set
              a new password.
            </p>
            <Link href="/" className={styles.backLink}>
              Back to login
            </Link>
          </>
        ) : (
          <>
            <p className={styles.instructions}>
              Forgot password? Enter email below to get a reset link.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void handleSubmit(e);
              }}
              className={styles.form}
            >
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className={styles.input}
                  required
                  autoComplete="email"
                />
                {error && <p className={styles.errorMessage}>{error}</p>}
              </div>

              <div className={styles.buttonContainer}>
                <button
                  type="submit"
                  className={`${styles.button} ${loading || !email.trim() ? styles.buttonDisabled : styles.buttonPrimary}`}
                  disabled={loading || !email.trim()}
                >
                  {loading ? "Sending…" : "Send reset link"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
