# Project Roadmap

**Product**: Encadeiateia Virtual Agency Platform
**Last updated**: 2026-03-14

---

## Timeline Overview

```
Phase 1 ████░░░░░░░░░░░░░░░░░░░░  CI/CD + Staging
Phase 2 ░░░░████████░░░░░░░░░░░░░  Homepage Rewrite
Phase 3 ░░░░░░░░░░░░████████░░░░░  Backend + Leads
Phase 4 ░░░░░░░░░░░░░░░░░░░░████░  Client Portal
Phase 5 ░░░░░░░░░░░░░░░░░░░░░░███  Intelligence Layer
        ─────────────────────────→
```

---

## Phase 1: CI/CD + Staging

**Goal**: Push-to-deploy automation. Never manually deploy again.
**Estimated effort**: 1 session
**Dependencies**: GCP project access, GitHub repo access
**Deliverables**:

| # | Task | Status |
|---|------|--------|
| 1.1 | Update `cloudbuild.yaml` with resource limits + `:latest` tag | Not started |
| 1.2 | Create `cloudbuild-staging.yaml` for staging deploys | Not started |
| 1.3 | Connect Cloud Build to GitHub repository | Not started |
| 1.4 | Create production trigger (push to `main`) | Not started |
| 1.5 | Create staging trigger (push to `staging`) | Not started |
| 1.6 | Create `staging` branch | Not started |
| 1.7 | Test: push to staging → verify staging Cloud Run service | Not started |
| 1.8 | Test: push to main → verify production Cloud Run service | Not started |

**Exit Criteria**:
- [ ] Push to `staging` → `encadeiateia-staging` service updated within 3 minutes
- [ ] Push to `main` → `encadeiateia` service updated within 3 minutes
- [ ] Both services accessible via Cloud Run URLs
- [ ] Failed builds produce clear error in Cloud Build console

---

## Phase 2: Homepage Rewrite

**Goal**: Replace template content with real agency positioning.
**Estimated effort**: 1 session
**Dependencies**: Phase 1 complete (deploy pipeline)
**Deliverables**:

| # | Task | Status |
|---|------|--------|
| 2.1 | Create `Hero.tsx` component from `site-content.json` hero data | Not started |
| 2.2 | Create `ServiceCard.tsx` component | Not started |
| 2.3 | Create `ProjectCard.tsx` component | Not started |
| 2.4 | Create `ProcessStep.tsx` component | Not started |
| 2.5 | Create `ContactForm.tsx` with 6 fields + validation | Not started |
| 2.6 | Rewrite `Home.tsx` — assemble all sections | Not started |
| 2.7 | Create `Services.tsx` page (expanded service detail) | Not started |
| 2.8 | Create `Projects.tsx` page (portfolio grid) | Not started |
| 2.9 | Create `Process.tsx` page (timeline + FAQ) | Not started |
| 2.10 | Create `Contact.tsx` dedicated page | Not started |
| 2.11 | Rewrite `About.tsx` with real story | Not started |
| 2.12 | Rewrite `Footer.tsx` (3 columns from JSON) | Not started |
| 2.13 | Update `Layout.tsx` navigation (new pages) | Not started |
| 2.14 | Update `routes.ts` with new routes | Not started |
| 2.15 | Add SEO meta tags per page | Not started |
| 2.16 | Mobile responsive testing | Not started |
| 2.17 | Deploy to staging → review → merge to main | Not started |

**Exit Criteria**:
- [ ] All 6 navigation items work (Home, Services, Projects, Process, About, Contact)
- [ ] Hero section shows real headline, subhead, 2 CTAs
- [ ] 5 service blocks render with icons, deliverables, outcomes
- [ ] 5 portfolio cards render with problem/solution/result
- [ ] 4 process steps render with timeline visualization
- [ ] Contact form validates and shows success state on submit
- [ ] Footer shows 3 columns with correct links
- [ ] All pages responsive on mobile (375px+)
- [ ] Lighthouse performance score > 90

---

## Phase 3: Backend + Leads

**Goal**: Dynamic content and lead capture pipeline.
**Estimated effort**: 1-2 sessions
**Dependencies**: Phase 2 complete
**Deliverables**:

