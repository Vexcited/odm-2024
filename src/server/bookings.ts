import { Booking } from "~/models/booking";
import { assertMongoConnection } from "./database";
import { error } from "./errors";
import { setDateToMidnight } from "~/utils/dates";

export const checkBookingAvailability = async (tripId: string, from: Date, to: Date): Promise<boolean> => {
  await assertMongoConnection();

  const bookings = await Booking.find({
    $or: [
      {
        from: { $lt: to },
        to: { $gt: from }
      }
    ],

    trip: tripId
  });

  return bookings.length === 0;
};

export const parseBookingPeriod = (_from: string, _to: string): [from: Date, to: Date] => {
  const from = new Date(_from);
  const to = new Date(_to);

  if (from.getTime() >= to.getTime())
    throw error("la date de fin est après la date de début", 400);

  // on remet l'heure à minuit
  setDateToMidnight(from);
  setDateToMidnight(to);

  if (from.getTime() === to.getTime())
    throw error("la date de début est la même que celle de fin");

  return [from, to];
};
