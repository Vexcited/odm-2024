import type { APIResponse } from "./response";
import type { APITripItem } from "./trip";

export type APIResponseSearch = APIResponse<Array<APITripItem>>;
