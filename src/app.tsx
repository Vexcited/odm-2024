import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

import Navbar from "./components/headers/navbar";
import { MetaProvider } from "@solidjs/meta";
import Footer from "./components/molecules/footer";
import Title from "./meta/title";
import { Toaster } from "solid-toast";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title />
          <Toaster />

          <Navbar />

          <Suspense>
            {props.children}
          </Suspense>

          <Footer />
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
