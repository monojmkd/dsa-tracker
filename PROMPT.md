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
      "trace": "small dry run as a markdown table",
      "frames": [ <dry-run frames for this alternate, optional> ]
    }
  ],
  "frames": [ <dry-run frames for the main trace, see "Diagrams" below> ],
  "framesInput": "the sample input as one short line, e.g. nums = [2,7,11,15], target = 9",
  "model": { "title": "the idea in one line", "caption": "1-2 sentences", "frames": [ <1 or 2 frames> ] },
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
9. Diagrams. "frames" shows what the data structure looks like at each step of the dry run, one frame per
   step, using the same sample input as the trace table. Work out each step by tracing my code line by
   line, and make the last frame show the result. "model" is one picture of the idea of the solution
   (1 or 2 frames plus a caption), not a trace. Frame format:
     frame  = { "title": "left = 1, right = 3", "note": "one sentence about this step", "items": [ ...structures... ] }
     array  = { "t": "array", "label": "nums", "cells": ["2","7","11"], "ptr": { "i": 0, "left, right": 2 }, "hl": [..], "ok": [..], "dim": [..] }
     list   = { "t": "list", "chains": [ { "label": "list", "nodes": ["1","2","3"], "end": "null", "ptr": { "slow": 1 }, "loop": 0, "ok": [..], "dim": [..] } ] }
     map    = { "t": "map", "label": "seen", "entries": [["a","3"], "b"] }
     vars   = { "t": "vars", "vars": { "count": 2, "best": 5 } }
   Pointers (ptr) are indexes into cells or nodes. An array pointer may be -1 or the length (just off the end).
   A list pointer may equal the number of nodes to mean "on null" (only when "end" is "null"). Use "loop":
   <index> instead of "end" for a cycle. ok = matched or final (green), dim = ignored (grey), hl = highlight.
   The tracker already highlights whatever changed since the previous frame, so only use hl for extra emphasis.
   Limits: at most 12 frames, 16 array cells and 12 list nodes per picture.
   The frames must agree with the trace table and with my code. Do not invent steps.
8. Do not include revision fields (lastRevised, nextRevision, recall, solvedWithoutHelp, timeTaken,
   mistakeType, mentalModel, revisions). The tracker fills those in when I log a revision.

Problem: <number and name>

My solution:
<paste your code>

My alternate approach (optional):
<paste your code>
---
