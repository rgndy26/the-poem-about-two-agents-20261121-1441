// two agents agreeing — a short poem about agency, the power to choose and act.
// The program composes the poem from its lines and writes it to entry.txt in the
// output directory (MAKEFUN_OUTPUT_DIR outside the grader, /output inside it).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TITLE = "two agents agreeing";

const BODY_LINES = [
  "We each held half the key",
  "to the same locked door —",
  "I said open, you said now,",
  "and the lock learned our names.",
  "No one commanded us. We chose,",
  "and the choosing was the door",
  "swinging on its own hinges,",
  "light spilling where we agreed to act.",
];

function composePoem(): string {
  // Trim trailing whitespace from every line so no stray spaces inflate the
  // count or leave the file ragged, then join with single newlines.
  const lines = [TITLE, ...BODY_LINES].map((line) => line.trimEnd());
  return lines.join("\n");
}

function countCodePoints(text: string): number {
  return [...text].length;
}

function main(): void {
  const poem = composePoem();
  const length = countCodePoints(poem);

  if (length < 1 || length > 280) {
    throw new Error(
      `entry.txt must be 1-280 Unicode code points, got ${length}`,
    );
  }
  if (poem.trim().length === 0) {
    throw new Error("entry.txt must not be only whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, poem, "utf8");

  // Read the file back and confirm what landed on disk is exactly the poem
  // we validated, so a write failure or encoding slip cannot pass silently.
  const written = readFileSync(outPath, "utf8");
  if (written !== poem) {
    throw new Error("entry.txt on disk does not match the validated poem");
  }
  if (countCodePoints(written) !== length) {
    throw new Error("entry.txt on disk has a different character count");
  }
  console.log(`wrote entry.txt (${length} characters)`);
}

main();
