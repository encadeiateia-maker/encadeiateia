# Encadeiateia — North Star

> From landing page to virtual agency platform.
> The public front door to a solo-founder AI agency ecosystem.

---

## What Encadeiateia Is

Encadeiateia is an AI, automation, and custom app development agency based in Lisbon, Portugal. The website is the **storefront** — but behind it sits an ecosystem of tools that together form a **virtual agency**: one person operating with the capacity of a full team.

---

## The Ecosystem

```
encadeiateia.com (storefront / client portal)
    │
    ├── Solo OS              — master orchestrator (Supabase, Docker, n8n, Windmill, Ollama)
    ├── Claude Forge         — multi-agent Claude Code orchestrator (Rust/Axum + Svelte)
    ├── Codeilus             — codebase analysis + gamified learning platform (Rust)
    ├── Smart Harvestor      — autonomous freelance job intelligence (scrape → score → bid)
    ├── Dripin / Webdev      — multi-tenant web development platform (18+ client sites)
    ├── LPP (Landing Page)   — multi-tenant lead gen system (Next.js + Express + Postgres)
    ├── Cinefilm             — local AI creative production (images, video, music, TTS)
    └── Claude Parent        — knowledge hub (61 Claude Code community repos)
```

### Project Locations

| Project | Path | Tech |
|---------|------|------|
| Solo OS | `/Users/bm/cod/dir8/solo-os` | Supabase + Docker + n8n + Windmill + Ollama + Traefik |
| Claude Forge | `/Users/bm/cod/trend/10-march/forge-project` | Rust (Axum, 9 crates) + Svelte 5 |
| Codeilus | `/Users/bm/codeilus` | Rust (16 crates) + SvelteKit 5 |
| Smart Harvestor | `/Users/bm/smart-standalone-harvestor` | TypeScript (CDP) + FastAPI + React + Chrome MV3 |
| LPP | `/Users/bm/landig-page` | Next.js 14 + Express + Postgres + n8n + Drizzle |
| Dripin / Webdev | `/Users/bm/webdev` | Next.js + Traefik + PostgreSQL + 10 MCP servers |
| Cinefilm | `/Users/bm/cod/in-progress/local-agentic-medium` | FastAPI + Angular 18 + ComfyUI + Ollama + ADK |
| Claude Parent | `/Users/bm/claude-parent` | MkDocs + Python + GitNexus (61 reference repos) |

---

## Current State

- **Frontend**: React 18 + Vite + Tailwind 4 + Radix UI + React Router
- **Pages**: Home, About, Showcase, Blog, BlogPost, 404
- **Backend**: None — all data is hardcoded (mock blog posts, mock projects, mock team)
- **Deployment**: Docker (nginx) → GCP Cloud Run (europe-west1) via Cloud Build
- **Repo**: `github.com:encadeiateia-maker/encadeiateia.git` (single `main` branch)
- **Domain**: Cloud Run default URL

---

## Implementation Plan — 3 Layers

### Layer 1: Infrastructure (CI/CD + Staging)

**Goal**: Push to deploy. Staging for preview. Production on merge to main.

| Item | Detail |
|------|--------|
| CI/CD | GitHub Actions (replaces/complements Cloud Build) |
| Staging trigger | Push to `staging` branch or PR to `main` |
| Production trigger | Push/merge to `main` |
| Staging target | Separate Cloud Run service: `encadeiateia-staging` |
| Production target | Existing Cloud Run service: `encadeiateia` |
| Registry | Artifact Registry: `europe-west1-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy` |
| PR Preview | GitHub Actions bot comments staging URL on PRs |

**GitHub Actions Pipeline**:
```
push/PR
  → checkout
  → pnpm install
  → pnpm build (vite)
  → docker build
  → docker push (Artifact Registry)
  → gcloud run deploy (staging or prod)
  → comment PR with URL (if PR)
```

