import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";

export class InvalidName extends Schema.TaggedError<InvalidName>()("InvalidName", {
  message: Schema.String,
}) {}

const Name = Schema.String.check(Schema.isNonEmpty(), Schema.isMaxLength(40));

// The API Worker. It has no public HTTP routes: the Web Worker calls these
// methods over its `API` service binding from TanStack Start server functions.
export default Cloudflare.Worker(
  "Api",
  { main: import.meta.url },
  Effect.succeed({
    hello: (name: string | undefined) =>
      Schema.decodeUnknownEffect(Schema.UndefinedOr(Name))(name).pipe(
        Effect.map((name) => `Hello, ${name ?? "world"}, from an Effect Worker`),
        Effect.mapError(() => new InvalidName({ message: "Name must be 1 to 40 characters" })),
      ),
  }),
);
