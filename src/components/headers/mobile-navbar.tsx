import { type Component } from "solid-js";
import { Portal } from "solid-js/web";
import LongLogo from "~/assets/long-logo";
import auth from "~/stores/auth";
import MdiAccountCircle from "~icons/mdi/account-circle";
import MdiMessage from "~icons/mdi/message";
import MdiHomeSearch from "~icons/mdi/home-search";

const MobileNavbar: Component = () => {
  return (
    <>
      <div class="flex flex-col items-center justify-center px-10 py-6">
        <a href="/">
          <LongLogo />
        </a>
      </div>

      <Portal>
        <div class="fixed bottom-0 inset-x-0 h-75px z-20">
          <nav class="flex justify-center py-4 items-center gap-6 text-lg bg-white border-t">
            <div class="flex flex-col items-center w-72px">
              <MdiMessage />
              <a href="/nous-contacter" class="text-sm">
                contacter
              </a>
            </div>
            <div class="flex flex-col items-center w-72px">
              <MdiHomeSearch />
              <a href="/search" class="text-sm">
                rechercher
              </a>
            </div>
            <div class="flex flex-col items-center w-72px">
              <MdiAccountCircle />
              <a href={auth.isAuthenticated ? "/profile" : "/auth"} class="text-sm">
                moi
              </a>
            </div>
          </nav>
        </div>
      </Portal>
    </>

  );
};

export default MobileNavbar;
