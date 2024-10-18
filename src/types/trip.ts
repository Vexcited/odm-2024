import type { ITrip } from "~/models/trip";
import { APIResponse } from "./response";

export enum EnvironmentType {
  CONTRYSIDE = "CONTRYSIDE",
  SUBURB = "SUBURB",
  CITY = "CITY"
}

export enum ServiceType {
  DESK = "DESK",
  WIFI = "WIFI",
  ACCESSIBILITY = "ACCESSIBILITY",
  WASHING_MACHINE = "WASHING_MACHINE"
  // NOTE: on pourrait en avoir d'autres dans le futur
}

export const environmentTypeToString = (type: EnvironmentType): string => {
  switch (type) {
    case EnvironmentType.CITY : return "Ville";
    case EnvironmentType.SUBURB : return "Banlieue";
    case EnvironmentType.CONTRYSIDE : return "Campagne";
  }
};

export type APITripItem = ITrip & {
  _id: string
};

export type APIResponseTrip = APIResponse<APITripItem>;
