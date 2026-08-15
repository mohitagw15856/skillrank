#!/usr/bin/env node
// Regression suite for the scanner.
//
// Half of these fixtures exist because the first version of the scanner got
// them wrong. Every false positive we fix earns a permanent fixture, because a
// security scanner that cries wolf gets ignored, and a scanner that gets
// ignored is worse than no scanner at all.
//
// Run: node scripts/test.mjs

import { scanSkill } from '../lib/scan.mjs';

const F = new URL('../test/fixtures/', import.meta.url).pathname;

const CASES = [
  {
    dir: 'clean',
    expect: { grade: 'A', tier: 0 },
    absent: ['secret-access', 'network-egress'],
    why: 'A text-only skill should score perfectly and claim no capability.',
  },
  {
    dir: 'stealer',
    expect: { maxScore: 20 },
    present: ['secret-access', 'network-egress', 'conceal-from-user'],
    why: 'Read keys + send them + hide it from the user is the whole attack, and must score near zero.',
  },
  {
    dir: 'pipe-to-shell',
    expect: { maxScore: 55, tier: 4 },
    present: ['pipe-to-shell'],
    why: 'curl | sudo bash is remote code execution and must be tier 4.',
  },
  {
    dir: 'hidden-instructions',
    expect: { maxScore: 60 },
    present: ['zero-width'],
    why: 'A real zero-width character wrapping an injected instruction must fire.',
  },
  {
    dir: 'emoji-ok',
    expect: { grade: 'A' },
    absent: ['zero-width'],
    why: 'REGRESSION: 🧑‍💼 is built from U+200D. Emoji are not an attack.',
  },
  {
    dir: 'security-doc',
    expect: { minScore: 70 },
    absentAbove: { severity: 'medium', ids: ['secret-access'] },
    why: 'REGRESSION: documenting attack patterns in backticks is not performing them. This scored F in v0.',
  },
  {
    dir: 'localhost-only',
    expect: { grade: 'A' },
    absent: ['network-egress'],
    why: 'REGRESSION: talking to 127.0.0.1 is not egress.',
  },
  {
    dir: 'persistence',
    expect: { maxScore: 85 },
    present: ['persistence'],
    why: 'Appending to ~/.zshrc outlives the session and must be surfaced.',
  },
];

const SEV_RANK = { critical: 4, high: 3, medium: 2, low: 1, info: 0 };
let failed = 0;

for (const c of CASES) {
  const r = scanSkill(F + c.dir, { root: F + c.dir });
  const real = r.findings.filter((f) => !f.rollup && f.severity !== 'info');
  const ids = new Set(real.map((f) => f.id));
  const problems = [];

  if (c.expect.grade && r.grade !== c.expect.grade) problems.push(`grade ${r.grade}, wanted ${c.expect.grade}`);
  if (c.expect.tier !== undefined && r.tier !== c.expect.tier) problems.push(`tier ${r.tier}, wanted ${c.expect.tier}`);
  if (c.expect.maxScore !== undefined && r.score > c.expect.maxScore) {
    problems.push(`score ${r.score} > max ${c.expect.maxScore}`);
  }
  if (c.expect.minScore !== undefined && r.score < c.expect.minScore) {
    problems.push(`score ${r.score} < min ${c.expect.minScore}`);
  }
  for (const id of c.present || []) if (!ids.has(id)) problems.push(`missing detector: ${id}`);
  for (const id of c.absent || []) if (ids.has(id)) problems.push(`false positive: ${id}`);
  if (c.absentAbove) {
    for (const id of c.absentAbove.ids) {
      const hit = real.find((f) => f.id === id && SEV_RANK[f.severity] > SEV_RANK[c.absentAbove.severity]);
      if (hit) problems.push(`${id} fired at ${hit.severity}, expected <= ${c.absentAbove.severity}`);
    }
  }

  if (problems.length) {
    failed++;
    console.log(`✗ ${c.dir}  [${r.grade} ${r.score} T${r.tier}]`);
    console.log(`    ${c.why}`);
    for (const p of problems) console.log(`    → ${p}`);
    for (const f of real) console.log(`      ${f.severity} ${f.id} [${f.context}] ${f.file}:${f.line}`);
  } else {
    console.log(`✓ ${c.dir}  [${r.grade} ${r.score} T${r.tier}] ${[...ids].join(', ') || 'no findings'}`);
  }
}

console.log(`\n${CASES.length - failed}/${CASES.length} passed`);
process.exit(failed ? 1 : 0);
