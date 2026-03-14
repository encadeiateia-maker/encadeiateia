# Product Requirements Document (PRD)

**Product**: Encadeiateia Virtual Agency Platform
**Owner**: BM
**Status**: Draft
**Last updated**: 2026-03-14
**Version**: 1.0

---

## 1. Problem Statement

Solo technical founders and small agencies struggle to present, sell, and deliver AI/automation services at scale. The tools exist — agent orchestrators, web platforms, creative AI studios — but there's no unified client-facing layer that connects capability to customer.

Encadeiateia has 8 production-grade systems but presents them behind a static landing page. Clients can't see the work, interact with the services, or track their projects. Leads have no pipeline. Content is hardcoded.

## 2. Product Vision

Transform encadeiateia.com from a static marketing site into an **operational agency platform** where:
- Visitors understand exactly what's offered and see proof
- Leads are captured, scored, and followed up automatically
- Clients log in, track projects, and receive deliverables
- AI tools are demonstrated live, not described

**One-liner**: The website IS the agency — not a brochure for one.

## 3. Target Users

### 3.1 Primary: Prospective Clients
- **Who**: SME founders, CTOs, and technical leads in Europe
- **Need**: Build or automate products without hiring a full team
- **Behavior**: Research online, compare agencies, book a call, start with a small engagement
- **Pain**: Most agency sites are vague. Hard to tell who actually builds vs who just consults.

### 3.2 Secondary: Active Clients
- **Who**: Clients with ongoing projects
- **Need**: Track project status, receive deliverables, communicate with the builder
- **Behavior**: Check dashboard weekly, download files, provide feedback
- **Pain**: Status updates via email get lost. No single place to see everything.

### 3.3 Tertiary: The Builder (BM)
- **Who**: Solo founder operating the agency
- **Need**: Manage leads, track projects, publish content, monitor services
- **Behavior**: Manage from CLI/dashboard, deploy via git push
- **Pain**: Manual processes for lead follow-up, content updates, client communication

## 4. Success Metrics

| Metric | Current | Phase 2 Target | Phase 4 Target |
|--------|---------|---------------|---------------|
| Monthly unique visitors | Unknown | 500 | 2,000 |
| Lead conversion rate | 0% (no capture) | 3% | 5% |
| Leads per month | 0 | 15 | 100 |
| Time to deploy a change | Manual (~10 min) | Automated (~2 min) | Automated (~2 min) |
| Client portal logins | N/A | N/A | 10/week |
| Blog posts published | 0 | 4 | 12 |

## 5. Features by Phase

### Phase 1: CI/CD + Staging
| Feature | Priority | Description |
|---------|----------|-------------|
| Production deploy | P0 | Push to `main` → live in 2 min |
| Staging deploy | P0 | Push to `staging` → preview environment |
| Branch protection | P1 | Require staging verification before main merge |

### Phase 2: Homepage Rewrite
| Feature | Priority | Description |
|---------|----------|-------------|
| Hero section | P0 | Clear positioning: headline, subhead, 2 CTAs |
| Services section | P0 | 5 service blocks with deliverables and outcomes |
| Portfolio section | P0 | 5 project cards with problem → solution → result |
| Process section | P0 | 4-step visual process flow |
| Contact form | P0 | 6 fields, submits to console (backend in Phase 3) |
| New navigation | P0 | Home, Services, Projects, Process, About, Contact |
| Footer rewrite | P1 | 3 columns: Company, Services, Connect |
| About page rewrite | P1 | Real story, not template copy |
| SEO meta tags | P1 | Per-page title, description, og:image |
| Mobile responsive | P0 | All new sections work on mobile |

