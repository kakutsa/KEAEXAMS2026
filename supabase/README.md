# Student accounts and every-attempt history

Backend preparation for the existing GitHub Pages portal. Not enabled on the live website yet.

1. Connect the user's Supabase project through the Supabase app.
2. Apply migrations in order: 001 creates storage, access rules and a submission RPC. Run node scripts/register-test-versions.cjs from the repository, then apply supabase/generated-test-versions.sql to register test versions without modifying old versions.
3. Test the database access rules using two separate student accounts before enabling the frontend.
4. Configure authentication for https://kakutsa.github.io/KEAEXAMS2026/. Email signup/confirmation and password recovery need a working mail delivery configuration. Configure Google OAuth only if selected and its provider credentials are available.
5. Add the project URL and browser-safe publishable key to frontend configuration. Never include a secret/service-role key.
6. Integrate signup/signin/signout and recovery, account-scoped local caches, an idempotent pending-upload queue, and paginated history. New attempts use crypto.randomUUID(); retakes create new rows. Only show “Saved online” after the RPC succeeds. Preserve unsynced data on failures and never upload a guest's old shared-device history automatically.
7. Submit via submit_exam_attempt; retrieve history from exam_attempts ordered by submitted_at/id. Use get_exam_attempt to retrieve an owned attempt with its original question/config snapshot. Immutable snapshots are stored once per test version to keep storage small; later question edits do not change past reviews.
8. Verify isolation, signin on a second browser, offline upload retry, retakes, and explanations before publishing the working integration to main.

The database grades against registered answer keys and rejects direct student writes, updates and deletes. This remains a practice portal: question files and answer keys are publicly available on GitHub. Client start times are informational, not proof of exam timing. No IP address is used for identity.

Existing browser-only results will remain local unless the student explicitly chooses to import them after signing in; such imported results must be labeled as imports. Account deletion deletes the linked attempt records.
