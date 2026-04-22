import { handleAPIError, post } from "./requests";

import type { APIResult } from "./requests";

export type SendContactRequest = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

export type SendContactResponse = {
  ok: true;
};

export async function sendContactMessage(
  body: SendContactRequest,
): Promise<APIResult<SendContactResponse>> {
  try {
    const response = await post("/api/contact", body);
    const json = (await response.json()) as SendContactResponse;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
