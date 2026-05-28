import createHttpError from "http-errors";

import type { NextFunction, Request, Response } from "express";

/**
 * Verifies a Cloudflare Turnstile token against the siteverify API.
 *
 * IMPORTANT TESTING NOTE:
 * For development, you can use Cloudflare's "always passes" test keys:
 * Site Key (Frontend): 1x00000000000000000000AA
 * Secret Key (Backend): 1x0000000000000000000000000000000AA
 *
 * When deploying to production, replace the TURNSTILE_SECRET_KEY in your .env
 * with your real secret key from the Cloudflare Dashboard.
 *
 * @param token The cf-turnstile-response token from the frontend
 * @param ip The user's IP address (optional but recommended)
 * @throws HttpError if validation fails
 */
export async function verifyTurnstile(token: string | undefined, ip?: string): Promise<void> {
  if (!token) {
    throw createHttpError(400, "Missing Turnstile anti-spam token.");
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.warn(
      "TURNSTILE_SECRET_KEY is not set. Bypassing Turnstile validation for development.",
    );
    return; // Bypass if no key is configured (fail-safe for dev)
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (ip) {
      formData.append("remoteip", ip);
    }

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });

    const data = (await response.json()) as { success: boolean; "error-codes"?: string[] };

    if (!data.success) {
      console.error("Turnstile verification failed:", data["error-codes"]);
      throw createHttpError(403, "Anti-spam verification failed. Please try again.");
    }
  } catch (error) {
    if (createHttpError.isHttpError(error)) {
      throw error;
    }
    console.error("Error communicating with Turnstile API:", error);
    throw createHttpError(500, "Internal server error during anti-spam check.");
  }
}

/**
 * Express middleware to verify the Turnstile token in the request body.
 */
export async function requireTurnstile(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body as { turnstileToken?: string } | undefined;
    const token = body?.turnstileToken;
    const ip = req.ip ?? req.socket.remoteAddress;
    await verifyTurnstile(token, ip);
    next();
  } catch (error) {
    next(error);
  }
}
