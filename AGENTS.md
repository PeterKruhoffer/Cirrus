# Cirrus

An events platform on Cloudflare Workers, built with Effect and deployed with Alchemy (`alchemy.run.ts`). Vite+ (`vp`) handles tooling; run `vp check` before finishing a change. Ask before deploying (`pnpm alchemy deploy`; `pnpm deploy` is a pnpm built-in, not this).

Effect is v4: read `node_modules/effect/AGENTS.md` before writing Effect code. `vp check` runs Effect lint rules, patched into Vite+'s oxlint by `pnpm install`.

Further documentation lives in `docs/`.
