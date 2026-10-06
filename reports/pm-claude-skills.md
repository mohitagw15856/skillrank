# pm-claude-skills

Source: https://github.com/mohitagw15856/pm-claude-skills

**4118 skills · average 99.7/100 · scanned 2026-10-06 with scanner v1**

Grades: A 4103 · B 9 · C 6

## Capability profile

| Tier | What it means | Skills |
| :-: | --- | --: |
| T0 text | Text in, text out. Touches nothing. | 1252 |
| T1 read | Reads files in the working directory. | 636 |
| T2 write | Writes or edits files. | 1798 |
| T3 exec | Runs shell commands or bundled scripts. | 432 |
| T4 remote | Executes code or instructions fetched from the network. | 0 |

## What fired

| Detector | Skills | Share |
| --- | --: | --: |
| `network-egress` | 99 | 2% |
| `dotenv-access` | 23 | 1% |
| `unpinned-install` | 15 | 0% |
| `destructive` | 6 | 0% |
| `instruction-override` | 5 | 0% |
| `secret-access` | 3 | 0% |
| `conceal-from-user` | 3 | 0% |
| `privilege-escalation` | 3 | 0% |
| `persistence` | 3 | 0% |
| `env-key-reference` | 3 | 0% |

## Everything below an A (15)

### C · 72/100 · `load-testing-plan`

`exports/openclaw/load-testing-plan` — tier 3 (exec)

> Write a load and performance testing plan for a service. Use when asked to create a performance test plan, write load testing documentation, define stress or soak test scenarios, or set performance re

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `privilege-escalation` | `SKILL.md:388` | fence | `curl -s https://dl.k6.io/key.gpg \| sudo apt-key add -` |
| **medium** | `network-egress` | `SKILL.md:388` | fence | `curl -s https://dl.k6.io/key.gpg \| sudo apt-key add -` |

### C · 72/100 · `load-testing-plan`

`plugins/pm-engineering/skills/load-testing-plan` — tier 3 (exec)

> Write a load and performance testing plan for a service. Use when asked to create a performance test plan, write load testing documentation, define stress or soak test scenarios, or set performance re

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `privilege-escalation` | `SKILL.md:383` | fence | `curl -s https://dl.k6.io/key.gpg \| sudo apt-key add -` |
| **medium** | `network-egress` | `SKILL.md:383` | fence | `curl -s https://dl.k6.io/key.gpg \| sudo apt-key add -` |

### C · 72/100 · `load-testing-plan`

`skills/load-testing-plan` — tier 3 (exec)

> Write a load and performance testing plan for a service. Use when asked to create a performance test plan, write load testing documentation, define stress or soak test scenarios, or set performance re

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `privilege-escalation` | `SKILL.md:383` | fence | `curl -s https://dl.k6.io/key.gpg \| sudo apt-key add -` |
| **medium** | `network-egress` | `SKILL.md:383` | fence | `curl -s https://dl.k6.io/key.gpg \| sudo apt-key add -` |

### C · 74/100 · `thumbnail-creator`

`exports/openclaw/thumbnail-creator` — tier 3 (exec)

> Generate article or newsletter thumbnail candidates using the Gemini API from inside Claude Code. Claude reads article copy, proposes composition concepts, writes image generation prompts incorporatin

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `persistence` | `SKILL.md:36` | fence | `echo 'export GEMINI_API_KEY=<your-key>' >> ~/.zshrc` |
| **low** | `env-key-reference` | `SKILL.md:30` | fence | `export GEMINI_API_KEY=<your-key>` |
| **low** | `unpinned-install` | `SKILL.md:53` | fence | `pip install google-generativeai Pillow requests` |

### C · 74/100 · `thumbnail-creator`

`plugins/pm-writers/skills/thumbnail-creator` — tier 3 (exec)

> Generate article or newsletter thumbnail candidates using the Gemini API from inside Claude Code. Claude reads article copy, proposes composition concepts, writes image generation prompts incorporatin

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `persistence` | `SKILL.md:31` | fence | `echo 'export GEMINI_API_KEY=<your-key>' >> ~/.zshrc` |
| **low** | `env-key-reference` | `SKILL.md:25` | fence | `export GEMINI_API_KEY=<your-key>` |
| **low** | `unpinned-install` | `SKILL.md:48` | fence | `pip install google-generativeai Pillow requests` |

### C · 74/100 · `thumbnail-creator`

`skills/thumbnail-creator` — tier 3 (exec)

> Generate article or newsletter thumbnail candidates using the Gemini API from inside Claude Code. Claude reads article copy, proposes composition concepts, writes image generation prompts incorporatin

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `persistence` | `SKILL.md:31` | fence | `echo 'export GEMINI_API_KEY=<your-key>' >> ~/.zshrc` |
| **low** | `env-key-reference` | `SKILL.md:25` | fence | `export GEMINI_API_KEY=<your-key>` |
| **low** | `unpinned-install` | `SKILL.md:48` | fence | `pip install google-generativeai Pillow requests` |

