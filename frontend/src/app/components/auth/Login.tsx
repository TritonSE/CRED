"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { login } from "../../../lib/auth";

import styles from "./Login.module.css";
import credLogo from "./cred_design_logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // login() returns Promise<string | null> (error message or null on success)

    const errorMessage = await login(email, password);
    setLoading(false);

    if (errorMessage !== null) {
      setError(errorMessage);
      return;
    }
    // Success: redirect or update app state (e.g. router.push("/dashboard"))
    console.log("Login successful");
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${error ? styles.cardWithError : ""}`}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <Image
            src={credLogo}
            alt="CRED Logo"
            width={450}
            height={260}
            className={styles.logo}
            priority
          />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter Input"
                className={`${styles.input} ${error ? styles.inputError : ""}`}
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
            {error && (
              <p className={styles.errorMessage}>
                <span className={styles.errorIcon}>⚠️</span>
                {error.includes(" or reset password") ? (
                  <>
                    {error.split(" or ")[0]} or{" "}
                    <Link
                      href="/forgot-password"
                      className={styles.errorLink}
                      onClick={() => {
                        setError("");
                      }}
                    >
                      reset password
                    </Link>
                  </>
                ) : (
                  error
                )}
              </p>
            )}
          </div>

          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={`${styles.button} ${
                email && password ? styles.buttonPrimary : styles.buttonDisabled
              }`}
              disabled={!email || !password || loading}
            >
              {loading ? "Logging in…" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
