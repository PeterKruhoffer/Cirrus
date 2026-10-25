import type { WebEnv } from "../alchemy.run.ts";

// Entry for the Web Worker. Static assets are served before this runs, so
// only paths matching `runWorkerFirst` in alchemy.run.ts reach it.
export default {
  fetch(request: Request, env: WebEnv) {
    return env.API.fetch(request);
  },
};
