import * as stylex from "@stylexjs/stylex";
import { useEffect, useState } from "react";

export function App() {
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json() as Promise<{ message: string }>)
      .then((body) => setMessage(body.message))
      .catch(() => setMessage("Could not reach the API"));
  }, []);

  return (
    <main {...stylex.props(styles.main)}>
      <h1 {...stylex.props(styles.title)}>Cirrus</h1>
      <p {...stylex.props(styles.status)}>{message ?? "Calling the API…"}</p>
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
  title: {
    margin: 0,
    fontSize: 48,
  },
  status: {
    margin: 0,
    color: "#475569",
  },
});
