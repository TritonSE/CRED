/**
 * Initializes mongoose and express.
 */

import mongoose from "mongoose";

import app from "./app";
import { MONGODB_URI, port } from "./config";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.info("Mongoose connected!");
    app.listen(port, () => {
      console.info(`Server running on ${port}.`);
    });
  })
  .catch(console.error);
