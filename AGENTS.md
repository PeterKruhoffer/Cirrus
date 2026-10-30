# Cirrus

An events platform on Cloudflare Workers, built with Effect and deployed with Alchemy (`alchemy.run.ts`). Vite+ (`vp`) handles tooling; run `vp check` before finishing a change. Ask before deploying (`pnpm alchemy deploy`; `pnpm deploy` is a pnpm built-in, not this).

Effect is v4: read `node_modules/effect/AGENTS.md` before writing Effect code. `vp check` runs Effect lint rules, patched into Vite+'s oxlint by `pnpm install`.

Further documentation lives in `docs/`.

## How we build

Reliability comes first, then simplicity, then performance. When two of them pull in different directions, the earlier one wins.

## Glossary

- **You.** The coding agent working in this repository.
- **The user.** The people who use Cirrus every day to manage events for customers.
- **Customer.** A business that uses Cirrus to host its events and uses its APIs to show them on its own website.
