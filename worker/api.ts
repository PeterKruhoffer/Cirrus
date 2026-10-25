import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Effect from "effect/Effect";
import * as HttpServerResponse from "effect/http/HttpServerResponse";

// The API Worker. The Web Worker forwards every /api/* request here.
export default Cloudflare.Worker(
  "Api",
  { main: import.meta.url },
  Effect.gen(function* () {
    return {
      fetch: Effect.gen(function* () {
        return yield* HttpServerResponse.json({ message: "Hello from an Effect Worker" });
      }),
    };
  }),
);
