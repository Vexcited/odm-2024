import { json } from "~/server/response";

export const handleError = (err: any): Response => {
  if (err instanceof Response) return err;

  console.error(err);
  return error(err.message || "une erreur inconnue est survenue.");
};


export const error = (message: string, code = 500): Response => {
  return json({
    success: false,
    error: message
  }, code);
};
