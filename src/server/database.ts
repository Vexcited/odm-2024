import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI)
  throw new Error("Vous n'avez pas défini MONGODB_URI dans le fichier .env");

// @ts-expect-error : définition globale
let cached = global.mongoose;

if (!cached) {
  // @ts-expect-error : redéfinition globale
  cached = global.mongoose = { connection: null, promise: null };
}

/**
 * permet d'assurer la connexion à la base de données.
 * vu que cette fonction est ré-utilisée à plusieurs
 * endroits, on peut l'optimiser en mettant en cache
 * la connexion à mongodb. on utilise "global" pour
 * ça, il n'y a pas vraiment d'autre moyens si l'on
 * veut que cette fonction fonctionne partout (pour
 * tout type de déploiement : serverless, selfhost)
 */
export const assertMongoConnection = async (): Promise<typeof mongoose> => {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, { bufferCommands: false })
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    cached.connection = await cached.promise;
  }
  catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.connection;
};
