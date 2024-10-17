import { json } from "~/server/response";

export const handleError = (error: any): Response => {
  if (error instanceof Response) return error;
  return error(error.message || "une erreur inconnue est survenue.");
};


export const error = (message: string, code = 500): Response => {
  return json({
    success: false,
    error: message
  }, code);
};
