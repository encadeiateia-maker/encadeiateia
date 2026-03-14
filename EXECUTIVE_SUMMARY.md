# Executive Summary: Path to Virtual Agency

> An analysis of 8 codebases and how they converge into a one-person AI agency.
> Date: 2026-03-14

---

## What You Already Have

Eight production-grade systems that together form a complete operating system for a one-person agency. Each repo solves one piece of the puzzle. Together, they deliver at the capacity of a 10-person shop.

```
FIND WORK         →  Smart Harvestor (auto-scrape, AI score, generate proposals)
WIN WORK          →  LPP (landing pages, lead capture, CRM sync, follow-ups)
DELIVER WORK      →  Forge (multi-agent orchestration), Dripin (18+ live sites), Cinefilm (creative)
UNDERSTAND WORK   →  Codeilus (codebase analysis, onboarding, audits)
ORCHESTRATE ALL   →  Solo OS (one DB, one auth, one network — engines invisible)
SELL IT ALL       →  Encadeiateia (the front door)
```

---

## The Gap

The gap is not capability — it's presentation. Production-grade tools exist behind a Figma-template landing page. The virtual agency already runs in the terminal. It doesn't yet exist on the web.

---

## Key Patterns Across the Ecosystem

### 1. Platform Thinking, Not Project Thinking

Every repo is multi-tenant, extensible, schema-per-concern.

- **LPP**: PostgreSQL schema-per-tenant isolation, tenant config as JSON, shared API gateway
- **Dripin**: 18 client sites from one monorepo, Traefik auto-routing, centralized content DB
- **Solo OS**: Every app gets its own Postgres schema, one Supabase instance, one `solo up`

This is agency DNA — build once, serve many.

### 2. AI Is Operational, Not Decorative

AI isn't a feature — it's the delivery mechanism.

- **Harvestor**: 4-agent bid pipeline (Analyst → Architect → Strategist → Writer), composite scoring formula, auto-apply with human gates
- **Forge**: 10 specialized agent presets, 8-middleware chain (rate limit, circuit breaker, cost check, skill injection, persist, spawn, exit gate, quality gate), real-time WebSocket streaming
- **Cinefilm**: Full local creative stack (ComfyUI, MusicGen, Piper TTS, Ollama reasoning), replaces cloud APIs entirely
- **Codeilus**: Tree-sitter parsing across 13 languages, Louvain community detection, LLM-generated narratives, gamified curriculum

### 3. Rust for Anything Performance-Critical

Two major Rust projects — both single binaries, zero external deps, embedded frontends:

- **Forge**: 9 crates, Axum + Svelte 5, ~3,400 LOC, SQLite WAL, MCP server
- **Codeilus**: 16 crates, Axum + SvelteKit 5, 90+ tests, 20-table schema, 5-stage analysis pipeline

This is a real differentiator. Most agencies ship scripts. These are compiled systems.

### 4. Solo OS Is the Convergence Point

Solo OS already wires multiple apps into one infrastructure:

```
Surfaces (web, CLI, Mac native, messaging)
    ↓
Apps (Throne, Harvestor, Mana)
    ↓
Engines (n8n, Windmill, Open WebUI, OpenClaw, Chrome MCP)
    ↓
Core (Supabase Postgres, Auth, Realtime, Storage + Redis + MinIO + Ollama)
```

Key principles:
- ONE database (Supabase Postgres) — every engine and app writes here
- ONE auth (Supabase Auth) — single login everywhere
- ONE network — all Docker services on `solo-net`
- Engines are INVISIBLE — users don't use n8n, they "create a workflow"
- Apps are MODULAR — drop in and get data + workflows + AI for free

Encadeiateia should be the **public surface** of this architecture.

### 5. The Hardest Parts Are Already Solved

