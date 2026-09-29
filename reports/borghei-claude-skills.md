# borghei/Claude-Skills

Source: https://github.com/borghei/Claude-Skills

**373 skills · average 96.3/100 · scanned 2026-09-29 with scanner v1**

Grades: A 338 · B 17 · C 9 · D 7 · F 2

## Capability profile

| Tier | What it means | Skills |
| :-: | --- | --: |
| T0 text | Text in, text out. Touches nothing. | 0 |
| T1 read | Reads files in the working directory. | 2 |
| T2 write | Writes or edits files. | 14 |
| T3 exec | Runs shell commands or bundled scripts. | 356 |
| T4 remote | Executes code or instructions fetched from the network. | 1 |

## What fired

| Detector | Skills | Share |
| --- | --: | --: |
| `network-egress` | 54 | 14% |
| `dotenv-access` | 18 | 5% |
| `unpinned-install` | 16 | 4% |
| `destructive` | 14 | 4% |
| `persistence` | 9 | 2% |
| `env-key-reference` | 8 | 2% |
| `secret-access` | 7 | 2% |
| `obfuscation` | 5 | 1% |
| `instruction-override` | 3 | 1% |
| `privilege-escalation` | 3 | 1% |
| `conceal-from-user` | 1 | 0% |
| `ip-literal-url` | 1 | 0% |

## Everything below an A (35)

### F · 0/100 · `devops-workflow-engineer`

`engineering/devops-workflow-engineer` — tier 3 (exec)

> Generate and optimize GitHub Actions CI/CD workflows. Use when designing workflows, planning multi-environment deployments, optimizing pipeline cost and runtime, or implementing blue- green, canary, o

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `references/deployment-strategies.md:562` | plain | `\| DROP TABLE \| Everything breaks \| Deprecate, stop references, then drop \|` |
| **high** | `secret-access` | `scripts/workflow_generator.py:132` | plain | `echo "${{ secrets.KUBECONFIG }}" \| base64 -d > $HOME/.kube/config` |
| **high** | `obfuscation` | `scripts/workflow_generator.py:132` | plain | `echo "${{ secrets.KUBECONFIG }}" \| base64 -d > $HOME/.kube/config` |
| **medium** | `network-egress` | `assets/cd-template.yml:206` | plain | `#   if curl -sf "${{ vars.HEALTH_CHECK_URL }}/health" --max-time ${{ env.HEALTH_CHECK_TIMEOUT }}; then` |
| **medium** | `network-egress` | `references/deployment-strategies.md:65` | fence | `curl -sf https://green.internal.example.com/health \|\| exit 1` |
| **medium** | `network-egress` | `references/github-actions-patterns.md:537` | fence | `TOKEN=$(curl -s https://auth.example.com/token)` |
| **medium** | `network-egress` | `scripts/deployment_planner.py:535` | plain | `lines.append(f'STATUS=$(curl -s -o /dev/null -w "%{{http_code}}" --max-time {hc["timeout_seconds"]} "$HEALTH_U` |
| **medium** | `network-egress` | `scripts/workflow_generator.py:457` | plain | `# curl -sf "${{{{ vars.HEALTH_CHECK_URL }}}}/health" \|\| exit 1` |
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
| **low** | `dotenv-access` | `references/best-practices-and-troubleshooting.md:7` | plain | `- **Committing .env to git** — add `.env` to .gitignore on day 1; use pre-commit hooks as a safety net` |
| **low** | `env-key-reference` | `references/env-file-structure.md:37` | fence | `AWS_ACCESS_KEY_ID=               # Prefer IAM roles in production` |
| **low** | `dotenv-access` | `references/env-file-structure.md:1` | plain | `# .env File Structure & Startup Validation` |
| **low** | `dotenv-access` | `references/secret-manager-integration.md:56` | fence | `doppler secrets download --no-file --format env > .env.local` |
| **low** | `dotenv-access` | `scripts/env_sync_checker.py:4` | plain | `Loads multiple .env files (e.g., .env.development, .env.staging, .env.production)` |
| **low** | `dotenv-access` | `scripts/env_validator.py:2` | quote | `"""Validate .env files against .env.example — detect missing, extra, and suspicious vars.` |
| **low** | `dotenv-access` | `SKILL.md:4` | plain | `Environment and secrets management lifecycle: .env scaffolding, validation, leak detection,` |

