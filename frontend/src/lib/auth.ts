import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "./firebase";

export type AuthErrorCode = "INVALID_CREDENTIALS" | "INVALID_EMAIL" | "UNKNOWN";

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

/**
 * Sign out from Firebase.
 */
export async function logout(): Promise<void> {
  await signOut(auth);
}
