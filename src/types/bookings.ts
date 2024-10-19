import type { APIResponse } from "./response";

export type APIResponseBookingAvailability = APIResponse<{
  available: boolean
}>;
