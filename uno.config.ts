import { defineConfig, presetUno, transformerVariantGroup } from "unocss";
import { presetKobalte } from "unocss-preset-primitives";


export default defineConfig({
  presets: [
    presetUno(),
    // @ts-expect-error : la version n'est pas à jour sur cette dépendance
    presetKobalte()
  ],

  transformers: [
    transformerVariantGroup()
  ],

  // @ts-expect-error : aucune documentation pour étendre autrement...
  extendTheme: (theme) => {
    return {
      ...theme,
      breakpoints: {
        ...theme.breakpoints,
        tb: "1040px"
      },
      fontFamily: {
        ...theme.fontFamily,
        sans: ["Outfit", theme.fontFamily?.["sans"]]
      }
    };
  }
});
