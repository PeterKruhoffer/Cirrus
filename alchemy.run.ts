import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Alchemy from "alchemy";
import * as Config from "effect/Config";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";

import Api from "./worker/api.ts";

// TanStack Start app. Its SSR bundle is the Worker entry and the client build
// is served as static assets.
const Web = Cloudflare.Website.Vite(
  "Web",
  Effect.gen(function* () {
    // Set only in Amp orbs (a Cirrus project secret). It belongs to the
    // Cirrus "Agents" sandbox environment and enables the agent sign-in
    // route (src/routes/api/auth/agent-sign-in.tsx). Without it, AuthKit runs
    // as a keyless public PKCE client against Staging.
    const workosApiKey = Option.getOrUndefined(
      yield* Config.option(Config.Redacted("WORKOS_API_KEY")),
    );
    return {
      env: {
        API: Api,
        // The client ID must belong to the same environment as the API key.
        // Set WORKOS_CLIENT_ID when deploying a stage that should use
        // Production.
        WORKOS_CLIENT_ID: yield* Config.String("WORKOS_CLIENT_ID").pipe(
          Config.withDefault(
            workosApiKey
              ? "client_01M5Z45A5059H7KPMGCVD00VVY" // Agents
              : "client_01M5Z34QA9SHC0E8NNC3PQADWK", // Staging
          ),
        ),
        ...(workosApiKey ? { WORKOS_API_KEY: workosApiKey } : {}),
        // Sign-in builds the callback URL from each request's origin (see
        // src/start.ts). This value is the fallback, and its scheme decides
        // whether session cookies are marked Secure.
        WORKOS_REDIRECT_URI: yield* Config.String("WORKOS_REDIRECT_URI").pipe(
          Config.withDefault("http://localhost:5173/api/auth/callback"),
        ),
        // Encrypts the session cookie. Generated once per stage and kept in state.
        WORKOS_COOKIE_PASSWORD: yield* Alchemy.makeRandom("WorkosCookiePassword"),
      },
      dev: { port: 5173 },
    };
  }).pipe(Effect.orDie),
);

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
