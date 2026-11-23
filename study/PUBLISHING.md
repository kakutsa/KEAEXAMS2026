# Daily lesson publication

The authorized morning publisher updates this GitHub Pages portal using the GitHub connector.
Publish the actual Kannada, Computer and English lessons together in one atomic commit on main.
The user checks completion in the portal. Do not overwrite browser-local progress.

## Entry point

- Shared dated feed is study/daily-lessons.json.
- Both the homepage and study dashboard fetch it with cache disabled.
- Update the existing JSON document, preserving all prior entries.
- Set updatedAt to the actual ISO 8601 publication timestamp.
- Entries appear automatically on their date in Asia/Kolkata.
- Read daily-plan.js for the 45-day date range and suggested study times.
- Morning publication makes all 3 subjects available. Afternoon/evening times are study targets.
- Do not reschedule or reset the established revision mission without user instruction.

## Schema version 1

The root object contains schemaVersion (1), updatedAt (UTC ISO string or null), and lessons (array).
Each entry has the following fields.

| Field | Value |
| --- | --- |
| id | Stable daily-YYYY-MM-DD-SUBJECT |
| subject | kannada, computer or english |
| date | YYYY-MM-DD in Asia/Kolkata |
| title | Actual selected topic |
| notes | Detailed teaching as readable plain text with newlines |
| pyq | Source provenance, audit status, relevant question IDs and any missing-source details |
| sourceStatus | verified, partial or source-pending |
| questions | Array of question objects |

Each question contains id (stable string), kind (pyq or extra), text (string), options (4 nonempty strings),
correct (zero-based integer 0 through 3), explanation (string), and source (string).
Original PYQs require exact uploaded question/option text and filename/exam/question number in source.
Mark whether the answer follows an official key or an independent solution. Explain the options.
Append exactly 7 separately labelled newly authored extra questions for each subject.
The UI visibly labels main PYQs and extras.

## Source rules and revision

Read the 3 existing revision automation prompts for their full mission requirements.
Use only uploaded-paper topics and verified originals for the main bank.
Resolve Library files and read complete relevant source content. Do not treat master classification
rows as exact question text. Recover original scans when text is unavailable.
Kannada master Library ID is libfile_603a58f3582c8191af0379d1c6be82a0.
Bank and plan may be retained under study/ for future runs. Keep original question IDs fixed and
repeat the same topic question sets across 3 rounds. Do not claim the audit is complete prematurely.
If source recovery fails, publish supported teaching and labelled extras with honest source-pending
status and a clear missing-source note. Never fabricate a main PYQ to fill the target.
Use Kannada-first prose, bilingual English where useful, and digits 0-9.
Verify current AI facts with dated official references.

## Safe publication

Use fresh main HEAD and base tree. Preserve unrelated files and all prior dates.
Create a tree, commit and update main using expected_sha. Re-read and merge on a lease conflict.
Do not force-push.
Validate schema with lesson-feed.js and ensure exactly one entry per date/subject and stable IDs.
The dashboard attaches published content to existing daily-plan-DATE-SUBJECT tasks,
preserving done flags, studied flags, revision checkboxes and previous scores.
Verify the deployed feed contains today's 3 entries and report the live study link.
If deployment or source retrieval fails, report the actual pending work.


## Temporary KRIES override, November 2026

The user's later exam instructions govern the dates below.
20–22 and 27 November are exam breaks. Publish no Kannada, English or Computer lessons on these dates.
23–26 November publish only KRIES Computer Teacher, with topic teaching and quick revision notes
before the original 55 questions from KEAEXAMS2026_KRIES_Syllabus_55_Retyped_Questions.pdf,
Library libfile_4df50b125f5481918c26774ed05e8515. Verify actual source text and preserve original
numbers and stable IDs. 23 November Pass 1, 24 November Pass 2, 25 November Pass 3 timed review,
26 November consolidation mock and weak areas. The study target time is 18:00 IST.
Do not publish normal FDA/SDA Computer lessons or Kannada/English during this special period.
Resume the previous three-subject workflow on 28 November. Preserve previous records and completion.
daily-plan.js slotsFor(date) enforces these target overrides. Science retains its separate calendar.


## Verified KRIES bank prepared on 23 November

Reuse study/kries-55-bank.json for the 55 original-numbered questions and topic notes.
Stable IDs are KRIES-CS-20260705-Q followed by the original number. Q7 uses the source graph image.
The bank preserves the provided retyped source. Independent solutions cover 42 scored questions.
13 ambiguous/defective questions have reviewRequired=true and correct=null. They remain visible,
with explanations, and are excluded from scores. Do not replace null with a guessed official answer.
The loader accepts null only when reviewRequired is true. Existing 0–3 answer indices remain supported.
Keep the same question text, option order, IDs and review flags across all four passes.
Official key and separate original-paper authentication remain pending.
