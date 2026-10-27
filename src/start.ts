import { createCsrfMiddleware, createMiddleware, createStart } from "@tanstack/react-start";
import { authkitMiddleware } from "@workos/authkit-tanstack-react-start";

// Registering a start instance turns off TanStack Start's default CSRF check
// for server functions, so add it back.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

// The app is reached at localhost, at orb portal URLs, and at its deployed
// URL, so the WorkOS callback follows the request's origin. WorkOS only
// redirects to URIs on the environment's allowlist.
const authMiddleware = createMiddleware().server((args) =>
  authkitMiddleware({
    redirectUri: new URL("/api/auth/callback", args.request.url).href,
  }).options.server!(args),
);

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware, authMiddleware],
}));
