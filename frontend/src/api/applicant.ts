import { del, get, handleAPIError, post, put } from "./requests";

import type { APIResult } from "./requests";

/**
 * Defines the "shape" of an Applicant object (what fields are present and their types) for
 * frontend components to use.
 */
export type Applicant = {
  _id: string;
  applicantNumber: string;
  applicantName: string;
  dateSubmitted: Date;
  status: string;
  dateOfBirth: Date;
  race: string;
  gender: string;
  email: string;
  address: string;
  phoneNumber: string;
  housingStatus?: string;
  educationStatus?: string;
  employmentStatus?: string;
  convictionDetails?: string;
  aidRequested: string[];
  otherAidRequested?: string;
  additionalComments?: string;
  todos?: { id: string; label: string; completed: boolean }[];
  notes?: { date: string; content: string }[];
  isCompleted: boolean;
};

type ApplicantJSON = {
  _id: string;
  applicantNumber: string;
  applicantName: string;
  dateSubmitted: string;
  status: string;
  dateOfBirth: string;
  race: string;
  gender: string;
  email: string;
  address: string;
  phoneNumber: string;
  housingStatus?: string;
  educationStatus?: string;
  employmentStatus?: string;
  convictionDetails?: string;
  aidRequested: string[];
  otherAidRequested?: string;
  additionalComments?: string;
  todos?: { id: string; label: string; completed: boolean }[];
  notes?: { date: string; content: string }[];
  isCompleted: boolean;
};

/**
 * Converts a raw API JSON payload into frontend-friendly types.
 * Date-like strings are normalized to `Date` objects for component consumption.
 */
function parseApplicant(applicant: ApplicantJSON): Applicant {
  return {
    _id: applicant._id,
    applicantNumber: applicant.applicantNumber,
    applicantName: applicant.applicantName,
    dateSubmitted: new Date(applicant.dateSubmitted),
    status: applicant.status,
    dateOfBirth: new Date(applicant.dateOfBirth),
    race: applicant.race,
    gender: applicant.gender,
    email: applicant.email,
    address: applicant.address,
    phoneNumber: applicant.phoneNumber,
    housingStatus: applicant.housingStatus,
    educationStatus: applicant.educationStatus,
    employmentStatus: applicant.employmentStatus,
    convictionDetails: applicant.convictionDetails,
    aidRequested: applicant.aidRequested,
    otherAidRequested: applicant.otherAidRequested,
    additionalComments: applicant.additionalComments,
    todos: applicant.todos,
    notes: applicant.notes,
    isCompleted: applicant.isCompleted,
  };
}

export type CreateApplicantRequest = {
  applicantNumber: string;
  applicantName: string;
  status?: string;
  dateOfBirth: Date;
  race: string;
  gender: string;
  email: string;
  address: string;
  phoneNumber: string;
  housingStatus?: string;
  educationStatus?: string;
  employmentStatus?: string;
  convictionDetails?: string;
  aidRequested: string[];
  otherAidRequested?: string;
  additionalComments?: string;
  todos?: { id: string; label: string; completed: boolean }[];
  notes?: { date: string; content: string }[];
  isCompleted?: boolean;
};

export type UpdateApplicantRequest = {
  _id: string;
  applicantNumber: string;
  applicantName: string;
  dateSubmitted: Date;
  status?: string;
  dateOfBirth: Date;
  race: string;
  gender: string;
  email: string;
  address: string;
  phoneNumber: string;
  housingStatus?: string;
  educationStatus?: string;
  employmentStatus?: string;
  convictionDetails?: string;
  aidRequested: string[];
  otherAidRequested?: string;
  additionalComments?: string;
  todos?: { id: string; label: string; completed: boolean }[];
  notes?: { date: string; content: string }[];
  isCompleted: boolean;
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
 * Fetch applicants with an always-consistent `{ data, meta }` response shape.
 */
export async function getAllApplicants(
  options?: GetApplicantsOptions,
): Promise<APIResult<PaginatedResponse<Applicant>>> {
  try {
    // Construct query parameters only when they are provided by the caller.
    const params = new URLSearchParams();
    if (options?.page) params.append("page", options.page.toString());
    if (options?.limit) params.append("limit", options.limit.toString());
    if (options?.sortBy) params.append("sortBy", options.sortBy);
    if (options?.order) params.append("order", options.order);

    const queryString = params.toString();
    const url = queryString ? `/api/applicant?${queryString}` : `/api/applicant`;

    const response = await get(url);
    const result = (await response.json()) as {
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

/**
 * Permanently delete an applicant record by its MongoDB id.
 */
export async function deleteApplicant(id: string): Promise<APIResult<null>> {
  try {
    await del(`/api/applicant/${id}`);
    return { success: true, data: null };
  } catch (error) {
    return handleAPIError(error);
  }
}
