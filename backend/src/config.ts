import dotenv from "dotenv";

import { InternalError } from "./errors";

// Retrieve .env variables
dotenv.config();

if (!process.env.VERCEL && !process.env.PORT) throw InternalError.NO_APP_PORT;
const port = process.env.PORT ?? "3001";

// Required MongoDB connection string for Mongoose.
if (!process.env.MONGODB_URI) throw InternalError.NO_MONGO_URI;

const MONGODB_URI = process.env.MONGODB_URI;

// Export validated runtime config values used by app.ts.
export { port, MONGODB_URI };
