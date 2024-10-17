import type { APIEvent } from "@solidjs/start/server";
import { error, handleError } from "~/server/errors";
import { readJSON } from "~/server/request";
import { json } from "~/server/response";
import { Trip } from "~/models/trip";

export async function POST ({ request }: APIEvent) {
  try {
    const body = await readJSON<{
      amountOfPeople: number
      environment?: string
      continent?: string
      country?: string
    }>(request);

    if (body.amountOfPeople < 1)
      return error("le nombre de personnes doit être supérieur ou égal à 1");

    // permet d'avoir un objet "clean" qui n'interfère pas
    // dans la requête vers mongodb.
    const parameters: Record<string, unknown> = {};
    const copyToParameters = (key: string) => {
      const value = body[key as keyof typeof body];
      if (value) parameters[key] = value;
    };

    copyToParameters("environment");
    copyToParameters("continent");
    copyToParameters("country");

    const trips = await Trip.find(parameters);

    return json({
      success: true,
      data: trips
    });
  }
  catch (error) {
    handleError(error);
  }
}
