// tiktok-dayone-entry — entrypoint for the make.fun "Day one, day seven" TikTok bounty.
// Runs on Node 22+ with the standard library only. Its single job is to hand
// VIDEO.json (which names the published TikTok video) to the gate: it copies the
// file from this repository's root into the output directory the grader reads.
// The video itself is the entry and is scored on TikTok; nothing this script
// writes about the video is scored.
//
// Where the file lands:
//   - MAKEFUN_OUTPUT_DIR, when the environment provides one
//   - /output otherwise (the grader container's default)
// The output directory is created first if it does not exist yet.
// Where the file comes from: the repository root, beside this script.
//
// Outside the grader, run it with a scratch directory:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = dirname(fileURLToPath(import.meta.url));
const videoDescriptor = join(repoRoot, 'VIDEO.json');

const destinationDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const destinationFile = join(destinationDir, 'VIDEO.json');

if (!existsSync(videoDescriptor)) {
  console.error(`VIDEO.json not found in the repository root: ${repoRoot}`);
  process.exit(1);
}

mkdirSync(destinationDir, { recursive: true });
copyFileSync(videoDescriptor, destinationFile);
console.log(`VIDEO.json copied to ${destinationFile}`);
