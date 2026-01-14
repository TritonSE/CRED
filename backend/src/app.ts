import "dotenv/config";
import cors from "cors";
import express from "express";
import { isHttpError } from "http-errors";

//Change these when we get new routes

// import taskRoutes from "src/routes/task";
// import tasksRoutes from "src/routes/tasks";
// import userRoutes from "src/routes/user";

import type { NextFunction, Request, Response } from "express";

const app = express();

// initializes Express to accept JSON in the request/response body
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
  }),
);

//CHANGE THESE WHEN WE GET ROUTES

// app.use("/api/task", taskRoutes);
// app.use("/api/tasks", tasksRoutes);
// app.use("/api/user", userRoutes);

/**
 * Error handler; all errors thrown by server are handled here.
 * Explicit typings required here because TypeScript cannot infer the argument types.
 */
app.use((error: unknown, req: Request, res: Response, _next: NextFunction) => {
  // 500 is the "internal server error" error code, this will be our fallback
  let statusCode = 500;
  let errorMessage = "An error has occurred.";

  // check is necessary because anything can be thrown, type is not guaranteed
  if (isHttpError(error)) {
    // error.status is unique to the http error class, it allows us to pass status codes with errors
    statusCode = error.status;
    errorMessage = error.message;
  }
  // prefer custom http errors but if they don't exist, fallback to default
  else if (error instanceof Error) {
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app;
