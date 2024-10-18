import { createMediaQuery } from "@solid-primitives/media";
import { type RouteSectionProps, useMatch, useNavigate } from "@solidjs/router";
import { createEffect, createRenderEffect, Show, type FlowComponent } from "solid-js";
import { DangerButton } from "~/components/atoms/button";
import auth from "~/stores/auth";

export default function ProfilePage (props: RouteSectionProps) {
  const navigate = useNavigate();
  const isTablet = createMediaQuery("(max-width: 767px)");

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
        class=" hover:(bg-#1D52A0/8 text-#1D52A0) focus:(bg-#1D52A0/15 outline-#1D52A0) text-left font-500 w-full px-4 py-2 rounded-full transition-colors"
        classList={{
          "bg-#1D52A0/5 text-#1D52A0": match() !== void 0
        }}
      >
        {props.children}
      </a>
    );
  };

  return (
    <Show when={!auth.loading && auth.isAuthenticated}>
      <div class="relative flex gap-8 mx-auto px-10">
        {/* barre de navigation */}
        <div class="sticky top-0 sm:w-178px md:w-260px flex-shrink-0 flex flex-col gap-2">
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

          <DangerButton
            type="button"
            onClick={handleLogout}
            class="w-full text-left mt-6"
          >
            se déconnecter
          </DangerButton>
        </div>

        <div class="w-full min-h-screen">
          {props.children}
        </div>
      </div>
    </Show>
  );
};
