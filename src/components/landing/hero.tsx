import { useNavigate } from "@solidjs/router";
import { createSignal, For, Show, type Component } from "solid-js";
import { EnvironmentType } from "~/types/trip";
import IconMdiAccount from "~icons/mdi/account";

const HeroLandingImage: Component<{
  x?: number
  y?: number
  src: string
  rotation: number
}> = (props) => {
  return (
    <img
      class="w-full h-full object-cover absolute inset-0 rounded-2xl border-2 border-white shadow-xl"
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

        <div class="flex gap-3">
          {["Europe", "Asie", "États-Unis"].map((name) => (
            <button
              type="button"
              class="flex-shrink-0 w-[120px] h-[50px] flex items-center justify-center  transition-colors rounded-lg"
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
            {[
              {
                name: "Campagne",
                value: EnvironmentType.CONTRYSIDE
              }, {
                name: "Ville",
                value: EnvironmentType.CITY
              }, {
                name: "Banlieue",
                value: EnvironmentType.SUBURB
              }].map((env) => (
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
            ))}
          </div>
        </div>
      </Show>
      <Show when={continent() && environment()}>
        <div class="flex flex-col gap-1">
          <p>pour combien de personnes ?</p>

          <div class="flex gap-2">
            <For each={new Array(amountOfPeople()).fill(null)}>
              {() => (
                <IconMdiAccount />
              )}
            </For>
          </div>

          <div class="flex gap-2">
            {/* <p class="w-[90px]">{amountOfPeople()} personne{amountOfPeople() > 1 && "s"}</p> */}

            <button type="button" class="font-500 h-10 w-10 bg-gray/15 rounded-full flex items-center justify-center"
              onClick={() => setAmountOfPeople((prev) => {
                const value = prev + 1;

                // on limite à 4 personnes maximum.
                if (value > 4) return prev;
                return value;
              })}
            >
              +
            </button>
            <button type="button" class="font-500 h-10 w-10 bg-gray/15 rounded-full flex items-center justify-center"
              onClick={() => setAmountOfPeople((prev) => {
                const value = prev - 1;

                if (value < 1) return prev;
                return value;
              })}
            >
              -
            </button>
          </div>
        </div>

        <button
          type="submit"
          class="bg-[#1D52A0] text-white px-4 py-2 rounded-full mt-4"
        >
          trouver le séjour idéal
        </button>
      </Show>
    </form>
  );
};

const HeroLanding: Component = () => {
  return (
    <section class="container mx-auto flex justify-center py-18 gap-[160px]">
      <div class="flex-shrink-0 relative w-[400px] h-[400px]">
        <HeroLandingImage x={-60} y={40} src="/images/location-1.jpg" rotation={-6} />
        <HeroLandingImage x={60} y={-40} src="/images/location-2.jpg" rotation={4} />
      </div>

      <div class="flex flex-col gap-8">
        <div>
          <h1 class="text-4xl font-600">
            une envie de <span class="text-[#1D52A0]">voyager</span> ?
          </h1>
          <p>recherchez et réservez dès maintenant.</p>
        </div>

        <HeroLandingForm />
      </div>
    </section>
  );
};

export default HeroLanding;
