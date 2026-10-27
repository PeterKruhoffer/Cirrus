import * as stylex from "@stylexjs/stylex";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getAuth } from "@workos/authkit-tanstack-react-start";

// Public landing page. Everything under _authed/ requires sign-in.
export const Route = createFileRoute("/")({
  loader: async () => ({ signedIn: (await getAuth()).user !== null }),
  component: Landing,
});

function Landing() {
  const { signedIn } = Route.useLoaderData();

  return (
    <main {...stylex.props(styles.main)}>
      <h1 {...stylex.props(styles.title)}>Cirrus</h1>
      <p {...stylex.props(styles.tagline)}>
        A TanStack Start app on Cloudflare Workers, backed by an Effect API.
      </p>
      {signedIn ? (
        <Link {...stylex.props(styles.button)} to="/app">
          Open the app
        </Link>
      ) : (
        <a {...stylex.props(styles.button)} href="/api/auth/sign-in">
          Sign in with Google
        </a>
      )}
    </main>
  );
}

const styles = stylex.create({
  main: {
    minHeight: "100vh",
    display: "grid",
    placeContent: "center",
    justifyItems: "center",
    gap: 12,
    fontFamily: "system-ui, sans-serif",
    color: "#0f172a",
    backgroundColor: "#e0f2fe",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: 48,
  },
  tagline: {
    margin: 0,
    color: "#475569",
  },
  button: {
    marginTop: 8,
    paddingBlock: 8,
    paddingInline: 16,
    borderRadius: 6,
    color: "#fff",
    backgroundColor: { default: "#0369a1", ":hover": "#075985" },
    textDecoration: "none",
  },
});
