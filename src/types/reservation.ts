import type { APIResponse } from "./response";

export type APIResponseReservationAvailability = APIResponse<{
  available: boolean
}>;
