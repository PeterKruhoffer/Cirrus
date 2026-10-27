import { toRpcAsync } from "@alchemy.run/cloudflare/Bridge";
import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

import type Api from "../../worker/api.ts";
import type { InvalidName } from "../../worker/api.ts";
import { requireUser } from "./auth.ts";

// Runs only on the Web Worker. The browser calls it over TanStack Start's
// server function RPC, and it calls the Effect API Worker over the `API`
// service binding. Tagged errors from the API Worker arrive as plain objects.
export const greet = createServerFn({ method: "GET" })
  .middleware([requireUser])
  .validator((name: string | undefined) => name)
  .handler(async ({ data: name }) => {
    try {
      return { message: await toRpcAsync<typeof Api>(env.API).hello(name) };
    } catch (error) {
      if ((error as Partial<InvalidName> | null)?._tag === "InvalidName") {
        return { error: (error as InvalidName).message };
      }
      throw error;
    }
  });
