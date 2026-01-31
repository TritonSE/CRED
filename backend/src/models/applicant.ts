import { Model, Schema, model, models } from "mongoose";

import type { InferSchemaType } from "mongoose";

export const RACE_ETHNICITY_OPTIONS = [
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

export const STATUS_OPTIONS = ["Pending", "Need to Review", "Reviewed"] as const;

export const AID_TYPES = [
  "Transitional/Rental Housing Support",
  "Rent Subsidies/Onsite support",
  "Effective Life skills training",
  "Workforce Development/Employment",
  "Not Sure/Other",
] as const;

const applicantSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    dateOfBirth: { type: Date, required: true },

    raceEthnicity: {
      type: String,
      required: true,
      enum: RACE_ETHNICITY_OPTIONS,
    },

    gender: { type: String, required: true },

    cdcrNumber: { type: String, unique: true, sparse: true },

    description: { type: String },

    typeOfAid: {
      type: [String],
      required: true,
      enum: AID_TYPES,
    },

    otherAidDescription: {
      type: String,
    },

    status: {
      type: String,
      required: true,
      default: "Pending",
      enum: STATUS_OPTIONS,
    },

    actionPlan: { type: String },
  },
  {
    timestamps: true,
  },
);

type Applicant = InferSchemaType<typeof applicantSchema>;

export default (models.Applicant as Model<Applicant>) ||
  model<Applicant>("Applicant", applicantSchema);
