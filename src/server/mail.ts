import mailer from "nodemailer";

/**
 * Permet d'envoyer un mail par Gmail à l'adresse "to".
 */
export const sendMail = async (to: string, subject: string, text: string): Promise<void> => {
  const transporter = mailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILER_SENDER,
      pass: process.env.MAILER_APP_PASSWORD
    }
  });

  await transporter.sendMail({
    from: process.env.MAILER_SENDER,
    to, subject, text
  });
};
