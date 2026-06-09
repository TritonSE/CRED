/**
 * Frontend mirror of the applicant enums defined in `backend/src/models/applicant.ts`.
 *
 * Duplicated here (rather than imported across the API boundary) because the
 * frontend can't reach into backend source code at build time. Keep these in
 * sync with the backend `*_OPTIONS` tuples — adding/removing a value on either
 * side requires updating both files (and the mongoose schema's `enum` clause).
 */

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

export const AID_REQUESTED_OPTIONS = ["Housing", "Education", "Development"] as const;
