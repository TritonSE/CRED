import { Model, Schema, model, models } from "mongoose";

import type { InferSchemaType } from "mongoose";

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

export const GENDER_OPTIONS = [
  "Male",
  "Female",
  "Non-binary",
  "Prefer not to say",
  "Other",
] as const;

export const HOUSING_STATUS_OPTIONS = [
  "Homeless",
  "At-risk of homelessness",
  "Transitional housing",
  "Stable housing",
  "Incarcerated",
  "Other",
] as const;

export const EDUCATION_OPTIONS = [
  "Less than high school",
  "High school diploma or GED",
  "Some college",
  "Associate degree",
  "Bachelor's degree",
  "Graduate or professional degree",
  "Other",
] as const;

export const AID_REQUESTED_OPTIONS = [
  "Transitional/Rental Housing Support",
  "Rent Subsidies/Onsite support",
  "Effective Life skills training",
  "Workforce Development/Employment",
  "Not Sure/Other",
] as const;

const todoSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    completed: { type: Boolean, required: true },
  },
  { _id: false },
);

const noteSchema = new Schema(
  {
    date: { type: String, required: true },
    content: { type: String, required: true },
  },
  { _id: false },
);

const applicantSchema = new Schema(
  {
    clientNumber: { type: String, required: true },
    clientName: { type: String, required: true },
    dateSubmitted: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      default: "Need to Review",
      enum: STATUS_OPTIONS,
    },
    dateOfBirth: { type: Date },
    race: {
      type: String,
      enum: RACE_OPTIONS,
    },
    gender: {
      type: String,
      enum: GENDER_OPTIONS,
    },
    email: { type: String },
    phoneNumber: { type: String },
    housingStatus: {
      type: String,
      enum: HOUSING_STATUS_OPTIONS,
    },
    education: {
      type: String,
      enum: EDUCATION_OPTIONS,
    },
    convictionDetails: { type: String },
    aidRequested: {
      type: [String],
      enum: AID_REQUESTED_OPTIONS,
    },
    otherAidRequested: { type: String },
    additionalComments: { type: String },
    todos: [todoSchema],
    notes: [noteSchema],
    isCompleted: { type: Boolean },
  },
  {
    timestamps: true,
  },
);

export type Applicant = InferSchemaType<typeof applicantSchema>;

export default (models.Applicant as Model<Applicant>) ||
  model<Applicant>("Applicant", applicantSchema);
