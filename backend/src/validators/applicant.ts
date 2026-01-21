import { body } from "express-validator";

import { AID_TYPES, RACE_ETHNICITY_OPTIONS, STATUS_OPTIONS } from "../models/applicant";

const makeIDValidator = () =>
  body("_id")
    .exists()
    .withMessage("_id is required")
    .bail()
    .isMongoId()
    .withMessage("_id must be a MongoDB object ID");

const makeFirstNameValidator = () =>
  body("firstName")
    .exists()
    .withMessage("firstName is required")
    .bail()
    .isString()
    .withMessage("firstName must be a string")
    .bail()
    .notEmpty()
    .withMessage("firstName cannot be empty");

const makeDateOfBirthValidator = () =>
  body("dateOfBirth")
    .exists()
    .withMessage("dateOfBirth is required")
    .bail()
    .isISO8601()
    .withMessage("dateOfBirth must be a valid ISO 8601 date string (e.g., YYYY-MM-DD)");

const makeRaceEthnicityValidator = () =>
  body("raceEthnicity")
    .exists()
    .withMessage("raceEthnicity is required")
    .bail()
    .isString()
    .withMessage("raceEthnicity must be a string")
    .bail()
    .isIn(RACE_ETHNICITY_OPTIONS)
    .withMessage("raceEthnicity must be a valid option from the list");

const makeGenderValidator = () =>
  body("gender")
    .exists()
    .withMessage("gender is required")
    .bail()
    .isString()
    .withMessage("gender must be a string")
    .notEmpty()
    .withMessage("gender cannot be empty");

const makeCdcrNumberValidator = () =>
  body("cdcrNumber")
    .optional()
    .isString()
    .withMessage("cdcrNumber must be a string");

const makeDescriptionValidator = () =>
  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string");

const makeTypeOfAidValidator = () =>
  body("typeOfAid")
    .exists()
    .withMessage("typeOfAid is required")
    .isArray({ min: 1 }) 
    .withMessage("You must select at least one type of aid")
    .custom((arr: string[]) => {
      return arr.every((item) => AID_TYPES.includes(item as typeof AID_TYPES[number]));
    })
    .withMessage(`typeOfAid must be selected from: ${AID_TYPES.join(", ")}`);

const makeStatusValidator = () =>
  body("status")
    .optional()
    .isString()
    .bail()
    .isIn(STATUS_OPTIONS)
    .withMessage("status must be one of: Pending, Need to Review, Reviewed");

const makeActionPlanValidator = () =>
  body("actionPlan")
    .optional()
    .isString()
    .withMessage("actionPlan must be a string");

// ==========================================================
// EXPORTS
// ==========================================================

export const createApplicant = [
  makeFirstNameValidator(),
  makeDateOfBirthValidator(),
  makeRaceEthnicityValidator(),
  makeGenderValidator(),
  makeCdcrNumberValidator(),
  makeDescriptionValidator(),
  makeTypeOfAidValidator(),
  makeStatusValidator(),
  makeActionPlanValidator(),
];

export const updateApplicant = [
  makeIDValidator(), 
  makeFirstNameValidator(),
  makeDateOfBirthValidator(),
  makeRaceEthnicityValidator(),
  makeGenderValidator(),
  makeCdcrNumberValidator(),
  makeDescriptionValidator(),
  makeTypeOfAidValidator(),
  makeStatusValidator(),
  makeActionPlanValidator(),
];