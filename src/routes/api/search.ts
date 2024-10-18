import type { APIEvent } from "@solidjs/start/server";
import { error, handleError } from "~/server/errors";
import { readJSON } from "~/server/request";
import { json } from "~/server/response";
import { Trip } from "~/models/trip";
import { assertMongoConnection } from "~/server/database";

export async function POST ({ request }: APIEvent) {
  try {
    const body = await readJSON<{
      amountOfPeople: number
      priceRange?: Array<number>
      environment?: string
      continent?: string
      country?: string
      city?: string
    }>(request);

    // permet d'avoir un objet "clean" qui n'interfère pas
    // dans la requête vers mongodb.
    const parameters: Record<string, unknown> = {};
    const copyToParameters = (key: string) => {
      const value = body[key as keyof typeof body];
      if (value) parameters[key] = value;
    };

    if (body.amountOfPeople < 1) {
      return error("le nombre de personnes doit être supérieur ou égal à 1");
    }
    else { // on vérifie qu'il y a autant de lits que de personnes
      parameters.amountOfBedrooms = {
        // gte = plus ou égal
        $gte: body.amountOfPeople
      };
    }

    if (body.priceRange && body.priceRange.length === 2) {
      parameters.pricePerNight = {
        $gte: body.priceRange[0],
        $lte: body.priceRange[1]
      };
    }

    copyToParameters("environment");
    copyToParameters("continent");
    copyToParameters("country");
    copyToParameters("city");

    await assertMongoConnection();
    const trips = await Trip.find(parameters);

    return json({
      success: true,
      data: trips
    });
  }
  catch (error) {
    return handleError(error);
  }
}
