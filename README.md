# Cirrus

React + StyleX single-page app with an Effect API, running on Cloudflare Workers. Alchemy deploys it, and Vite+ (`vp`) with pnpm handles tooling.

```sh
pnpm install
pnpm exec alchemy profile edit --add Cloudflare  # once, connects your Cloudflare account
pnpm dev      # local dev at http://localhost:5173
vp check      # format, lint, type check
pnpm alchemy deploy  # deploy to Cloudflare
```
