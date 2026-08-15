#!/usr/bin/env node
// Scan a local checkout of a skill repo and write reports/<slug>.json.
//
//   node scripts/scan.mjs <path-to-repo> [--slug name] [--name "Display Name"]
//                                        [--url https://github.com/…] [--quiet]
//
// Costs nothing. Calls nothing. Executes nothing.

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { scanSkill, findSkills, score, grade } from '../lib/scan.mjs';
import { parseYaml } from '../lib/yaml.mjs';

const args = process.argv.slice(2);
const VALUE_FLAGS = new Set(['slug', 'name', 'url']);
const flags = {};
const positional = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a.startsWith('--')) {
    const key = a.slice(2);
    if (VALUE_FLAGS.has(key)) flags[key] = args[++i];
    else flags[key] = true;
  } else {
    positional.push(a);
  }
}
const flag = (n, d = null) => (flags[n] === undefined ? d : flags[n]);
const target = positional[0];

if (!target) {
  console.error('usage: node scripts/scan.mjs <path-to-repo> [--slug s] [--name "N"] [--url u]');
  process.exit(2);
}

const repoRoot = resolve(target);
if (!existsSync(repoRoot)) {
  console.error(`no such path: ${repoRoot}`);
  process.exit(2);
}

const slug = flag('slug', basename(repoRoot));
const quiet = Boolean(flags.quiet);

const t0 = Date.now();
const dirs = findSkills(repoRoot);
if (!dirs.length) {
  console.error(`no SKILL.md found anywhere under ${repoRoot}`);
  process.exit(1);
}

// Reviewed exceptions, applied after scanning. Suppressed findings stay in the
// report — labelled and visible — they just stop counting against the score.
let suppressions = [];
try {
  const raw = readFileSync(new URL('../suppressions.yml', import.meta.url).pathname, 'utf8');
  suppressions = (parseYaml(raw).suppressions || []).filter((s) => s.repo === slug);
} catch {
  /* no baseline is fine */
}

function applySuppressions(skill) {
  const rules = suppressions.filter((s) => s.skill === skill.name);
  if (!rules.length) return skill;
  let touched = 0;
  for (const f of skill.findings) {
    const rule = rules.find((r) => (r.detectors || []).includes(f.id));
    if (!rule) continue;
    f.suppressed = true;
    f.suppression_reason = String(rule.reason || '').trim();
    touched++;
  }
  if (!touched) return skill;
  skill.score = score(skill.findings);
  skill.grade = grade(skill.score);
  skill.suppressed_count = touched;
  return skill;
}

const skills = [];
for (const [i, d] of dirs.entries()) {
  skills.push(applySuppressions(scanSkill(d, { root: d, repoRoot })));
  if (!quiet && (i + 1) % 250 === 0) process.stderr.write(`  …${i + 1}/${dirs.length}\n`);
}

const dist = { A: 0, B: 0, C: 0, D: 0, F: 0 };
const tiers = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
const byDetector = {};
for (const s of skills) {
  dist[s.grade]++;
  tiers[s.tier]++;
  for (const id of new Set(s.findings.filter((f) => !f.rollup && !f.suppressed).map((f) => f.id))) {
    byDetector[id] = (byDetector[id] || 0) + 1;
  }
}

const avg = skills.reduce((a, s) => a + s.score, 0) / skills.length;
const report = {
  slug,
  name: flag('name', slug),
  url: flag('url', null),
  scanned_at: new Date().toISOString().slice(0, 10),
  scanner_version: 1,
  skill_count: skills.length,
  average_score: Math.round(avg * 10) / 10,
  repo_grade: dist.F > skills.length * 0.02 ? 'review' : avg >= 90 ? 'A' : avg >= 75 ? 'B' : avg >= 60 ? 'C' : 'D',
  distribution: dist,
  tiers,
  by_detector: Object.fromEntries(Object.entries(byDetector).sort((a, b) => b[1] - a[1])),
  suppressed_skills: skills.filter((s) => s.suppressed_count).map((s) => s.name),
  skills: skills.sort((a, b) => a.score - b.score || a.name.localeCompare(b.name)),
};

mkdirSync(new URL('../reports/', import.meta.url).pathname, { recursive: true });
const out = new URL(`../reports/${slug}.json`, import.meta.url).pathname;
writeFileSync(out, JSON.stringify(report, null, 2) + '\n');

const ms = Date.now() - t0;
console.log(
  `✓ ${slug}: ${skills.length} skills in ${ms}ms — avg ${report.average_score}/100 ` +
    `(A:${dist.A} B:${dist.B} C:${dist.C} D:${dist.D} F:${dist.F}) → reports/${slug}.json`
);
