import { Schema, model } from "mongoose";
import type { IUser } from "./user";
import type { ITrip } from "./trip";

export interface IBooking {
  createdAt: Date

  user: IUser
  trip: ITrip

  from: Date
  to: Date

  amountOfPeople: number
}

const schema = new Schema<IBooking>({
  createdAt: { type: Date, default: Date.now },

  user: { type: Schema.Types.ObjectId, ref: "User" },
  trip: { type: Schema.Types.ObjectId, ref: "Trip" },

  from: { type: Date, required: true },
  to: { type: Date, required: true },

  amountOfPeople: { type: Number, required: true }
});

export const Booking = model<IBooking>("Booking", schema);
