# Hosting handoff

## Public/member website

Run installation/build from the repository root (the project uses npm workspaces):

```sh
npm ci
npm run type-check
npm run build:client
```

Use Node 24. Publish **`apps/client/out`**, not the repository or `src` directory.
Set this build-time environment variable:

```dotenv
VITE_API_BASE_URL=https://joe-wilson-api-production.up.railway.app
```

Do not append `/v1`; the frontend adds it. The local `.env` is gitignored, so set the variable in the hosting provider's build settings. Do not put backend secrets in `VITE_` variables.

Serve the site at its own domain root. Rewrite unknown application routes to `/index.html`, preserving real assets. Client `public/_redirects` supplies this for hosts that support that format; other hosts need an equivalent SPA rewrite. Test direct navigation/reload of `/login`, `/members/account`, and `/reset-password`.

For Netlify, keep base directory at repository root and set package directory to `apps/client`. The checked-in `apps/client/netlify.toml` builds the client workspace and publishes `apps/client/out`. This follows the [Netlify monorepo configuration](https://docs.netlify.com/build/configure-builds/monorepos/).

## Coordinate with the backend developer

Before release, give them the final HTTPS frontend origin, including whether `www` is used. They need to allow that origin in CORS and configure password-reset and payment return URLs. The production preview currently receives a CORS rejection from `http://127.0.0.1:4173`; successful proxy-based development tests do not establish hosted-browser connectivity.

Send this backend issue:

> `/auth/me`, profile updates, logout, and public masterclasses now work. `/auth/refresh` still immediately rejects fresh tokens from both registration and login with 401 `Invalid or expired refresh token`. Please check refresh-token persistence, hashing/comparison, signing verification, expiry, and rotation. We also need published service/masterclass data and test payment setup to complete purchase/enrollment verification.

## Release decision

The public site and protected admin application can be staged for review. The admin has real authentication, role protection, and API wiring; it still needs an account with the backend `admin` role for end-to-end verification. A fully working paid-course launch is not verified: refresh still fails, content is empty, real Mux playback and live payment/email workflows need verification. See [integration status](api-integration-status.md) for evidence and remaining work.

## Release checks

Before deployment, run `npm run type-check` and `npm run build`. After deployment, manually test CORS, route reloads, signup/login/profile, expired-session renewal, email reset, provider test checkout, webhook enrollment, and a real lesson. No deployment was performed during this preparation pass.
