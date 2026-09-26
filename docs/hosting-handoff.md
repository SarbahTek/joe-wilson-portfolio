# Hosting notes

Hosting can be completed once the backend checks are finished.

- Build from the repository root with `npm run build`.
- Publish the public site from `apps/client/out`.
- Set `VITE_API_BASE_URL=https://joe-wilson-api-production.up.railway.app` in the public site's hosting settings.
- Configure SPA route rewrites to `index.html`.
- Host the admin dashboard separately and allow both final domains in backend CORS.
