import type { APIResponse } from "./response";

export type APIResponseCheck = APIResponse<{
  email: string
  fullName?: string
}>;
