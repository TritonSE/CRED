import { get, handleAPIError, post, put } from "../api/requests";

import type { APIResult } from "../api/requests";

/**
 * Defines the "shape" of an Applicant object (what fields are present and their types) for
 * frontend components to use.
 */
export type Applicant = {
  _id: string;
  clientNumber: string;
  clientName: string;
  dateSubmitted: Date;
  status: string;
  dateOfBirth?: Date;
  race?: string;
  gender?: string;
  idPhotoUrl?: string;
  email?: string;
  phoneNumber?: string;
  housingStatus?: string;
  education?: string;
  convictionDetails?: string;
  aidRequested?: string[];
  otherAidRequested?: string;
  additionalComments?: string;
  todos?: { id: string; label: string; completed: boolean }[];
  notes?: { date: string; content: string }[];
  isCompleted?: boolean;
};

type ApplicantJSON = {
  _id: string;
  clientNumber: string;
  clientName: string;
  dateSubmitted: string;
  status: string;
  dateOfBirth?: string;
  race?: string;
  gender?: string;
  idPhotoUrl?: string;
  email?: string;
  phoneNumber?: string;
  housingStatus?: string;
  education?: string;
  convictionDetails?: string;
  aidRequested?: string[];
  otherAidRequested?: string;
  additionalComments?: string;
  todos?: { id: string; label: string; completed: boolean }[];
  notes?: { date: string; content: string }[];
  isCompleted?: boolean;
};

function parseApplicant(applicant: ApplicantJSON): Applicant {
  return {
    _id: applicant._id,
    clientNumber: applicant.clientNumber,
    clientName: applicant.clientName,
    dateSubmitted: new Date(applicant.dateSubmitted),
    status: applicant.status,
    dateOfBirth: applicant.dateOfBirth ? new Date(applicant.dateOfBirth) : undefined,
    race: applicant.race,
    gender: applicant.gender,
    idPhotoUrl: applicant.idPhotoUrl,
    email: applicant.email,
    phoneNumber: applicant.phoneNumber,
    housingStatus: applicant.housingStatus,
    education: applicant.education,
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
  clientNumber: string;
  clientName: string;
  dateSubmitted: Date;
  status?: string;
  dateOfBirth?: Date;
  race?: string;
  gender?: string;
  idPhotoUrl?: string;
  email?: string;
  phoneNumber?: string;
  housingStatus?: string;
  education?: string;
  convictionDetails?: string;
  aidRequested?: string[];
  otherAidRequested?: string;
  additionalComments?: string;
  todos?: { id: string; label: string; completed: boolean }[];
  notes?: { date: string; content: string }[];
  isCompleted?: boolean;
};

export type UpdateApplicantRequest = {
  _id: string;
  clientNumber: string;
  clientName: string;
  dateSubmitted: Date;
  status?: string;
  dateOfBirth?: Date;
  race?: string;
  gender?: string;
  idPhotoUrl?: string;
  email?: string;
  phoneNumber?: string;
  housingStatus?: string;
  education?: string;
  convictionDetails?: string;
  aidRequested?: string[];
  otherAidRequested?: string;
  additionalComments?: string;
  todos?: { id: string; label: string; completed: boolean }[];
  notes?: { date: string; content: string }[];
  isCompleted?: boolean;
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
