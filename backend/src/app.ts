import "dotenv/config";
import cors from "cors";
import express from "express";
import { isHttpError } from "http-errors";
import mongoose from "mongoose";

import { MONGODB_URI, port } from "./config";
import applicantRoutes from "./routes/applicant";

import type { NextFunction, Request, Response } from "express";

const app = express();

// initializes Express to accept JSON in the request/response body
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
  }),
);

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
