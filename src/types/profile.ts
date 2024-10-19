import type { IBooking } from "~/models/booking";
import type { APIResponse } from "./response";

export type APIResponseProfileBookings = APIResponse<Array<IBooking>>;
