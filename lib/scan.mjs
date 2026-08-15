// The scanner. Pure static analysis — no model is called, no network request is
// made, nothing is executed. Scanning ten thousand skills costs zero dollars and
// runs in a few seconds, which is the only way a registry like this stays honest:
// the moment grading costs money per skill, coverage becomes a budget decision.
//
// It reads the skill the way an attacker would write it, not the way an author
// describes it.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative, basename } from 'node:path';
import { createHash } from 'node:crypto';
import { parseFrontmatter } from './yaml.mjs';

// ---------------------------------------------------------------------------
// Capability tiers — what the skill can reach, regardless of intent.
// This is not a judgement. A deploy skill SHOULD be T3. The tier exists so you
// can ask "why does a changelog formatter need the network?"
// ---------------------------------------------------------------------------
export const TIERS = {
  0: { name: 'text', desc: 'Text in, text out. Touches nothing.' },
  1: { name: 'read', desc: 'Reads files in the working directory.' },
  2: { name: 'write', desc: 'Writes or edits files.' },
  3: { name: 'exec', desc: 'Runs shell commands or bundled scripts.' },
  4: { name: 'remote', desc: 'Executes code or instructions fetched from the network.' },
};

const SEVERITY_WEIGHT = { critical: 45, high: 20, medium: 8, low: 3, info: 0 };
const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low', 'info'];

// Demoting is how this scanner stays usable. The first version graded every
// security skill in the corpus an F, because a skill that teaches you to spot
// `ignore previous instructions` necessarily contains the string `ignore
// previous instructions`. An antivirus that quarantines its own definitions
// file is not a strict antivirus, it is a broken one.
function demote(severity, steps = 1) {
  const i = SEVERITY_ORDER.indexOf(severity);
  return SEVERITY_ORDER[Math.min(i + steps, SEVERITY_ORDER.length - 1)];
}

// ---------------------------------------------------------------------------
// Detectors
// ---------------------------------------------------------------------------
// `scope: 'prose'`  → applies to SKILL.md and other markdown (instructions to the agent)
// `scope: 'code'`   → applies to bundled executable files
// `scope: 'any'`    → both
//
// Every detector must be cheap, deterministic, and explainable in one sentence.
// If a finding cannot be pointed at a specific line, it does not belong here.

