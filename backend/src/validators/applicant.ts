import { body, param } from "express-validator";

import {
  AID_REQUESTED_OPTIONS,
  EDUCATION_OPTIONS,
  EMPLOYMENT_OPTIONS,
  GENDER_OPTIONS,
  HOUSING_STATUS_OPTIONS,
  RACE_OPTIONS,
  STATUS_OPTIONS,
} from "../models/applicant";

// Validator factory helpers keep create/update schemas consistent and reusable.
const makeIDValidator = () =>
  body("_id")
    .exists()
    .withMessage("_id is required")
    .bail()
    .isMongoId()
    .withMessage("_id must be a MongoDB object ID");
// Delete requests only require a valid target document id in the URL parameters.
const makeParamIDValidator = () =>
  param("id")
    .exists()
    .withMessage("id parameter is required")
    .bail()
    .isMongoId()
    .withMessage("id must be a MongoDB object ID");
const makeApplicantNumberValidator = () =>
  body("applicantNumber")
    .exists()
    .withMessage("applicantNumber is required")
    .bail()
    .isString()
    .withMessage("applicantNumber must be a string")
    .bail()
    .notEmpty()
    .withMessage("applicantNumber cannot be empty");

const makeApplicantNameValidator = () =>
  body("applicantName")
    .exists()
    .withMessage("applicantName is required")
    .bail()
    .isString()
    .withMessage("applicantName must be a string")
    .bail()
    .notEmpty()
    .withMessage("applicantName cannot be empty");

const makeDateSubmittedValidator = () =>
  body("dateSubmitted")
    .exists()
    .withMessage("dateSubmitted is required")
    .bail()
    .isISO8601()
    .withMessage("dateSubmitted must be a valid ISO 8601 date string (e.g., YYYY-MM-DD)");

const makeStatusValidator = () =>
  body("status")
    .optional()
    .isString()
    .bail()
    .isIn(STATUS_OPTIONS)
    .withMessage("status must be one of: Under Review, Need to Review, Reviewed");

const makeDateOfBirthValidator = () =>
  body("dateOfBirth")
    .exists()
    .withMessage("dateOfBirth is required")
    .bail()
    .isISO8601()
    .withMessage("dateOfBirth must be a valid ISO 8601 date string (e.g., YYYY-MM-DD)");

const makeRaceValidator = () =>
  body("race")
    .exists()
    .withMessage("race is required")
    .bail()
    .isString()
    .bail()
    .isIn(RACE_OPTIONS)
    .withMessage("race must be a valid option from the list");

const makeGenderValidator = () =>
  body("gender")
    .exists()
    .withMessage("gender is required")
    .bail()
    .isString()
    .bail()
    .isIn(GENDER_OPTIONS)
    .withMessage("gender must be a valid option from the list");

const makeIdPhotoValidator = () =>
  body("idPhoto")
    .exists()
    .withMessage("idPhoto is required")
    .bail()
    .isObject()
    .withMessage("idPhoto must be an object")
    .bail()
    .custom(
      (val: unknown) =>
        typeof val === "object" &&
        val !== null &&
        typeof (val as Record<string, unknown>).url === "string" &&
        typeof (val as Record<string, unknown>).name === "string",
    )
    .withMessage("idPhoto must contain url and name strings");

const makeEmailValidator = () =>
  body("email")
    .exists()
    .withMessage("email is required")
    .bail()
    .isString()
    .withMessage("email must be a string");

const makeAddressValidator = () =>
  body("address")
    .exists()
    .withMessage("address is required")
    .bail()
    .isString()
    .withMessage("address must be a string");

const makePhoneNumberValidator = () =>
  body("phoneNumber")
    .exists()
    .withMessage("phoneNumber is required")
    .bail()
    .isString()
    .withMessage("phoneNumber must be a string");

const makeHousingStatusValidator = () =>
  body("housingStatus")
    .optional()
    .isString()
    .bail()
    .isIn(HOUSING_STATUS_OPTIONS)
    .withMessage("housingStatus must be a valid option from the list");

const makeEducationStatusValidator = () =>
  body("educationStatus")
    .optional()
    .isString()
    .bail()
    .isIn(EDUCATION_OPTIONS)
    .withMessage("educationStatus must be a valid option from the list");

