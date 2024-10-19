import type { APIEvent } from "@solidjs/start/server";
import { Booking } from "~/models/booking";
import { User } from "~/models/user";
import { error, handleError } from "~/server/errors";
import { sendMail } from "~/server/mail";
import { readBearer, readJSON } from "~/server/request";
import { json } from "~/server/response";
import { untokenizeUser } from "~/server/users";

export async function PATCH ({ request }: APIEvent) {
  try {
    const token = readBearer(request);
    if (!token)
      return error("vous n'êtes pas authentifié", 401);

    const user = await untokenizeUser(token);
    if (!user)
      return error("l'utilisateur renseigné n'existe pas, ou le token est invalide", 403);

    const body = await readJSON<{ fullName: string }>(request);

    await User.findOneAndUpdate({ email: user.email }, {
      // le nom n'est pas une propriété requise
      // donc on peut se permettre de void 0
      fullName: body.fullName.trim() || void 0
    });

    return json({ success: true });
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

    // suppression des réservations
    const bookings = await Booking.find({ user });
    for (const booking of bookings) {
      await booking.deleteOne();
    }

    // suppression de l'utilisateur
    await User.findOneAndDelete({ email: user.email });

    await sendMail(user.email,
      "Suppression du compte",
      "Nous vous informons que votre compte a bien été supprimé et que les réservations effectuées ont été annulés."
    );

    return json({ success: true });
  }
  catch (error) {
    return handleError(error);
  }
}
