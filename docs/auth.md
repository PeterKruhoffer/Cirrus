# Auth

Auth is WorkOS AuthKit (`@workos/authkit-tanstack-react-start`), Google sign-in only, configured in the "Cirrus" WorkOS project.

- `/` is the public landing page. Routes under `src/routes/_authed/` require a user, and server functions behind the gate use the `requireUser` middleware from `src/server/auth.ts`.
- Without `WORKOS_API_KEY`, AuthKit runs as a keyless PKCE client against the Staging environment.
- The callback URL follows the request origin (`src/start.ts`), so new hosts must be on the WorkOS environment's redirect and logout URI allowlists. Staging and Agents allow `localhost:5173` and `*.onamp.dev`.
- Keep `@workos-inc/node` on the major version AuthKit declares as a peer (v10). v12 returns `Date` objects that break session sealing.

## Signing in as an agent

Open `/api/auth/agent-sign-in?returnPathname=/app` with `agent-browser`, or with `curl -c jar -b jar`. It signs in the test user `agent@cirrus.example.com` with a one-time magic-auth code and sets the normal `wos-session` cookie.

The route exists only when `WORKOS_API_KEY` is an `sk_test_` key for the Cirrus "Agents" WorkOS sandbox environment. The Cirrus Amp project provides it as a secret in orbs. With it set, the stage uses the Agents client ID instead of Staging.
