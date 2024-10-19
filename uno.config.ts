import { defineConfig, presetUno, presetWebFonts, transformerVariantGroup } from "unocss";
import { presetKobalte } from "unocss-preset-primitives";

export default defineConfig({
  presets: [
    presetUno(),
    // @ts-expect-error : la version n'est pas à jour sur cette dépendance
    presetKobalte(),
    presetWebFonts({
      fonts: {
        sans: "Outfit:400,500,600"
      }
    })
  ],

  transformers: [
    transformerVariantGroup()
  ],

  // classes utilisées dans entry-server.tsx
  // -> bug de vinxi qui ne peut pas les lire
  safelist: [
    "min-h-screen", "grid", "rows-[auto_1fr_auto]",
    "font-sans"
  ],

  extendTheme: (theme) => {
    return {
      ...theme,
      breakpoints: {
        ...theme.breakpoints,
        tb: "1040px"
      }
    };
  }
});
