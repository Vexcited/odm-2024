import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI)
  throw new Error("Vous n'avez pas défini MONGODB_URI dans le fichier .env");

export const assertMongoConnection = () => mongoose.connect(MONGODB_URI);
