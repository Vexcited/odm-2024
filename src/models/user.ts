import { Schema, model } from "mongoose";

export interface IUser {
  fullName?: string
  email: string
  password: string
}

const schema = new Schema<IUser>({
  fullName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export const User = model<IUser>("User", schema);
