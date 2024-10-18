// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="fr">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body class="font-sans">
          <div id="app" class="min-h-screen grid rows-[auto_1fr_auto]">
            {children}
          </div>
          {scripts}
        </body>
      </html>
    )}
  />
));
