# KEAEXAMS2026 • Multi-Test CBT Portal

A Kannada-friendly KEA/KPSC practice portal hosted as static files on GitHub Pages.

## Student links

- Home / test catalog: https://kakutsa.github.io/KEAEXAMS2026/
- Existing 20-question Science test: https://kakutsa.github.io/KEAEXAMS2026/exam.html?test=science-mock-01

## Architecture

- `index.html` — student-facing catalog and class/search filter.
- `home.js` — catalog rendering.
- `catalog.js` — list of published tests, their titles, question counts, durations, and question-file paths.
- `exam.html` — reusable exam page with the existing exam UI.
- `exam-loader.js` — selects the requested test based on the `?test=` link, loads its questions, then runs the shared exam engine.
- `app.js` — original CBT timer, mark for review, question palette, submission and results.
- `style.css` — original exam styling.
- `tests/science-mock-01.js` — copy of the original 20 Science MCQs, preserved unchanged.
- `questions.js` — original test question file, preserved as a backup.

## Publishing with GitHub Pages

Open repository **Settings > Pages**, choose **Deploy from a branch**, select **main** and **/(root)**, and save. GitHub Pages deployment must finish before the links work.

## Add Test 02 in two steps

1. Under `tests/` add `science8-ch2.js` in the same JavaScript format as `tests/science-mock-01.js`. It must assign both `window.EXAM_CONFIG` and `window.QUESTIONS`, using the exact existing schema, with 4 answer options, zero-based answer indices, and explanations. Use your verified MCQs only.
2. Open `catalog.js` and add one object to the array, for example:

```js
{
  id: "science8-ch2",
  title: "8ನೇ ತರಗತಿ ವಿಜ್ಞಾನ – ಅಧ್ಯಾಯ 2",
  subject: "Science",
  grade: "8",
  chapter: "ಅಧ್ಯಾಯ 2",
  description: "KEA-style Kannada Chapter 2 CBT test.",
  questionCount: 20,
  durationMinutes: 20,
  file: "tests/science8-ch2.js",
  status: "active"
}
```

The test will appear automatically on the homepage and will have the link `exam.html?test=science8-ch2`.

## Notes

- The site is for practice. All questions and answers are visible to browser users in JavaScript source.
- Scores are calculated locally and not saved in a database.
- Reloading a test restarts the session.
- Confirm the GitHub Pages publishing status before sharing the website URL with students.
- Use only verified chapter-specific questions and correct answer keys.
