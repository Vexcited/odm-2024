import type { IReservation } from "~/models/reservation";
import type { APIResponse } from "./response";

export type APIResponseProfileReservations = APIResponse<Array<IReservation>>;
