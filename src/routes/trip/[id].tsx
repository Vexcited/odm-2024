import { batch, Component, createEffect, createResource, createSignal, For, on, Show } from "solid-js";
import { A, useNavigate, useParams } from "@solidjs/router";
import ky from "ky";

import { type APIResponseTrip, environmentTypeToString, ServiceType } from "~/types/trip";
import Map from "~/components/atoms/map";

import MdiWifi from "~icons/mdi/wifi";
import MdiHumanWheelchair from "~icons/mdi/human-wheelchair";
import MdiDesk from "~icons/mdi/desk";
import MdiLoading from "~icons/mdi/loading";
import MdiWashingMachine from "~icons/mdi/washing-machine";
import BulletPoint from "~/components/atoms/bullet-point";
import DateSelector from "~/components/atoms/date-selector";
import { APIResponseBookingAvailability } from "~/types/bookings";
import auth from "~/stores/auth";
import Title from "~/meta/title";
import { nDaysAfter } from "~/utils/dates";
import PeopleSelector from "~/components/molecules/people-selector";
import toast from "solid-toast";

const ServiceIcon: Component<{ type: ServiceType, class: string }> = (props) => {
  let Item: Component<{ class: string }>;

  switch (props.type) {
    case ServiceType.WIFI:
      Item = MdiWifi;
      break;
    case ServiceType.ACCESSIBILITY:
      Item = MdiHumanWheelchair;
      break;
    case ServiceType.DESK:
      Item = MdiDesk;
      break;
    case ServiceType.WASHING_MACHINE:
      Item = MdiWashingMachine;
      break;
  }

  return <Item class={props.class} />;
};

