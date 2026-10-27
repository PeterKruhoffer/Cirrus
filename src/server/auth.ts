import { createMiddleware } from "@tanstack/react-start";
import { getAuth } from "@workos/authkit-tanstack-react-start";

// Server functions are reachable over RPC regardless of which route renders
// them, so ones behind the auth gate check the session themselves.
export const requireUser = createMiddleware({ type: "function" }).server(async ({ next }) => {
  const { user } = await getAuth();
  if (!user) {
    throw new Error("Not signed in");
  }
  return next({ context: { user } });
});