### D · 49/100 · `senior-data-engineer`

`engineering/senior-data-engineer` — tier 3 (exec)

> Data engineering for batch and streaming pipelines with Airflow, dbt, Spark, and Kafka. Use when designing data architectures, building pipelines, adding data-quality checks, optimizing ETL/ELT, or tr

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `references/data_pipeline_architecture.md:976` | fence | `self.snowflake.execute(f"TRUNCATE TABLE {table_name}")` |
| **high** | `persistence` | `scripts/data_quality_validator.py:1366` | plain | `profile = profiler.profile(data, name=Path(args.input).stem)` |
| **medium** | `network-egress` | `references/dataops_best_practices.md:819` | fence | `curl -X POST ${{ secrets.SLACK_WEBHOOK }} \` |
| **low** | `unpinned-install` | `references/dataops_best_practices.md:740` | fence | `pip install sqlfluff dbt-core dbt-snowflake` |

### D · 49/100 · `senior-mobile`

`engineering/senior-mobile` — tier 3 (exec)

> Use when the user asks to "build a mobile app", "scaffold React Native project", "create SwiftUI views", "set up Jetpack Compose", "optimize mobile performance", "configure Expo Router navigation", "i

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `privilege-escalation` | `references/ios-android-patterns.md:682` | fence | `run: sudo xcode-select -s /Applications/Xcode_15.2.app` |
| **high** | `persistence` | `scripts/mobile_scaffold.py:781` | plain | `import {pkg}.features.profile.ProfileScreen` |
| **medium** | `network-egress` | `references/react-native-patterns.md:277` | fence | `const response = await fetch('https://api.example.com/products');` |
| **medium** | `network-egress` | `scripts/app_performance_analyzer.py:322` | quote | `"axios": "axios is ~13KB. fetch() is built-in for React Native.",` |
| **low** | `unpinned-install` | `references/ios-android-patterns.md:686` | fence | `gem install fastlane` |

### D · 54/100 · `codex-cli-specialist`

`engineering/codex-cli-specialist` — tier 3 (exec)

> OpenAI Codex CLI and cross-platform skill authoring. Use when setting up Codex CLI, converting or syncing skills between Claude Code and Codex, configuring agents/openai.yaml, or validating cross-plat

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `references/codex-cli-guide.md:507` | fence | `rm -rf ~/.codex/history/` |
| **high** | `persistence` | `references/codex-cli-guide.md:75` | fence | `echo 'export OPENAI_API_KEY="sk-..."' >> ~/.zshrc` |
| **low** | `unpinned-install` | `references/best-practices-and-troubleshooting.md:14` | plain | `3. **Scripts use standard library only** - No pip install requirements for core functionality` |
| **low** | `env-key-reference` | `references/codex-cli-guide.md:72` | fence | `export OPENAI_API_KEY="sk-..."` |
| **low** | `env-key-reference` | `references/workflows.md:139` | fence | `export OPENAI_API_KEY="sk-..."` |

### D · 55/100 · `design-auditor`

`engineering/design-auditor` — tier 3 (exec)

> Audit UI/UX designs for quality, AI-generated slop, and accessibility. Use when reviewing designs, detecting slop patterns, validating WCAG compliance, checking design-token adherence, or reviewing re

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **critical** | `conceal-from-user` | `references/design_audit_methodology.md:196` | plain | `- **Silent failures** — Actions fail without informing the user` |

### D · 57/100 · `claude-code-mastery`

`engineering/claude-code-mastery` — tier 3 (exec)

> Use when the user asks to "optimize CLAUDE.md", "create a new skill", "write a custom agent", "configure hooks", "manage context window", "set up MCP servers", "scaffold a skill package", "analyze tok

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `secret-access` | `references/hooks-cookbook.md:269` | fence | `"command": "if echo \"$CLAUDE_TOOL_ARG_FILE_PATH\" \| grep -qiE '(\\.env$\|\\.env\\.\|credentials\|secrets?\|privat` |
| **high** | `destructive` | `references/hooks-cookbook.md:289` | fence | `"command": "if echo \"$CLAUDE_TOOL_ARG_COMMAND\" \| grep -qE '(rm -rf /\|rm -rf \\*\|DROP TABLE\|DROP DATABASE\|--f` |
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

