import type { APIEvent } from "@solidjs/start/server";
import { assertMongoConnection } from "~/server/database";
import { error, handleError } from "~/server/errors";
import { readJSON } from "~/server/request";
import { json } from "~/server/response";
import { getUser, tokenizeUser } from "~/server/users";
import bcrypt from "bcryptjs";
import { User } from "~/models/user";
import validator from "validator";

export async function POST ({ request }: APIEvent) {
  try {
    const body = await readJSON<{
      email: string
      password: string
    }>(request);

    if (!validator.isEmail(body.email)) {
      return error("l'adresse e-mail fourni n'est pas correcte", 400);
    }

    await assertMongoConnection();

    let user = await getUser(body.email);

    // l'utilisateur existe déjà dans la base de données,
    // vérifions son mot de passe.
    if (user) {
      const passwordMatches = await bcrypt.compare(body.password, user.password);

      if (!passwordMatches)
        return error("le mot de passe est incorrect", 403);
    }
    // l'utilisateur n'existe pas, on va lui créer un compte.
    else {
      const hashedPassword = await bcrypt.hash(body.password, 10);

      const model = new User({
        email: body.email,
        password: hashedPassword
      });

      user = await model.save();
    }

    return json({
      success: true,
      data: { token: tokenizeUser(user) }
    });
  }
  catch (error) {
    return handleError(error);
  }
}
