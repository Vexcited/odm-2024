import { error } from "./errors";

export const readJSON = async <T extends object>(request: Request): Promise<T> => {
  try {
    const json = await request.json();
    return json as T;
  }
  catch {
    throw error("la requête envoyée n'est pas formatée en JSON", 400);
  }
};

export const readBearer = (request: Request): string | null => {
  const header = request.headers.get("authorization");
  if (!header) return null;

  const parts = header.split(" ");
  const token = parts[1]; // "Bearer T.OK.EN"

  return token || null;
};
