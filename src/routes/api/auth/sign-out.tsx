import { createFileRoute } from "@tanstack/react-router";
import { getAuth, getAuthkit } from "@workos/authkit-tanstack-react-start";

// Posted by a plain form so the browser itself follows the redirect to
// WorkOS's logout URL. (Calling the SDK's signOut server function from a
// click handler makes fetch follow that redirect in the background, so the
// page never leaves.) WorkOS then returns to this origin, which must be on
// the environment's logout URI allowlist.
export const Route = createFileRoute("/api/auth/sign-out")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const auth = await getAuth();
        if (!auth.user) {
          return new Response(null, { status: 303, headers: { Location: origin } });
        }
        // The AuthKit request middleware adds the cookie-clearing Set-Cookie.
        const { logoutUrl } = await (
          await getAuthkit()
        ).signOut(auth.sessionId, {
          returnTo: origin,
        });
        return new Response(null, { status: 303, headers: { Location: logoutUrl } });
      },
    },
  },
});
