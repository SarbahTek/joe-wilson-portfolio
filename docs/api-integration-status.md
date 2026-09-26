# API integration status — 2026-09-26

## Current launch assessment

Public/member frontend has been improved and tested, but a complete paid-course launch is **not yet verified**. Nothing has been deployed in this session. Hosting provider/domain are still undecided. See [hosting handoff](hosting-handoff.md).

### Live results from this pass

| Flow | Result |
| --- | --- |
| Signup and login | PASS, tested via API and real Edge browser |
| Account lookup and reload | PASS, `/auth/me` now works |
| Profile edit and reload | PASS, API and browser |
| Logout | PASS, route now returns 200; browser returns to login |
| Refresh | FAIL: both registration-issued and separately login-issued tokens immediately return 401 `Invalid or expired refresh token` |
| Public masterclasses | PASS anonymously, but empty list |
| Services, events, testimonials, settings | Respond successfully; no live content returned |
| Enrollments and payment history | PASS authenticated reads, empty for test accounts |
| Direct production-browser API request | BLOCKED by CORS for `http://127.0.0.1:4173`; final domain still needs testing |

### Frontend work completed in this pass

- Contact forms now collect the required sender name and submit `senderName`, `senderEmail`, `senderPhone`, and lowercase inquiry type.
- Quote submission resolves the service slug to its API ID and maps client fields, ISO date, and budget cents.
- Added `/reset-password?token=...` with validation and success/error handling. Account security links to password recovery instead of showing a nonfunctional form.
- Checkout uses API course title/price, preserves the selected class in return URLs, and disables purchasing when no course is available.
- Removed ordinary card-number/CVC fields that were unused by the payment-provider redirect. Missing checkout URLs show an error.
- A `success=true` query alone no longer claims payment verification, lifetime access, or delivery of credentials.
- Corrected documented payment amount, course cover/count/status, enrollment progress, testimonial fields, and session-progress payload names.
- Removed random progress, invented member activity/counts, and unrelated fallback lesson video. Dashboard uses enrollment data and unavailable lessons show an empty state.
- Connected the lazy-loaded Mux React player to backend playback IDs and signed playback tokens, with periodic progress, pause, and completion saves. Implementation follows the [Mux React player API](https://www.mux.com/docs/guides/player-api-reference/react).
- Signup/signin links preserve the checkout return path.
- Added SPA fallback to the client build and corrected Netlify monorepo build settings.
- Added browser smoke tests and applied compatible dependency fixes; `npm audit fix` reported zero vulnerabilities.
- Replaced the public masterclass catalogue, testimonials, services, service-detail pages, contact details, and footer events with API-backed content and honest empty states.
- Rebuilt the admin area around authenticated API calls: masterclasses and sessions, testimonials, public settings, media uploads, services, events, inquiries, quotes, payments, users, and administrator profile now use live endpoints.

### Validation

- Both apps pass type-check and production build; client bundle-size warning remains.
- Admin login is protected by `/auth/me` and only permits the backend `admin` role. Full admin CRUD verification awaits administrator credentials.
- Six auth transport regression tests pass.
- Edge live browser: signup, authenticated reload, profile persistence, logout/login, and unavailable checkout all passed through the development proxy.
- Edge intercepted-contract tests: contact sender fields, quote service ID/budget cents, password reset, mobile empty catalogue, API price display, selected course, missing checkout URL handling, Mux player rendering, and completion payload passed without browser runtime errors. These do **not** prove server delivery of inquiries/emails, successful payment, or actual video streaming.
- Production preview CORS test failed as described above. Final-origin CORS and post-deployment routing still require verification.

### Remaining backend/content work

1. Fix refresh-token validation/storage/rotation. Reproduction: register or login, then POST its returned `refreshToken` to `/v1/auth/refresh`; observe 401 immediately. Separate tests eliminated rapid signup/login token timing as the cause.
2. Allow the chosen frontend origin in CORS, including OPTIONS and Authorization/Content-Type headers. Configure reset-email and payment return URLs for the same domain.
3. Publish actual masterclasses and service records matching frontend slugs (`live-performance`, `studio-session-bass`, `music-production`, `music-direction`). Empty data currently prevents live checkout/quote verification.
4. Confirm the checkout response shape (`checkoutUrl`) and currency, then test payment-provider checkout, webhook enrollment, and cancellation with provider test mode. Do not use live charges for this check.
5. Test delivery of a password-reset email and its token with an owned test inbox. The frontend reset route is implemented; email delivery has not been tested.
6. Provide a real enrolled class/session to finish playback testing. The Mux player is now connected, but real signed playback, seeking/resume, and persisted completion still need a test video. Paid lesson playback is not launch-certified.
7. The backend media model only exposes file metadata and URL. It needs title, caption, category, featured/order fields and a public listing endpoint before the public media gallery can be administered without mock data.
8. The API currently has no music/release model or public/admin endpoints. Music releases cannot be migrated from mock content until that contract exists.
9. Confirm that authenticated `GET /services` and `GET /events` return drafts as well as published records for administration, or add documented admin list endpoints. Public pages only show published records.
10. Review remaining static biography copy, policy links, and marketing claims with the site owner before a public release.

Test accounts created this pass (credentials were not printed or stored):

- `api-smoke-c9ba39fb-7e04-449c-83cc-7401c8e4cf90@example.com`
- `api-session-83208cd4-bcc7-4aac-9f0e-d8b790dca141@example.com`
- `browser-smoke-55f58567-d010-44e3-9df8-ce422616d814@example.com`

These remain for backend cleanup. No live payments, inquiries, quote messages, or reset emails were submitted.

---

# Historical findings — 2026-09-17

The notes below describe the earlier deployment, not the current route status.

Target: https://joe-wilson-api-production.up.railway.app/v1
Contract: https://joe-wilson-api-production.up.railway.app/docs/

## Live checks

| Endpoint | Observed result |
| --- | --- |
| POST /auth/register | 201; returns user, accessToken, refreshToken |
| POST /auth/login | 200; returns user, accessToken, refreshToken |
| GET /auth/me | 404 Route not found, with and without a valid access token |
| POST /auth/refresh | 404 Route not found with the issued refresh token |
| POST /auth/logout | 404 Route not found with a valid access token |
| GET /enrollments/my | 200, empty list with a valid access token |
| GET /payments/my | 200, empty list with a valid access token |
| GET /masterclasses | 401 anonymously; 200, empty list when authenticated |
| GET /services, /events, /testimonials | 200, empty lists on repeat checks |
| GET /settings/public | 200, empty object on repeat checks |

Several initial public requests returned Railway 502 responses before recovering.
Missing auth routes are documented in Swagger but unavailable in the deployment.
The public masterclass page currently needs an anonymously accessible catalogue;
confirm whether authentication on GET /masterclasses is intentional.

One synthetic account was created: api-smoke-29370d9f-5b9c-4ed7-96e8-546e580aa9d1@example.com.
Its password and tokens were neither printed nor saved. The account remains for backend cleanup.
No payment, inquiry, quote, or email-reset request was submitted.

## Frontend changes

- Signup uses the session returned by registration instead of performing another login.
- Registration types now require first and last names; role types match Swagger's member/admin values.
- Client uses shared auth transport, errors, token storage, and auth types.
- Failed credential requests and anonymous public 401 responses no longer initiate refresh/redirects.
- Concurrent expired requests share a bounded refresh; refresh has a timeout and supports an omitted replacement refresh token.
- Missing routes and temporary backend failures preserve saved tokens. Protected account pages show an error with retry instead of silently logging the user out.
- Server failures no longer imply that an email is already registered; null/HTML errors are handled.
- Login return URLs are decoded only by URLSearchParams and restricted to internal paths.
- Removed an unsupported TypeScript ignoreDeprecations value that prevented type-checking.

## Validation and next work

- `npm.cmd run type-check`: both applications passed.
- `npm.cmd run build`: both applications passed, with a client bundle-size warning.
- `npm run type-check`: both applications pass.
- `npm run build`: both applications pass. The client build reports a bundle-size warning for future optimisation.
- Live checks confirmed public services, events, testimonials, settings, and masterclasses respond successfully. Authentication is required for `/auth/me`.

Backend source is not present in this repository. Restore the missing auth routes before calling account reload, profile editing, token refresh, or server logout complete. Test password recovery and checkout separately once backend routes and test data are ready. Browser interaction and production CORS have not been verified in this pass.

Client and admin both use the shared API integration for active content and member flows. Admin still needs an authenticated account with the backend `admin` role for end-to-end verification.