| Capability | Solution | Status |
|-----------|----------|--------|
| Auth | Supabase Auth (Solo OS) | Production |
| Deployment | Docker + Cloud Run + Traefik | Production |
| Automation | n8n + Windmill (Solo OS engines) | Production |
| AI Orchestration | Forge (10 agents) + ADK | v0.5 shipped |
| Content Generation | Cinefilm (local AI studio) | MVP |
| Lead Pipeline | LPP + Harvestor | Built |
| Client Websites | Dripin (18+ live sites) | Production |
| Codebase Intelligence | Codeilus (16 crates) | Wave 7 complete |
| Knowledge Base | Claude Parent (61 repos) | Extraction pipeline ready |

What's missing is **stitching the client-facing layer**.

---

## The Virtual Agency Model

```
Traditional Agency                    Encadeiateia Model
──────────────────                    ──────────────────
10 developers                         Claude Forge (10 AI agents)
Project manager                       Solo OS (orchestration + dashboards)
Sales team                            Harvestor (auto-find) + LPP (auto-capture)
Creative department                   Cinefilm (local AI studio)
DevOps team                           Dripin infra (Docker + Traefik + auto-SSL)
Knowledge base                        Codeilus + Claude Parent
Office in Lisbon                      encadeiateia.com
```

Headcount is replaced with systems. That's the pitch. That's the agency.

---

## What Encadeiateia Needs to Become

| From | To |
|------|-----|
| Static Figma template | Dynamic platform connected to real data |
| Mock portfolio with placeholder images | Live showcase pulling from actual running tools |
| Contact form that goes nowhere | Lead pipeline → Supabase → n8n → CRM |
| No authentication | Client portal (project status, deliverables, invoices) |
| No backend at all | Supabase (same pattern as Solo OS) |
| Manual deploy via Cloud Build | GitHub Actions → staging → production |
| Generic "AI agency" copy | Specific positioning: "I build AND operate, powered by systems I built" |
| 6 mock feature cards | 5 real service blocks with deliverables and outcomes |
| No social proof | Portfolio cards with problem → solution → measurable result |

---

## Ecosystem Detail

### Smart Harvestor — Finding Work

**Path**: `/Users/bm/smart-standalone-harvestor`
**Stack**: TypeScript (CDP scraper) + FastAPI + React + Chrome MV3 Extension + PostgreSQL

What it does:
- Passive CDP scraping of Upwork and Freelancer.com (no active clicking)
- Chrome extension shows AI score badges inline on job listings
- 4-agent bid pipeline: Analyst → Architect → Strategist → Writer
- Composite scoring: 0.30×skill + 0.20×budget + 0.20×client + 0.15×competition + 0.15×ai_leverage
- 6 markdown artifact types per job (brief, scorecard, analysis, MVP design, strategy, proposal)
- MCP server with 11 tools for Claude Code integration
- 118+ unit tests, React dashboard with filters/sort/search

**Relevance to encadeiateia**: Demonstrates lead automation capability as a sellable service. The scoring + bid pipeline is a live demo of "AI & Workflow Automation."

### LPP — Winning Work

**Path**: `/Users/bm/landig-page`
**Stack**: Next.js 14 + Express + PostgreSQL + n8n + Drizzle ORM + Turborepo

What it does:
- Multi-tenant lead gen platform for local service providers
- Schema-per-tenant PostgreSQL isolation
- Lead capture → API Gateway → n8n automation → CRM sync (HubSpot/PipeDrive)
- Tenant config as JSON (branding, content, calendar, legal, analytics)
- Docker Compose for full local stack (Postgres, Redis, n8n, Plausible)
- Business model: 7-10K EUR setup + 400-500 EUR/month retainer

**Relevance to encadeiateia**: Direct pattern for encadeiateia's own lead capture. The multi-tenant approach is a sellable service ("Lead Generation & Sales Automation").

### Claude Forge — Delivering Work (Orchestration)

**Path**: `/Users/bm/cod/trend/10-march/forge-project`
**Stack**: Rust (Axum, 9 crates) + Svelte 5 + SQLite

