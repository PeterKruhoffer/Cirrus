import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Alchemy from "alchemy";
import * as Effect from "effect/Effect";

import Api from "./worker/api.ts";

// TanStack Start app. Its SSR bundle is the Worker entry and the client build
// is served as static assets.
const Web = Cloudflare.Website.Vite("Web", {
  env: { API: Api },
  dev: { port: 5173 },
});

export type WebEnv = Cloudflare.InferEnv<typeof Web>;

export default Alchemy.Stack(
  "Cirrus",
  {
    providers: Cloudflare.providers(),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const web = yield* Web;
    return { url: web.url };
  }),
);
