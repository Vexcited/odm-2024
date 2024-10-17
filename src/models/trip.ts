import { Schema, model } from "mongoose";
import { EnvironmentType, ServiceType } from "~/types/trip";

export interface ITripService {
  type: ServiceType
  description: string
}

const serviceSchema = new Schema<ITripService>({
  type: { type: String, required: true, enum: Object.keys(ServiceType) },
  description: { type: String, required: true }
});

export interface ITrip {
  continent: string
  country: string
  city: string

  latitude: number
  longitude: number

  environment: EnvironmentType

  amountOfBedrooms: number
  pricePerNight: number

  title: string
  description: string

  services: Array<ITripService>,
  /**
   * nom du fichier de l'image qui est dans le pseudo-CDN
   * (localisé dans `/public/cdn`)
   */
  previewImage: string
}

const schema = new Schema<ITrip>({
  continent: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },

  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },

  environment: { type: String, required: true, enum: Object.keys(EnvironmentType) },

  amountOfBedrooms: { type: Number, required: true },
  pricePerNight: { type: Number, required: true },

  title: { type: String, required: true },
  description: { type: String, required: true },

  services: [serviceSchema],
  previewImage: { type: String, required: true }
});

export const Trip = model<ITrip>("Trip", schema);