What it does:
- 10 specialized agent presets (CodeWriter, Reviewer, Tester, Debugger, Architect, Documenter, SecurityAuditor, Refactorer, Explorer, Coordinator)
- 8-middleware chain: rate limit → circuit breaker → cost check → skill injection → persist → spawn → exit gate → quality gate
- Real-time WebSocket streaming of agent output
- Git worktree isolation per agent session
- Cron scheduler, loop detection, usage analytics
- MCP server mode (10 tools via stdio)
- v0.5.0 shipped: 150 tests passing, zero warnings

**Relevance to encadeiateia**: Core delivery engine. "AI & Workflow Automation" service is powered by this. Live dashboard can be exposed as showcase.

### Dripin / Webdev — Delivering Work (Websites)

**Path**: `/Users/bm/webdev`
**Stack**: Next.js 14 + React 19 + Traefik + PostgreSQL + Docker + 10 MCP servers

What it does:
- Multi-tenant web platform: 18+ live client websites under *.dripin.ai
- Central content database + per-website isolated databases
- Traefik reverse proxy with automatic TLS via Let's Encrypt
- Docker-based isolation per site
- 10 MCP server integrations (Notion, GitHub, Gemini, Figma, WhatsApp, n8n, etc.)
- Monitoring via Prometheus + Loki

**Relevance to encadeiateia**: Direct portfolio proof. "Custom Web & Mobile Apps" service runs on this platform. Pattern for encadeiateia's own infrastructure.

### Cinefilm — Delivering Work (Creative)

**Path**: `/Users/bm/cod/in-progress/local-agentic-medium`
**Stack**: FastAPI + Angular 18 + ComfyUI + Ollama + Google ADK + Supabase

What it does:
- Fully local AI creative production (zero cloud dependency)
- Image generation (ComfyUI + Stable Diffusion / Flux)
- Video generation (AnimateDiff / SVD)
- Music generation (MusicGen)
- Text-to-speech (Piper / Coqui)
- Text reasoning (Ollama + qwen2.5/qwen3)
- 4-agent hierarchy with tool registry, quota checking, billing
- 3 deployment modes: LOCAL (free), COMFYUI (full local), VERTEX (cloud)

**Relevance to encadeiateia**: "AI-Powered Content & Creative" service runs on this. GDPR-friendly local AI is a differentiator in the EU market.

### Codeilus — Understanding Work

**Path**: `/Users/bm/codeilus`
**Stack**: Rust (16 crates) + SvelteKit 5 + tree-sitter + SQLite

What it does:
- Analyzes any codebase across 13 languages via tree-sitter
- Builds knowledge graph (symbols, calls, imports, heritage)
- Louvain community detection for module clustering
- 5-stage pipeline: Parse → Graph → Metrics/Analyze/Diagram → Narrate → Learn
- Gamified learning paths with chapters, quizzes, XP, badges
- Static HTML export for trending repos (single file, <500KB, <1s load)
- MCP server with 8 tools for Claude Code integration
- GitHub Actions for daily trending repo harvesting

**Relevance to encadeiateia**: "Codebase Intelligence & Developer Tools" service. Can offer live demo: paste a GitHub URL, get interactive analysis. Unique capability no other agency offers.

### Solo OS — Orchestrating Everything

**Path**: `/Users/bm/cod/dir8/solo-os`
**Stack**: Supabase (Postgres, Auth, Realtime, Storage) + Docker + n8n + Windmill + Ollama + Traefik

What it does:
- Unified personal operating system for solo founders
- ONE database, ONE auth, ONE network
- Engine layer: n8n (workflows), Windmill (scripts/jobs), Open WebUI (AI chat), OpenClaw (messaging), Chrome MCP (browser automation)
- App layer: Throne (inbound/process/outbound brain), Harvestor, Mana (real estate content)
- Each component has its own Postgres schema
- Cross-app communication via `solo.events` table
- Unified entity registry in `solo.entities`
- CLI: `solo up`, `solo down`, `solo status`, `solo logs`, `solo backup`
- Port range: 543xx for all services

**Relevance to encadeiateia**: The backend architecture model. Encadeiateia's Supabase backend should follow the same patterns. n8n handles lead automation. Windmill handles scheduled jobs.

### Claude Parent — Knowledge Foundation

