/**
 * Parses .env parameters and ensures they are of required types. If any .env parameters are
 * missing, the server will not start and an error will be thrown.
 */
import dotenv from "dotenv";
import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

dotenv.config();

export default cleanEnv(process.env, {
  PORT: port(),
  MONGODB_URI: str(),
});
