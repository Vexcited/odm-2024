import type { APIEvent } from "@solidjs/start/server";
import { error, handleError } from "~/server/errors";
import { json } from "~/server/response";
import { Trip } from "~/models/trip";
import { assertMongoConnection } from "~/server/database";

export async function GET ({ params: { id } }: APIEvent) {
  try {
    await assertMongoConnection();
    const trip = await Trip.findById(id);

    if (!trip) {
      return error("aucun séjour trouvé avec l'identifiant donné", 404);
    }

    return json({
      success: true,
      data: trip
    });
  }
  catch (error) {
    return handleError(error);
  }
}
