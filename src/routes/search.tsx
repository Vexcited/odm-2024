import { useSearchParams } from "@solidjs/router";
import ky from "ky";
import { createEffect, createSignal, For, on, Show } from "solid-js";
import SearchCard from "~/components/search/card";
import type { APIResponseSearch, APIResponseSearchItem } from "~/types/search";

export default function SearchPage () {
  const [searchParams, setSearchParams] = useSearchParams<{
    amountOfPeople?: string // will be casted as number
    environment?: string
    continent?: string
    country?: string
  }>();

  const amountOfPeople = () => Number(searchParams.amountOfPeople) || 1;

  const [results, setResults] = createSignal<Array<APIResponseSearchItem> | null>(null);
  const [loading, setLoading] = createSignal(false);

  createEffect(on(
    [
      amountOfPeople,
      () => searchParams.environment,
      () => searchParams.continent,
      () => searchParams.country
    ],
    async ([amountOfPeople, environment, continent, country]) => {
      setLoading(true);

      try {
        const response = await ky.post("/api/search", {
          json: {
            amountOfPeople,
            environment,
            continent,
            country
          }
        }).json<APIResponseSearch>();

        if (response.success) {
          setResults(response.data);
        }
        else throw new Error(response.error);
      }
      catch (error) {
        setResults(null);
      }
      finally {
        setLoading(false);
      }
    }));

  return (
    <div class="flex flex-col items-center gap-6">
      <Show when={!loading()}
        fallback={
          <For each={new Array(6).fill(null)}>
            {() => (
              <div class="bg-gray-800 animate-pulse w-full h-60px container mx-auto"></div>
            )}
          </For>
        }
      >
        <For each={results()}
          fallback={
            <section class="py-24 text-center max-w-400px mx-auto space-y-8">
              <h2 class="text-3xl font-600">
                une prochaine fois peut être ?
              </h2>
              <p class="text-lg line-height-tight text-gray">
                nous n'avons malheureusement rien à vous proposer pour les critères que vous avez choisi.
              </p>
            </section>
          }
        >
          {(trip) => (
            <SearchCard {...trip} />
          )}
        </For>
      </Show>
    </div>
  );
}
