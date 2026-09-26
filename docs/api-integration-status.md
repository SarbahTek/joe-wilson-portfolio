# Backend follow-up

The client and admin frontends are connected to the live API. The remaining work is on the backend and database:

1. Restore database access and confirm migrations have run.
2. Create an account with the `admin` role for the admin dashboard.
3. Fix refresh tokens: `POST /v1/auth/refresh` currently rejects a new refresh token with `401`.
4. Test admin create, edit, publish, and delete actions for masterclasses, sessions, testimonials, services, events, and settings.
5. Confirm those published changes appear on the public website.
6. Test signup, login, checkout, payment confirmation, enrollment, lesson access, and password-reset email delivery.
7. Configure real Mux lesson playback and test it with an enrolled account.
8. Add public media/gallery and music/release endpoints before those sections can show real content.
9. Add the final public and admin domains to CORS before deployment.
