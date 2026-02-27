import { FirebaseError } from "firebase/app";
import {
  confirmPasswordReset,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "./firebase";

export type AuthErrorCode =
  | "INVALID_CREDENTIALS"
  | "INVALID_EMAIL"
  | "EXPIRED_LINK"
  | "INVALID_LINK"
  | "WEAK_PASSWORD"
  | "TOO_MANY_REQUESTS"
  | "UNKNOWN";

export type AuthResult = { ok: true } | { ok: false; code: AuthErrorCode; message: string };

/**
 * Sign in with email and password via Firebase.
 */
export async function login(email: string, password: string): Promise<AuthResult> {
  try {
    await signInWithEmailAndPassword(auth, email.trim(), password);
    return { ok: true };
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        return {
          ok: false,
          code: "INVALID_CREDENTIALS",
          message: "Wrong password. Please try again",
        };
      }
      if (error.code === "auth/invalid-email") {
        return { ok: false, code: "INVALID_EMAIL", message: "Please enter a valid email address." };
      }
      return {
        ok: false,
        code: "UNKNOWN",
        message: error.message ?? "Something went wrong. Please try again.",
      };
    }
    return { ok: false, code: "UNKNOWN", message: "Something went wrong. Please try again." };
  }
}

/** Base URL for reset link (our custom page). Use NEXT_PUBLIC_APP_URL in .env for SSR. */
const getActionUrl = () =>
  typeof window !== "undefined"
    ? `${window.location.origin}/reset-password`
    : process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`
      : "";

/**
 * Sends a password reset email to the given address via Firebase.
 * Always returns success to prevent account enumeration, except for
 * clearly client-side validation errors.
 */
export async function sendPasswordReset(email: string): Promise<AuthResult> {
  try {
    const actionCodeSettings = getActionUrl()
      ? { url: getActionUrl(), handleCodeInApp: true }
      : undefined;
    await sendPasswordResetEmail(auth, email.trim(), actionCodeSettings);
    return { ok: true };
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/invalid-email") {
        return { ok: false, code: "INVALID_EMAIL", message: "Please enter a valid email address." };
      }
      if (error.code === "auth/too-many-requests") {
        return {
          ok: false,
          code: "TOO_MANY_REQUESTS",
          message: "Too many attempts. Please try again later.",
        };
      }
      // For user-not-found and all other cases, return success to prevent enumeration
    }
    return { ok: true };
  }
}

/**
 * Completes password reset using the one-time code from the email link.
 */
export async function confirmPasswordResetWithCode(
  oobCode: string,
  newPassword: string,
): Promise<AuthResult> {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
    return { ok: true };
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/expired-action-code") {
        return {
          ok: false,
          code: "EXPIRED_LINK",
          message: "This reset link has expired. Please request a new one.",
        };
      }
      if (error.code === "auth/invalid-action-code") {
        return {
          ok: false,
          code: "INVALID_LINK",
          message: "This reset link is invalid or was already used.",
        };
      }
      if (error.code === "auth/weak-password") {
        return {
          ok: false,
          code: "WEAK_PASSWORD",
          message: "Please choose a stronger password (at least 6 characters).",
        };
      }
      return {
        ok: false,
        code: "UNKNOWN",
        message: error.message ?? "Something went wrong. Please try again.",
      };
    }
    return { ok: false, code: "UNKNOWN", message: "Something went wrong. Please try again." };
  }
}
