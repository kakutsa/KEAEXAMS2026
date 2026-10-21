# KEAEXAMS2026 CBT | Kannada Science Mock Test 01

A free, static, GitHub Pages-ready Computer Based Test website with 20 Kannada science questions.

## Files
- `index.html`: website markup
- `style.css`: mobile-friendly design
- `questions.js`: exam configuration, 20 questions, answer key and explanations
- `app.js`: timer, navigation, mark for review, auto-submit and results logic

## Publish on GitHub Pages
1. Sign in to https://github.com and create a **public** repository named `keaexams2026-cbt`.
2. Choose **Add file > Upload files** and upload `index.html`, `style.css`, `questions.js`, `app.js` (and optionally this README) at the **root** of the repository. Commit changes.
3. Open **Settings > Pages** and under **Build and deployment** choose **Deploy from a branch**.
4. Set Branch **main**, folder **/(root)** and click **Save**.
5. After the deployment completes, open `https://YOUR-USERNAME.github.io/keaexams2026-cbt/` (replace `YOUR-USERNAME`).

## Customize
- Change `durationMinutes` in `questions.js` to alter the test duration.
- Edit `window.QUESTIONS` in `questions.js` to replace or add MCQs. Each item needs a unique `id`, a `question`, exactly 4 `options`, `answer` (index **0, 1, 2, or 3**) and `explanation`.
- `negativeMarks` defaults to zero. If you change it, update the visible introductory text in `index.html` too.
- The questions are a **practice set**, not verified official KEA past-paper questions.

## Important limits
This is client-side-only practice software. Answers are shipped to browsers in `questions.js` and can be viewed in source. The site does not store user scores on a server, and reloads restart the exam. GitHub Pages is appropriate for free practice; high-stakes secure proctored tests need a backend.

© KEAEXAMS2026. Unofficial educational practice site, not affiliated with KEA.
