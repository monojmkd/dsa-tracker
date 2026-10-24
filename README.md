# DSA Tracker

A personal, self-hosted tracker for data structures and algorithms practice. It keeps every problem you solve in one place, with your solutions in **Java, JavaScript and TypeScript**, step-by-step dry runs, alternate approaches, likely interview questions, related problems, and a spaced-revision schedule so you actually remember what you solved.

It is a small static web page plus one serverless function, backed by a Postgres database (Neon) that you own. No accounts, no tracking, no third-party service holding your notes.

> It is a notebook and revision planner, not a judge. It does not run your code and has no AI built in.

## Contents

- [What it does](#what-it-does)
- [Why it matters](#why-it-matters)
- [The five tabs](#the-five-tabs)
- [How to track a problem](#how-to-track-a-problem)
- [Revision tracking](#revision-tracking)
- [Dry-run diagrams](#dry-run-diagrams)
- [Deploy your own](#deploy-your-own)
- [Configuration](#configuration)
- [Using another host or database](#using-another-host-or-database)
- [Your data and backups](#your-data-and-backups)
- [Security notes](#security-notes)
- [Project structure](#project-structure)
- [Customising](#customising)
- [Troubleshooting](#troubleshooting)

## What it does

For every problem you can store:

- **Your solution in three languages**: Java, JavaScript and TypeScript, side by side with a Copy button.
- **Complexity** (time and space) and a short description of the approach.
- **A dry run**: a trace table for a small input, so you can see why it works instead of re-deriving it. Paste a markdown table and it renders as a real table, and one click turns it into a **diagram** you can save as a PNG or SVG.
- **Alternate approaches**: brute force, a better way, a different technique. Each has its own complexity, code in all three languages and its own small dry run.
- **"Next time" notes**: the clue that points to the pattern, the brute force, the bottleneck, the key insight and the edge cases.
- **Interview questions**: follow-ups, concept checks, complexity, edge cases and trade-offs, each with a short model answer.
- **Related problems**: the usual next problems for the same idea.
- **Revision data**: when you last revised it, how well you recalled it, what went wrong, and when to try it again.

Around that, the app gives you search and filters, a pattern library, a practice mode for interview questions, a list of related problems you have not solved yet, and a "due for revision" list.

## Why it matters

Solving a problem once is not the same as being able to solve it again, or recognise it in a new disguise. A notebook of solutions does not fix that. This tracker is built around the things that do help:

- **Revision is scheduled, not hoped for.** Rate how well you recalled a problem and the next revision date is set for you: soon if it went badly, later if it went well. The Revise tab shows what is due today.
- **You record why you failed, not just that you did.** Mistake type (concept, logic, syntax, edge case) and whether you recalled the mental model make it easy to see your real weak spots.
- **Patterns are first-class.** Each problem is tagged with a technique (Two Pointers, Sliding Window, Hashing and so on). The Patterns tab shows how to recognise each technique and every problem you have solved with it, which is how you transfer a solution to a new problem.
- **Interview prep sits next to the solution.** The follow-ups interviewers actually ask are stored with the problem, and the Interview tab lets you practise them as flashcards.
- **Your next problems come from your own history.** The Related tab merges the related problems of everything you have solved into one list, sorted by how many of your problems point to it.
- **It is yours.** Your notes live in your own database. Export them as JSON any time and take them anywhere.

## The five tabs

| Tab | What it is for |
|---|---|
| **Problems** | Your library. Search, filter by topic, difficulty, status or language, and open any problem to see its solutions, dry runs, alternates, interview questions and revision history. |
| **Patterns** | One card per technique with how to recognise it, common pitfalls, reusable Java/JS/TS templates, and the problems you tagged with it. |
| **Interview** | Every interview question from every problem in one list. Filter by kind (Follow-up, Concept, Complexity, Edge case, Trade-off) or topic, or press **Random question** to practise. |
| **Related** | The related problems from all your problems, merged. Defaults to "Not solved yet". Filter by the problem they relate to or by topic, and add any of them to your tracker as a Todo with one click. |
| **Revise** | Problems due for revision now, in the next 7 days, later, or never scheduled, with filters for recall level and mistake type. The tab label shows how many are due. |

## How to track a problem

A typical loop looks like this.

1. **Solve the problem** on LeetCode or wherever you practise.
2. **Add it**: press **+ Add problem** and fill in what you have. Only the title is required. Paste your code into the Java, JavaScript and TypeScript boxes; any language you skip is simply left out.
3. **Capture the thinking**, because this is the part that pays off later:
   - **Pattern**: the technique, not the problem name (for example *Two Pointers*).
   - **How I recognise it**: the clue in the statement that points to the pattern.
   - **Brute force, bottleneck, key insight, edge cases**: one line each.
   - **Trace**: a small input and a markdown table of the steps (header row, a `|---|` row, one row per step). Use **View as diagram** or **Save PNG** afterwards to turn it into a picture.
   - **Alternate approaches**: use **+ Add alternate approach** for each other way to solve it.
4. **Add interview questions and related problems** with **+ Add interview question** and the related-problems box (one per line, like `142. Linked List Cycle II: find where the cycle starts`).
5. **Set the status**: Todo, Attempted, Solved or Revisit.
6. **Revise later**: when you retry a problem without looking, open it and press **Log a revision** (see below).

### Filling entries faster with an AI assistant (optional)

[`PROMPT.md`](PROMPT.md) is a ready-made prompt. Paste it into any AI assistant together with your problem and your code, and it returns a complete JSON file: your solution translated to the other languages, alternate approaches, dry runs, interview questions and related problems. Save the reply as a `.json` file and load it with **Import**. Always read what it produces before you trust it; you are the one who has to defend it in an interview.

### Import, export and backup

- **Export** downloads everything as `dsa-tracker-backup.json`.
- **Import** loads a JSON file containing an array of records. Each record needs an `id` and a `title`. A record whose `id` already exists is **replaced** by the one in the file, and nothing is ever deleted by an import.
- **Lock** makes this browser forget the password. You will be asked for it again.

## Revision tracking

Every problem has seven optional revision fields:

| Field | Values |
|---|---|
| Last Revised | date of the latest attempt |
| Next Revision | date the next attempt is scheduled |
| Recall Level | Red / Yellow / Green |
| Solved Without Help | Yes / No |
| Time Taken | minutes |
| Mistake Type | Concept / Logic / Syntax / Edge Case |
| Mental Model Recalled | Yes / Partial / No |

Use **Log a revision** (on the problem page, or from the Revise tab) after each independent attempt. It adds the attempt to the problem's history and sets the fields above to that attempt's values. **Undo last revision** removes a mistaken entry.

The next revision date is suggested from the recall level, and you can change it:

| Recall level | Next revision |
|---|---|
| Red | 1 day |
| Yellow | 3 days |
| Green | 7 days, then 14, 30 and 60 for repeated Greens in a row |

A Red or Yellow resets the Green streak. Overdue problems are flagged on their cards and counted in the top bar and on the Revise tab.

## Dry-run diagrams

Every dry run (the main trace and each alternate approach's trace) has three buttons: **View as diagram**, **Save PNG** and **Save SVG**.

- Each row of the trace table becomes a **step card**, and arrows join the steps in order, wrapping onto a new row every three cards.
- A value that **changed since the previous step is highlighted**, so you can see the algorithm move instead of reading a grid of numbers.
- Longer descriptions in a column (such as "what happens") are shown as plain text on the card. If a trace has several tables, each keeps its heading, and the closing lines such as "Return 3." appear in a note box at the bottom.
- The diagram is drawn from the trace text, so it needs no extra data. Edit the trace and the diagram changes with it. Nothing is stored.
- **PNG** is made in your browser at twice the size, on a white background, which is handy for notes and slides. **SVG** stays sharp at any size and can be edited in a vector tool.
- Any trace written as a markdown table works. A trace with no table has no diagram buttons.

## Deploy your own

You need three free things: a GitHub account, a [Neon](https://neon.tech) account for the database, and a [Vercel](https://vercel.com) account for hosting. Vercel is the easiest host because the API is written as a Vercel serverless function (see [Using another host or database](#using-another-host-or-database) for anything else). Node.js 20 or newer is needed only if you run it locally.

### 1. Get the code

Fork this repository on GitHub, or clone it and push it to a repository of your own:

```bash
git clone https://github.com/<your-username>/dsa-tracker.git
cd dsa-tracker
```

### 2. Create the database

1. Create a project at [neon.tech](https://neon.tech).
2. Open the project dashboard, click **Connect**, and copy the connection string. It looks like `postgresql://user:password@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require`.

You do not need to create any tables. The API creates the `problems` table the first time it runs. ([`schema.sql`](schema.sql) shows the table if you prefer to create it yourself.)

### 3. Deploy to Vercel

1. In Vercel choose **Add New → Project** and import your repository.
2. Leave **Framework Preset** as **Other**, and leave the build command and output directory empty. The project is a static page plus an `api/` folder, so there is nothing to build.
3. Under **Environment Variables**, add the two variables from [Configuration](#configuration): `DATABASE_URL` and `APP_PASSWORD`.
4. Click **Deploy**.

If you added or changed the variables after the first deploy, **redeploy** so the running functions pick them up.

Prefer the command line?

```bash
npm i -g vercel
vercel                          # link and deploy a preview
vercel env add DATABASE_URL     # paste the Neon connection string
vercel env add APP_PASSWORD     # choose your password
vercel --prod
```

### 4. First run

Open your Vercel URL. You are asked for the password once; it is the `APP_PASSWORD` you set. Then add your first problem, or press **Import** to load a backup or a file made with [`PROMPT.md`](PROMPT.md).

### Run it locally

```bash
npm install
cp .env.example .env.local      # then edit the two values
vercel dev                      # serves the page and the API at http://localhost:3000
```

If the project is already linked, `vercel env pull .env.local` fetches your variables instead.

## Configuration

| Variable | Required | What it is |
|---|---|---|
| `DATABASE_URL` | yes | The Neon connection string. It stays on the server and is never sent to the browser. |
| `APP_PASSWORD` | yes | The password the app asks for. Every API request must send it, and without it set the API refuses everything. |

Neon's Vercel integration can create `DATABASE_URL` for you, which saves the copy and paste. Check that the variable exists in your Vercel project settings.

## Using another host or database

The front end is a single static file, `index.html`, so it can be served from anywhere. It talks to one endpoint, `/api/problems`, which is implemented in [`api/problems.js`](api/problems.js) as a Vercel-style function (`export default async function handler(req, res)`) using the Neon serverless driver.

- **Another host**: you need to run that handler, or an equivalent, at `/api/problems`. Hosts with a different function format (Netlify, Cloudflare and others) or a plain Node server need a small adapter around it.
- **Another database**: replace the queries in `api/problems.js`. The page does not care what stores the data as long as the endpoint behaves like this:

| Request | Behaviour |
|---|---|
| `GET /api/problems` | Returns a JSON array of every record (each includes its `id`). |
| `PUT /api/problems` | Body is one record or an array of records. Insert or replace each by `id`. |
| `DELETE /api/problems?id=<id>` | Deletes the record with that id. |

Every request carries an `x-password` header. Respond with `401` when it is missing or wrong.

## Your data and backups

Everything is stored as JSON in one table:

```sql
problems (id text PRIMARY KEY, data jsonb NOT NULL, updated_at bigint NOT NULL DEFAULT 0)
```

Pattern pages are stored in the same table, with ids that start with `pattern:`. A problem record looks like this (shortened):

```json
{
  "id": "lc-141",
  "title": "141. Linked List Cycle",
  "difficulty": "Easy",
  "status": "Solved",
  "topic": "Linked List",
  "pattern": "Fast & Slow Pointers",
  "cue": "Detect a loop in a linked list without extra memory.",
  "time": "O(n)",
  "space": "O(1)",
  "java": "...", "js": "...", "ts": "...",
  "trace": "| round | slow | fast |\n|---|---|---|\n| 1 | n1 | n2 |",
  "versions": [{ "name": "HashSet of visited nodes", "time": "O(n)", "space": "O(n)", "java": "...", "js": "...", "ts": "...", "trace": "..." }],
  "interview": [{ "q": "Why must slow and fast meet?", "kind": "Concept", "a": "..." }],
  "related": ["142. Linked List Cycle II: find the start of the cycle"],
  "recall": "Green",
  "lastRevised": "2026-10-18",
  "nextRevision": "2026-10-25",
  "revisions": [{ "date": "2026-10-18", "recall": "Green", "solvedWithoutHelp": "Yes", "timeTaken": 12 }]
}
```

Because the schema is just JSON, new fields never need a database migration, and old records keep working when the app gains features. Press **Export** regularly: a backup file is the simplest insurance against a mistake. Neon also keeps its own history for restoring the database; check your plan for how far back it goes.

## Security notes

This is a **single-user personal tool**, protected by one shared password. That is enough to keep strangers out of your notes, but know what it is:

- The password is checked on the server for every request and is stored in the browser's `localStorage` after you enter it. Use **Lock** on a shared computer.
- There are no user accounts, no per-user data and no rate limiting. Do not use it for anything sensitive or for a team.
- Use a long, random `APP_PASSWORD`, and serve the app over HTTPS (Vercel does this by default).
- Keep `DATABASE_URL` and `APP_PASSWORD` out of git. `.gitignore` already excludes `.env` files; only `.env.example` is committed.
- Rotate the password by changing `APP_PASSWORD` in Vercel and redeploying, then press **Lock** on your devices.

## Project structure

```
dsa-tracker/
├── index.html        the whole front end: page, styles and logic in one file
├── api/
│   └── problems.js   the one serverless function: list, save and delete records
├── schema.sql        the table definition (created automatically if you skip it)
├── package.json      one dependency: @neondatabase/serverless
├── PROMPT.md         a prompt that makes an AI assistant produce an import file
├── .env.example      the two settings you need
└── .gitignore
```

## Customising

- **Revision intervals**: change `RED_DAYS`, `YELLOW_DAYS` and `GREEN_STEPS` near the top of the script in `index.html`.
- **Topic suggestions and pattern names**: edit the `TOPICS` and `PATS` lists in the same script. You can also type any topic or pattern you like in the form.
- **Interview question kinds**: the `KINDS` list in the script.
- **Look and feel**: the colours are CSS variables at the top of the stylesheet, with a dark theme that follows the system setting.

## Troubleshooting

| Symptom | Likely cause and fix |
|---|---|
| The password prompt keeps coming back | The password does not match `APP_PASSWORD`. Fix it and reload, or press **Lock** and enter it again. |
| Every request is rejected even with the right password | `APP_PASSWORD` is not set in the deployment. Add it in Vercel and redeploy. |
| "Could not load from the server" or "Server error" | Usually `DATABASE_URL` is missing or wrong. Check the variable, redeploy, and read the function logs in Vercel. |
| The first load after a quiet period is slow | The free Neon database may be waking up. Wait a few seconds and it speeds up. |
| Changes to environment variables have no effect | Variables are read at deploy time. Redeploy after changing them. |
| Import says the file is not valid | It must be a JSON array, and every record needs an `id` and a `title`. |
| Save PNG shows a message, or a download does nothing | Some browsers, mostly on phones, block the image export or the download. Try **Save SVG** or a desktop browser, or open **View as diagram** and long-press the image to save it. |
| A trace shows as plain text | The table needs a header row, a separator row made of dashes, and every row must start with a pipe character. |

## FAQ

**Can several people use one deployment?** No. There is one shared password and one set of data. Each person should deploy their own copy, which takes a few minutes.

**Does it work offline?** No. The page needs its API and database. Keep exports as your offline copy.

**Can I use it for something other than LeetCode?** Yes. Problems are free-form records, so any source works. Ids like `lc-141` are only a convention.
