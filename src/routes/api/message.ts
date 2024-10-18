import type { APIEvent } from "@solidjs/start/server";
import { error, handleError } from "~/server/errors";
import { json } from "~/server/response";
import { readJSON } from "~/server/request";
import { sendMail } from "~/server/mail";
import validator from "validator";

export async function POST ({ request }: APIEvent) {
  try {
    const body = await readJSON<{
      name: string
      email: string
      message: string
    }>(request);

    if (!validator.isEmail(body.email)) {
      return error("l'adresse e-mail fourni n'est pas correcte", 400);
    }

    const name = body.name.trim();
    const message = body.message.trim();
    if (!name || !message) {
      return error("votre nom ou le contenu du message ne peut être vide", 400);
    }

    // On envoie un mail sur notre propre boite mail
    // en mettant l'envoyeur en CC.
    await sendMail(process.env.MAILER_SENDER!,
      `Message de la part de ${name}`,
      message + `\n\n---\nDe la part de ${name} <${body.email}>.`,
      body.email
    );

    return json({ success: true });
  }
  catch (error) {
    return handleError(error);
  }
}
