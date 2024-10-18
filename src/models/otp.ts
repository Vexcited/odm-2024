import { Schema, model } from "mongoose";

export interface IOTP {
  createdAt: Date
  email: string
  otp: string
}

const schema = new Schema<IOTP>({
  createdAt: { type: Date, default: Date.now },
  email: { type: String, required: true },
  otp: { type: String, required: true }
});

export const OTP = model<IOTP>("OTP", schema);
