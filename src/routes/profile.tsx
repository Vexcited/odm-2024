import { type RouteSectionProps, useMatch, useNavigate } from "@solidjs/router";
import { createEffect, createRenderEffect, type FlowComponent } from "solid-js";
import auth from "~/stores/auth";

export default function ProfilePage (props: RouteSectionProps) {
  const navigate = useNavigate();

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
    <div class="flex gap-8 mx-auto px-10">
      {/* barre de navigation */}
      <div class="w-260px flex-shrink-0 flex flex-col gap-2 h-screen sticky top-0">
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

        <button
          type="button"
          class="mt-6 text-gray-800 hover:(bg-red/20 text-#561010) text-left font-500 w-full px-4 py-2 rounded-full transition-colors"
          onClick={handleLogout}
        >
          se déconnecter
        </button>
      </div>

      <div class="w-full">
        {props.children}
      </div>
    </div>
  );
};
