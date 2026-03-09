import "dotenv/config";
import cors from "cors";
import express from "express";
import { isHttpError } from "http-errors";
import mongoose from "mongoose";

import { MONGODB_URI, port } from "./config";
import applicantRoutes from "./routes/applicant";

import type { NextFunction, Request, Response } from "express";

/**
 * Main Express app entrypoint.
 * Responsible for middleware setup, route registration, centralized error handling,
 * and MongoDB-backed server startup.
 */
const app = express();

// initializes Express to accept JSON in the request/response body
app.use(express.json());

// Allow frontend requests from the configured origin.
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
  }),
);

// Mount applicant API routes under /api/applicant.
app.use("/api/applicant", applicantRoutes);

/**
 * Error handler; all errors thrown by server are handled here.
 */
app.use((error: unknown, req: Request, res: Response, _next: NextFunction) => {
  let statusCode = 500;
  let errorMessage = "An error has occurred.";

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

// Server Startup Logic
// Connect to MongoDB first; only start listening after a successful DB connection.

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.info("Connected to MongoDB (Cred_DB)!");
    app.listen(port, () => {
      console.info(`Server running on ${port}.`);
    });
  })
  .catch(console.error);

export default app;
