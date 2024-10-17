import { defineConfig } from "@solidjs/start/config";
import unocss from "unocss/vite";
import icons from "unplugin-icons/vite";

export default defineConfig({
  ssr: false,

  vite: {
    plugins: [
      unocss(),
      icons({ compiler: "solid" })
    ]
  }
});
