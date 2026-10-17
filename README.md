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
