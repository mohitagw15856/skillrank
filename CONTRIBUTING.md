# Contributing

## Report a wrong grade (most valuable)

A wrong grade is a bug. Open an issue with the repo, the skill, and which
finding is wrong. Two kinds:

**False positive** — the scanner flagged something harmless.
This is the serious one. A scanner that cries wolf gets ignored, and a scanner
that gets ignored is worse than no scanner. Every false positive we fix earns a
permanent fixture in `test/fixtures/` and a case in `scripts/test.mjs`, so it
can never come back. Half the fixtures in there exist because v0 got them wrong.

**False negative** — something dangerous scored an A.
Send the pattern. If it is genuinely malicious, do not link a live payload;
describe it or use a defanged sample.

## Add a repo to the leaderboard

One file in `registry/`:

```yaml
name: owner/repo
url: https://github.com/owner/repo
clone: https://github.com/owner/repo.git
description: One line on what the collection is
```

CI clones and scans it on the next weekly run. There is no approval queue and
no favour to ask — if it contains `SKILL.md` files, it gets graded.

## Add a detector

In `lib/scan.mjs`. A detector must be:

- **Cheap** — a regex over text. No parsing, no network, no model call. The
  zero-cost constraint is the point: the moment grading costs money per skill,
  coverage becomes a budget decision and the long tail never gets scanned.
- **Explainable in one sentence** — that sentence goes in `why` and gets
  published in the README.
- **Pointable at a line** — if a finding cannot show you the evidence, it does
  not belong here.
- **Tested both ways** — one fixture that must fire it, one that must not.

Set `contextSensitive: true` if the pattern is one that documentation would
legitimately quote. That demotes matches inside quotes and code fences, which
is what stops security skills from being graded as malware.

## Suppress a finding

`suppressions.yml`, in the open, with a reason and your name:

```yaml
  - repo: some-repo
    skill: threat-detection
    detectors: [pipe-to-shell]
    reason: >
      references/threat-indicators.md is a catalogue of attack signatures, not
      a runbook. Same category as a WAF ruleset containing the attacks it
      blocks.
    reviewed_by: your-github-handle
    date: 2026-08-15
```

Suppressed findings are still displayed in the report, struck through. They
stop counting against the score; they never disappear. A private baseline file
is just a scanner you cannot audit.

## Local commands

```bash
node scripts/test.mjs                    # regression suite — run this first
node scripts/scan.mjs <path> --slug s    # scan a local checkout
node scripts/build.mjs                   # regenerate README + report pages
node bin/skillrank.mjs <path>            # the user-facing CLI
```

No dependencies, no `npm install`, no lockfile.

## The bar for a new rule

Ask: *if this fires on a thousand skills, will a reader still trust the next
finding?* If not, it is a `low` or it is `info`, or it is not a detector.
