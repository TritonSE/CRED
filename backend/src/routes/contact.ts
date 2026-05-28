import express from "express";

import * as ContactController from "../controllers/contact";
import { requireTurnstile } from "../util/turnstile";
import * as ContactValidator from "../validators/contact";

// Contact form route. Validates the request body then sends an email via Nodemailer.
const router = express.Router();

router.post("/", requireTurnstile, ContactValidator.sendContact, ContactController.sendContact);

export default router;
