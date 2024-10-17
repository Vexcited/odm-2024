import type { ITrip } from "~/models/trip";
import type { APIResponse } from "./response";

export type APIResponseSearchItem = ITrip & {
  _id: string
};

export type APIResponseSearch = APIResponse<Array<APIResponseSearchItem>>;