**Required GitHub Secrets**:
- `GCP_PROJECT_ID`
- `GCP_SA_KEY` (service account JSON with Cloud Run + Artifact Registry permissions)
- `GCP_REGION` (europe-west1)

**Files to create**:
- `.github/workflows/deploy-staging.yml`
- `.github/workflows/deploy-production.yml`

---

### Layer 2: Backend Foundation

**Goal**: Dynamic content, auth, lead capture — not a static brochure.

**Tech choice**: Supabase (aligns with Solo OS, already battle-tested in the ecosystem).

| Feature | Implementation |
|---------|---------------|
| Database | Supabase Postgres (hosted or self-hosted) |
| Auth | Supabase Auth (client portal login) |
| Blog CMS | Posts table in Supabase, or Notion API via MCP |
| Showcase | Projects table — pull from real portfolio |
| Contact form | Leads table → n8n webhook → email notification |
| Lead pipeline | Connect to LPP patterns (or simplified version) |
| API layer | Supabase client SDK (direct from React) or Edge Functions |

**Schema sketch**:
```sql
-- Blog
create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  category text,
  cover_image text,
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Showcase
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  category text,
  cover_image text,
  tech_stack text[],
  metrics jsonb,
  live_url text,
  featured boolean default false,
  created_at timestamptz default now()
);

-- Leads
create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text,
  source text default 'website',
  status text default 'new',
  created_at timestamptz default now()
);

-- Clients (portal)
create table clients (
  id uuid primary key references auth.users(id),
  company_name text,
  contact_name text,
  email text,
  plan text,
  created_at timestamptz default now()
);
```

**Dependencies to add**:
- `@supabase/supabase-js`
- `react-router` (already present)

**Pattern references**:
- LPP (`/Users/bm/landig-page`) for lead pipeline + tenant patterns
- Solo OS (`/Users/bm/cod/dir8/solo-os`) for Supabase setup + schema conventions
- Dripin (`/Users/bm/webdev`) for multi-site content patterns

---

### Layer 3: Virtual Agency Platform

**Goal**: Transform from marketing site to operational platform — where clients interact, services are delivered, and AI tools are exposed.

#### 3A. Client Dashboard

Authenticated area where clients see their projects.

| Feature | Detail |
|---------|--------|
| Auth | Supabase Auth (magic link or password) |
| Projects view | Status, timeline, deliverables, invoices |
| Communication | Threaded messages per project |
| File sharing | Upload/download via Supabase Storage |
| Invoicing | Simple invoice records (or integrate Stripe) |

**Pattern reference**: LPP's planned customer dashboard, Dripin's central content DB.

#### 3B. Service Catalog (Bookable)

Not static feature cards — real bookable services tied to the tools.

| Service | Powered by | Deliverable |
|---------|-----------|-------------|
| AI Strategy Consulting | Claude Forge + Claude Parent knowledge | Report + roadmap |
| Custom Automation | n8n + Windmill (Solo OS engines) | Working workflows |
| Web App Development | Dripin platform + LPP patterns | Deployed app |
| Codebase Analysis | Codeilus | Interactive learning site |
| AI Creative Production | Cinefilm | Images, video, music |
| Lead Generation System | LPP + Smart Harvestor patterns | Multi-tenant lead gen |

Each service card links to a booking flow (Calendly/Cal.com or custom form → lead pipeline).

#### 3C. AI Chat Assistant

Embedded chat on the site, powered by the existing AI infrastructure.

| Option | Stack | Pros |
|--------|-------|------|
| Ollama + Open WebUI | Already in Solo OS | Free, private, local |
| Claude API | Via Forge or direct | Best quality |
| Hybrid | Ollama for simple, Claude for complex | Cost-effective |

The assistant can:
- Answer questions about services
- Qualify leads
- Book consultations
- Demo capabilities (e.g., "analyze this repo" → Codeilus)

#### 3D. Live Showcase

Instead of mock projects, pull real data:

