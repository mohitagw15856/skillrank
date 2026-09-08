# anthropics/skills

Source: https://github.com/anthropics/skills

**20 skills · average 91.2/100 · scanned 2026-09-08 with scanner v1**

Grades: A 15 · B 3 · C 1 · D 1

## Capability profile

| Tier | What it means | Skills |
| :-: | --- | --: |
| T0 text | Text in, text out. Touches nothing. | 1 |
| T1 read | Reads files in the working directory. | 2 |
| T2 write | Writes or edits files. | 6 |
| T3 exec | Runs shell commands or bundled scripts. | 11 |
| T4 remote | Executes code or instructions fetched from the network. | 0 |

## What fired

| Detector | Skills | Share |
| --- | --: | --: |
| `unpinned-install` | 6 | 30% |
| `destructive` | 4 | 20% |
| `bundled-binary` | 3 | 15% |
| `network-egress` | 3 | 15% |
| `env-key-reference` | 3 | 15% |
| `privilege-escalation` | 1 | 5% |
| `obfuscation` | 1 | 5% |
| `dotenv-access` | 1 | 5% |

## Everything below an A (5)

### D · 43/100 · `claude-api`

`skills/claude-api` — tier 3 (exec)

> Reference for the Claude API / Anthropic SDK — model ids, pricing, params, streaming, tool use, MCP, agents, caching, token counting, model migration. TRIGGER — read BEFORE opening the target file; do

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `privilege-escalation` | `shared/anthropic-cli.md:25` | fence | `\| sudo tar -xz -C /usr/local/bin ant` |
| **high** | `obfuscation` | `shared/cost-optimization.md:26` | plain | `- **From a baseline run, paid**: run the project's eval (or, with no eval, replay a representative sample of r` |
| **high** | `privilege-escalation` | `shared/managed-agents-self-hosted-sandboxes.md:187` | fence | `sudo mkdir -p /mnt/memory && sudo chown "$USER" /mnt/memory` |
| **medium** | `network-egress` | `curl/examples.md:1` | plain | `# Claude API - cURL / Raw HTTP` |
| **medium** | `network-egress` | `curl/managed-agents.md:1` | plain | `# Managed Agents - cURL / Raw HTTP` |
| **medium** | `network-egress` | `go/managed-agents/README.md:3` | plain | `> **Bindings not shown here:** This README covers the most common managed-agents flows for Go. If you need a c` |
| **medium** | `network-egress` | `java/managed-agents/README.md:3` | plain | `> **Bindings not shown here:** This README covers the most common managed-agents flows for Java. If you need a` |
| **medium** | `network-egress` | `php/managed-agents/README.md:3` | plain | `> **Bindings not shown here:** This README covers the most common managed-agents flows for PHP. If you need a ` |
| **medium** | `network-egress` | `python/managed-agents/README.md:3` | plain | `> **Bindings not shown here:** This README covers the most common managed-agents flows for Python. If you need` |
| **medium** | `network-egress` | `ruby/managed-agents/README.md:3` | plain | `> **Bindings not shown here:** This README covers the most common managed-agents flows for Ruby. If you need a` |
| **medium** | `network-egress` | `shared/admin-api.md:39` | plain | `**curl** also needs `anthropic-version: 2023-06-01` on every request.` |
| **medium** | `network-egress` | `shared/anthropic-cli.md:24` | fence | `curl -fsSL "https://github.com/anthropics/anthropic-cli/releases/download/v${VERSION}/ant_${VERSION}_$(uname -` |
| **medium** | `network-egress` | `shared/live-sources.md:65` | quote | `\| Usage & Cost Reports \| `https://platform.claude.com/docs/en/manage-claude/usage-cost-api.md`   \| "Extract us` |
| **medium** | `network-egress` | `shared/managed-agents-api-reference.md:140` | plain | `\| `GET`    \| `/v1/deployment_runs/{deployment_run_id}`        \| GetDeploymentRun   \| Retrieve a single run by ` |
| **medium** | `network-egress` | `shared/managed-agents-client-patterns.md:5` | plain | `Code samples are TypeScript - other languages follow the same shape; see `{lang}/managed-agents/README.md` (cU` |
| **medium** | `network-egress` | `shared/managed-agents-environments.md:112` | plain | `- The filter parameter is **`scope_id`** (REST query param `?scope_id=<session_id>`). The SDK's files resource` |
| **medium** | `network-egress` | `shared/managed-agents-memory.md:201` | plain | `For cURL examples and the CLI (`ant beta:memory-stores ...`), WebFetch the Memory URL in `shared/live-sources.` |
| **medium** | `network-egress` | `shared/managed-agents-onboarding.md:73` | plain | `**Block 2 - Runtime (every invocation; conversational and Outcome shapes).** SDK code in the detected language` |
| **medium** | `network-egress` | `shared/managed-agents-overview.md:32` | plain | `**Which beta header goes where:** The SDK sets `managed-agents-2026-04-01` automatically on `client.beta.{agen` |
| **medium** | `network-egress` | `shared/managed-agents-scheduled-deployments.md:16` | fence | `curl -fsSL https://api.anthropic.com/v1/deployments \` |
| **medium** | `network-egress` | `shared/managed-agents-self-hosted-sandboxes.md:112` | plain | `## Webhook-driven wake (instead of always-on)` |
| **medium** | `network-egress` | `shared/managed-agents-tools.md:258` | plain | `- **Environment-variable credentials** appear in the sandbox as an opaque placeholder; the real value replaces` |
| **medium** | `network-egress` | `shared/models.md:35` | fence | `curl https://api.anthropic.com/v1/models/claude-opus-4-8 \` |
| **medium** | `network-egress` | `shared/tool-use-concepts.md:440` | plain | `\| Python / TypeScript / Ruby / cURL \| plain object `{"type": "bash_20250124", "name": "bash"}` \|` |
| **medium** | `network-egress` | `SKILL.md:23` | plain | `2. **Raw HTTP** (`curl`, `requests`, `fetch`, `httpx`, etc.) - only when the user explicitly asks for cURL/RES` |
| **medium** | `network-egress` | `typescript/managed-agents/README.md:3` | plain | `> **Bindings not shown here:** This README covers the most common managed-agents flows for TypeScript. If you ` |
| **low** | `env-key-reference` | `csharp/claude-api/README.md:108` | fence | `// Default (uses ANTHROPIC_API_KEY env var)` |
| **low** | `network-egress` | `csharp/claude-api/README.md:362` | inline-code | `The C# SDK supports Managed Agents via `client.Beta.Agents`, `client.Beta.Sessions`, `client.Beta.Environments` |
| **low** | `env-key-reference` | `curl/examples.md:8` | fence | `export ANTHROPIC_API_KEY="your-api-key"` |
| **low** | `env-key-reference` | `curl/managed-agents.md:8` | fence | `export ANTHROPIC_API_KEY="your-api-key"` |
| **low** | `env-key-reference` | `go/claude-api/README.md:19` | fence | `// Default (uses ANTHROPIC_API_KEY env var)` |
| **low** | `env-key-reference` | `go/managed-agents/README.md:23` | fence | `// Default (uses ANTHROPIC_API_KEY env var)` |
| **low** | `env-key-reference` | `java/claude-api/README.md:66` | fence | `// Default (reads ANTHROPIC_API_KEY from environment)` |
| **low** | `env-key-reference` | `java/managed-agents/README.md:21` | fence | `// Default (uses ANTHROPIC_API_KEY env var)` |
| **low** | `env-key-reference` | `php/claude-api/README.md:17` | fence | `$client = new Client(apiKey: getenv("ANTHROPIC_API_KEY"));` |
| **low** | `env-key-reference` | `php/managed-agents/README.md:18` | fence | `// Default (uses ANTHROPIC_API_KEY env var)` |
| **low** | `env-key-reference` | `python/claude-api/README.md:15` | fence | `# ANTHROPIC_API_KEY, or ANTHROPIC_AUTH_TOKEN, or an `ant auth login` profile.` |
| **low** | `unpinned-install` | `python/claude-api/README.md:6` | fence | `pip install anthropic` |
| **low** | `network-egress` | `python/claude-api/sdk-upgrade.md:18` | inline-code | `**Target version.** Before writing any pin, confirm a 1.x release is actually published: `pip index versions a` |
| **low** | `env-key-reference` | `python/managed-agents/README.md:19` | fence | `# ANTHROPIC_API_KEY, or ANTHROPIC_AUTH_TOKEN, or an `ant auth login` profile.` |
| **low** | `unpinned-install` | `python/managed-agents/README.md:10` | fence | `pip install anthropic` |
| **low** | `env-key-reference` | `ruby/claude-api/README.md:16` | fence | `# Default (uses ANTHROPIC_API_KEY env var)` |
| **low** | `unpinned-install` | `ruby/claude-api/README.md:8` | fence | `gem install anthropic` |
| **low** | `env-key-reference` | `ruby/managed-agents/README.md:18` | fence | `# Default (uses ANTHROPIC_API_KEY env var)` |
| **low** | `unpinned-install` | `ruby/managed-agents/README.md:10` | fence | `gem install anthropic` |
| **low** | `network-egress` | `shared/agent-design.md:28` | inline-code | `- **Security boundary.** Actions that require gating are natural candidates. Reversibility is a useful criteri` |
| **low** | `dotenv-access` | `shared/anthropic-cli.md:65` | fence | `# .env format - sets ANTHROPIC_AUTH_TOKEN (and ANTHROPIC_BASE_URL if the profile has one).` |
| **low** | `unpinned-install` | `shared/anthropic-cli.md:28` | fence | `go install github.com/anthropics/anthropic-cli/cmd/ant@latest` |
| **low** | `env-key-reference` | `shared/managed-agents-environments.md:173` | fence | `authorization_token: process.env.GITHUB_TOKEN,  // repo clone token (!= MCP auth)` |
| **low** | `env-key-reference` | `shared/managed-agents-scheduled-deployments.md:17` | fence | `-H "x-api-key: $ANTHROPIC_API_KEY" \` |
| **low** | `dotenv-access` | `shared/managed-agents-tools.md:94` | fence | `{ "type": "user.tool_confirmation", "tool_use_id": "sevt_def456", "result": "deny", "message": "Read .env.exam` |
| **low** | `network-egress` | `shared/managed-agents-webhooks.md:23` | inline-code | `Every delivery carries the `webhook-id`, `webhook-timestamp`, and `webhook-signature` headers. **Use the SDK's` |
| **low** | `env-key-reference` | `shared/models.md:36` | fence | `-H "x-api-key: $ANTHROPIC_API_KEY" \` |
| **low** | `env-key-reference` | `typescript/claude-api/README.md:21` | fence | `// ANTHROPIC_API_KEY, or ANTHROPIC_AUTH_TOKEN, or an `ant auth login` profile.` |
| **low** | `unpinned-install` | `typescript/claude-api/README.md:10` | fence | `npm install @anthropic-ai/sdk` |
| **low** | `env-key-reference` | `typescript/managed-agents/README.md:19` | fence | `// ANTHROPIC_API_KEY, or ANTHROPIC_AUTH_TOKEN, or an `ant auth login` profile.` |
| **low** | `unpinned-install` | `typescript/managed-agents/README.md:10` | fence | `npm install @anthropic-ai/sdk` |

### C · 66/100 · `mcp-builder`

`skills/mcp-builder` — tier 3 (exec)

> Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. Use when building MCP servers to integrate externa

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `reference/node_mcp_server.md:541` | fence | `"clean": "rm -rf dist"` |
| **medium** | `network-egress` | `reference/node_mcp_server.md:474` | fence | `const response = await axios.get(`${API_URL}/resource/${resourceId}`);` |
| **medium** | `network-egress` | `reference/python_mcp_server.md:260` | fence | `response = requests.get(f"{API_URL}/resource/{resource_id}")  # Blocks` |
| **low** | `env-key-reference` | `reference/evaluation.md:398` | fence | `export ANTHROPIC_API_KEY=your_api_key_here` |
| **low** | `unpinned-install` | `reference/evaluation.md:392` | fence | `pip install anthropic mcp` |

### B · 77/100 · `web-artifacts-builder`

`skills/web-artifacts-builder` — tier 3 (exec)

> Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui). Use for complex artifacts requiring state manag

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `scripts/bundle-artifact.sh:36` | plain | `rm -rf dist bundle.html` |
| **low** | `bundled-binary` | `scripts/shadcn-components.tar.gz:0` | undefined | `Binary file shipped with the skill. Not analysable statically — review it yourself.` |

### B · 80/100 · `docx`

`skills/docx` — tier 3 (exec)

> Use this skill whenever the user wants to create, read, edit, or manipulate Word documents (.docx files) or Word templates (.dotx files). Triggers include: any mention of 'Word doc', 'word document', 

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `SKILL.md:56` | fence | `(cd unpacked && rm -f ../out.docx && zip -Xr ../out.docx .)` |

### B · 80/100 · `pptx`

`skills/pptx` — tier 3 (exec)

> Use this skill any time a .pptx or .potx file is involved in any way — as input, output, or both. This includes: creating slide decks, pitch decks, or presentations; reading, parsing, or extracting te

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `SKILL.md:62` | fence | `(cd unpacked && rm -f ../out.pptx && zip -Xr ../out.pptx .)           # zip from INSIDE the dir; rm first or d` |


<sub>Generated by `scripts/build.mjs`. Do not edit directly.</sub>