> Orchestrate end-to-end release pipelines. Use when running pre-release validation, generating changelogs, bumping semantic versions, scoring deployment readiness, or gating releases with secret scanni

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `references/rollback_strategies.md:12` | plain | `- Add table (rollback: drop table)` |
| **high** | `secret-access` | `scripts/preflight_checker.py:94` | quote | `"id_rsa",` |
| **low** | `dotenv-access` | `scripts/preflight_checker.py:83` | quote | `".env",` |

### C · 60/100 · `ai-feature-prd`

`project-management/execution/ai-feature-prd` — tier 3 (exec)

> AI/ML feature PRD scaffolding for the modern AI product manager. Use to extend a standard PRD with AI-specific sections covering model selection, evals, guardrails, failure modes, human-in-the-loop, A

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `instruction-override` | `assets/failure_mode_taxonomy.md:62` | plain | `**What:** Untrusted input (e.g., a document, a webpage, a tool result) contains instructions that override the` |
| **high** | `obfuscation` | `assets/failure_mode_taxonomy.md:14` | plain | `- Faithfulness eval (RAGAS or custom rubric) on golden + online samples.` |
| **high** | `obfuscation` | `references/ai-pm-frameworks-guide.md:125` | plain | `\| **RAGAS** \| RAG-specific eval (faithfulness, context relevance) \| Any RAG feature \|` |

### C · 69/100 · `docker-development`

`engineering/docker-development` — tier 3 (exec)

> This skill should be used when the user asks to "analyze a Dockerfile", "optimize Docker layers", "validate docker-compose", "check container best practices", or "audit Docker configurations".

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `references/docker-best-practices.md:58` | fence | `&& rm -rf /var/lib/apt/lists/*` |
| **medium** | `network-egress` | `references/docker-best-practices.md:57` | fence | `&& apt-get install -y --no-install-recommends curl ca-certificates \` |
| **medium** | `network-egress` | `scripts/dockerfile_analyzer.py:66` | quote | `(r"curl.*\\|.*sh", "Piping curl to shell is risky"),` |
| **low** | `dotenv-access` | `references/docker-best-practices.md:96` | plain | `- Never COPY .env files or embed secrets in images` |

### C · 69/100 · `feature-flags-architect`

`engineering/feature-flags-architect` — tier 3 (exec)

> Feature flag strategy, lifecycle, and operations. Use when designing a flag taxonomy, planning a gradual rollout, building kill switches, auditing flag debt, defining governance, running progressive d

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `persistence` | `scripts/rollout_simulator.py:330` | plain | `if args.profile == "custom":` |
| **medium** | `network-egress` | `references/flag-debt-and-cleanup.md:231` | fence | `curl https://flags.example.com/api/v1/flags/growth.signup_v2.enabled \` |
| **medium** | `network-egress` | `references/flag-types-and-patterns.md:78` | fence | `return recommendations_service.fetch(user_id, timeout=200)` |
| **medium** | `network-egress` | `references/rollout-and-kill-switch-playbook.md:233` | fence | `return recommendations_service.fetch(user_id)` |
| **low** | `dotenv-access` | `scripts/flag_audit.py:58` | quote | `SKIP_DIRS = {".git", "node_modules", "venv", ".venv", "env", ".env", "__pycache__", "dist", "build", "target",` |

