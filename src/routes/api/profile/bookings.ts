import type { APIEvent } from "@solidjs/start/server";
import { Booking as Booking } from "~/models/booking";
import { error, handleError } from "~/server/errors";
import { sendMail } from "~/server/mail";
import { readBearer, readJSON } from "~/server/request";
import { json } from "~/server/response";
import { untokenizeUser } from "~/server/users";

export async function GET ({ request }: APIEvent) {
  try {
    const token = readBearer(request);
    if (!token)
      return error("vous n'êtes pas authentifié", 401);

    const user = await untokenizeUser(token);
    if (!user)
      return error("l'utilisateur renseigné n'existe pas, ou le token est invalide", 403);

    const bookings = await Booking.find({ user })
      .populate("trip");

    return json({
      success: true,
      data: bookings
    });
  }
  catch (error) {
    return handleError(error);
  }
}

export async function DELETE ({ request }: APIEvent) {
  try {
    const token = readBearer(request);
    if (!token)
      return error("vous n'êtes pas authentifié", 401);

    const user = await untokenizeUser(token);
    if (!user)
      return error("l'utilisateur renseigné n'existe pas, ou le token est invalide", 403);

    const body = await readJSON<{
      id: string
    }>(request);

    const booking = await Booking.findById(body.id)
      .populate("trip");

    if (booking) {
      // on supprime la réservation !
      await Booking.findByIdAndDelete(body.id);

      // on envoie un mail pour prévenir l'utilisateur au cas où
      await sendMail(user.email,
        "Annulation de votre réservation",
        `Nous vous informons que votre réservation ${booking.trip.title} à ${booking.trip.city} du ${booking.from.toLocaleDateString("fr-FR")} au ${booking.to.toLocaleDateString("fr-FR")} a été annulé.`
      );
    }

    return json({ success: true });
  }
  catch (error) {
    return handleError(error);
  }
}
