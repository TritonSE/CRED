import mongoose from "mongoose";

import app from "../app";
import { MONGODB_URI } from "../config";

mongoose.connect(MONGODB_URI).catch((error: unknown) => {
  console.error("MongoDB connection error:", error);
});

export default app;