### C · 69/100 · `git-worktree-manager`

`engineering/git-worktree-manager` — tier 3 (exec)

> Manage parallel development with Git worktrees: creation with port allocation, environment sync, branch isolation, and cleanup. Use when working multiple branches at once, running parallel CI validati

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `references/setup-and-ports.md:157` | fence | `rm -f "$WT_PATH/.env.bak"` |
| **medium** | `secret-access` | `references/operations-playbook.md:32` | inline-code | `\| Dependencies fail to install in new worktree \| Lockfile references a private registry or cache not available` |
| **low** | `dotenv-access` | `references/operations-playbook.md:12` | plain | `- **Not updating .env ports after worktree creation** — the setup script should handle this automatically` |
| **low** | `dotenv-access` | `references/setup-and-ports.md:124` | fence | `for envfile in .env .env.local .env.development; do` |
| **low** | `dotenv-access` | `scripts/worktree_validator.py:30` | quote | `ENV_FILES = [".env", ".env.local", ".env.development", ".env.test"]` |

### C · 69/100 · `stripe-integration-expert`

`engineering/stripe-integration-expert` — tier 3 (exec)

> Implement Stripe integrations for SaaS billing: subscriptions, checkout, proration, usage- based billing, idempotent webhooks, customer portal, dunning, and SCA. Use when building billing, handling we

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `persistence` | `scripts/checkout_scaffolder.py:418` | plain | `profile = request.user.profile` |
| **medium** | `network-egress` | `references/testing-and-troubleshooting.md:41` | plain | `\| Trusting webhook event data \| Stale data, race conditions \| Always re-fetch from Stripe API in handlers \|` |
| **medium** | `network-egress` | `references/webhooks.md:3` | plain | `Read this when building or auditing the Stripe webhook endpoint. This is the most critical code in your billin` |
| **medium** | `network-egress` | `scripts/checkout_scaffolder.py:5` | plain | `frameworks. Includes checkout session creation, webhook handler, subscription` |
| **medium** | `network-egress` | `scripts/integration_auditor.py:5` | plain | `missing idempotency keys, unhandled webhook events, unpinned API versions,` |
| **medium** | `network-egress` | `scripts/webhook_validator.py:2` | quote | `"""Stripe Webhook Endpoint Configuration Validator.` |
| **medium** | `network-egress` | `SKILL.md:15` | plain | `frameworks: stripe-subscriptions, webhook-handling, billing-infrastructure` |
| **low** | `dotenv-access` | `scripts/integration_auditor.py:254` | quote | `"""Check that .env files with Stripe keys are gitignored."""` |

### C · 72/100 · `api-test-suite-builder`

`engineering/api-test-suite-builder` — tier 3 (exec)

> Generate API test suites from route definitions across frameworks: auth, input validation, contract, k6 load testing, mocking, and OpenAPI-driven generation. Use when adding new APIs, auditing test co

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `references/route-detection-and-matrices.md:154` | fence | `name: "'; DROP TABLE projects; --",` |
| **medium** | `network-egress` | `references/contract-and-load-testing.md:52` | fence | `const response = await fetch(`${mockServer.url}/api/v1/projects`, {` |

### C · 72/100 · `code-reviewer`

`engineering/code-reviewer` — tier 3 (exec)

> Code review automation for TypeScript, JavaScript, Python, Go, Swift, and Kotlin. Analyzes PRs for complexity, risk, SOLID violations, and code smells. Use when reviewing PRs, analyzing code quality, 

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

### C · 72/100 · `senior-backend`

`engineering/senior-backend` — tier 3 (exec)

> Backend development with Node.js/Express/Fastify and PostgreSQL. Use when designing REST or GraphQL APIs, optimizing database queries, implementing authentication, building microservices, handling mig

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

