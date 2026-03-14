# Encadeiateia — Agent Context

## What is this

Public-facing website for **encadeiateia** — an AI, automation, and custom app development agency (Lisbon, Portugal). Currently a React landing page, evolving into a virtual agency platform.

## Tech Stack

- **Frontend**: React 18 + Vite 6 + Tailwind 4 + Radix UI + React Router 7
- **Build**: pnpm, `@` alias maps to `./src`
- **Deploy**: Docker (nginx) → GCP Cloud Run (europe-west1)
- **Registry**: `europe-west1-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy/encadeiateia`

## Project Structure

```
src/
  main.tsx              — entry point
  app/
    App.tsx             — RouterProvider wrapper
    routes.ts           — route config with Layout wrapper
    components/
      Layout.tsx        — nav + footer
      ui/               — shadcn/radix components
      figma/            — ImageWithFallback
    pages/
      Home.tsx          — hero, features, stats, contact form
      About.tsx         — company story, values, team
      Showcase.tsx      — portfolio grid
      Blog.tsx          — blog listing with search
      BlogPost.tsx      — individual post (mock data)
      NotFound.tsx      — 404
  styles/
    fonts.css, index.css, tailwind.css, theme.css
```

## Commands

```bash
pnpm install          # install deps
pnpm dev              # dev server
pnpm build            # production build → dist/
```

## Conventions

- Path alias: `@/` → `src/`
- Dark theme: slate-950/900 backgrounds, cyan-to-purple gradients
- Components: shadcn/ui pattern (Radix primitives + Tailwind + CVA)
- Icons: lucide-react
- Animations: motion library

## Ecosystem

This is the front door to a larger ecosystem. See `NORTH_STAR.md` for the full map.

Key sibling projects:
- **Solo OS** — master orchestrator (Supabase + Docker + engines)
- **Claude Forge** — multi-agent Claude Code orchestrator (Rust)
- **Codeilus** — codebase analysis platform (Rust)
- **Smart Harvestor** — freelance job intelligence
- **Dripin** — multi-tenant web platform (18+ sites)
- **LPP** — multi-tenant lead gen system
- **Cinefilm** — local AI creative production

## Key Documents

### Strategic
- **NORTH_STAR.md** — Vision, ecosystem map, 3-layer plan, schema sketches, infra diagram
- **EXECUTIVE_SUMMARY.md** — 8-repo analysis, virtual agency model, execution roadmap
- **INFRASTRUCTURE.md** — GCP architecture, Cloud Build CI/CD, Terraform template, DB schema, costs

### Product
- **docs/product/PRD.md** — Product requirements, target users, success metrics, features by phase, risks
- **docs/product/USER_STORIES.md** — User stories with acceptance criteria, organized by epic

### Architecture
- **docs/architecture/ARCHITECTURE.md** — System overview, component architecture, data flow, API design, security, performance
- **docs/architecture/API_SPEC.md** — Full API specification with endpoints, request/response shapes, auth, validation

### Project Management
- **docs/project/ROADMAP.md** — 5-phase roadmap with task lists, status tracking, exit criteria per phase
- **docs/project/BACKLOG.md** — Full product backlog: epics, stories, priority (P0-P3), size estimates (S/M/L)
- **docs/project/DEFINITION_OF_DONE.md** — Quality gates per task, epic, and phase

### Operations
- **docs/operations/RUNBOOK.md** — Deploy, rollback, database, Terraform, incident response procedures
- **docs/operations/ENVIRONMENTS.md** — Local/staging/prod config, branch strategy, env vars, resource limits

### Architecture Decision Records
- **docs/decisions/ADR-001-gcp-native.md** — GCP-native over Supabase for encadeiateia
- **docs/decisions/ADR-002-cloud-build-over-github-actions.md** — Cloud Build over GitHub Actions
- **docs/decisions/ADR-003-content-as-data.md** — JSON file → database migration path
- **docs/decisions/ADR-004-firebase-auth.md** — Firebase Auth for client portal

### Content
- **src/content/site-content.json** — Structured content data (hero, services, portfolio, process, contact, footer)

## Roadmap

1. **Phase 1**: GitHub Actions CI/CD + staging environment
2. **Phase 2**: Homepage rewrite (real positioning, services, portfolio)
3. **Phase 3**: Supabase backend (auth, dynamic content, leads)
4. **Phase 4**: Client portal (project dashboard, file sharing, invoices)
5. **Phase 5**: Live demos & integration (Codeilus, Forge, Harvestor, AI chat)

## Git

- Repo: `git@github.com:encadeiateia-maker/encadeiateia.git`
- Branch strategy: `main` (prod), `staging` (preview)
- Deploy: GitHub Actions → Docker → Artifact Registry → Cloud Run
