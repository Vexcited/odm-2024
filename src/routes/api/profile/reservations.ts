import type { APIEvent } from "@solidjs/start/server";
import { Reservation } from "~/models/reservation";
import { error, handleError } from "~/server/errors";
import { readBearer } from "~/server/request";
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

    const reservations = await Reservation.find({ user })
      .populate("trip");

    return json({
      success: true,
      data: reservations
    });
  }
  catch (error) {
    return handleError(error);
  }
}
