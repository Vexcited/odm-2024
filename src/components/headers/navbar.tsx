import { Show } from "solid-js";
import { createMediaQuery } from "@solid-primitives/media";

import DesktopNavbar from "./desktop-navbar";
import MobileNavbar from "./mobile-navbar";
import { Portal } from "solid-js/web";

export default function Navbar () {
  const isTablet = createMediaQuery("(max-width: 767px)");

  return (
    <>
      <header class="sticky top-0 bg-white z-20">
        <Show when={!isTablet()} fallback={
          <>
            <MobileNavbar />

            {/*
              vu que le portal sera en bas du DOM,
              elle sera tout en bas de la page par défaut.

              on peut donc lui ajouter la hauteur de la bottom bar pour avoir
              l'espacement requis.
            */}
            <Portal>
              <div class="h-75px"></div>
            </Portal>
          </>
        }>
          <DesktopNavbar />
        </Show>
      </header>


    </>
  );
}