export default function TripDetailsPage () {
  const navigate = useNavigate();
  const params = useParams<{
    id: string
  }>();

  const [trip] = createResource(() => params.id, async (id) => {
    const response = await ky.get(`/api/trip/${id}`).json<APIResponseTrip>();
    if (!response.success) throw new Error(response.error);
    return response.data;
  });

  const [available, setAvailable] = createSignal(false);
  const [amountOfPeople, setAmountOfPeople] = createSignal(1);
  const [from, setFrom] = createSignal(new Date());
  const [to, setTo] = createSignal(nDaysAfter(new Date(), 2));

  const [bookingLoading, setBookingLoading] = createSignal(false);

  createEffect(on([trip, from, to], async ([trip, from, to]) => {
    try {
      if (!trip) return;
      setBookingLoading(true);

      const response = await ky.post(`/api/trip/${trip._id}/booking`, {
        json: {
          from,
          to
        }
      }).json<APIResponseBookingAvailability>();

      if (!response.success) {
        setAvailable(false);
        return;
      }

      setAvailable(response.data.available);
    }
    catch {
      setAvailable(false);
    }
    finally {
      setBookingLoading(false);
    }
  }));

  const handleBooking = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();

    try {
      if (!trip()) return;
      setBookingLoading(true);

      // si l'utilisateur n'est pas authentifié, il ne peut pas
      // faire de reservation donc on le redirige vers la page
      // d'authentification.
      if (!auth.isAuthenticated) {
        navigate("/auth");
        return;
      }

      const response = await auth.http().put(`/api/trip/${trip()!._id}/booking`, {
        json: {
          amountOfPeople: amountOfPeople(),
          from: from(),
          to: to()
        }
      }).json<{ success: boolean }>();

      if (response.success) {
        toast.success(`vous venez de réserver ${trip()?.title}`);
        navigate("/profile/reservations");
        return;
      }

      toast.error("une erreur s'est produite lors de la réservation");
    }
    finally {
      setBookingLoading(false);
    }
  };

  return (
    <main class="mt-6">
      <Show when={!trip.loading && trip()}>
        {(trip) => (
          <div class="container mx-auto space-y-16">
            <Title>
              {trip().title.toLowerCase()}
            </Title>

            <div class="flex gap-12 flex-col tb:flex-row sm:px-6">
              <img
                class="flex-shrink-0 w-fit mx-auto tb:(max-w-400px h-500px -rotate-1 scale-105 object-cover)  border-2 border-white shadow-xl rounded-2xl"
                src={`/cdn/${trip().previewImage}`}
                alt={trip().title}
              />

              <Map
                class="w-full h-250px md:h-500px flex-grow relative sm:rounded-2xl z-5"
                latitude={trip().latitude}
                longitude={trip().longitude}
              />
            </div>

            <div class="flex flex-col tb:flex-row justify-between sm:px-6 gap-12">
              <div class="px-6 sm:px-0">
                <div class="flex flex-col w-full">
                  <h1 class="text-4xl font-500">
                    {trip().title}
                  </h1>
                  <div class="flex flex-wrap mt-3 sm:mt-0 line-height-tight items-center gap-2 opacity-90">
                    <p>{trip().city}</p>
                    <BulletPoint />
                    <p>{trip().country}</p>
                    <BulletPoint />
                    <p>{trip().amountOfBedrooms} chambre(s)</p>
                    <BulletPoint />
                    <p>En {environmentTypeToString(trip().environment)}</p>
                  </div>

                  <p class="mt-4 text-lg">
                    {trip().description}
                  </p>
                </div>

                <div class="flex flex-col gap-2 mt-8">
                  <For each={trip().services}>
                    {(service) => (
                      <div class="flex items-start gap-2.5">
                        <ServiceIcon
                          type={service.type}
                          class="text-lg text-black"
                        />
                        <p class="line-height-snug">
                          {service.description}
                        </p>
                      </div>
                    )}
                  </For>
                </div>
              </div>

              <div class="flex-shrink-0 tb:max-w-400px w-full border-y sm:(border-x shadow-sm rounded-3xl)">
                <div class="flex flex-col items-center justify-center py-6">
                  <strong class="font-600 text-5xl">{trip().pricePerNight} €</strong>
                  <p>par nuit</p>
                </div>

                <hr />

                <form
                  class="p-4"
                  onSubmit={handleBooking}
                >
                  <div class="flex items-center justify-between gap-1 mb-4">
                    <div class="pl-2 flex flex-col">
                      <p class="font-500">
                        effectuer une réservation
                      </p>
                      <p class="text-black/80 text-sm">
                        pour {amountOfPeople()} personne{amountOfPeople() > 1 ? "s" : ""}
                      </p>
                    </div>

                    <PeopleSelector
                      amountOfPeople={amountOfPeople()}
                      setAmountOfPeople={setAmountOfPeople}
                    />
                  </div>

                  <div class="flex flex-col divide-y sm:(flex-row divide-x divide-y-0) border rounded-2xl mb-6">
                    <div class="w-full flex flex-col px-2 py-2">
                      <p class="pl-2 text-sm font-500">du</p>
                      <DateSelector class="px-3 py-2 mt-1 w-full rounded-xl focus:outline-#1D52A0"
                        value={from()}
                        onUpdate={setFrom}
                      />
                    </div>
                    <div class="w-full flex flex-col px-2 py-2">
                      <p class="pl-2 text-sm font-500">au</p>
                      <DateSelector class="px-3 py-2 mt-1 w-full rounded-xl focus:outline-#1D52A0"
                        value={to()}
                        onUpdate={setTo}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!available()}
                    class="text-white bg-#1D52A0  hover:bg-#1D52A0/90 focus:(outline-offset-3 outline-#1D52A0 bg-#1D52A0/90) text-center w-full px-4 py-2 rounded-full transition-colors"
                    classList={{
                      "disabled:(bg-red/20 text-#561010)": !available(),
                      "disabled:(bg-gray-300 text-gray-900)": bookingLoading()
                    }}
                  >
                    <Show when={bookingLoading()}
                      fallback={
                        available() ? "réserver" : "non disponible pour cette période"
                      }
                    >
                      <div class="flex justify-center items-center gap-2">
                        <MdiLoading class="text-lg animate-spin"/>
                        chargement des données...
                      </div>
                    </Show>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </Show>
    </main>
  );
}
