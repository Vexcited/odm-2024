import type { APIResponse } from "./response";

export type APIResponseAuth = APIResponse<{
  token: string
}>;
