import { FirebaseError } from "firebase/app";
import {
  confirmPasswordReset,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "./firebase";

/**
 * Sign in with email and password via Firebase.
 * Returns an error message string, or null on success.
 */
export async function login(email: string, password: string): Promise<string | null> {
  try {
    await signInWithEmailAndPassword(auth, email.trim(), password.trim());
    return null;
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        return "Wrong password. Please try again or reset password.";
      }
      if (error.code === "auth/invalid-email") {
        return "Please enter a valid email address.";
      }
      return error.message ?? "Something went wrong. Please try again.";
    }
    return "Something went wrong. Please try again.";
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
 * Returns an error message string, or null on success.
 */
export async function sendPasswordReset(email: string): Promise<string | null> {
  try {
    const actionCodeSettings = getActionUrl()
      ? { url: getActionUrl(), handleCodeInApp: true }
      : undefined;
    await sendPasswordResetEmail(auth, email.trim(), actionCodeSettings);
    return null;
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/user-not-found") {
        return "No account found with this email.";
      }
      if (error.code === "auth/invalid-email") {
        return "Please enter a valid email address.";
      }
      if (error.code === "auth/too-many-requests") {
        return "Too many attempts. Please try again later.";
      }
      return error.message ?? "Something went wrong. Please try again.";
    }
    return "Something went wrong. Please try again.";
  }
}

/**
 * Completes password reset using the one-time code from the email link.
 * Returns an error message string, or null on success.
 */
export async function confirmPasswordResetWithCode(
  oobCode: string,
  newPassword: string,
): Promise<string | null> {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
    return null;
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/expired-action-code") {
        return "This reset link has expired. Please request a new one.";
      }
      if (error.code === "auth/invalid-action-code") {
        return "This reset link is invalid or was already used.";
      }
      if (error.code === "auth/weak-password") {
        return "Please choose a stronger password (at least 6 characters).";
      }
      return error.message ?? "Something went wrong. Please try again.";
    }
    return "Something went wrong. Please try again.";
  }
}