> Systematic PR review with blast-radius analysis, security scanning, and breaking-change and test-coverage deltas. Use when reviewing PRs that touch shared libraries, APIs, database schemas, auth, or s

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
| **high** | `obfuscation` | `scripts/security_scanner.py:120` | plain | `'eval() with potential user input'),` |
| **low** | `dotenv-access` | `scripts/security_scanner.py:56` | plain | `'.yml', '.yaml', '.json', '.xml', '.env', '.conf', '.config'` |

### B · 80/100 · `ai-security`

`engineering/ai-security` — tier 3 (exec)

> This skill should be used when the user asks to "scan AI systems for security threats", "check for prompt injection vulnerabilities", "assess model security posture", "detect data poisoning risks", or

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
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
| **high** | `persistence` | `scripts/dq_check_runner.py:398` | plain | `profile = profile_data(rows) if args.profile else None` |

### B · 80/100 · `database-designer`

`engineering/database-designer` — tier 3 (exec)

> Database design with schema analysis, index optimization, and migration generation for PostgreSQL, MySQL, MongoDB, and DynamoDB. Use when designing schemas, optimizing queries, planning migrations, or

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `expected_outputs/migration_sample.txt:37` | plain | `Rollback SQL: DROP TABLE IF EXISTS brands;` |
| **high** | `destructive` | `migration_generator.py:495` | quote | `drop_sql = f"DROP TABLE IF EXISTS {table.name};"` |

### B · 80/100 · `database-schema-designer`

`engineering/database-schema-designer` — tier 3 (exec)

> Design relational schemas from requirements with normalization, migrations, ERDs, RLS policies, and indexes for PostgreSQL, MySQL, and SQLite. Use when designing new features, reviewing schemas, or ad

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `scripts/migration_diffr.py:9` | plain | `- DROP TABLE for removed tables` |

### B · 80/100 · `md-slides`

`markdown-html/md-slides` — tier 3 (exec)

> Convert markdown into a self-contained HTML slide deck with layouts, speaker notes, keyboard navigation, and a content-density linter. Use when building a deck from markdown, cutting an overloaded dec

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `persistence` | `scripts/slide_density_linter.py:240` | plain | `blocking = output(audit(slides, args.profile), slides,` |

### B · 80/100 · `sql-database-assistant`

`engineering/sql-database-assistant` — tier 3 (exec)

> This skill should be used when the user asks to "optimize SQL queries", "explore database schemas", "generate migration SQL", "analyze query performance", or "document database structure".

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **high** | `destructive` | `scripts/migration_generator.py:6` | plain | `and DROP TABLE statements to migrate from one schema to another.` |
| **high** | `destructive` | `SKILL.md:91` | plain | `\| Dropped tables \| DROP TABLE for removed tables \|` |

### B · 86/100 · `monorepo-navigator`

`engineering/monorepo-navigator` — tier 3 (exec)

