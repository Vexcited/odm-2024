import type { APIEvent } from "@solidjs/start/server";
import { assertMongoConnection } from "~/server/database";
import { error, handleError } from "~/server/errors";
import { readJSON } from "~/server/request";
import { json } from "~/server/response";
import { getUser, tokenizeUser } from "~/server/users";
import bcrypt from "bcryptjs";
import { User } from "~/models/user";
import validator from "validator";
import { sendMail } from "~/server/mail";
import { generateOTP } from "~/server/otp";
import { OTP } from "~/models/otp";

export async function POST ({ request }: APIEvent) {
  try {
    const body = await readJSON<{
      otp?: string
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
        return error("le mot de passe est incorrect", 401);
    }
    // l'utilisateur n'existe pas, on va lui créer un compte.
    else {
      // on force la sécurité des mdp utilisateurs
      if (body.password.length <= 8)
        return error("le mot de passe doit faire au moins 8 caractères de long", 400);

      if (!body.otp) {
        const otp = generateOTP();

        const otpEntry = new OTP({
          email: body.email,
          otp
        });

        await otpEntry.save();
        await sendMail(
          body.email,
          "Code OTP pour Worldskills Travel",
          `Pour continuer votre inscription, veuillez entrer le code suivant : ${otp}`
        );

        return error("un code OTP a été envoyé, veuillez le renseigner", 403);
      }
      else {
        const otpEntry = await OTP.findOne({ email: body.email })
          .sort({ createdAt: -1 })
          .limit(1);

        // on vérifie la validité du code otp entré
        if (!otpEntry || otpEntry.otp !== body.otp) {
          return error("OTP invalide", 404);
        }
      }

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
