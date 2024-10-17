import type { APIEvent } from "@solidjs/start/server";
import { error, handleError } from "~/server/errors";
import { readBearer } from "~/server/request";
import { json } from "~/server/response";
import { untokenizeUser } from "~/server/users";

export async function GET ({ request }: APIEvent) {
  try {
    const token = readBearer(request);
    if (!token)
      return error("vous n'êtes pas authentifié", 400);

    const user = await untokenizeUser(token);
    if (!user)
      return error("l'utilisateur renseigné n'existe pas, ou le token est invalide", 403);

    return json({
      success: true,
      data: {
        email: user.email,
        fullName: user.fullName
      }
    });
  }
  catch (error) {
    handleError(error);
  }
}
