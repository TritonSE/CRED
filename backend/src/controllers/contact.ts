import { validationResult } from "express-validator";
import createHttpError from "http-errors";

import { sendContactEmail } from "../util/mailer";
import validationErrorParser from "../util/validationErrorParser";

import type { RequestHandler } from "express";

type SendContactBody = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

export const sendContact: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const { fullName, email, subject, message } = req.body as SendContactBody;

  try {
    validationErrorParser(errors);

    try {
      await sendContactEmail({ fullName, email, subject, message });
    } catch (error) {
      console.error("Failed to send contact email:", error);
      throw createHttpError(500, "Unable to send message right now. Please try again later.");
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
};
