import { get, handleAPIError, post, put } from "../api/requests";

import type { APIResult } from "../api/requests";

/**
 * Defines the "shape" of a Applicant object (what fields are present and their types) for
 * frontend components to use.
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

// --- NEW TYPES FOR PAGINATION ---

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
};

export type GetApplicantsOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
};

// --- API FUNCTIONS ---

export async function createApplicant(
  applicant: CreateApplicantRequest,
): Promise<APIResult<Applicant>> {
  try {
    const response = await post("/api/applicant", applicant);
    const json = (await response.json()) as ApplicantJSON;
    return { success: true, data: parseApplicant(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function getApplicant(id: string): Promise<APIResult<Applicant>> {
  try {
    const response = await get(`/api/applicant/${id}`);
    const json = (await response.json()) as ApplicantJSON;
    return { success: true, data: parseApplicant(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

/**
 * Updated to support Pagination.
 * Returns either a raw array (if no params) or a PaginatedResponse object (if params exist).
 */
export async function getAllApplicants(
  options?: GetApplicantsOptions,
): Promise<APIResult<Applicant[] | PaginatedResponse<Applicant>>> {
  try {
    // 1. Construct Query String
    const params = new URLSearchParams();
    if (options?.page) params.append("page", options.page.toString());
    if (options?.limit) params.append("limit", options.limit.toString());
    if (options?.sortBy) params.append("sortBy", options.sortBy);
    if (options?.order) params.append("order", options.order);

    const queryString = params.toString();
    const url = queryString ? `/api/applicant?${queryString}` : `/api/applicant`;

    const response = await get(url);
    const json: unknown = await response.json();

    // 2. Handle "All" Response (Array)
    if (Array.isArray(json)) {
      return { success: true, data: (json as ApplicantJSON[]).map(parseApplicant) };
    }

    // 3. Handle "Paginated" Response (Object with data & meta)
    const result = json as {
      data: ApplicantJSON[];
      meta: { total: number; page: number; totalPages: number };
    };
    return {
      success: true,
      data: {
        data: result.data.map(parseApplicant),
        meta: result.meta,
      },
    };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function updateApplicant(
  applicant: UpdateApplicantRequest,
): Promise<APIResult<Applicant>> {
  try {
    const response = await put(`/api/applicant/${applicant._id}`, applicant);
    const json = (await response.json()) as ApplicantJSON;
    return { success: true, data: parseApplicant(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}
