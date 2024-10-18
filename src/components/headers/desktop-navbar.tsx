import { Show, type Component } from "solid-js";
import LongLogo from "~/assets/long-logo";
import auth from "~/stores/auth";

const DesktopNavbar: Component = () => {
  return (
    <div class="flex items-center justify-between px-10 py-6">
      <a href="/">
        <LongLogo />
      </a>

      <nav class="flex items-center gap-4 text-lg">
        <a href="/search">
          rechercher un séjour
        </a>
        <a href="/nous-contacter">
          nous contacter
        </a>
        <Show when={auth.isAuthenticated}
          fallback={
            <a href="/auth" class="text-#1D52A0 font-600">
              mon profil
            </a>
          }
        >
          <div class="flex flex-col">
            <a href="/profile" class="text-#1D52A0 font-600">
              {auth.fullName}
            </a>
          </div>
        </Show>
      </nav>
    </div>
  );
};

export default DesktopNavbar;
