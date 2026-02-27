"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import styles from "./Login.module.css";

import type { AuthErrorCode } from "@/lib/auth";

import { login } from "@/lib/auth";

export default function Login() {
  const router = useRouter();
  const passwordRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);
  const [errorCode, setErrorCode] = useState<AuthErrorCode | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorCode(null);
    setErrorMessage("");
    setLoading(true);

    const result = await login(email, passwordRef.current?.value ?? "");
    setLoading(false);

    if (!result.ok) {
      setErrorCode(result.code);
      setErrorMessage(result.message);
      return;
    }

    router.push("/admin");
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${errorCode ? styles.cardWithError : ""}`}>
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

        <form
          onSubmit={(e) => {
            void handleLogin(e);
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter Input"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                ref={passwordRef}
                onChange={() => {
                  setHasPassword(Boolean(passwordRef.current?.value));
                  if (errorCode) {
                    setErrorCode(null);
                    setErrorMessage("");
                  }
                }}
                placeholder="Enter Input"
                className={`${styles.input} ${errorCode ? styles.inputError : ""}`}
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
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
            {errorCode && (
              <p className={styles.errorMessage}>
                <span className={styles.errorIcon}>⚠️</span>
                {errorCode === "INVALID_CREDENTIALS" ? (
                  <>
                    {errorMessage} or{" "}
                    <Link
                      href="/forgot-password"
                      className={styles.errorLink}
                      onClick={() => {
                        setErrorCode(null);
                        setErrorMessage("");
                      }}
                    >
                      reset password
                    </Link>
                  </>
                ) : (
                  errorMessage
                )}
              </p>
            )}
          </div>

          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={`${styles.button} ${
                email && hasPassword ? styles.buttonPrimary : styles.buttonDisabled
              }`}
              disabled={!email || loading}
            >
              {loading ? "Logging in…" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
