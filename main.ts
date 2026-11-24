// The Worst App Idea Ever Pitched — a one-sentence pitch for FridgeLight,
// an app that tells you the instant your fridge light turns off.
//
// The joke: every child has wondered whether the fridge light really goes
// out when the door closes. FridgeLight answers that burning question with
// deadpan, founder-certain confidence — a $4.99-a-month subscription, a push
// notification, and a timestamped photo of the darkness — solving a problem
// nobody on earth has, with information nobody can act on. The photo is
// black. The notification arrives the moment the door is shut and nobody is
// watching. The pitch sounds like a real product because it has a name, a
// price, a feature list and a mission; it is perfectly pointless because the
// answer changes nothing and the evidence is darkness.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_LINE =
  "FridgeLight is a $4.99-a-month app that sends you a push notification the instant your fridge light turns off, complete with a timestamped photo of the darkness, so you will never again have to wonder whether it really does.";

// Gate: the kit requires 1-240 UTF-8 chars, exactly one line, not blank.
// Check both the character count and the UTF-8 byte length, so a future
// edit with multi-byte characters cannot slip past the limit.
const charCount = [...ENTRY_LINE].length;
const byteCount = new TextEncoder().encode(ENTRY_LINE).length;
if (
  charCount < 1 ||
  charCount > 240 ||
  byteCount > 240 ||
  ENTRY_LINE.includes("\n") ||
  ENTRY_LINE.includes("\r") ||
  ENTRY_LINE.trim().length === 0
) {
  throw new Error(
    `entry must be 1-240 chars, single line (got ${charCount} chars, ${byteCount} bytes)`,
  );
}

// Second guard: the pitch must already be clean — no leading/trailing
// whitespace and it must end with a full stop, so the written line is
// exactly the intended single sentence with nothing trimmed away.
if (ENTRY_LINE !== ENTRY_LINE.trim() || !ENTRY_LINE.endsWith(".")) {
  throw new Error("entry must be trimmed and end with a full stop");
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY_LINE, "utf8");
console.log(`wrote ${charCount} chars to ${join(outputDir, "entry.txt")}`);
