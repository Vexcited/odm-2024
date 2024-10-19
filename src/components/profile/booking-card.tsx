import { type Component } from "solid-js";
import type { IBooking } from "~/models/booking";

import MdiClockStart from "~icons/mdi/clock-start";
import MdiClockEnd from "~icons/mdi/clock-end";
import MdiAccount from "~icons/mdi/account";

const BookingCard: Component<IBooking> = (booking) => {
  return (
    <div class="bg-white relative flex flex-col lg:(flex-row h-250px w-fit) border-2 rounded-3xl transition-all">
      {/* encoche à gauche */}
      <div class="hidden lg:block h-8 w-8 bg-white border-2 rounded-full absolute -left-4 inset-y-0 my-auto" />
      <div class="hidden lg:block h-8 w-8 bg-white rounded-full absolute -left-6 inset-y-0 my-auto" />

      <img class="w-full max-h-400px object-cover rounded-3xl lg:(rounded-r-0 w-400px)" src={`/cdn/${booking.trip.previewImage}`} />
      <div class="w-full lg:max-w-320px flex flex-col justify-between p-4">
        <div class="">
          <div class="flex justify-between gap-4">
            <h2 class="font-500 text-xl line-height-tight truncate">
              {booking.trip.title}
            </h2>
            <p class="flex-shrink-0">
              <strong class="font-600">{booking.trip.pricePerNight} €</strong> / nuit
            </p>
          </div>

          <p class="text-xs">
            {booking.trip.city}, {booking.trip.country}
          </p>

          <div class="flex flex-col mt-4 gap-2 text-black/90">
            <div class="flex items-center gap-2">
              <MdiClockStart class="text-lg" />
              <p class="">
                du <span class="font-500">{new Date(booking.from).toLocaleDateString()}</span>
              </p>
            </div>
            <div class="flex items-center gap-2">
              <MdiClockEnd class="" />
              <p class="text-sm">
                au <span class="font-500">{new Date(booking.to).toLocaleDateString()}</span>
              </p>
            </div>
            <div class="flex items-center gap-2">
              <MdiAccount class="" />
              <p class="text-sm">
                {booking.amountOfPeople} personne(s)
              </p>
            </div>
          </div>
        </div>

        <div class="flex w-full gap-2 mt-8 lg:mt-0">
          <button
            type="button"
            class="w-full text-#561010 hover:bg-red/10 focus:(bg-red/20 outline-#561010) text-center font-500 px-4 py-2 rounded-full transition-colors"
          >
            annuler
          </button>

          <a
            // @ts-expect-error : not typed on the interface
            href={`/trip/${booking.trip._id}`}
            class="w-full text-#1D52A0 hover:bg-#1D52A0/10 focus:(bg-#1D52A0/20 outline-#1D52A0) text-center font-500 px-4 py-2 rounded-full transition-colors"
          >
            annonce
          </a>

        </div>
      </div>

      {/* encoche à droite */}
      <div class="hidden lg:block h-8 w-8 bg-white border-2 rounded-full absolute -right-4 inset-y-0 my-auto" />
      <div class="hidden lg:block h-8 w-8 bg-white rounded-full absolute -right-6 inset-y-0 my-auto" />
    </div>
  );
};

export default BookingCard;