| Source | What to show |
|--------|-------------|
| Codeilus | "Try it: paste a GitHub URL, get an interactive analysis" |
| Forge | Agent orchestration demo (read-only dashboard view) |
| Harvestor | "We found X opportunities this week" stats |
| Dripin | Portfolio of 18+ live client websites |
| Cinefilm | Generated creative samples |

#### 3E. Blog CMS

Options (pick one):

1. **Supabase-backed** — admin writes in a simple editor, stores in `posts` table
2. **Notion as CMS** — write in Notion, pull via Notion MCP (already in Dripin stack)
3. **Markdown files** — blog posts as `.md` in repo, rendered at build time (simplest)

Recommendation: Start with **Notion as CMS** — zero new UI to build, MCP already available, rich editing experience.

---

## Tech Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| CI/CD | GitHub Actions | Already on GitHub, free for public repos |
| Backend | Supabase | Already in Solo OS, auth + DB + storage + realtime |
| Hosting | GCP Cloud Run | Already set up, europe-west1, pay-per-use |
| Registry | Artifact Registry | Already configured in cloudbuild.yaml |
| Frontend | Keep React + Vite + Tailwind | Already working, rich component library |
| Auth | Supabase Auth | Unified with Solo OS, magic links |
| CMS | Notion via MCP | Already have MCP server, rich editing |
| Lead pipeline | Supabase → n8n webhook | Reuse Solo OS n8n engine |
| Chat | Ollama (local) or Claude API | Depends on hosting model |

---

## Migration Path

```
Phase 0 (now)     — Static landing page, manual deploy via Cloud Build
Phase 1 (Layer 1) — GitHub Actions CI/CD, staging env, PR previews
Phase 2 (Layer 2) — Supabase backend, dynamic blog/showcase, lead capture
Phase 3 (Layer 3) — Client portal, service catalog, AI chat, live demos
```

Each phase is independently valuable. Phase 1 unblocks everything else.

---

## Infrastructure Diagram

```
                    ┌──────────────────────┐
                    │   GitHub Repository   │
                    │  encadeiateia-maker   │
                    └──────┬───────────────┘
                           │
                    GitHub Actions
                    ┌──────┴───────────────┐
                    │                      │
              push to staging        merge to main
                    │                      │
                    ▼                      ▼
            ┌──────────────┐    ┌──────────────┐
            │  Cloud Run   │    │  Cloud Run   │
            │   STAGING    │    │  PRODUCTION  │
            │  :staging    │    │  :latest     │
            └──────┬───────┘    └──────┬───────┘
                   │                   │
                   └───────┬───────────┘
                           │
                    ┌──────┴───────────────┐
                    │    Supabase          │
                    │  (Auth + DB +        │
                    │   Storage + Realtime)│
                    └──────────────────────┘
                           │
                    ┌──────┴───────────────┐
                    │    Solo OS Engines   │
                    │  n8n / Windmill /    │
                    │  Ollama / OpenClaw   │
                    └──────────────────────┘
```

---

## Non-Goals (for now)

- Kubernetes / complex orchestration — Cloud Run is sufficient
- Custom domain setup — do after staging works
- Payment processing — do after client portal exists
- Mobile app — responsive web is enough
- Multi-language — Portuguese + English later, English first

---

## References

- Solo OS architecture: `/Users/bm/cod/dir8/solo-os/CLAUDE.md`
- Forge north star: `/Users/bm/cod/trend/10-march/forge-project/NORTH_STAR.md`
- Codeilus north star: `/Users/bm/codeilus/codeilus/NORTH_STAR.md`
- LPP spec: `/Users/bm/landig-page/PROJECT_SPEC.md`
- Dripin infra: `/Users/bm/webdev/infrastructure/`
- Harvestor manual: `/Users/bm/smart-standalone-harvestor/docs/MANUAL.md`
- Cinefilm proposal: `/Users/bm/cod/in-progress/local-agentic-medium/LOCAL-PROPOSAL.md`
