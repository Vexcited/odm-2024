import "@unocss/reset/tailwind.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "virtual:uno.css";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

import DesktopNavbar from "./components/headers/desktop-navbar";
import { MetaProvider } from "@solidjs/meta";
import Title from "./meta/title";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <MetaProvider>
            <Title>worldskills — travel</Title>

            <header>
              <DesktopNavbar />
            </header>
            <Suspense>
              {props.children}
            </Suspense>
          </MetaProvider>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
