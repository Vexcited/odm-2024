import { useSearchParams } from "@solidjs/router";
import ky from "ky";
import { createEffect, createMemo, createSignal, For, on, Show } from "solid-js";
import Field from "~/components/atoms/field";
import PeopleSelector from "~/components/molecules/people-selector";
import SearchCard from "~/components/search/card";
import Title from "~/meta/title";
import type { APIResponseSearch } from "~/types/search";
import { EnvironmentType, environmentTypeToString, type APITripItem } from "~/types/trip";
import { Slider } from "@kobalte/core/slider";
import { NumberRange, NumberRangeString } from "~/utils/modifiers";
import { PrimaryButton } from "~/components/atoms/button";

export default function SearchPage () {
  const [searchParams, setSearchParams] = useSearchParams<{
    amountOfPeople?: string // will be casted as number
    environment?: string
    priceRange?: string
    continent?: string
    country?: string
    city?: string
  }>();

  const amountOfPeople = () => Number(searchParams.amountOfPeople) || 1;

  const [results, setResults] = createSignal<Array<APITripItem> | null>(null);
  const [loading, setLoading] = createSignal(false);
  const [filtersOpened, setFiltersOpened] = createSignal(false);

  const forcePriceRangeInScope = (priceRange: Array<number>): Array<number> => {
    // vérification un peu sale, mais fonctionnelle.
    if (priceRange[0] < 10) priceRange[0] = 10;
    if (priceRange[1] > 200) priceRange[1] = 200;

    return priceRange;
  };

  const priceRange = () => {
    if (!searchParams.priceRange) {
      return [10, 200];
    }

    return forcePriceRangeInScope(NumberRange(searchParams.priceRange));
  };

  const setPriceRange = (values: number[]): void => {
    values = forcePriceRangeInScope(values);

    setSearchParams({
      ...searchParams,
      priceRange: NumberRangeString(values)
    });
  };

  /**
   * helper qui permet de simuler les setters de SolidJS
   * en utilisant la query.
   *
   * @param key clé dans la query à modifier
   * @param start valeur par défaut au cas où rien a été défini dans l'URL, permet de faire un `(prev) => ...`
   * @param modifier une sorte de middleware pour la fonction value
   */
  const mutate = (key: string, start?: any, modifier: typeof String | typeof Number = String) => (value: any) => {
    if (typeof value === "function") {
      // @ts-expect-error : il faudrait des types génériques là...
      value = value(modifier(searchParams[key]) || start);
    }

    setSearchParams({ ...searchParams, [key]: value });
  };

  createEffect(on(
    [
      amountOfPeople,
      priceRange,
      () => searchParams.environment,
      () => searchParams.continent,
      () => searchParams.country,
      () => searchParams.city
    ],
    async ([amountOfPeople, priceRange, environment, continent, country, city]) => {
      setLoading(true);

      try {
        const response = await ky.post("/api/search", {
          json: {
            amountOfPeople,
            priceRange,
            environment,
            continent,
            country,
            city
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
    <main class="flex flex-col items-center gap-6 px-4">
      <Title>
        recherche
      </Title>

      <div class="xl:hidden flex w-full max-w-320px sm:max-w-400px md:(max-w-700px px-0)">
        <PrimaryButton class="ml-auto" type="button" onClick={() => setFiltersOpened((prev) => !prev)}>
          filtres
        </PrimaryButton>
      </div>

      <div class="fixed inset-0 overflow-auto py-20 z-30 flex-col xl:(flex-row relative p-0 overflow-initial z-0) gap-6 px-10 bg-white"
        classList={{
          "flex": filtersOpened(),
          "hidden xl:flex": !filtersOpened()
        }}
      >
        <div class="flex flex-col gap-2">
          <p>personnes</p>
          <PeopleSelector
            amountOfPeople={amountOfPeople()}
            setAmountOfPeople={mutate("amountOfPeople", 1, Number)}
          />
        </div>
        <div class="flex flex-col gap-2">
          <p>environnement</p>
          <select class="bg-gray/15 rounded-full px-5 py-2 w-full outline-#1D52A0"
            onChange={(e) => mutate("environment")(e.currentTarget.value)}
          >
            <option value="">
              n'importe
            </option>
            <For each={Object.keys(EnvironmentType)}>
              {(env) => (
                <option value={env}>
                  {environmentTypeToString(env as EnvironmentType)}
                </option>
              )}
            </For>
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <p>continent</p>
          <select class="bg-gray/15 rounded-full px-5 h-36px w-full outline-#1D52A0"
            onChange={(e) => mutate("continent")(e.currentTarget.value)}
          >
            <option value="">
              n'importe
            </option>

            <option>Europe</option>
            <option>Asie</option>
            <option>États-Unis</option>
          </select>
        </div>
        <div>
          <Field
            label="pays"
            value={searchParams.country ?? ""}
            onUpdate={mutate("country", "")}
          />
        </div>
        <div>
          <Field
            label="ville"
            value={searchParams.city ?? ""}
            onUpdate={mutate("city", "")}
          />
        </div>
        <div>
          <Slider
            class="relative flex flex-col items-center select-none touch-none w-full xl:w-200px"
            step={5}
            minValue={10}
            maxValue={200}
            value={priceRange()}
            onChange={setPriceRange}
          >
            <div class="w-full flex justify-between mb-5.5">
              <Slider.Label>
                tranche de prix
              </Slider.Label>
              <Slider.ValueLabel />
            </div>
            <Slider.Track class="bg-gray-100 relative rounded-full h-2 w-full">
              <Slider.Fill class="absolute bg-gradient-to-r from-#08162B to-#1D52A0 rounded-full h-full" />
              <Slider.Thumb class="block bg-#08162B h-4 w-4 rounded-full -top-1 ">
                <Slider.Input />
              </Slider.Thumb>
              <Slider.Thumb class="block bg-#1D52A0 h-4 w-4 rounded-full -top-1">
                <Slider.Input />
              </Slider.Thumb>
            </Slider.Track>
          </Slider>
        </div>

        <div class="xl:hidden">
          <PrimaryButton
            type="button"
            class="mt-6"
            onClick={() => setFiltersOpened(false)}
          >
            confirmer
          </PrimaryButton>
        </div>
      </div>

      <Show when={!loading()}
        fallback={
          <For each={new Array(3).fill(null)}>
            {() => <div class="bg-gray-100 animate-duration-400 animate-pulse max-w-625px w-full h-250px container mx-auto rounded-xl" />}
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
    </main>
  );
}
