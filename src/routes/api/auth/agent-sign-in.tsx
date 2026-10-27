import { createFileRoute } from "@tanstack/react-router";
import { getAuthkit } from "@workos/authkit-tanstack-react-start";
import { env } from "cloudflare:workers";

// Test user in the Cirrus "Agents" WorkOS sandbox environment.
const AGENT_EMAIL = "agent@cirrus.example.com";

// Signs coding agents in without a browser login: mints a one-time magic-auth
// code for the test user, redeems it, and stores the same sealed `wos-session`
// cookie the normal callback sets. It exists only when the stage has a
// sandbox API key (Amp orbs), so it never works against Production.
//
//   agent-browser open "$PORTAL/api/auth/agent-sign-in?returnPathname=/app"
export const Route = createFileRoute("/api/auth/agent-sign-in")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!env.WORKOS_API_KEY?.startsWith("sk_test_")) {
          return new Response("Not Found", { status: 404 });
        }

        const authkit = await getAuthkit();
        const { userManagement } = authkit.getWorkOS();
        const { code } = await userManagement.createMagicAuth({ email: AGENT_EMAIL });
        const { sealedSession } = await userManagement.authenticateWithMagicAuth({
          clientId: env.WORKOS_CLIENT_ID,
          email: AGENT_EMAIL,
          code,
          session: { sealSession: true, cookiePassword: env.WORKOS_COOKIE_PASSWORD },
        });
        // The AuthKit request middleware adds the Set-Cookie to the response.
        await authkit.saveSession(undefined, sealedSession!);

        // Only redirect within this origin.
        const url = new URL(request.url);
        const target = new URL(url.searchParams.get("returnPathname") ?? "/app", url.origin);
        const location = target.origin === url.origin ? target.pathname + target.search : "/app";
        return new Response(null, { status: 307, headers: { Location: location } });
      },
    },
  },
});
