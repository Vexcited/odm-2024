import { type RouteSectionProps, useMatch } from "@solidjs/router";
import { type FlowComponent } from "solid-js";
import auth from "~/stores/auth";

export default function ProfilePage (props: RouteSectionProps) {
  const Link: FlowComponent<{
    href: string
  }> = (props) => {
    const match = useMatch(() => props.href);

    return (
      <a href={props.href}
        class="text-#1D52A0 hover:bg-#1D52A0/8 focus:(bg-#1D52A0/15 outline-#1D52A0) text-left font-500 w-full px-4 py-2 rounded-full transition-colors"
        classList={{
          "bg-#1D52A0/5": match() !== void 0
        }}
      >
        {props.children}
      </a>
    );
  };

  return (
    <div class="flex gap-8 max-w-1000px mx-auto px-12">
      {/* barre de navigation */}
      <div class="w-260px flex-shrink-0 flex flex-col justify-between h-screen sticky top-0 px-4">
        <div class="flex flex-col">
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
        </div>

        <button type="button"
          onClick={() => auth.logout()}
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
