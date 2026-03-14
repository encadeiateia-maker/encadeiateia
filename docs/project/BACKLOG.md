# Product Backlog

**Product**: Encadeiateia Virtual Agency Platform
**Last updated**: 2026-03-14

---

## Priority Legend

- **P0**: Must have — blocks launch or revenue
- **P1**: Should have — significant value
- **P2**: Nice to have — enhances experience
- **P3**: Future — worth tracking, not now

## Status Legend

- `backlog` — Not started
- `ready` — Refined, ready to build
- `in_progress` — Active work
- `review` — In staging, needs verification
- `done` — Deployed to production

---

## Epic 1: CI/CD & Environments

| ID | Story | Priority | Status | Estimate |
|----|-------|----------|--------|----------|
| E1-01 | Update cloudbuild.yaml (resource limits, latest tag) | P0 | ready | S |
| E1-02 | Create cloudbuild-staging.yaml | P0 | ready | S |
| E1-03 | Connect Cloud Build to GitHub | P0 | ready | S |
| E1-04 | Create prod trigger (main branch) | P0 | ready | S |
| E1-05 | Create staging trigger (staging branch) | P0 | ready | S |
| E1-06 | Create staging branch, test deploy | P0 | ready | S |
| E1-07 | Verify both environments end-to-end | P0 | ready | S |

**Total estimate**: 1 session

---

## Epic 2: Homepage Rewrite

| ID | Story | Priority | Status | Estimate |
|----|-------|----------|--------|----------|
| E2-01 | Create Hero component | P0 | backlog | S |
| E2-02 | Create ServiceCard component | P0 | backlog | S |
| E2-03 | Create ProjectCard component | P0 | backlog | S |
| E2-04 | Create ProcessStep component | P0 | backlog | M |
| E2-05 | Create ContactForm component (6 fields, validation) | P0 | backlog | M |
| E2-06 | Rewrite Home.tsx (assemble all sections) | P0 | backlog | M |
| E2-07 | Create Services page | P0 | backlog | M |
| E2-08 | Create Projects page | P0 | backlog | M |
| E2-09 | Create Process page | P1 | backlog | M |
| E2-10 | Create Contact page | P0 | backlog | S |
| E2-11 | Rewrite About page | P1 | backlog | M |
| E2-12 | Rewrite Footer | P0 | backlog | S |
| E2-13 | Update Layout navigation | P0 | backlog | S |
| E2-14 | Update routes.ts | P0 | backlog | S |
| E2-15 | Add SEO meta tags | P1 | backlog | S |
| E2-16 | Mobile responsive pass | P0 | backlog | M |

**Total estimate**: 1 session

---

## Epic 3: Backend & Lead Pipeline

| ID | Story | Priority | Status | Estimate |
|----|-------|----------|--------|----------|
| E3-01 | Create Terraform config (Cloud SQL, GCS, Secret Manager) | P0 | backlog | M |
| E3-02 | Provision infrastructure (terraform apply) | P0 | backlog | S |
| E3-03 | Create database migration 001_init.sql | P0 | backlog | S |
| E3-04 | Choose and scaffold API framework | P0 | backlog | M |
| E3-05 | Implement POST /api/leads | P0 | backlog | S |
| E3-06 | Implement GET /api/posts (list + detail) | P1 | backlog | M |
| E3-07 | Implement GET /api/projects (list + detail) | P1 | backlog | M |
| E3-08 | Implement admin CRUD endpoints | P1 | backlog | M |
| E3-09 | Connect frontend contact form to API | P0 | backlog | S |
| E3-10 | Set up lead notification (email) | P0 | backlog | M |
| E3-11 | Seed database (portfolio + blog) | P1 | backlog | S |
| E3-12 | Replace frontend JSON with API calls | P1 | backlog | M |
| E3-13 | Update Cloud Build for API deployment | P0 | backlog | M |
| E3-14 | End-to-end test: form → DB → notification | P0 | backlog | S |

**Total estimate**: 1-2 sessions

---

## Epic 4: Client Portal

| ID | Story | Priority | Status | Estimate |
|----|-------|----------|--------|----------|
| E4-01 | Enable Firebase Auth | P0 | backlog | S |
| E4-02 | Configure magic link sign-in | P0 | backlog | S |
| E4-03 | Add Firebase SDK to frontend | P0 | backlog | S |
| E4-04 | Create Login page | P0 | backlog | M |
| E4-05 | Create ProtectedRoute component | P0 | backlog | S |
| E4-06 | Create Dashboard page | P0 | backlog | L |
| E4-07 | Create ProjectDetail page | P0 | backlog | L |
| E4-08 | Implement /api/me endpoints | P0 | backlog | M |
| E4-09 | Firebase JWT verification in API | P0 | backlog | M |
| E4-10 | GCS signed URL file downloads | P1 | backlog | M |
| E4-11 | File upload endpoint | P1 | backlog | M |
| E4-12 | Client provisioning admin endpoint | P1 | backlog | M |
| E4-13 | Database migration: clients, client_projects | P0 | backlog | S |
| E4-14 | Navigation: conditional Dashboard link | P1 | backlog | S |

**Total estimate**: 2-3 sessions

---

## Epic 5: Intelligence Layer

| ID | Story | Priority | Status | Estimate |
|----|-------|----------|--------|----------|
| E5-01 | ChatWidget component (UI) | P1 | backlog | M |
| E5-02 | Vertex AI Gemini integration | P1 | backlog | L |
| E5-03 | Chat system prompt with context | P1 | backlog | M |
| E5-04 | Response streaming (SSE) | P2 | backlog | M |
| E5-05 | Codeilus demo integration | P2 | backlog | L |
| E5-06 | Live ecosystem stats | P2 | backlog | L |
| E5-07 | Notion CMS bridge | P2 | backlog | M |

**Total estimate**: Ongoing

---

## Size Legend

| Size | Meaning | Approximate effort |
|------|---------|--------------------|
| S | Small | < 30 minutes |
| M | Medium | 30 min – 2 hours |
| L | Large | 2+ hours |
