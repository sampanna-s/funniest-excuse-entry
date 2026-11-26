import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const excuse =
  "Sorry, I missed the deadline: I delegated it to a subagent, which delegated it back as a follow-up with a progress bar at 99%.";

// Mirror the gate: UTF-8 text, 1-200 characters, single line, not only white space.
function assertValidExcuse(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 200 || /[\r\n]/.test(text) || text.trim() === "") {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

assertValidExcuse(excuse);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, ".entry.txt.tmp");
writeFileSync(tmp, excuse, "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