### Phase 3: Backend + Leads
| Feature | Priority | Description |
|---------|----------|-------------|
| Cloud SQL database | P0 | PostgreSQL 15, Terraform provisioned |
| Leads table | P0 | Contact form → database |
| Lead notification | P0 | New lead → email notification (via n8n or Cloud Function) |
| Blog from database | P1 | Posts table, slug-based routing |
| Portfolio from database | P1 | Projects table, filterable |
| Admin API | P1 | CRUD endpoints for posts, projects, leads |
| GCS media uploads | P2 | Blog images, portfolio screenshots |

### Phase 4: Client Portal
| Feature | Priority | Description |
|---------|----------|-------------|
| Firebase Auth | P0 | Magic link login for clients |
| Client dashboard | P0 | Protected route, project list |
| Project detail view | P0 | Status, timeline, deliverables |
| File sharing | P1 | Upload/download via GCS signed URLs |
| Project messaging | P2 | Threaded messages per project |
| Invoice view | P2 | Simple invoice records |

### Phase 5: Intelligence Layer
| Feature | Priority | Description |
|---------|----------|-------------|
| AI chat widget | P1 | Vertex AI Gemini, answers service questions |
| Codeilus demo | P2 | "Paste a repo URL" → interactive analysis |
| Live stats | P2 | Harvestor/Forge activity indicators |
| Notion CMS | P2 | Blog from Notion via MCP |

## 6. Out of Scope

- Native mobile app (responsive web is sufficient)
- Multi-language (English first, Portuguese later)
- Payment processing / Stripe (manual invoicing for now)
- Multi-user admin (single operator)
- Kubernetes / complex orchestration
- Custom email domain (use existing)

## 7. User Flows

### 7.1 Visitor → Lead
```
Landing page → Read services → View portfolio → Scroll to contact
→ Fill form (name, email, company, role, budget, description)
→ Submit → Thank you message
→ [Backend] Lead stored → Notification sent → Follow-up scheduled
```

### 7.2 Lead → Client
```
Discovery call booked → Proposal sent → Contract signed
→ Admin creates client account → Client receives magic link
→ Client logs into portal → Sees project with status "Discovery"
```

### 7.3 Client → Project Tracking
```
Client logs in → Dashboard shows project list
→ Click project → See status, timeline, deliverables
→ Download files → Leave feedback via messages
→ Project moves through: Discovery → Architecture → Build → Deploy
```

### 7.4 Builder → Content Management
```
Write blog post (Notion or admin API) → Content appears on site
Update portfolio → New project card visible
Check leads dashboard → Prioritize by recency/budget
Update project status → Client sees change in portal
```

## 8. Design Principles

1. **Show, don't tell** — Live demos over descriptions, real metrics over claims
2. **Content as data** — All content in JSON/database, never hardcoded in components
3. **Progressive enhancement** — Static site works without backend; backend adds dynamic features
4. **GCP-native** — No new vendors; use what's already in the project
5. **Solo-operator friendly** — Everything manageable by one person via CLI or simple dashboard
6. **Fast by default** — Static assets cached 1 year, Cloud Run scales to zero, Vite builds in seconds

## 9. Dependencies

| Dependency | Owner | Risk |
|-----------|-------|------|
| GCP project access | BM | Low — already active |
| Cloud Build GitHub connection | BM | Low — one-time setup |
| Perplexity content (JSON) | Done | None — already saved |
| Domain / DNS | BM | Medium — needs Cloudflare or Cloud DNS setup |
| Firebase Auth setup | BM | Low — same GCP project |
| Cinefilm Terraform template | Available | None — already in filesystem |

## 10. Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Scope creep into Phase 5 before Phase 1-3 are solid | High | High | Strict phase gates — no Phase N+1 until N is deployed |
| Over-engineering the backend | Medium | Medium | Start with static JSON, replace with DB reads only when needed |
| No leads despite good content | Medium | High | SEO, LinkedIn posts, cold outreach — content alone won't drive traffic |
| Cloud SQL cost if traffic spikes | Low | Low | db-f1-micro is cheap; upgrade only if needed |
| Single point of failure (one person) | High | High | Document everything (this doc suite); systems should run without intervention |
