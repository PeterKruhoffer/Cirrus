import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getAuth } from "@workos/authkit-tanstack-react-start";

// Every route under _authed/ requires a signed-in user.
export const Route = createFileRoute("/_authed")({
  beforeLoad: async ({ location }) => {
    const { user } = await getAuth();
    if (!user) {
      throw redirect({
        href: `/api/auth/sign-in?returnPathname=${encodeURIComponent(location.href)}`,
        reloadDocument: true,
      });
    }
    return { user };
  },
  component: Outlet,
});
