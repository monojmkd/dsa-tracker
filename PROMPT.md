# Prompt for adding a problem to the tracker

Copy everything between the lines, fill in the problem and your code at the bottom,
and paste it into Claude. The reply is JSON you can save as a .json file and import
with the Import button.

---
I am adding a DSA problem to my tracker. Reply with ONLY a JSON array that contains one
object for this problem (no text before or after it), using exactly the structure below.

{
  "id": "lc-<problem number>",
  "title": "<number>. <problem name>",
  "url": "<LeetCode link>",
  "difficulty": "Easy | Medium | Hard",
  "status": "Solved",
  "topic": "<broad area: Arrays, Strings, Linked List, Hash Map, Math, Sorting, ...>",
  "pattern": "<the TECHNIQUE, e.g. Two Pointers, Sliding Window, Hashing, Fast & Slow Pointers, Dummy Node (Sentinel), Binary Search. Never the problem title>",
  "tags": "comma, separated, tags",
  "cue": "1-2 sentences: the clues in the statement that point to this pattern",
  "brute": "one line: the brute force",
  "bottleneck": "one line: what makes the brute force slow or awkward",
  "insight": "one line: the key insight",
  "edge": "- edge case one\n- edge case two",
  "time": "O(...)",
  "space": "O(...)",
  "approach": "short description of my solution in words",
  "java": "my solution in Java",
  "js": "my solution in JavaScript",
  "ts": "my solution in TypeScript",
  "traceInput": "the sample input used in the trace",
  "trace": "a dry run as a markdown table: header row, |---| row, one row per step; columns are the variables that change",
  "notes": "mistakes to avoid, why it works, anything worth remembering",
  "versions": [
    {
      "name": "alternate approach name",
      "time": "O(...)", "space": "O(...)",
      "note": "one-line idea and what it trades off",
      "java": "...", "js": "...", "ts": "...",
      "trace": "small dry run as a markdown table"
    }
  ],
  "interview": [
    { "q": "a question an interviewer is likely to ask", "kind": "Follow-up | Concept | Complexity | Edge case | Trade-off", "a": "short model answer" }
  ],
  "related": ["<number>. <LeetCode title>: why it is related"],
  "created": <current time in milliseconds>,
  "updated": <same number>
}

Rules:
1. Keep my logic exactly. I give code in one or two languages; write the other languages of the
   Java / JavaScript / TypeScript set, and make the TypeScript pass strict mode.
2. If I give an alternate approach, use it. If I do not, add one that uses a different technique.
   Give it its own time, space and small dry run. Use more than one alternate if I gave more.
3. Interview questions: 3 to 6 per problem. These are the follow-ups and questions most often
   asked about THIS problem, tied to my solution: complexity, why a step is needed, edge cases,
   trade-offs against the alternate, "what if the input is unsorted / streamed / huge", and the
   natural harder variant. Mix the kinds. Answers are 1 to 3 sentences, specific and correct.
4. Related problems: 2 to 5 well-known LeetCode problems that use the same idea or are the usual
   next step, each as "<number>. <title>: <short reason>".
5. Dry runs must be correct step by step. Use a small input, and show the values that change.
6. The code fields are JSON strings: use \n for new lines and escape quotes and backslashes.
7. If I give several problems, return several objects in the same array.

Problem: <number and name>

My solution:
<paste your code>

My alternate approach (optional):
<paste your code>
---
