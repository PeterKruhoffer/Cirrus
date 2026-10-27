import { createFileRoute } from "@tanstack/react-router";
import { getSignInUrl } from "@workos/authkit-tanstack-react-start";

// Starts the AuthKit flow. Also the environment's "Initiate login URI" in WorkOS.
// The callback only redirects within this origin, so returnPathname is safe.
export const Route = createFileRoute("/api/auth/sign-in")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const returnPathname = new URL(request.url).searchParams.get("returnPathname") ?? "/app";
        const url = await getSignInUrl({ data: { returnPathname } });
        return new Response(null, { status: 307, headers: { Location: url } });
      },
    },
  },
});
