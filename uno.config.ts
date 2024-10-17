import { defineConfig, presetUno, transformerVariantGroup } from "unocss";
import { presetKobalte } from "unocss-preset-primitives";


export default defineConfig({
  presets: [
    presetUno(),
    // @ts-expect-error : not matching versions
    presetKobalte()
  ],

  transformers: [
    transformerVariantGroup()
  ],

  theme: {
    fontFamily: {
      sans: "Outfit"
    }
  }
});
