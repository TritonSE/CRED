import { get, handleAPIError, post, put } from "../api/requests";

import type { APIResult } from "../api/requests";

/**
 * Defines the "shape" of a Applicant object (what fields are present and their types) for
 * frontend components to use. This will be the return type of most functions in this
 * file.
 */
export type Applicant = {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  raceEthnicity: string;
  gender: string;
  cdcrNumber?: string;
  description?: string;
  typeOfAid: string[];
  otherAidDescription?: string;
  status: string;
  actionPlan?: string;
};

/**
 * Defines the shape of JSON that we'll receive from the backend when we ask the API
 * for a Applicant object. That is, when the backend sends us a JSON object representing a
 * Applicant, we expect it to match these fields and types.
 *
 * The difference between this type and `Applicant` above is that `dateCreated` is a string
 * instead of a Date object. This is because JSON doesn't support Dates, so we use a
 * date-formatted string in requests and responses.
 */
type ApplicantJSON = {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  raceEthnicity: string;
  gender: string;
  cdcrNumber?: string;
  description?: string;
  typeOfAid: string[];
  otherAidDescription?: string;
  status: string;
  actionPlan?: string;
};

/**
 * Converts a Applicant from JSON that only contains primitive types to our custom
 * Applicant interface.
 *
 * @param applicant The JSON representation of the applicant
 * @returns The parsed Applicant object
 */
function parseApplicant(applicant: ApplicantJSON): Applicant {
  return {
    _id: applicant._id,
    firstName: applicant.firstName,
    lastName: applicant.lastName,
    dateOfBirth: new Date(applicant.dateOfBirth),
    raceEthnicity: applicant.raceEthnicity,
    gender: applicant.gender,
    cdcrNumber: applicant.cdcrNumber,
    description: applicant.description,
    typeOfAid: applicant.typeOfAid,
    otherAidDescription: applicant.otherAidDescription,
    status: applicant.status,
    actionPlan: applicant.actionPlan,
  };
}

/**
 * The expected inputs when we want to create a new Applicant object.
 */
export type CreateApplicantRequest = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  raceEthnicity: string;
  gender: string;
  cdcrNumber?: string;
  description?: string;
  typeOfAid: string[];
  otherAidDescription?: string;
  status: string;
  actionPlan?: string;
};

/**
 * The expected inputs when we want to update an existing Applicant object. Similar to
 * `CreateApplicantRequest`.
 */
export type UpdateApplicantRequest = {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  raceEthnicity: string;
  gender: string;
  cdcrNumber?: string;
  description?: string;
  typeOfAid: string[];
  otherAidDescription?: string;
  status: string;
  actionPlan?: string;
};

export async function createApplicant(
  applicant: CreateApplicantRequest,
): Promise<APIResult<Applicant>> {
  try {
    const response = await post("/applicant", applicant);
    const json = (await response.json()) as ApplicantJSON;
    return { success: true, data: parseApplicant(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function getApplicant(id: string): Promise<APIResult<Applicant>> {
  try {
    const response = await get(`/applicant/${id}`);
    const json = (await response.json()) as ApplicantJSON;
    return { success: true, data: parseApplicant(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function getAllApplicants(): Promise<APIResult<Applicant[]>> {
  try {
    const response = await get(`/applicant`);

    const json = (await response.json()) as ApplicantJSON[];

    const applicants = json.map(parseApplicant);

    return { success: true, data: applicants };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function updateApplicant(
  applicant: UpdateApplicantRequest,
): Promise<APIResult<Applicant>> {
  try {
    const response = await put(`/applicant/${applicant._id}`, applicant);
    const json = (await response.json()) as ApplicantJSON;
    return { success: true, data: parseApplicant(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}
