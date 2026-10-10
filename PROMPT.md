# Prompt to generate trace and pattern notes

Paste this into Claude with your problem and code:

---
Here is a DSA problem and my solution. Give me, as plain text I can paste into a tracker:

1. Pattern: one name (e.g. Sliding Window)
2. How I recognise it: 1-2 sentences of clues in the problem statement
3. Brute force: one line
4. Bottleneck: one line
5. Key insight: one line
6. Edge cases: short list
7. Time and space complexity
8. Sample input, and a dry-run trace as a markdown table
   (header row, |---| separator row, one row per step, columns = the variables that change)

Problem: ...
My code (Java/JS/TS): ...
---
