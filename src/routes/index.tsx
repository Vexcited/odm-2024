import { useNavigate } from "@solidjs/router";
import { createSignal, For, Show, type Component } from "solid-js";
import { EnvironmentType, environmentTypeToString } from "~/types/trip";
import PeopleSelector from "../components/molecules/people-selector";
import { PrimaryButton } from "~/components/atoms/button";

const HeroLandingImage: Component<{
  x?: number
  y?: number
  src: string
  rotation: number
}> = (props) => {
  return (
    <img
      class="w-full h-full object-cover absolute inset-0 rounded-2xl border-2 border-white bg-white shadow-xl"
      style={{
        translate: `${props.x || 0}px ${props.y || 0}px `,
        rotate: props.rotation + "deg"
      }}
      src={props.src}
    />
  );
};

const HeroLandingForm: Component = () => {
  const navigate = useNavigate();

  const [continent, setContinent] = createSignal<string | null>(null);
  const [environment, setEnvironment] = createSignal<string | null>(null);
  const [amountOfPeople, setAmountOfPeople] = createSignal(1);

  const handleSearchTrip = async (event: SubmitEvent) => {
    event.preventDefault();

    if (!continent() || !environment())
      return;

    const params = new URLSearchParams();
    params.set("continent", continent()!);
    params.set("environment", environment()!);
    params.set("amountOfPeople", String(amountOfPeople() || 1));

    navigate("/search?" + params.toString());
  };

  return (
    <form
      onSubmit={handleSearchTrip}
      class="flex flex-col gap-6 max-w-400px"
    >
      <div class="flex flex-col gap-1">
        <p>où souhaitez vous faire votre séjour ?</p>

        <div class="flex flex-wrap gap-3">
          {["Europe", "Asie", "États-Unis"].map((name) => (
            <button
              type="button"
              class="flex-shrink-0 w-[120px] h-[50px] flex items-center justify-center transition-colors rounded-lg"
              classList={{
                "bg-gray/30": continent() === name,
                "bg-gray/15 hover:bg-gray/25": continent() !== name
              }}
              onClick={() => setContinent(name)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <Show when={continent()}>
        <div class="flex flex-col gap-1">
          <p>quel environnement préférez vous ?</p>

          <div class="flex flex-wrap gap-3">
            <For each={Object.keys(EnvironmentType).map((environment) => ({
              name: environmentTypeToString(environment as EnvironmentType),
              value: environment
            }))}>
              {(env) => (
                <button
                  type="button"
                  class="flex-shrink-0 w-[120px] h-[50px] flex items-center justify-center transition-colors rounded-lg"
                  classList={{
                    "bg-gray/30": environment() === env.value,
                    "bg-gray/15 hover:bg-gray/25": environment() !== env.value
                  }}
                  onClick={() => setEnvironment(env.value)}
                >
                  {env.name}
                </button>
              )}
            </For>
          </div>
        </div>
      </Show>
      <Show when={continent() && environment()}>
        <div class="flex flex-col gap-1">
          <p>pour combien de personnes ?</p>

          <PeopleSelector
            amountOfPeople={amountOfPeople()}
            setAmountOfPeople={setAmountOfPeople}
          />
        </div>

        <PrimaryButton
          type="submit"
          class="mt-4"
        >
          trouver le séjour idéal
        </PrimaryButton>
      </Show>
    </form>
  );
};

export default function HomePage () {
  return (
    <main>
      <section class="gap-6 md:(container pt-18 gap-[160px]) mx-auto flex flex-col items-center xl:(flex-row items-start) justify-center">
        <div class="flex-shrink-0 relative w-full bg-[#1D52A0]/20 md:rounded-xl h-250px h-320px overflow-hidden md:(overflow-initial h-400px w-400px)">
          <HeroLandingImage x={-60} y={40} src="/images/location-1.jpg" rotation={-6} />
          <HeroLandingImage x={60} y={-40} src="/images/location-2.jpg" rotation={4} />
        </div>

        <div class="flex flex-col gap-8 px-6">
          <div>
            <h1 class="text-xl sm:text-2xl md:text-4xl font-600">
              une envie de <span class="text-[#1D52A0]">voyager</span> ?
            </h1>
            <p class="text-sm sm:text-base">
              recherchez et réservez dès maintenant.
            </p>
          </div>

          <HeroLandingForm />
        </div>
      </section>
    </main>
  );
}
