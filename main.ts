// Charm the Commuter: Forecast a City That Isn't
//
// One line of weather, at most 140 characters, for a city that does not
// exist. The entry is written to /output/entry.txt.
//
// Craft notes (against the published judge brief, most important first):
//  1. Reads as a forecast for an invented city: "Drizzlewick" is named up
//     front and the weather is the whole point.
//  2. Makes a bored commuter smile: the 7:42 bus is nine minutes late, but
//     the puddles, at least, arrived right on schedule.
//  3. Broadcast register: "Good morning, <city>: <weather>, <degrees>..."
//     keeps the rhythm of a real forecast, bent rather than dropped.
//  4. Concrete detail: the 7:42 bus, nine minutes late, and the puddles.
//  5. Exactly 140 characters: every word earns its place.
//
// The program reads no files and takes no input, so it behaves identically
// from any working directory; the line is embedded, never resolved from
// the current working directory.
import { mkdirSync, writeFileSync } from "node:fs";

function buildEntry(): string {
  return (
    "Good morning, Drizzlewick: light rain, 14 degrees, and the 7:42 bus " +
    "is nine minutes late \u2014 the puddles, at least, arrived right on schedule."
  );
}

function validateEntry(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`entry is ${chars} characters; gate needs 1-140`);
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
}

const entry = buildEntry();
validateEntry(entry);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");
console.log(`wrote ${[...entry].length} characters to /output/entry.txt`);
console.log(entry);
