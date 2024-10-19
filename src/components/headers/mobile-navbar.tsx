import { FlowComponent, type Component } from "solid-js";
import { Portal } from "solid-js/web";
import LongLogo from "~/assets/long-logo";
import auth from "~/stores/auth";
import MdiAccountCircle from "~icons/mdi/account-circle";
import MdiMessage from "~icons/mdi/message";
import MdiHomeSearch from "~icons/mdi/home-search";
import { useLocation } from "@solidjs/router";

const MobileNavbar: Component = () => {
  const location = useLocation();
  const path = () => location.pathname;

  const Link: FlowComponent<{ href: string }> = (props) => (
    <a href={props.href} class="flex flex-col items-center w-86px py-2 rounded-xl"
      classList={{
        "bg-gray-100 text-#1D52A0 font-500": path().includes(props.href)
      }}
    >
      {props.children}
    </a>
  );

  return (
    <>
      <div class="flex flex-col items-center justify-center px-10 py-6">
        <a href="/">
          <LongLogo />
        </a>
      </div>

      <Portal>
        <div class="fixed bottom-0 inset-x-0 h-75px z-20">
          <nav class="flex justify-center py-2 items-center gap-3 sm:gap-6 text-lg bg-white border-t">
            <Link href="/nous-contacter">
              <MdiMessage />
              <span class="text-sm">
                contacter
              </span>
            </Link>
            <Link href="/search">
              <MdiHomeSearch />
              <span class="text-sm">
                rechercher
              </span>
            </Link>
            <Link href={auth.isAuthenticated ? "/profile" : "/auth"}>
              <MdiAccountCircle />
              <span class="text-sm">
                moi
              </span>
            </Link>
          </nav>
        </div>
      </Portal>
    </>

  );
};

export default MobileNavbar;
