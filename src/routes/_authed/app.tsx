import * as stylex from "@stylexjs/stylex";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { greet } from "../../server/greet.ts";

export const Route = createFileRoute("/_authed/app")({
  loader: () => greet({ data: undefined }),
  component: Home,
});

function Home() {
  const { user } = Route.useRouteContext();
  const initial = Route.useLoaderData();
  const [result, setResult] = useState(initial);
  const [name, setName] = useState("");

  return (
    <main {...stylex.props(styles.main)}>
      <header {...stylex.props(styles.header)}>
        <span>{user.email}</span>
        <form method="post" action="/api/auth/sign-out">
          <button {...stylex.props(styles.button)} type="submit">
            Sign out
          </button>
        </form>
      </header>
      <h1 {...stylex.props(styles.title)}>Cirrus</h1>
      <p {...stylex.props(styles.status, "error" in result && styles.error)}>
        {"error" in result ? result.error : result.message}
      </p>
      <form
        {...stylex.props(styles.form)}
        onSubmit={(event) => {
          event.preventDefault();
          void greet({ data: name.trim() || undefined }).then(setResult);
        }}
      >
        <input
          {...stylex.props(styles.input)}
          aria-label="Name"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button {...stylex.props(styles.button)} type="submit">
          Greet
        </button>
      </form>
    </main>
  );
}

const styles = stylex.create({
  main: {
    minHeight: "100vh",
    display: "grid",
    placeContent: "center",
    gap: 8,
    fontFamily: "system-ui, sans-serif",
    color: "#0f172a",
    backgroundColor: "#e0f2fe",
    textAlign: "center",
  },
  header: {
    position: "absolute",
    top: 16,
    right: 16,
    display: "flex",
    alignItems: "center",
    gap: 12,
    color: "#475569",
  },
  title: {
    margin: 0,
    fontSize: 48,
  },
  status: {
    margin: 0,
    color: "#475569",
  },
  error: {
    color: "#b91c1c",
  },
  form: {
    display: "flex",
    gap: 8,
    justifyContent: "center",
    marginTop: 8,
  },
  input: {
    font: "inherit",
    paddingBlock: 6,
    paddingInline: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#94a3b8",
    borderRadius: 6,
  },
  button: {
    font: "inherit",
    paddingBlock: 6,
    paddingInline: 14,
    borderWidth: 0,
    borderRadius: 6,
    color: "#fff",
    backgroundColor: { default: "#0369a1", ":hover": "#075985" },
    cursor: "pointer",
  },
});
