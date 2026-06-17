import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import createHttpError from "http-errors";

import type { NextFunction, Request, Response } from "express";
import type { ServiceAccount } from "firebase-admin/app";

// Initialize Firebase Admin SDK
// The service account should be passed as a JSON string in the FIREBASE_SERVICE_ACCOUNT environment variable.
if (!getApps().length) {
  try {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!serviceAccountString) {
      console.warn(
        "FIREBASE_SERVICE_ACCOUNT environment variable is not set. Admin routes will fail.",
      );
    } else {
      const serviceAccount = JSON.parse(serviceAccountString) as ServiceAccount;
      initializeApp({
        credential: cert(serviceAccount),
      });
      console.info("Firebase Admin SDK initialized successfully.");
    }
  } catch (error) {
    console.error(
      "Failed to parse FIREBASE_SERVICE_ACCOUNT JSON string or initialize admin SDK:",
      error,
    );
  }
}

/**
 * Express middleware to verify the Firebase ID Token in the Authorization header.
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    next(createHttpError(401, "Missing or invalid Authorization header"));
    return;
  }

  const idToken = authHeader.split("Bearer ")[1];

  if (!idToken) {
    next(createHttpError(401, "Missing token"));
    return;
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    // Attach the decoded user information to the request object for downstream use if needed
    Object.assign(req, { user: decodedToken });
    next();
  } catch (error) {
    console.error("Firebase ID Token verification failed:", error);
    next(createHttpError(401, "Invalid or expired token"));
  }
}
