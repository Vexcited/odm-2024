/// Ce script permet d'insérer dans la base de données MongoDB
/// des données de tests pour pouvoir utiliser le site.
///
/// Les données insérées ne concernent
/// uniquement les séjours disponibles.

import { assertMongoConnection } from "~/server/database";
import { EnvironmentType, ServiceType } from "~/types/trip";
import { Trip } from "~/models/trip";

void async function main () {
  await assertMongoConnection();

  {
    const trip = new Trip({
      amountOfBedrooms: 1,
      city: "Limoges",
      continent: "Europe",
      country: "France",
      environment: EnvironmentType.CONTRYSIDE,
      description: "Une cabane cozy dans les bois de Limoges, offrant un havre de paix.",
      latitude: 45.8661055,
      longitude: 1.2088806,
      previewImage: "trip-forest-cozy.jpg",
      pricePerNight: 49,
      title: "Cabane cozy",
      services: [
        {
          type: ServiceType.WIFI,
          description: "Une bonne connexion"
        },
        {
          type: ServiceType.WASHING_MACHINE,
          description: "Une machine à laver à disposition pour tous"
        }
      ]
    });

    await trip.save();
    console.info("+", trip.title);
  }

  {
    const trip = new Trip({
      amountOfBedrooms: 6,
      city: "Chongqing",
      continent: "Asie",
      country: "Chine",
      environment: EnvironmentType.CITY,
      description: "Une villa construite par des maitres de l'architecture pour vous faire passer un bon séjour.",
      latitude: 29.5551095,
      longitude: 106.3837427,
      previewImage: "villa-china.jpg",
      pricePerNight: 119,
      title: "Villa deluxe",
      services: [
        {
          type: ServiceType.WIFI,
          description: "Une très bonne connexion, dôté du Wi-Fi 7"
        },
        {
          type: ServiceType.WASHING_MACHINE,
          description: "Une machine à laver à disposition pour tous"
        },
        {
          type: ServiceType.ACCESSIBILITY,
          description: "Plein sol, permet à n'importe qui d'y accéder en toute facilité"
        },
        {
          type: ServiceType.DESK,
          description: "Plusieurs bureaux sont à votre disposition pour que vous ayez le meilleur confort possible"
        }
      ]
    });

    await trip.save();
    console.info("+", trip.title);
  }

  {
    const trip = new Trip({
      amountOfBedrooms: 2,
      city: "Bordeaux",
      continent: "Europe",
      country: "France",
      environment: EnvironmentType.CONTRYSIDE,
      description: "Une cabane près d'un feu de camp dans les bois de Bordeaux, offrant un endroit très cozy.",
      latitude: 44.8033787,
      longitude: -0.4541597,
      previewImage: "trip-forest-camp.jpg",
      pricePerNight: 59,
      title: "Cabane près d'un feu de camp",
      services: [
        {
          type: ServiceType.ACCESSIBILITY,
          description: "Accessible à tous grâce aux différents aménagements prévu à l'effet"
        }
      ]
    });

    await trip.save();
    console.info("+", trip.title);
  }

  {
    const trip = new Trip({
      amountOfBedrooms: 4,
      city: "Luxembourg",
      continent: "Europe",
      country: "Luxembourg",
      environment: EnvironmentType.SUBURB,
      description: "Une grande maison pour accueilir n'importe quel famille.",
      latitude: 49.6196057,
      longitude: 6.1071263,
      previewImage: "home-city.jpg",
      pricePerNight: 59,
      title: "Grande maison",
      services: [
        {
          type: ServiceType.WIFI,
          description: "Une très bonne connexion"
        },
        {
          type: ServiceType.ACCESSIBILITY,
          description: "Accessible à tous grâce aux différents aménagements prévu à l'effet"
        },
        {
          type: ServiceType.DESK,
          description: "Plusieurs bureaux sont à votre disposition"
        }
      ]
    });

    await trip.save();
    console.info("+", trip.title);
  }

  process.exit(0);
}();