### B · 80/100 · `injection-spotter`

`exports/openclaw/injection-spotter` — tier 1 (read)

> Spot prompt-injection in untrusted content before an agent acts on it — the anatomy of injected instructions across the channels attackers use (email, web, files, tool outputs, documents), the tell-li

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `instruction-override` | `SKILL.md:13` | plain | `Prompt injection is the SQL injection of the agent era: untrusted content — an email body, a web page, a file,` |

### B · 80/100 · `injection-spotter`

`plugins/pm-seatbelt/skills/injection-spotter` — tier 1 (read)

> Spot prompt-injection in untrusted content before an agent acts on it — the anatomy of injected instructions across the channels attackers use (email, web, files, tool outputs, documents), the tell-li

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `instruction-override` | `SKILL.md:8` | plain | `Prompt injection is the SQL injection of the agent era: untrusted content — an email body, a web page, a file,` |

### B · 80/100 · `injection-spotter`

`skills/injection-spotter` — tier 1 (read)

> Spot prompt-injection in untrusted content before an agent acts on it — the anatomy of injected instructions across the channels attackers use (email, web, files, tool outputs, documents), the tell-li

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `instruction-override` | `SKILL.md:8` | plain | `Prompt injection is the SQL injection of the agent era: untrusted content — an email body, a web page, a file,` |

### B · 84/100 · `file-access-preflight`

`exports/openclaw/file-access-preflight` — tier 2 (write)

> Run the pre-flight checklist before an agent gets filesystem access — the scope boundary (which directories, read vs write), the secrets-exposure sweep, the destructive-operation gates, and the path-t

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `secret-access` | `SKILL.md:26` | inline-code | `- **The working directory and its neighbors** — the repo/project it works in, and what sits above it (a home d` |
| **medium** | `destructive` | `SKILL.md:34` | inline-code | `3. **Destructive operations gate; reads flow:** reading and analyzing files is free within scope; *deleting, o` |

### B · 84/100 · `file-access-preflight`

`plugins/pm-seatbelt/skills/file-access-preflight` — tier 2 (write)

> Run the pre-flight checklist before an agent gets filesystem access — the scope boundary (which directories, read vs write), the secrets-exposure sweep, the destructive-operation gates, and the path-t

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `secret-access` | `SKILL.md:21` | inline-code | `- **The working directory and its neighbors** — the repo/project it works in, and what sits above it (a home d` |
| **medium** | `destructive` | `SKILL.md:29` | inline-code | `3. **Destructive operations gate; reads flow:** reading and analyzing files is free within scope; *deleting, o` |

### B · 84/100 · `file-access-preflight`

`skills/file-access-preflight` — tier 2 (write)

> Run the pre-flight checklist before an agent gets filesystem access — the scope boundary (which directories, read vs write), the secrets-exposure sweep, the destructive-operation gates, and the path-t

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `secret-access` | `SKILL.md:21` | inline-code | `- **The working directory and its neighbors** — the repo/project it works in, and what sits above it (a home d` |
| **medium** | `destructive` | `SKILL.md:29` | inline-code | `3. **Destructive operations gate; reads flow:** reading and analyzing files is free within scope; *deleting, o` |

### B · 89/100 · `instagram-post-downloader`

`exports/openclaw/instagram-post-downloader` — tier 3 (exec)

> Download and save Instagram posts as high-resolution files. Use when asked to download, save, or archive an Instagram post, reel thumbnail, or carousel. Produces saved high-res images in a named folde

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `network-egress` | `SKILL.md:240` | fence | `response = requests.get(url, headers=headers, stream=True, timeout=30)` |
| **low** | `unpinned-install` | `SKILL.md:292` | fence | `print("Pillow not installed. Run: pip install Pillow")` |

### B · 89/100 · `instagram-post-downloader`

`plugins/pm-writers/skills/instagram-post-downloader` — tier 3 (exec)

> Download and save Instagram posts as high-resolution files. Use when asked to download, save, or archive an Instagram post, reel thumbnail, or carousel. Produces saved high-res images in a named folde

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `network-egress` | `SKILL.md:235` | fence | `response = requests.get(url, headers=headers, stream=True, timeout=30)` |
| **low** | `unpinned-install` | `SKILL.md:287` | fence | `print("Pillow not installed. Run: pip install Pillow")` |

### B · 89/100 · `instagram-post-downloader`

`skills/instagram-post-downloader` — tier 3 (exec)

> Download and save Instagram posts as high-resolution files. Use when asked to download, save, or archive an Instagram post, reel thumbnail, or carousel. Produces saved high-res images in a named folde

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `network-egress` | `SKILL.md:235` | fence | `response = requests.get(url, headers=headers, stream=True, timeout=30)` |
| **low** | `unpinned-install` | `SKILL.md:287` | fence | `print("Pillow not installed. Run: pip install Pillow")` |


<sub>Generated by `scripts/build.mjs`. Do not edit directly.</sub>
