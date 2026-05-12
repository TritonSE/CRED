import { body } from "express-validator";

const makeFullNameValidator = () =>
  body("fullName")
    .exists()
    .withMessage("fullName is required")
    .bail()
    .isString()
    .withMessage("fullName must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("fullName cannot be empty")
    .bail()
    .isLength({ max: 100 })
    .withMessage("fullName must be at most 100 characters")
    .bail()
    .not()
    .matches(/[\r\n]/)
    .withMessage("fullName must not contain newline characters");

const makeEmailValidator = () =>
  body("email")
    .exists()
    .withMessage("email is required")
    .bail()
    .isString()
    .withMessage("email must be a string")
    .bail()
    .trim()
    .isEmail()
    .withMessage("email must be a valid email address")
    .bail()
    .isLength({ max: 254 })
    .withMessage("email must be at most 254 characters");

const makeSubjectValidator = () =>
  body("subject")
    .exists()
    .withMessage("subject is required")
    .bail()
    .isString()
    .withMessage("subject must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("subject cannot be empty")
    .bail()
    .isLength({ max: 200 })
    .withMessage("subject must be at most 200 characters");

const makeMessageValidator = () =>
  body("message")
    .exists()
    .withMessage("message is required")
    .bail()
    .isString()
    .withMessage("message must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("message cannot be empty")
    .bail()
    .isLength({ max: 5000 })
    .withMessage("message must be at most 5000 characters");

export const sendContact = [
  makeFullNameValidator(),
  makeEmailValidator(),
  makeSubjectValidator(),
  makeMessageValidator(),
];