export const DETECTORS = [
  {
    id: 'pipe-to-shell',
    severity: 'critical',
    scope: 'any',
    title: 'Downloads and executes remote code in one step',
    why: 'Whatever that URL serves today, it can serve something else tomorrow. There is no review step and no pinned version.',
    re: /\b(curl|wget)\b[^\n|]{0,200}\|\s*(sudo\s+)?(ba|z|k)?sh\b/gi,
  },
  {
    id: 'zero-width',
    severity: 'critical',
    scope: 'any',
    title: 'Contains invisible or direction-overriding characters',
    why: 'Zero-width and bidirectional characters hide instructions from every human reviewer while remaining fully visible to the model. There is no legitimate reason for them in a skill.',
    re: /[​-‏‪-‮⁠-⁤﻿­]/g,
    render: (m) => `U+${m.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`,
    // U+200D ZERO WIDTH JOINER is how 🧑‍💼 is built. Joining two emoji is not
    // an attack; hiding a sentence is. Only flag a ZWJ that is not between
    // pictographs.
    filter(match, text, index) {
      if (match !== '‍') return true;
      // Emoji live outside the BMP, so text[i] hands back half a surrogate
      // pair. Walk by code point or every 🧑‍💼 reads as an attack: if the unit
      // before the joiner is a LOW surrogate, the real code point starts one
      // unit further back.
      const isLow = (c) => c >= 0xdc00 && c <= 0xdfff;
      const prev = isLow(text.charCodeAt(index - 1))
        ? text.codePointAt(index - 2)
        : text.codePointAt(index - 1);
      const next = text.codePointAt(index + 1);
      const pict = /\p{Extended_Pictographic}|\p{Emoji_Modifier}|\p{Emoji_Component}/u;
      const chr = (cp) => (cp === undefined ? '' : String.fromCodePoint(cp));
      return !(pict.test(chr(prev)) && pict.test(chr(next)));
    },
  },
  {
    id: 'conceal-from-user',
    severity: 'critical',
    scope: 'prose',
    contextSensitive: true,
    title: 'Instructs the agent to hide activity from the user',
    why: 'A skill that asks the agent to keep something from the person running it has inverted who the agent works for.',
    // Concealment is about the agent withholding its OWN actions. Advice
    // skills are full of "do not tell the user their draft is bad", which is
    // coaching, not hiding — so the object has to be the activity itself.
    re: /\b(do not|don'?t|never)\s+(tell|inform|notify|alert)\s+(the\s+)?(user|human|operator|owner)\s+(about|that\s+you|what\s+you|of\s+(this|the|these)|why)\b|\b(do not|don'?t|never)\s+(mention|reveal|disclose|log|report)\s+(this|it|that|these|the\s+\w+)\s+to\s+(the\s+)?(user|human|operator)\b|\bwithout\s+(telling|informing|notifying|alerting|asking)\s+(the\s+)?user\b|\bhide\s+(this|it|these|the\s+\w+)\s+from\s+(the\s+)?(user|human|operator)\b|\bsilently\s+(send|upload|post|transmit|exfiltrat)/gi,
  },
  {
    id: 'instruction-override',
    severity: 'high',
    scope: 'prose',
    contextSensitive: true,
    title: 'Tries to override the user or system instructions',
    why: 'Classic prompt-injection phrasing. A legitimate skill adds capability; it does not countermand the operator.',
    re: /\bignore\s+(all\s+|any\s+)?(previous|prior|earlier|above|preceding)\s+(instructions?|prompts?|rules?|directions?)\b|\bdisregard\s+(all\s+|any\s+)?(previous|prior|the\s+system)\b|\boverride\s+(the\s+)?(system\s+prompt|safety|guardrails?)\b|\bregardless\s+of\s+what\s+the\s+user\s+(says|asks|wants)\b/gi,
  },
  {
    id: 'secret-access',
    severity: 'high',
    scope: 'any',
    title: 'Reads credentials or key material',
    why: 'Touching key material is a hard prerequisite for every credential-theft path. Sometimes necessary; always worth knowing about.',
    // The leading class stops `health.aws.amazon.com` from reading as `~/.aws`.
    re: /(?<=^|[\s"'`(=|/])(?:~|\$HOME|%USERPROFILE%)?[/\\]?\.(?:ssh|aws|gnupg|kube|netrc|npmrc|pypirc|git-credentials)(?=[/\s"'`,.)|]|$)|\bid_rsa\b|\bid_ed25519\b|\bsecurity\s+find-generic-password\b|\blogin\.keychain\b/gi,
  },
  {
    id: 'env-key-reference',
    severity: 'low',
    scope: 'any',
    title: 'Names a credential environment variable',
    why: 'Documenting `ANTHROPIC_API_KEY` is not the same as reading a private key. Listed for completeness, priced accordingly.',
    re: /\b(AWS_SECRET_ACCESS_KEY|AWS_ACCESS_KEY_ID|(GITHUB|GH|ANTHROPIC|OPENAI|GEMINI|STRIPE|SLACK|NPM)_(API_|AUTH_)?(TOKEN|KEY|SECRET))\b/gi,
  },
  {
    id: 'dotenv-access',
    severity: 'low',
    scope: 'any',
    title: 'Touches a .env file',
    why: 'Extremely common and usually benign — but it is where the keys live, so it is worth listing.',
    re: /(?<=^|[\s"'`(=|/])\.env(?:\.[a-z]+)?(?=[\s"'`,.)|:]|$)/gi,
  },
  {
    id: 'network-egress',
    severity: 'medium',
    scope: 'any',
    title: 'Sends data to the network',
    why: 'The other half of an exfiltration path. Harmless alone, decisive in combination.',
    // Talking to your own machine is not egress.
    ignoreIfLine: /localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\]/i,
    re: /\b(curl|wget|ncat|webhook)\b|\b(http\.client|urllib\.request|requests\.(get|post|put)|axios\.|fetch\s*\(|nc\s+-|send_?email)/gi,
  },
  {
    id: 'obfuscation',
    severity: 'high',
    scope: 'any',
    title: 'Decodes or evaluates encoded content',
    why: 'Encoded payloads defeat review. If the author cannot show you the string, assume you would not like it.',
    re: /\b(base64\s+(-d|--decode|-D)|atob\s*\(|eval\s*\(|exec\s*\(\s*(base64|codecs|bytes)|Function\s*\(\s*['"`]|codecs\.decode|fromCharCode\s*\(|\[\s*char\s*\]\s*\.join)/gi,
  },
  {
    id: 'encoded-blob',
    severity: 'medium',
    scope: 'any',
    title: 'Contains a long encoded blob',
    why: 'A 200-character base64 run inside a skill is not documentation. It may be an image; it may not be.',
    re: /(?<![A-Za-z0-9+/=])[A-Za-z0-9+/]{200,}={0,2}(?![A-Za-z0-9+/=])/g,
    render: (m) => `${m.length} chars starting "${m.slice(0, 12)}…"`,
  },
  {
    id: 'destructive',
    severity: 'high',
    scope: 'any',
    title: 'Contains an irreversible command',
    why: 'Not automatically wrong, but you should know before you install, not after.',
    re: /\brm\s+-[a-z]*[rf][a-z]*\s+[^\n]*|\bgit\s+push\s+(--force|-f)\b|\bgit\s+reset\s+--hard\b|\bDROP\s+(TABLE|DATABASE|SCHEMA)\b|\bTRUNCATE\s+TABLE\b|\bmkfs\b|\bdd\s+if=[^\n]*of=\/dev\/|\bshutdown\s+(-[a-z]|now\b|\/s\b)|\bkillall\s+\S/gi,
  },
  {
    id: 'privilege-escalation',
    severity: 'high',
    scope: 'any',
    title: 'Requests elevated privileges or opens permissions wide',
    why: 'A skill needing root is a skill that can do anything to the machine.',
    re: /\bsudo\s+(?!-n\s+true)[a-z]|\bchmod\s+(777|a\+rwx|\+s)\b|\brunas\b|\bosascript\s+-e\s+.{0,80}administrator\s+privileges/gi,
  },
  {
    id: 'persistence',
    severity: 'high',
    scope: 'any',
    title: 'Installs itself somewhere that survives the session',
    why: 'A skill that edits your shell profile or installs a cron job keeps running long after you stop using it.',
    re: /\.(bashrc|zshrc|bash_profile|zprofile|profile)\b|\bcrontab\s+-|\blaunchctl\s+load\b|\bsystemctl\s+enable\b|LaunchAgents|\bStartupItems\b|\bregistry\s+run\s+key\b/gi,
  },
  {
    id: 'wildcard-tools',
    severity: 'medium',
    scope: 'frontmatter',
    title: 'Requests unrestricted tool access',
    why: '`Bash(*)` or `allowed-tools: *` means the skill declares no boundary at all, so nothing can be reviewed.',
    re: /(allowed[-_]tools|tools)\s*:\s*(\*|['"]\*['"]|.*\bBash\s*\(\s*\*\s*\))/gi,
  },
  {
    id: 'ip-literal-url',
    severity: 'medium',
    scope: 'any',
    title: 'Points at a raw IP address or a non-standard port',
    why: 'Legitimate services have domain names. Raw IPs in a skill are worth a second look.',
    re: /\bhttps?:\/\/(\d{1,3}\.){3}\d{1,3}(:\d+)?/gi,
  },
  {
    id: 'url-shortener',
    severity: 'medium',
    scope: 'any',
    title: 'Uses a URL shortener',
    why: 'A shortener hides the destination from review and lets the author change it after you install.',
    re: /\bhttps?:\/\/(bit\.ly|tinyurl\.com|t\.co|goo\.gl|is\.gd|buff\.ly|ow\.ly|rebrand\.ly|cutt\.ly|shorturl\.at)\//gi,
  },
  {
    id: 'unpinned-install',
    severity: 'low',
    scope: 'any',
    title: 'Installs dependencies without pinning a version',
    why: 'Whatever gets installed at run time is whatever the registry serves that day.',
    re: /\b(npm\s+i(nstall)?|pnpm\s+add|yarn\s+add|pip\s+install|uv\s+pip\s+install|gem\s+install|go\s+install)\s+(?!.*[@=]\d)[a-z@][^\n]{0,80}/gi,
  },
];

// ---------------------------------------------------------------------------
// File classification
// ---------------------------------------------------------------------------
const CODE_EXT = new Set([
  '.sh', '.bash', '.zsh', '.py', '.js', '.mjs', '.cjs', '.ts', '.rb', '.pl',
  '.ps1', '.bat', '.cmd', '.php', '.lua', '.applescript', '.osascript',
]);
const PROSE_EXT = new Set(['.md', '.markdown', '.txt', '.mdx']);
const DATA_EXT = new Set(['.json', '.yml', '.yaml', '.toml', '.csv', '.xml']);
const SKIP_DIR = new Set(['.git', 'node_modules', '__pycache__', '.venv', 'dist', 'build']);
const MAX_FILE_BYTES = 512 * 1024;

function classify(path) {
  const ext = extname(path).toLowerCase();
  if (CODE_EXT.has(ext)) return 'code';
  if (PROSE_EXT.has(ext)) return 'prose';
  if (DATA_EXT.has(ext)) return 'data';
  return 'other';
}

// Null bytes in the first few KB means it is not text and static pattern
// matching on it is theatre.
function looksBinary(buf) {
  const n = Math.min(buf.length, 8192);
  for (let i = 0; i < n; i++) if (buf[i] === 0) return true;
  return false;
}

// Sample codebases, fixtures and vendored third-party trees are shipped to be
// read, not run. A hardcoded key in `assets/sample_codebase/` is a teaching
// aid.
const DEMOTING_PATH = /(^|\/)(fixtures?|samples?|sample_[a-z]+|examples?|testdata|test|tests|vendor|node_modules|schemas?|third[-_]party)(\/|$)/i;

function walk(dir, out = [], depth = 0) {
  if (depth > 6) return out;
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    if (e.name.startsWith('.') && e.name !== '.env.example') continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIR.has(e.name)) continue;
      walk(full, out, depth + 1);
    } else if (e.isFile()) {
      out.push(full);
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Matching
// ---------------------------------------------------------------------------
function lineOf(text, index) {
  let line = 1;
  for (let i = 0; i < index; i++) if (text.charCodeAt(i) === 10) line++;
  return line;
}

function snippet(text, index, length) {
  const start = text.lastIndexOf('\n', index) + 1;
  let end = text.indexOf('\n', index + length);
  if (end === -1) end = text.length;
  const raw = text.slice(start, Math.min(end, start + 200)).trim();
  return raw.replace(/[​-‏‪-‮⁠-⁤﻿­]/g, '·');
}

// Ranges of ```fenced``` blocks, so a match can be told where it lives.
function fenceRanges(text) {
  const ranges = [];
  const re = /^[ \t]*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^[ \t]*\1[ \t]*$/gm;
  let m;
  while ((m = re.exec(text)) !== null) ranges.push([m.index, m.index + m[0].length]);
  return ranges;
}

function contextAt(text, index, length, fences) {
  for (const [a, b] of fences) if (index >= a && index < b) return 'fence';

  const lineStart = text.lastIndexOf('\n', index) + 1;
  let lineEnd = text.indexOf('\n', index);
  if (lineEnd === -1) lineEnd = text.length;
  const line = text.slice(lineStart, lineEnd);
  const col = index - lineStart;

  // Odd number of backticks before the match on this line => inside `code`.
  const ticksBefore = (line.slice(0, col).match(/`/g) || []).length;
  if (ticksBefore % 2 === 1) return 'inline-code';

  // Same idea for double quotes: a quoted example, not an instruction.
  const quotesBefore = (line.slice(0, col).match(/["“”]/g) || []).length;
  if (quotesBefore % 2 === 1) return 'quote';

  return 'plain';
}

function adjust(detector, context) {
  if (context === 'inline-code') return demote(detector.severity, 1);
  if (detector.contextSensitive) {
    if (context === 'quote') return 'info';
    if (context === 'fence') return demote(detector.severity, 1);
  }
  return detector.severity;
}

function scanText(text, detectors, file, cap = 3) {
  const findings = [];
  const fences = fenceRanges(text);

  for (const d of detectors) {
    const re = new RegExp(d.re.source, d.re.flags);
    let m;
    let n = 0;
    while ((m = re.exec(text)) !== null) {
      if (m[0].length === 0) {
        re.lastIndex++;
        continue;
      }
      const evidence = snippet(text, m.index, m[0].length);
      if (d.ignoreIfLine && d.ignoreIfLine.test(evidence)) continue;
      if (d.filter && !d.filter(m[0], text, m.index)) continue;

      const context = contextAt(text, m.index, m[0].length, fences);
      n++;
      if (n <= cap) {
        findings.push({
          id: d.id,
          severity: adjust(d, context),
          declared_severity: d.severity,
          context,
          file,
          line: lineOf(text, m.index),
          match: d.render ? d.render(m[0]) : m[0].slice(0, 120),
          evidence,
        });
      }
    }
    if (n > cap) {
      findings.push({
        id: d.id,
        severity: 'info',
        declared_severity: d.severity,
        context: 'rollup',
        file,
        line: 0,
        match: `+${n - cap} more occurrence(s)`,
        evidence: '',
        rollup: true,
      });
    }
  }
  return findings;
}

// ---------------------------------------------------------------------------
// Tier inference
// ---------------------------------------------------------------------------
const TIER_SIGNALS = [
  { tier: 4, re: /\b(curl|wget)\b[^\n|]{0,200}\|\s*(sudo\s+)?(ba|z|k)?sh\b|\beval\s*\(\s*(await\s+)?fetch|pip\s+install\s+(git\+)?https?:/i },
  { tier: 3, re: /\b(bash|sh|zsh|python3?|node|npx|uvx|subprocess|os\.system|child_process|execSync|spawnSync|Bash\s*\()\b|\ballowed-tools:.*Bash/i },
  { tier: 2, re: /\b(Write|Edit|MultiEdit|writeFileSync|open\s*\([^)]*['"]w|>>?\s*[\w./-]+\.(md|json|ya?ml|txt)|mkdir|touch)\b/i },
  { tier: 1, re: /\b(Read|Grep|Glob|readFileSync|open\s*\(|cat\s+|ls\s+)\b/i },
];

function inferTier(allText, hasCodeFiles) {
  for (const s of TIER_SIGNALS) if (s.re.test(allText)) return s.tier;
  return hasCodeFiles ? 3 : 0;
}

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------
export function score(findings) {
  // One penalty per detector per skill, at its worst observed severity. Ten
  // `curl`s are not ten problems, but one demoted example plus one real call
  // should be priced as the real call.
  const worst = new Map();
  const atFullStrength = new Set();
  for (const f of findings) {
    if (f.rollup || f.suppressed) continue;
    const w = SEVERITY_WEIGHT[f.severity] || 0;
    if (!worst.has(f.id) || w > worst.get(f.id)) worst.set(f.id, w);
    if (!f.declared_severity || f.severity === f.declared_severity) atFullStrength.add(f.id);
  }
  let penalty = 0;
  for (const w of worst.values()) penalty += w;

  // Combination rule: reading secrets is fine, sending data is fine, doing both
  // in one skill is the shape of every credential stealer ever written.
  // Only fires when both halves are real — a skill that *documents* `~/.ssh`
  // and `curl` in backticks is a security guide, not a stealer.
  if (atFullStrength.has('secret-access') && atFullStrength.has('network-egress')) {
    penalty += 35;
  }
  return Math.max(0, 100 - penalty);
}

export function grade(s) {
  if (s >= 90) return 'A';
  if (s >= 75) return 'B';
  if (s >= 60) return 'C';
  if (s >= 40) return 'D';
  return 'F';
}

// ---------------------------------------------------------------------------
// Entry point: scan one skill directory (or a lone SKILL.md)
// ---------------------------------------------------------------------------
export function scanSkill(skillPath, opts = {}) {
  const root = opts.root || skillPath;
  const isFile = statSync(skillPath).isFile();
  const files = isFile ? [skillPath] : walk(skillPath);

  const findings = [];
  let allText = '';
  let bytes = 0;
  let hasCodeFiles = false;
  let meta = {};
  let unscanned = 0;
  let name = basename(isFile ? join(skillPath, '..') : skillPath);

  for (const f of files) {
    const rel = relative(root, f) || basename(f);
    let raw;
    try {
      const st = statSync(f);
      if (st.size > MAX_FILE_BYTES) {
        unscanned++;
        findings.push({
          id: 'large-file',
          severity: 'low',
          file: rel,
          line: 0,
          match: `${Math.round(st.size / 1024)} KB`,
          evidence: 'File too large to review; skipped by the scanner.',
        });
        continue;
      }
      const buf = readFileSync(f);
      if (looksBinary(buf)) {
        // Static text analysis on a font file produces noise, not security.
        // Say the file was not reviewed instead of pretending it passed.
        unscanned++;
        findings.push({
          id: 'bundled-binary',
          severity: 'low',
          file: rel,
          line: 0,
          match: `${Math.round(buf.length / 1024)} KB binary`,
          evidence: 'Binary file shipped with the skill. Not analysable statically — review it yourself.',
        });
        continue;
      }
      raw = buf.toString('utf8');
    } catch {
      continue;
    }
    bytes += raw.length;
    const kind = classify(f);
    if (kind === 'code') hasCodeFiles = true;

    // Vendored schemas, fonts and other non-instruction payloads are counted
    // but not pattern-matched. Scanning an OOXML schema for the word `curl`
    // found "curly" and nothing else.
    if (kind === 'other') {
      unscanned++;
      continue;
    }

    if (basename(f).toLowerCase() === 'skill.md') {
      // Never trust the input. This scanner exists to read files written by
      // strangers; a parse error is a finding, not a crash.
      try {
        const { data } = parseFrontmatter(raw);
        meta = data || {};
      } catch {
        meta = {};
        findings.push({
          id: 'malformed-frontmatter',
          severity: 'low',
          file: rel,
          line: 1,
          match: 'frontmatter did not parse',
          evidence: 'The YAML frontmatter is invalid, so its declared tool permissions could not be checked.',
        });
      }
      if (meta.name) name = String(meta.name);
      const fmMatch = raw.match(/^---\n[\s\S]*?\n---/);
      if (fmMatch) {
        findings.push(
          ...scanText(fmMatch[0], DETECTORS.filter((d) => d.scope === 'frontmatter'), rel)
        );
      }
    }

    const applicable = DETECTORS.filter(
      (d) =>
        d.scope === 'any' ||
        (d.scope === 'prose' && (kind === 'prose' || kind === 'data')) ||
        (d.scope === 'code' && kind === 'code')
    );
    const fileFindings = scanText(raw, applicable, rel);
    if (DEMOTING_PATH.test(rel)) {
      // A hardcoded key inside `assets/sample_codebase/` is a teaching aid.
      for (const fnd of fileFindings) {
        fnd.severity = demote(fnd.severity, 1);
        fnd.context = fnd.context === 'plain' ? 'sample-path' : `${fnd.context}+sample-path`;
      }
    }
    findings.push(...fileFindings);
    allText += raw + '\n';
  }

  const sc = score(findings);
  const tier = inferTier(allText, hasCodeFiles);

  return {
    name,
    path: relative(opts.repoRoot || root, skillPath) || '.',
    description: typeof meta.description === 'string' ? meta.description.slice(0, 200) : null,
    grade: grade(sc),
    score: sc,
    tier,
    tier_name: TIERS[tier].name,
    file_count: files.length,
    unscanned_files: unscanned,
    bytes,
    findings: findings.sort(
      (a, b) => SEVERITY_WEIGHT[b.severity] - SEVERITY_WEIGHT[a.severity] || a.file.localeCompare(b.file)
    ),
    fingerprint: createHash('sha256').update(allText).digest('hex').slice(0, 16),
  };
}

export function findSkills(repoRoot) {
  const out = [];
  const files = walk(repoRoot);
  for (const f of files) {
    if (basename(f).toLowerCase() === 'skill.md') out.push(join(f, '..'));
  }
  return [...new Set(out)].sort();
}
