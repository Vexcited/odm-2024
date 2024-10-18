import { createResource, For, Show } from "solid-js";
import ReservationCard from "~/components/profile/reservation-card";
import Title from "~/meta/title";
import auth from "~/stores/auth";
import type { APIResponseProfileReservations } from "~/types/profile";

export default function ProfileAccountPage () {
  const [reservations, { refetch }] = createResource(async () => {
    try {
      const response = await auth.http()
        .get("/api/profile/reservations")
        .json<APIResponseProfileReservations>();

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
          <Show when={!reservations.loading}>
            <For each={reservations()}>
              {(reservation) => <ReservationCard {...reservation} />}
            </For>
          </Show>
        </div>
      </div>
    </>
  );
}
