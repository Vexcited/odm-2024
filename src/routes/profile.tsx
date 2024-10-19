import { createMediaQuery } from "@solid-primitives/media";
import { type RouteSectionProps, useMatch, useNavigate } from "@solidjs/router";
import { createEffect, createRenderEffect, createSignal, Show, type FlowComponent } from "solid-js";
import { DangerButton } from "~/components/atoms/button";
import auth from "~/stores/auth";
import MdiMenu from "~icons/mdi/menu";

export default function ProfilePage (props: RouteSectionProps) {
  const navigate = useNavigate();

  const isSmall = createMediaQuery("(max-width: 639px)");
  const [isOpenSmall, setOpenSmall] = createSignal(false);

  createEffect(() => {
    if (!auth.isAuthenticated)
      navigate("/");
  });

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  const Link: FlowComponent<{
    href: string
  }> = (props) => {
    const match = useMatch(() => props.href);

    return (
      <a href={props.href}
        class="flex-shrink-0 w-fit sm:w-full hover:(bg-#1D52A0/8 text-#1D52A0) focus:(bg-#1D52A0/15 outline-#1D52A0) text-left font-500 px-4 py-2 rounded-full transition-colors"
        classList={{
          "bg-#1D52A0/5 text-#1D52A0": match() !== void 0
        }}
      >
        {props.children}
      </a>
    );
  };

  const LinksGroup = () => (
    <>
      <Link
        href="/profile/compte"
      >
        mon compte
      </Link>
      <Link
        href="/profile/reservations"
      >
        mes réservations
      </Link>
    </>
  );

  return (
    <Show when={!auth.loading && auth.isAuthenticated}>
      <div class="container sm:( flex-row mx-auto px-10) relative flex flex-col gap-8">
        <Show when={!isSmall()}>
          {/* barre de navigation */}
          <div class=" sm:w-178px md:w-260px flex-shrink-0 flex flex-col gap-2">
            <LinksGroup />

            <DangerButton
              type="button"
              onClick={handleLogout}
              class="w-full text-left mt-6"
            >
              se déconnecter
            </DangerButton>
          </div>
        </Show>

        <Show when={isSmall()}>
          <div class="px-4 w-fit mx-auto items-center flex gap-4 overflow-auto">
            <LinksGroup />
          </div>
        </Show>

        <div class="w-full sm:min-h-screen px-6">
          {props.children}
        </div>
      </div>
    </Show>
  );
};
