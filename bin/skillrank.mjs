#!/usr/bin/env node
// skillrank — check what a skill can actually do to your machine, before you
// install it.
//
//   npx skillrank ./path/to/skill        one skill
//   npx skillrank ./skills               every skill under a directory
//   npx skillrank ~/.claude/skills       what you already have installed
//   npx skillrank . --json               machine-readable
//   npx skillrank . --min B              exit 1 if anything grades below B
//
// Nothing is executed, nothing is uploaded, no API key is needed and no tokens
// are spent. It reads files and matches patterns. That is the whole program.

import { existsSync, statSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { scanSkill, findSkills, TIERS } from '../lib/scan.mjs';

const args = process.argv.slice(2);
const wantJson = args.includes('--json');
const quiet = args.includes('--quiet');
const minIdx = args.indexOf('--min');
const min = minIdx === -1 ? null : args[minIdx + 1];
const target = args.find((a) => !a.startsWith('--') && a !== min);

if (!target || args.includes('--help') || args.includes('-h')) {
  console.log(`skillrank — what can this skill actually do?

  npx skillrank <path>            scan a skill directory, or a tree of them
  npx skillrank <path> --json     machine-readable output
  npx skillrank <path> --min B    exit 1 if any skill grades below B
  npx skillrank <path> --quiet    only show skills that are not an A

Static analysis only. Nothing is executed, nothing leaves your machine,
no model is called and no tokens are spent.`);
  process.exit(target ? 0 : 2);
}

const path = resolve(target);
if (!existsSync(path)) {
  console.error(`no such path: ${path}`);
  process.exit(2);
}

const dirs = statSync(path).isFile() ? [resolve(path, '..')] : findSkills(path);
if (!dirs.length) {
  console.error(`no SKILL.md found under ${path}`);
  process.exit(2);
}

const results = dirs.map((d) => scanSkill(d, { root: d, repoRoot: path }));
results.sort((a, b) => a.score - b.score);

if (wantJson) {
  console.log(JSON.stringify({ scanned: results.length, skills: results }, null, 2));
} else {
  const COLOR = process.stdout.isTTY && !process.env.NO_COLOR;
  const c = (code, s) => (COLOR ? `[${code}m${s}[0m` : s);
  const gradeColor = { A: 32, B: 32, C: 33, D: 33, F: 31 };
  const sevColor = { critical: 31, high: 31, medium: 33, low: 90, info: 90 };

  let shown = 0;
  for (const r of results) {
    if (quiet && r.grade === 'A') continue;
    shown++;
    console.log(
      `\n${c(gradeColor[r.grade], `[${r.grade}]`)} ${c(1, r.name)}  ${c(90, `${r.score}/100`)}  ` +
        `${c(36, `T${r.tier} ${r.tier_name}`)} ${c(90, '— ' + TIERS[r.tier].desc)}`
    );
    const real = r.findings.filter((f) => !f.rollup && f.severity !== 'info' && !f.suppressed);
    if (!real.length) {
      console.log(c(90, '    nothing flagged'));
      continue;
    }
    const seen = new Set();
    for (const f of real) {
      if (seen.has(f.id)) continue;
      seen.add(f.id);
      console.log(
        `    ${c(sevColor[f.severity], f.severity.padEnd(8))} ${f.id.padEnd(22)} ` +
          c(90, `${f.file}:${f.line}`)
      );
      if (f.evidence) console.log(c(90, `             ${f.evidence.slice(0, 100)}`));
    }
  }

  const dist = results.reduce((a, r) => ((a[r.grade] = (a[r.grade] || 0) + 1), a), {});
  console.log(
    `\n${results.length} skill(s) scanned` +
      (quiet ? ` (${results.length - shown} clean, hidden)` : '') +
      ` — ` +
      ['A', 'B', 'C', 'D', 'F'].map((g) => `${g}:${dist[g] || 0}`).join(' ')
  );
  if (results.some((r) => r.tier >= 3)) {
    console.log(
      c(90, 'Tier 3+ means it can run commands. That may be exactly right — ask whether it needs to.')
    );
  }
}

if (min) {
  const ORDER = ['A', 'B', 'C', 'D', 'F'];
  const limit = ORDER.indexOf(min.toUpperCase());
  const failures = results.filter((r) => ORDER.indexOf(r.grade) > limit);
  if (failures.length) {
    if (!wantJson) console.error(`\n✗ ${failures.length} skill(s) below ${min.toUpperCase()}`);
    process.exit(1);
  }
}
