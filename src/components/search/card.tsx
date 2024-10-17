import { type Component } from "solid-js";
import type { APIResponseSearchItem } from "~/types/search";

const SearchCard: Component<APIResponseSearchItem> = (trip) => {
  return (
    <div class="bg-white relative flex h-250px w-fit border-2 rounded-3xl md:hover:(scale-105 rotate-1 shadow-lg) transition-all">
      {/* encoche à gauche */}
      <div class="h-8 w-8 bg-white border-2 rounded-full absolute -left-4 inset-y-0 my-auto" />
      <div class="h-8 w-8 bg-white rounded-full absolute -left-6 inset-y-0 my-auto" />

      <img class="w-300px h-full object-cover rounded-l-xl" src={`/cdn/${trip.previewImage}`} />
      <div class="w-320px flex flex-col justify-between p-4">
        <div class="">
          <div class="flex justify-between gap-4">
            <h2 class="font-500 text-xl line-height-tight">
              {trip.title}
            </h2>
            <p class="flex-shrink-0">
              <strong class="font-600">{trip.pricePerNight} €</strong> / nuit
            </p>

          </div>
          <p class="text-xs">
            {trip.city}, {trip.country}
          </p>

          <p class="text-sm mt-2">
            {trip.description}
          </p>
        </div>

        <a
          href={`/trip/${trip._id}`}
          class="text-#1D52A0 hover:bg-#1D52A0/10 focus:(bg-#1D52A0/20 outline-#1D52A0) text-center font-500 w-full px-4 py-2 rounded-full transition-colors"
        >
          voir l'annonce
        </a>
      </div>

      {/* encoche à droite */}
      <div class="h-8 w-8 bg-white border-2 rounded-full absolute -right-4 inset-y-0 my-auto" />
      <div class="h-8 w-8 bg-white rounded-full absolute -right-6 inset-y-0 my-auto" />
    </div>
  );
};

export default SearchCard;
