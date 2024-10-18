import { Reservation } from "~/models/reservation";
import { assertMongoConnection } from "./database";
import { error } from "./errors";
import { setDateToMidnight } from "~/utils/dates";

export const checkReservationAvailability = async (tripId: string, from: Date, to: Date): Promise<boolean> => {
  await assertMongoConnection();

  // on regarde s'il n'y a pas déjà une réservation entre "from" et "to".
  const reservations = await Reservation.find({
    from: {
      $gte: from
    },
    to: {
      $gte: to
    },

    trip: tripId
  });

  return reservations.length === 0;
};

export const parseReservationPeriod = (_from: string, _to: string): [from: Date, to: Date] => {
  const from = new Date(_from);
  const to = new Date(_to);

  if (from.getTime() >= to.getTime())
    throw error("la date de fin est après la date de début", 400);

  // on remet l'heure à 0
  setDateToMidnight(from);
  setDateToMidnight(to);

  return [from, to];
};