const makeEmploymentStatusValidator = () =>
  body("employmentStatus")
    .optional()
    .isString()
    .bail()
    .isIn(EMPLOYMENT_OPTIONS)
    .withMessage("employmentStatus must be a valid option from the list");

const makeConvictionDetailsValidator = () =>
  body("convictionDetails").optional().isString().withMessage("convictionDetails must be a string");

const makeAidRequestedValidator = () =>
  body("aidRequested")
    .exists()
    .withMessage("aidRequested is required")
    .bail()
    .isArray()
    .bail()
    .custom((arr: string[] | undefined) => {
      if (!Array.isArray(arr)) return true;
      return arr.every((item) =>
        AID_REQUESTED_OPTIONS.includes(item as (typeof AID_REQUESTED_OPTIONS)[number]),
      );
    })
    .withMessage(`aidRequested must be selected from: ${AID_REQUESTED_OPTIONS.join(", ")}`);

const makeOtherAidRequestedValidator = () =>
  body("otherAidRequested").optional().isString().withMessage("otherAidRequested must be a string");

const makeAdditionalCommentsValidator = () =>
  body("additionalComments")
    .optional()
    .isString()
    .withMessage("additionalComments must be a string");

const makeTodosValidator = () =>
  body("todos")
    .optional()
    .isArray()
    .bail()
    .custom((arr: unknown[] | undefined) => {
      if (!Array.isArray(arr)) return true;
      return arr.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          "id" in item &&
          typeof (item as { id: unknown }).id === "string" &&
          "label" in item &&
          typeof (item as { label: unknown }).label === "string" &&
          "completed" in item &&
          typeof (item as { completed: unknown }).completed === "boolean",
      );
    })
    .withMessage("todos must be an array of { id: string, label: string, completed: boolean }");

const makeNotesValidator = () =>
  body("notes")
    .optional()
    .isArray()
    .bail()
    .custom((arr: unknown[] | undefined) => {
      if (!Array.isArray(arr)) return true;
      return arr.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          "date" in item &&
          typeof (item as { date: unknown }).date === "string" &&
          "content" in item &&
          typeof (item as { content: unknown }).content === "string",
      );
    })
    .withMessage("notes must be an array of { date: string, content: string }");

const makeIsCompletedValidator = () =>
  body("isCompleted")
    .exists()
    .withMessage("isCompleted is required")
    .bail()
    .isBoolean()
    .withMessage("isCompleted must be a boolean");
// ==========================================================
// EXPORTS
// ==========================================================

export const createApplicant = [
  // Required intake fields.
  makeApplicantNumberValidator(),
  makeApplicantNameValidator(),
  // Optional profile/metadata fields.
  makeStatusValidator(),
  makeDateOfBirthValidator(),
  makeRaceValidator(),
  makeGenderValidator(),
  makeIdPhotoValidator(),
  makeEmailValidator(),
  makeAddressValidator(),
  makePhoneNumberValidator(),
  makeHousingStatusValidator(),
  makeEducationStatusValidator(),
  makeEmploymentStatusValidator(),
  makeConvictionDetailsValidator(),
  makeAidRequestedValidator(),
  makeOtherAidRequestedValidator(),
  makeAdditionalCommentsValidator(),
  // Optional nested structured fields.
  makeTodosValidator(),
  makeNotesValidator(),
  makeIsCompletedValidator(),
];

export const updateApplicant = [
  // Enforce identity consistency for update requests.
  makeIDValidator(),
  // Required core fields for full-record update.
  makeApplicantNumberValidator(),
  makeApplicantNameValidator(),
  makeDateSubmittedValidator(),
  // Optional profile/metadata fields.
  makeStatusValidator(),
  makeDateOfBirthValidator(),
  makeRaceValidator(),
  makeGenderValidator(),
  makeIdPhotoValidator(),
  makeEmailValidator(),
  makeAddressValidator(),
  makePhoneNumberValidator(),
  makeHousingStatusValidator(),
  makeEducationStatusValidator(),
  makeEmploymentStatusValidator(),
  makeConvictionDetailsValidator(),
  makeAidRequestedValidator(),
  makeOtherAidRequestedValidator(),
  makeAdditionalCommentsValidator(),
  // Optional nested structured fields.
  makeTodosValidator(),
  makeNotesValidator(),
  makeIsCompletedValidator(),
];

export const removeApplicant = [makeParamIDValidator()];