| # | Task | Status |
|---|------|--------|
| 3.1 | Create `infra/` Terraform config (from Cinefilm template) | Not started |
| 3.2 | Run `terraform apply` — provision Cloud SQL, GCS, Secret Manager | Not started |
| 3.3 | Create database migration: `001_init.sql` | Not started |
| 3.4 | Decide API approach: Cloud Run sidecar, separate service, or Cloud Functions | Not started |
| 3.5 | Implement API: `POST /api/leads` | Not started |
| 3.6 | Implement API: `GET /api/posts`, `GET /api/posts/:slug` | Not started |
| 3.7 | Implement API: `GET /api/projects`, `GET /api/projects/:slug` | Not started |
| 3.8 | Implement admin API: CRUD for posts and projects | Not started |
| 3.9 | Connect contact form to `POST /api/leads` | Not started |
| 3.10 | Set up lead notification (email via Cloud Function or n8n) | Not started |
| 3.11 | Seed database with portfolio data from `site-content.json` | Not started |
| 3.12 | Seed database with initial blog posts | Not started |
| 3.13 | Replace JSON imports with API fetches in frontend | Not started |
| 3.14 | Update Dockerfile or create separate API Dockerfile | Not started |
| 3.15 | Update Cloud Build to deploy API service | Not started |
| 3.16 | Test full flow: form submit → DB → notification | Not started |

**Exit Criteria**:
- [ ] `terraform apply` succeeds, all resources provisioned
- [ ] Contact form submissions persist in `leads` table
- [ ] Builder receives email/notification within 5 minutes of new lead
- [ ] Blog posts render from database
- [ ] Portfolio projects render from database
- [ ] Admin can CRUD posts and projects via API
- [ ] All secrets in Secret Manager (no .env in production)

---

## Phase 4: Client Portal

**Goal**: Authenticated space for clients to track projects.
**Estimated effort**: 2-3 sessions
**Dependencies**: Phase 3 complete
**Deliverables**:

| # | Task | Status |
|---|------|--------|
| 4.1 | Enable Firebase Auth in GCP project | Not started |
| 4.2 | Configure magic link (passwordless) sign-in | Not started |
| 4.3 | Add `firebase` and `@firebase/auth` to frontend | Not started |
| 4.4 | Create `Login.tsx` page | Not started |
| 4.5 | Create `ProtectedRoute.tsx` component | Not started |
| 4.6 | Create `Dashboard.tsx` — project list view | Not started |
| 4.7 | Create `ProjectDetail.tsx` — status, deliverables, files | Not started |
| 4.8 | Implement `GET /api/me`, `GET /api/me/projects` endpoints | Not started |
| 4.9 | Implement Firebase JWT verification in API | Not started |
| 4.10 | Implement GCS signed URL generation for file downloads | Not started |
| 4.11 | Implement file upload endpoint | Not started |
| 4.12 | Create admin endpoint to provision client accounts | Not started |
| 4.13 | Add `clients` and `client_projects` tables migration | Not started |
| 4.14 | Update navigation: show "Dashboard" when logged in | Not started |
| 4.15 | Test full flow: magic link → login → dashboard → file download | Not started |

**Exit Criteria**:
- [ ] Client receives magic link email, clicks, lands on dashboard
- [ ] Dashboard shows only that client's projects
- [ ] Project detail shows status, deliverables, files
- [ ] File download works via GCS signed URL
- [ ] Unauthorized users redirected to login
- [ ] Session persists across page reloads

---

## Phase 5: Intelligence Layer

**Goal**: Expose AI capabilities and live demos.
**Estimated effort**: Ongoing
**Dependencies**: Phase 3+ complete
**Deliverables**:

| # | Task | Status |
|---|------|--------|
| 5.1 | Create `ChatWidget.tsx` — floating chat button + window | Not started |
| 5.2 | Implement Vertex AI Gemini integration (Cloud Function or API) | Not started |
| 5.3 | Create system prompt with service/portfolio context | Not started |
| 5.4 | Stream responses via SSE or WebSocket | Not started |
| 5.5 | Add Codeilus demo embed or link on Projects page | Not started |
| 5.6 | Add live stats from ecosystem tools | Not started |
| 5.7 | Implement Notion CMS bridge for blog | Not started |

**Exit Criteria**:
- [ ] Chat widget visible on all pages
- [ ] AI responds accurately about services and process
- [ ] Chat suggests booking a call when appropriate
- [ ] At least one live demo functional

---

## Milestones

| Milestone | Target | Gate |
|-----------|--------|------|
| M1: Deploy pipeline live | Phase 1 done | Push → live in <3 min |
| M2: New site launched | Phase 2 done | Real content, all pages, mobile-ready |
| M3: First lead captured | Phase 3 done | Form → DB → notification working |
| M4: First client onboarded | Phase 4 done | Client logs in, sees project |
| M5: AI assistant live | Phase 5 done | Chat widget answering questions |
