import { Document, Model, Schema, model, models } from "mongoose";

import type { InferSchemaType } from "mongoose";

// Allowed values for race-related applicant metadata.
export const RACE_OPTIONS = [
  "White",
  "Black or African American",
  "Asian",
  "American Indian or Alaska Native",
  "Native Hawaiian or Other Pacific Islander",
  "Two or More Races",
  "Hispanic or Latino",
  "Not Hispanic or Latino",
  "Other",
] as const;

export const STATUS_OPTIONS = ["Under Review", "Need to Review", "Reviewed"] as const;

// Allowed values for applicant gender identity.
export const GENDER_OPTIONS = [
  "Male",
  "Female",
  "Non-binary",
  "Prefer not to say",
  "Other",
] as const;

// Allowed values describing current housing situation.
export const HOUSING_STATUS_OPTIONS = [
  "Homeless",
  "At-risk of homelessness",
  "Transitional housing",
  "Stable housing",
  "Incarcerated",
  "Other",
] as const;

// Allowed values describing applicant education level.
export const EDUCATION_OPTIONS = [
  "Less than high school",
  "High school diploma or GED",
  "Some college",
  "Associate degree",
  "Bachelor's degree",
  "Graduate or professional degree",
  "Other",
] as const;

// Allowed values describing current employment status.
export const EMPLOYMENT_OPTIONS = [
  "Employed full-time",
  "Employed part-time",
  "Self-employed",
  "Unemployed and seeking work",
  "Unemployed and not seeking work",
  "Student",
  "Retired",
  "Unable to work",
  "Other",
] as const;

// Supported aid categories requested by the applicant.
export const AID_REQUESTED_OPTIONS = ["Housing", "Education", "Development"] as const;

// Embedded todo items shown in expanded applicant views.
const todoSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    completed: { type: Boolean, required: true },
  },
  { _id: false },
);

// Embedded free-form notes associated with an applicant.
const noteSchema = new Schema(
  {
    date: { type: String, required: true },
    content: { type: String, required: true },
  },
  { _id: false },
);

const counterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter =
  (models.Counter as Model<{ _id: string; seq: number }>) || model("Counter", counterSchema);

/**
 * Core applicant persistence schema used by the API.
 * Optional fields support progressive intake where partial information may be saved first.
 */
const applicantSchema = new Schema(
  {
    applicantNumber: { type: String, required: true },
    applicantName: { type: String, required: true },
    dateSubmitted: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      default: "Need to Review",
      enum: STATUS_OPTIONS,
    },
    dateOfBirth: { type: Date, required: true },
    race: {
      type: String,
      enum: RACE_OPTIONS,
      required: true,
    },
    gender: {
      type: String,
      enum: GENDER_OPTIONS,
      required: true,
    },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    housingStatus: {
      type: String,
      enum: HOUSING_STATUS_OPTIONS,
    },
    otherHousingStatus: { type: String },
    educationStatus: {
      type: [String],
      enum: EDUCATION_OPTIONS,
    },
    otherEducationStatus: { type: String },
    employmentStatus: {
      type: [String],
      enum: EMPLOYMENT_OPTIONS,
    },
    otherEmploymentStatus: { type: String },
    convictionDetails: { type: String },
    aidRequested: {
      type: [String],
      enum: AID_REQUESTED_OPTIONS,
      required: true,
    },
    otherAidRequested: { type: String },
    additionalComments: { type: String },
    todos: [todoSchema],
    notes: [noteSchema],
    isCompleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

export type Applicant = InferSchemaType<typeof applicantSchema>;

applicantSchema.pre("validate", async function (this: Document & Applicant, next) {
  if (this.isNew && !this.applicantNumber) {
    const counter = await Counter.findOneAndUpdate(
      { _id: "applicantNumber" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );
    if (counter) {
      this.applicantNumber = `CF-${counter.seq.toString().padStart(8, "0")}`;
    }
  }
  next();
});

// Reuse existing model in dev/hot-reload environments to avoid OverwriteModelError.
export default (models.Applicant as Model<Applicant>) ||
  model<Applicant>("Applicant", applicantSchema);