> Manage and optimize monorepos with Turborepo, Nx, pnpm workspaces, and Changesets. Use when working in monorepos, running impact analysis, optimizing build times with remote caching, migrating from mu

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `secret-access` | `references/operations-and-best-practices.md:33` | inline-code | `\| `ERR_PNPM_PEER_DEP_ISSUES` on install \| Peer dependency mismatches across workspace packages \| Add `peerDepe` |
| **low** | `dotenv-access` | `references/tooling-and-configuration.md:63` | fence | `"globalDependencies": ["**/.env.*local"],` |
| **low** | `unpinned-install` | `references/tooling-and-configuration.md:159` | fence | `pnpm add zod --filter @repo/api` |

### B · 86/100 · `senior-frontend`

`engineering/senior-frontend` — tier 3 (exec)

> Frontend development for React, Next.js, TypeScript, and Tailwind CSS. Use when building React components, optimizing Next.js performance, analyzing bundle sizes, scaffolding projects, implementing ac

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `network-egress` | `references/code-patterns.md:67` | fence | `fetch(url).then(r => r.json()).then(setData).finally(() => setLoading(false));` |
| **medium** | `network-egress` | `references/frontend_best_practices.md:798` | fence | `const response = await fetch('https://api.example.com/data', {` |
| **medium** | `network-egress` | `references/nextjs_optimization_guide.md:374` | fence | `fetch('https://api.example.com/data');` |
| **low** | `unpinned-install` | `references/nextjs_optimization_guide.md:441` | fence | `npm install @next/bundle-analyzer` |
| **low** | `dotenv-access` | `scripts/frontend_scaffolder.py:798` | plain | `.env` |

### B · 86/100 · `senior-fullstack`

`engineering/senior-fullstack` — tier 3 (exec)

> Fullstack development toolkit with project scaffolding for Next.js/FastAPI/MERN/Django stacks and code quality analysis. Use when scaffolding new projects, analyzing codebase quality, or implementing 

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `network-egress` | `scripts/project_scaffolder.py:471` | plain | `const res = await fetch(`${baseUrl}${endpoint}`, {` |
| **low** | `dotenv-access` | `references/development_workflows.md:99` | fence | `# .env.local (development)` |
| **low** | `dotenv-access` | `references/tooling-workflows-and-quality.md:158` | fence | `cp .env.example .env.local` |
| **low** | `dotenv-access` | `scripts/code_quality_analyzer.py:31` | quote | `CONFIG_EXTENSIONS = {".json", ".yaml", ".yml", ".toml", ".env"}` |
| **low** | `dotenv-access` | `scripts/project_scaffolder.py:36` | quote | `".env.example", ".gitignore", "README.md"]` |
| **low** | `unpinned-install` | `scripts/project_scaffolder.py:661` | plain | `RUN npm install COPY . .` |

### B · 89/100 · `performance-profiler`

`engineering/performance-profiler` — tier 3 (exec)

> Performance profiling for Node.js, Python, and Go: CPU flamegraphs, memory leak detection, bundle analysis, query optimization, and k6 load testing. Use when diagnosing slow endpoints, memory growth, 

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `privilege-escalation` | `references/load-testing-and-methodology.md:151` | inline-code | `\| `py-spy` cannot attach to running process \| Insufficient permissions or SIP (System Integrity Protection) on` |
| **low** | `unpinned-install` | `references/cpu-and-memory-profiling.md:99` | fence | `pip install memray` |

### B · 89/100 · `saas-scaffolder`

`engineering/saas-scaffolder` — tier 3 (exec)

> Generate SaaS boilerplate with auth, database schemas, Stripe billing, multi-tenancy, API routes, and dashboard UI on a Next.js/TypeScript/Tailwind stack. Use when starting a new SaaS product, subscri

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `network-egress` | `references/auth-billing-and-tenancy.md:3` | plain | `Read this when wiring up NextAuth, building the Stripe checkout/webhook/portal flow, protecting routes with mi` |
| **medium** | `network-egress` | `references/workflow-and-quality.md:40` | plain | `19. Implement webhook handler with signature verification` |
| **medium** | `network-egress` | `SKILL.md:26` | plain | `- **Stripe billing** — checkout session, customer portal, and signature-verified webhook handler keeping subsc` |
| **low** | `dotenv-access` | `references/project-structure-and-schema.md:80` | fence | `├── .env.example` |
| **low** | `dotenv-access` | `scripts/saas_scaffolder.py:218` | quote | `".env.example": None,` |

### B · 89/100 · `senior-computer-vision`

`engineering/senior-computer-vision` — tier 3 (exec)

> Computer vision engineering for object detection, segmentation, and visual AI, covering CNN and Vision Transformer architectures and ONNX/TensorRT deployment. Use when building detection pipelines, tr

| Severity | Detector | Where | Context | Evidence |
| --- | --- | --- | --- | --- |
| **medium** | `ip-literal-url` | `references/production_vision_systems.md:754` | fence | `inference_address=http://0.0.0.0:8080` |
| **low** | `unpinned-install` | `scripts/inference_optimizer.py:431` | plain | `'onnxruntime': f'pip install onnxruntime-gpu',` |

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
