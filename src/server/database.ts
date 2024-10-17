import mongoose from "mongoose";
export const assertMongoConnection = () => mongoose.connect("mongodb://localhost:27017/worldskills-travel");
