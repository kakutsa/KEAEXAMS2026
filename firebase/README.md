# Firebase student history (deployment pending)
Project: keaexams2026. Standard Firestore (default), asia-south1, Spark. Google provider and kakutsa.github.io authorized domain are configured. Production rules remain deny-all until the tested firestore.rules is explicitly deployed. Do not merge this branch to main before deploying rules and verifying live Google sign-in and cloud save/read.

Build client: cd firebase-client; npm ci; npx esbuild accounts.js --bundle --format=esm --target=es2022 --minify --outfile=../accounts.js.

When updating tests, run node scripts/register-test-versions.cjs and commit test-versions.json plus new versions/*.json. Never remove old revisions: historical reviews depend on them. Existing schema and exam loader remain reusable.

Each signed-in completed attempt is immutable under users/{uid}/attempts/{UUID}; retry uses a transaction with an existence check. History pages 50 records at a time. In-progress answers remain device-local. Each retake receives a new UUID. Google account changes reload the page, cache keys include the UID, and guest history is never silently imported. Completed results queued locally retry when online or via Retry sync. Clearing browser data before confirmation loses unsynced results. Scores are client-calculated practice feedback, not tamper-proof examination certification. No public ranking is implemented.

Validation: Firestore emulator with distinct Alice/Bob/unauthenticated contexts; owner create/read/history, forbidden other-user reads/writes, immutable submissions, bounded schema, types, timestamp limits, arbitrary-role denial. Desktop browser tested answer, mark-for-review, timer, submit, 1/20 score, explanations, historical review and two distinct retakes. Mobile 390px iframe checked for horizontal overflow. Live Google sign-in / production sync still require validation after rule deployment.
