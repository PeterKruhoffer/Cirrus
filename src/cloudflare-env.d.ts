import type { WebEnv } from "../alchemy.run.ts";

// Types `env` from "cloudflare:workers" for server-only code in the TanStack
// Start Worker.
declare global {
  namespace Cloudflare {
    interface Env extends WebEnv {}
  }
}
