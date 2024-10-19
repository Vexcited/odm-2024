import { type Component } from "solid-js";
import type { APITripItem } from "~/types/trip";

const SearchCard: Component<APITripItem> = (trip) => {
  return (
    <div class="bg-white relative flex flex-col md:(flex-row h-250px w-fit) border-2 rounded-3xl md:hover:(scale-105 rotate-1 shadow-lg) transition-all">
      {/* encoche à gauche */}
      <div class="hidden md:block h-8 w-8 bg-white border-2 rounded-full absolute -left-4 inset-y-0 my-auto" />
      <div class="hidden md:block h-8 w-8 bg-white rounded-full absolute -left-6 inset-y-0 my-auto" />

      <img class="w-full max-h-400px max-w-320px sm:max-w-400px object-cover rounded-3xl md:(rounded-r-0 w-300px)" src={`/cdn/${trip.previewImage}`} />
      <div class="max-w-320px sm:max-w-400px w-full flex flex-col justify-between gap-6 p-4">
        <div>
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
      <div class="hidden md:block h-8 w-8 bg-white border-2 rounded-full absolute -right-4 inset-y-0 my-auto" />
      <div class="hidden md:block h-8 w-8 bg-white rounded-full absolute -right-6 inset-y-0 my-auto" />
    </div>
  );
};

export default SearchCard;
