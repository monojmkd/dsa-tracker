# DSA Tracker (Vercel + Neon)

## Setup
1. **Neon**: create a project at neon.tech and copy the connection string
   (Dashboard > Connect, looks like `postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require`).
2. **GitHub**: push this folder to a new repo.
3. **Vercel**: Add New > Project > import the repo. No build settings needed.
4. In Vercel > Settings > Environment Variables add:
   - `DATABASE_URL` = your Neon connection string
   - `APP_PASSWORD` = a password you choose
   (If you use Neon's Vercel integration, `DATABASE_URL` is added for you.)
5. Deploy (or redeploy after adding the variables) and open your site. Enter your password when asked.

The table is created automatically on the first request. `schema.sql` is there if you prefer to run it yourself.

## Moving your old data
In the earlier version press **Export**, then in this one press **Import** and pick the JSON file.

## Notes
- The password is saved in your browser; **Lock** forgets it on that device.
- Never put the connection string in index.html. It stays in the Vercel environment variable.

## Traces, versions and patterns
- **Trace**: on a problem, fill "Sample input" and paste a markdown table; it renders as a real table.
- **Alternate approaches**: add brute force / better / other solutions. Each has its own time and space complexity, a note, Java / JS / TS code, and a small dry run (paste a markdown table; it renders as a table).
- **Next time**: per-problem recognition cue, brute force, bottleneck, key insight and edge cases.
- **Patterns tab**: one card per pattern with recognition cues, pitfalls, reusable Java/JS templates and your problems tagged with it.
  Pattern notes are stored in the same table (id starts with `pattern:`), so no database changes are needed.
  Old data keeps working; the new fields are optional.

See PROMPT.md for a prompt that makes Claude produce text you can paste straight into these fields.

## TypeScript
Every problem, version and pattern template now has a TypeScript box next to Java and JavaScript. Older entries without TS keep working.

## Interview questions and related problems
- Each problem has an **Interview questions** section: follow-ups, concept checks, complexity, edge cases and trade-offs, each with a short model answer. Click a question to see the answer.
- **Related problems** lists the usual next problems for the same idea (title and reason).
- The **Interview** tab collects every question from every problem. Filter by kind or topic, search, or press **Random question** to practise: it shows a question, you answer in your head, then press Show answer.
- In the problem form, add questions with **+ Add interview question** and put related problems one per line.
- Data shape (both optional, so old entries keep working): `interview: [{ q, a, kind }]` and `related: ["142. Linked List Cycle II: reason"]`. Kinds are Follow-up, Concept, Complexity, Edge case, Trade-off.
- The database and API are unchanged: records are stored as JSON, so the new fields are saved automatically.
- PROMPT.md is a ready-made prompt that makes Claude return a complete import file in this shape, interview questions included.

## Related tab
- The **Related** tab merges the related problems from all your problems into one list (duplicates are combined), so you can see what to solve next.
- Each row shows how many of your problems point to it ("from 5 problems"), whether you already have it in the tracker, and, under "Why it is related", the reason from each source problem.
- Filters: **Not solved yet** (the default), **Already solved** or **All**; **Related to** one specific problem; the topic of the source problems; and a search box. Sort by most referenced or by problem number.
- **Add to tracker as Todo** opens the problem form pre-filled with the title and id (lc-<number>). Set the difficulty and link when you save. The row then shows "In tracker: Todo" until you mark it Solved.
- A related problem counts as in the tracker when a problem with that number exists (id lc-<number> or a title starting with the number).
- On a problem page, related problems you already have show a "Solved" or "In tracker" badge you can click to open them.
- No data changes: the tab is built from the existing `related` lists.

## Revision tracking
Seven fields on every problem, all optional:
| Field | Values |
|---|---|
| Last Revised | date of the latest attempt |
| Next Revision | date the next attempt is scheduled |
| Recall Level | Red / Yellow / Green |
| Solved Without Help | Yes / No |
| Time Taken | minutes |
| Mistake Type | Concept / Logic / Syntax / Edge Case |
| Mental Model Recalled | Yes / Partial / No |

- **Log a revision** (on the problem page, or from the Revise tab) records one attempt. It is added to the problem's `revisions` history and the seven fields above are set to that attempt's values, so they always show the latest one. **Undo last revision** removes the newest attempt and goes back to the one before.
- **Next revision is suggested** from the recall level: Red = 1 day, Yellow = 3 days, Green = 7 days, then 14, 30 and 60 days for repeated Greens in a row (a Red or Yellow resets the streak). Change the date in the dialog if you want. The intervals are constants (`RED_DAYS`, `YELLOW_DAYS`, `GREEN_STEPS`) near the top of the script if you want to tune them.
- You can also edit the seven fields directly in the problem form. That does not touch the attempt history.
- **Revise tab**: problems due now (oldest first, with how overdue they are), the next 7 days, later, or not scheduled. Filter by recall level and mistake type, and search. The tab label shows how many are due, and the top counts include **Due to revise**.
- Problem cards show the recall colour and an Overdue / Due today badge.
- Data: `lastRevised`, `nextRevision` (YYYY-MM-DD), `recall`, `solvedWithoutHelp`, `timeTaken` (number), `mistakeType`, `mentalModel`, and `revisions: [{ date, recall, solvedWithoutHelp, timeTaken, mistakeType, mentalModel }]`. Empty fields are not stored. The database and API are unchanged.
