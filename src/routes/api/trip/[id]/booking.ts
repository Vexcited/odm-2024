import type { APIEvent } from "@solidjs/start/server";
import { error, handleError } from "~/server/errors";
import { json } from "~/server/response";
import { Trip } from "~/models/trip";
import { readBearer, readJSON } from "~/server/request";
import { Booking } from "~/models/booking";
import { checkBookingAvailability, parseBookingPeriod } from "~/server/bookings";
import { untokenizeUser } from "~/server/users";
import { sendMail } from "~/server/mail";

export async function POST ({ params: { id }, request }: APIEvent) {
  try {
    const body = await readJSON<{
      from: string,
      to: string
    }>(request);

    const [from, to] = parseBookingPeriod(body.from, body.to);
    const available = await checkBookingAvailability(id, from, to);

    return json({
      success: true,
      data: { available }
    });
  }
  catch (error) {
    return handleError(error);
  }
}

/**
 * route authentifié qui permet de créer une réservation
 * sur un séjour donné (param id ici)
 */
export async function PUT ({ params: { id }, request }: APIEvent) {
  try {
    const token = readBearer(request);
    if (!token)
      return error("vous n'êtes pas authentifié", 401);

    const user = await untokenizeUser(token);
    if (!user)
      return error("l'utilisateur renseigné n'existe pas, ou le token est invalide", 403);

    const body = await readJSON<{
      amountOfPeople: number
      from: string,
      to: string
    }>(request);

    const amountOfPeople = body.amountOfPeople;
    if (amountOfPeople < 1 || amountOfPeople > 4)
      return error("le nombre de personnes assignés à un séjour ne peut être en dessous de 1 ou au dessus de 4", 400);

    const [from, to] = parseBookingPeriod(body.from, body.to);
    const available = await checkBookingAvailability(id, from, to);

    if (!available)
      return error("ce séjour a déjà été reservé pour la période donnée", 400);

    const trip = await Trip.findById(id);
    if (!trip)
      return error("le séjour demandé n'existe pas", 404);

    const booking = new Booking({
      amountOfPeople,
      from, to,
      trip,
      user
    });

    await booking.save();
    await sendMail(user.email,
      "Merci d'avoir reservé chez WorldSkills Travel",
      `Nous venons de recevoir votre réservation pour ${trip.title} du ${from.toLocaleDateString("fr-FR")} au ${to.toLocaleDateString("fr-FR")}.`
    );

    return json({
      success: true
    });
  }
  catch (error) {
    return handleError(error);
  }
}