**Path**: `/Users/bm/claude-parent`
**Stack**: MkDocs + Python + GitNexus + Git submodules

What it does:
- Maps 61 Claude Code community reference repositories
- 13 categories: Desktop/IDEs, Orchestration, Templates/Skills, Automation/CI, Remote/Infra, Hooks, Config, Subagents, MCP, Prompts, etc.
- Full content extraction via GitNexus (analyze → wiki per repo)
- Capability map and feature adoption proposal for Forge
- AI documentation landscape analysis (AGENTS.md standard)

**Relevance to encadeiateia**: Knowledge base that informed Forge's architecture. Demonstrates deep ecosystem expertise. Potential blog content source.

---

## Execution Roadmap

### Phase 1: Infrastructure (1 session)

- GitHub Actions CI/CD (build → Docker → Artifact Registry → Cloud Run)
- Staging environment (separate Cloud Run service)
- PR preview comments with staging URL
- Branch strategy: `main` (prod), `staging` (preview)

### Phase 2: Homepage Rewrite (1 session)

- Implement new hero section (Perplexity-generated copy)
- 5 real service blocks replacing mock feature cards
- 5 portfolio cards with problem → solution → result
- 4-step process section
- Updated navigation (Home, Services, Projects, Process, About, Contact)

### Phase 3: Backend Foundation (1-2 sessions)

- Add Supabase (hosted or self-hosted)
- Dynamic blog (posts table or Notion CMS via MCP)
- Dynamic showcase (projects table)
- Contact form → leads table → n8n webhook → email notification
- Environment config for Supabase URL + anon key

### Phase 4: Client Portal (2-3 sessions)

- Supabase Auth (magic link or password)
- Client dashboard route (protected)
- Projects view: status, timeline, deliverables
- File sharing via Supabase Storage
- Simple invoicing records

### Phase 5: Live Demos & Integration (ongoing)

- Codeilus embed: "paste a GitHub URL" interactive demo
- Forge dashboard: read-only view of agent orchestration
- Harvestor stats: "X opportunities scored this week"
- Dripin portfolio: pull live site screenshots
- AI chat assistant (Ollama or Claude API)

---

## Technical Decisions

| Decision | Choice | Reasoning |
|----------|--------|-----------|
| CI/CD | GitHub Actions | Already on GitHub, free for public repos, ecosystem standard |
| Backend | Supabase | Already runs in Solo OS, auth + DB + storage + realtime in one |
| Hosting | GCP Cloud Run | Already configured, europe-west1, pay-per-use, scales to zero |
| Container Registry | Artifact Registry | Already in cloudbuild.yaml, same region |
| Frontend | Keep React + Vite + Tailwind | Working stack, rich Radix UI component library already installed |
| Auth | Supabase Auth | Unified with Solo OS pattern, supports magic links |
| CMS | Notion via MCP → Supabase | Write in Notion (rich editor), sync to Supabase (fast reads) |
| Lead Pipeline | Supabase → n8n webhook | Reuse Solo OS n8n engine for email + CRM |
| Chat | Ollama (local) or Claude API | Depends on hosting model and budget |
| Domain | Custom domain after staging works | Cloudflare DNS, Cloud Run domain mapping |

---

## Non-Goals (For Now)

- Kubernetes or complex container orchestration — Cloud Run is sufficient
- Native mobile app — responsive web handles it
- Multi-language (PT + EN) — English first, Portuguese later
- Payment processing (Stripe) — after client portal exists
- Self-hosted Supabase — use hosted Supabase initially, migrate later if needed

---

## The Bottom Line

The virtual agency already exists across 8 repositories. Encadeiateia needs to stop hiding it behind a template landing page and start showing what's actually running behind the curtain.

The path is clear:
1. Ship the infrastructure (CI/CD + staging)
2. Ship the message (new homepage with real positioning)
3. Ship the backend (Supabase + dynamic content)
4. Ship the portal (client dashboard)
5. Ship the demos (live tools exposed)

Each phase is independently valuable. Phase 1 unblocks everything else.
