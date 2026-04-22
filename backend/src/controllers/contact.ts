import { validationResult } from "express-validator";

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

    await sendContactEmail({ fullName, email, subject, message });

    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
};
