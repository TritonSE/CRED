import dotenv from "dotenv";

import { InternalError } from "./errors";

// Retrieve .env variables
dotenv.config();

if (!process.env.PORT) throw InternalError.NO_APP_PORT;
const port = process.env.PORT;

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI not found in .env");
}
const MONGODB_URI = process.env.MONGODB_URI;

export { port, MONGODB_URI };
