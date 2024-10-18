import { Schema, model } from "mongoose";
import type { IUser } from "./user";
import type { ITrip } from "./trip";

export interface IReservation {
  createdAt: Date

  user: IUser
  trip: ITrip

  from: Date
  to: Date

  amountOfPeople: number
}

const schema = new Schema<IReservation>({
  createdAt: { type: Date, default: Date.now },

  user: { type: Schema.Types.ObjectId, ref: "User" },
  trip: { type: Schema.Types.ObjectId, ref: "Trip" },

  from: { type: Date, required: true },
  to: { type: Date, required: true },

  amountOfPeople: { type: Number, required: true }
});

export const Reservation = model<IReservation>("Reservation", schema);
