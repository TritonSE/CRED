import mongoose from "mongoose";

import app from "../app";
import { MONGODB_URI } from "../config";

void mongoose.connect(MONGODB_URI);

export default app;
