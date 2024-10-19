import { createResource, For, Show } from "solid-js";
import BookingCard from "~/components/profile/booking-card";
import Title from "~/meta/title";
import auth from "~/stores/auth";
import type { APIResponseProfileBookings } from "~/types/profile";

export default function ProfileAccountPage () {
  const [bookings] = createResource(async () => {
    try {
      const response = await auth.http()
        .get("/api/profile/bookings")
        .json<APIResponseProfileBookings>();

      if (!response.success) throw new Error(response.error);
      return response.data;
    }
    catch (e) {
      auth.handleKyErrors(e);
    }
  });

  return (
    <>
      <Title>
        mes réservations
      </Title>

      <div class="">
        <h2 class="mb-6 text-2xl font-500">
          mes réservations
        </h2>

        <div class="flex flex-col gap-8">
          <Show when={!bookings.loading} fallback={
            <div class="bg-gray-100 animate-duration-400 animate-pulse max-w-625px w-full h-250px container mx-auto rounded-xl" />
          }>
            <For each={bookings()} fallback={
              <p>vous n'avez aucune réservation</p>
            }>
              {(booking) => <BookingCard {...booking} />}
            </For>
          </Show>
        </div>
      </div>
    </>
  );
}
