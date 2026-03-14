# Encadeiateia — Infrastructure & Path Forward

> GCP-native architecture + Perplexity content strategy + ecosystem integration.
> Date: 2026-03-14

---

## Current GCP Footprint

### What's Already Running

| Service | Resource | Region | Status |
|---------|----------|--------|--------|
| Cloud Run | `encadeiateia` | europe-west1 | Production (single service) |
| Artifact Registry | `cloud-run-source-deploy/encadeiateia` | europe-west1 | Active |
| Cloud Build | `cloudbuild.yaml` | — | Configured, deploys on trigger |

### What Exists Across the Ecosystem

From the Cinefilm project (`/Users/bm/cod/in-progress/local-agentic-medium/infra/`), there's a full Terraform template already proven:

| GCP Service | Cinefilm Usage | Encadeiateia Applicability |
|-------------|---------------|---------------------------|
| Cloud Run | Serverless compute | Already using — add staging service |
| Cloud SQL | PostgreSQL 15 (db-f1-micro) | Backend database (Layer 2) |
| Artifact Registry | Docker images | Already using |
| Secret Manager | DB passwords, API keys | Adopt for Supabase keys, API secrets |
| Cloud Storage (GCS) | Media bucket | Blog images, portfolio assets, client files |
| Vertex AI | Generative AI | AI chat assistant (Layer 3) |
| IAM Service Account | `*-run` with scoped roles | Adopt same pattern |

---

## GCP Decision: Stay Native vs Supabase

### Option A: GCP-Native Stack (Recommended)

Since you're already on GCP and Cinefilm has a working Terraform template, go GCP-native for encadeiateia. This avoids adding another vendor and keeps everything in one billing account.

```
Cloud Run (staging + prod)
    ↕
Cloud SQL (PostgreSQL 15)        ← database (posts, projects, leads, clients)
Cloud Storage (GCS)              ← media (images, files, client deliverables)
Secret Manager                   ← all secrets (DB password, API keys)
Cloud Build + GitHub Triggers    ← CI/CD (already have cloudbuild.yaml)
Vertex AI                        ← AI chat assistant (optional, Layer 3)
Identity Platform / Firebase Auth ← client portal auth (Layer 3)
```

**Why GCP-native over Supabase for encadeiateia:**
- Already paying for GCP — no new vendor
- Cinefilm Terraform is copy-paste ready
- Cloud SQL free tier (db-f1-micro) is sufficient for MVP
- Secret Manager is more secure than .env files
- Vertex AI is one API call away (same project)
- Cloud Build is already configured — just add GitHub trigger

**When to use Supabase instead:**
- Solo OS stays on self-hosted Supabase (it orchestrates local services)
- If encadeiateia needs Realtime subscriptions (WebSocket) later, consider Supabase
- For now, PostgREST-style auto-API isn't needed — Cloud Run serves the API

### Option B: Supabase Hosted (Alternative)

If you prefer faster development over GCP alignment:
- Supabase free tier: 500MB DB, 1GB storage, 50K auth users
- Faster to set up (no Terraform needed)
- Built-in auth, realtime, storage, edge functions
- Trade-off: another vendor, another bill, data outside your GCP project

### Verdict

**Go GCP-native for encadeiateia.** Use the Cinefilm Terraform as a template. Reserve Supabase for Solo OS where it's already the core.

---

## Adjusted Architecture

```
┌──────────────────────────────────────────────────────────┐
│                        GitHub                             │
│              encadeiateia-maker/encadeiateia              │
│                                                          │
│   push to main ──→ Cloud Build ──→ Cloud Run (prod)      │
│   push to staging ──→ Cloud Build ──→ Cloud Run (staging) │
│   PR ──→ Cloud Build ──→ staging + comment URL            │
└──────────────────────────────────────────────────────────┘
          │                    │
          ▼                    ▼
┌─────────────────┐  ┌─────────────────┐
│   Cloud Run     │  │   Cloud Run     │
│   PRODUCTION    │  │   STAGING       │
│   encadeiateia  │  │   encadeiateia- │
│                 │  │   staging       │
└────────┬────────┘  └────────┬────────┘
         │                    │
         └────────┬───────────┘
                  │
         ┌────────▼────────┐
         │   Cloud SQL     │
         │  PostgreSQL 15  │
         │  db-f1-micro    │
         │  (shared by     │
         │  staging+prod   │
         │  via schemas)   │
         └────────┬────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
┌───▼───┐  ┌─────▼─────┐  ┌───▼────────┐
│  GCS  │  │  Secret   │  │  Vertex AI │
│ Media │  │  Manager  │  │  (chat)    │
│ Bucket│  │  (keys)   │  │  optional  │
└───────┘  └───────────┘  └────────────┘
```

---

## CI/CD: Cloud Build with GitHub Triggers (Not GitHub Actions)

**Why Cloud Build over GitHub Actions:**
- You already have a working `cloudbuild.yaml`
- Cloud Build has native access to Artifact Registry, Cloud Run, Secret Manager — no service account key export needed
- GitHub Actions would require exporting a GCP SA key as a GitHub secret (security risk)
- Cloud Build GitHub triggers watch your repo directly — same push-to-deploy experience
- Free tier: 120 build-minutes/day

### Cloud Build Trigger Setup

Two triggers, both connected to `github.com/encadeiateia-maker/encadeiateia`:

**Trigger 1: Production**
- Name: `encadeiateia-prod`
- Event: Push to `main`
- Config: `cloudbuild.yaml`
- Substitutions: `_DEPLOY_ENV=production`

**Trigger 2: Staging**
- Name: `encadeiateia-staging`
- Event: Push to `staging` branch OR Pull Request to `main`
- Config: `cloudbuild-staging.yaml`
- Substitutions: `_DEPLOY_ENV=staging`

### Updated cloudbuild.yaml (Production)

```yaml
steps:
  # Build
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-t'
      - 'europe-west1-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy/encadeiateia:$COMMIT_SHA'
      - '-t'
      - 'europe-west1-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy/encadeiateia:latest'
      - '.'

  # Push
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', '--all-tags', 'europe-west1-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy/encadeiateia']

  # Deploy to production
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'encadeiateia'
      - '--image=europe-west1-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy/encadeiateia:$COMMIT_SHA'
      - '--region=europe-west1'
      - '--allow-unauthenticated'
      - '--port=8080'
      - '--memory=256Mi'
      - '--cpu=1'
      - '--min-instances=0'
      - '--max-instances=3'

images:
  - 'europe-west1-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy/encadeiateia:$COMMIT_SHA'
  - 'europe-west1-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy/encadeiateia:latest'
```

### New cloudbuild-staging.yaml

```yaml
steps:
  # Build
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-t'
      - 'europe-west1-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy/encadeiateia:staging-$COMMIT_SHA'
      - '.'

  # Push
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'europe-west1-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy/encadeiateia:staging-$COMMIT_SHA']

  # Deploy to staging
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'encadeiateia-staging'
      - '--image=europe-west1-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy/encadeiateia:staging-$COMMIT_SHA'
      - '--region=europe-west1'
      - '--allow-unauthenticated'
      - '--port=8080'
      - '--memory=256Mi'
      - '--cpu=1'
      - '--min-instances=0'
      - '--max-instances=1'
      - '--tag=pr-$SHORT_SHA'

images:
  - 'europe-west1-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy/encadeiateia:staging-$COMMIT_SHA'
```

---

## Terraform Template for Encadeiateia

Adapted from Cinefilm (`/Users/bm/cod/in-progress/local-agentic-medium/infra/main.tf`):

```hcl
# infra/main.tf

terraform {
  required_providers {
    google = { source = "hashicorp/google", version = "~> 5.0" }
    random = { source = "hashicorp/random", version = "~> 3.0" }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# --- APIs ---
resource "google_project_service" "apis" {
  for_each = toset([
    "run.googleapis.com",
    "sqladmin.googleapis.com",
    "artifactregistry.googleapis.com",
    "secretmanager.googleapis.com",
    "storage.googleapis.com",
    "cloudbuild.googleapis.com",
  ])
  service            = each.value
  disable_on_destroy = false
}

# --- Cloud SQL (PostgreSQL 15) ---
resource "google_sql_database_instance" "main" {
  name             = "encadeiateia-db"
  database_version = "POSTGRES_15"
  region           = var.region

  settings {
    tier              = "db-f1-micro"
    disk_size         = 10
    disk_type         = "PD_SSD"
    availability_type = "ZONAL"

    backup_configuration {
      enabled = true
    }
  }

  deletion_protection = true
}

resource "google_sql_database" "app" {
  name     = "encadeiateia"
  instance = google_sql_database_instance.main.name
}

resource "random_password" "db_password" {
  length  = 32
  special = false
}

resource "google_sql_user" "app" {
  name     = "encadeiateia_app"
  instance = google_sql_database_instance.main.name
  password = random_password.db_password.result
}

# --- Secret Manager ---
resource "google_secret_manager_secret" "db_password" {
  secret_id = "encadeiateia-db-password"
  replication { auto {} }
}

resource "google_secret_manager_secret_version" "db_password" {
  secret      = google_secret_manager_secret.db_password.id
  secret_data = random_password.db_password.result
}

# --- Cloud Storage (media) ---
resource "google_storage_bucket" "media" {
  name          = "${var.project_id}-encadeiateia-media"
  location      = var.region
  force_destroy = false

  uniform_bucket_level_access = true
}

# --- Service Account for Cloud Run ---
resource "google_service_account" "run" {
  account_id   = "encadeiateia-run"
  display_name = "Encadeiateia Cloud Run"
}

resource "google_project_iam_member" "run_roles" {
  for_each = toset([
    "roles/cloudsql.client",
    "roles/storage.objectAdmin",
    "roles/secretmanager.secretAccessor",
  ])
  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.run.email}"
}

# --- Variables ---
variable "project_id" { type = string }
variable "region" { type = string, default = "europe-west1" }
```

```hcl
# infra/terraform.tfvars
project_id = "your-gcp-project-id"
region     = "europe-west1"
```

```hcl
# infra/outputs.tf
output "db_connection_name" { value = google_sql_database_instance.main.connection_name }
output "db_ip"              { value = google_sql_database_instance.main.public_ip_address }
output "gcs_bucket"         { value = google_storage_bucket.media.name }
output "service_account"    { value = google_service_account.run.email }
```

---

## Database Schema (Cloud SQL)

Using the same schema-per-concern pattern from Solo OS:

```sql
-- Schema: public (app data)

-- Blog posts
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  cover_image TEXT,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Portfolio / showcase projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT,
  problem TEXT,
  solution TEXT,
  result TEXT,
  tech_stack TEXT[],
  cover_image TEXT,
  live_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Inbound leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  role TEXT,
  budget TEXT,
  project_description TEXT,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Client portal (Phase 4)
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT UNIQUE,
  company_name TEXT,
  contact_name TEXT,
  email TEXT NOT NULL,
  plan TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Client projects (Phase 4)
CREATE TABLE client_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  title TEXT NOT NULL,
  status TEXT DEFAULT 'discovery',
  description TEXT,
  deliverables JSONB DEFAULT '[]',
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_published ON posts(published, published_at DESC);
CREATE INDEX idx_projects_featured ON projects(featured, sort_order);
CREATE INDEX idx_leads_status ON leads(status, created_at DESC);
CREATE INDEX idx_clients_firebase_uid ON clients(firebase_uid);
```

---

## Auth Strategy: Firebase Auth (GCP-Native)

For the client portal (Phase 4), use **Firebase Auth** instead of Supabase Auth:
- Same GCP project, no extra vendor
- Free tier: unlimited email/password, 10K phone verifications/month
- Magic link (passwordless) supported
- Firebase Admin SDK verifies JWT in Cloud Run
- Identity Platform is the enterprise upgrade path if needed

```
Client browser
  → Firebase Auth (login / magic link)
  → JWT token
  → Cloud Run API (verify token via Firebase Admin SDK)
  → Cloud SQL (query client data)
```

---

## Content Integration: Perplexity JSON

The Perplexity session produced a complete content JSON with:
- **Hero**: headline, subhead, 2 CTAs, micro-copy
- **5 Services**: title, description, deliverables (3), outcomes (3), lucide icon
- **5 Portfolio cards**: category, problem, solution, result
- **4 Process steps**: title, duration, 2 bullets each
- **About snippet**: 4 sentences
- **Contact form**: 6 fields with labels and placeholders
- **Footer**: tagline, 3 columns with links

### How to use it

Store the JSON as a content data file and import it into React components:

```
src/
  content/
    site-content.json    ← Perplexity output (the full JSON)
  app/
    pages/
      Home.tsx           ← imports from site-content.json
```

This keeps content separate from components. When the backend is ready (Phase 3), replace the JSON import with a database fetch — components don't change.

### Content → Component Mapping

| JSON key | Component | Page |
|----------|-----------|------|
| `hero` | `<Hero />` | Home |
| `services` | `<ServiceCard />` × 5 | Home + Services page |
| `portfolio` | `<ProjectCard />` × 5 | Home + Projects page |
| `process` | `<ProcessStep />` × 4 | Home + Process page |
| `aboutSnippet` | `<AboutSnippet />` | Home |
| `contact` | `<ContactForm />` | Home + Contact page |
| `footer` | `<Footer />` | Layout (all pages) |

---

## Execution Plan (Updated with GCP)

### Phase 1: CI/CD + Staging (1 session)

1. Create `cloudbuild-staging.yaml`
2. Update `cloudbuild.yaml` with resource limits and `:latest` tag
3. Set up Cloud Build GitHub triggers (prod + staging)
4. Create `staging` branch
5. Verify: push to staging → deploys to `encadeiateia-staging` service
6. Verify: push to main → deploys to `encadeiateia` service

**GCP Console steps:**
- Cloud Build → Triggers → Connect Repository → Create 2 triggers
- Cloud Run → verify 2 services after first deploy

### Phase 2: Homepage Rewrite (1 session)

1. Save Perplexity JSON as `src/content/site-content.json`
2. Rewrite `Home.tsx` with new hero, services, portfolio, process sections
3. Update `Layout.tsx` navigation (Home, Services, Projects, Process, About, Contact)
4. Create new pages: `Services.tsx`, `Projects.tsx`, `Process.tsx`
5. Update `ContactForm` with new fields from Perplexity JSON
6. Update `Footer` with new structure
7. Update `routes.ts`
8. Push to staging → verify → merge to main

### Phase 3: Backend (1-2 sessions)

1. Create `infra/` directory with Terraform config (adapted from Cinefilm)
2. Run `terraform apply` → Cloud SQL + GCS + Secret Manager
3. Add database migration SQL (posts, projects, leads tables)
4. Add a lightweight API layer:
   - Option A: Cloud Run sidecar (Express/Fastify in same container)
   - Option B: Separate Cloud Run service (`encadeiateia-api`)
   - Option C: Cloud Functions for simple endpoints
5. Connect contact form → leads table
6. Seed portfolio and blog data from Perplexity JSON into database
7. Replace JSON imports with API fetches

### Phase 4: Client Portal (2-3 sessions)

1. Add Firebase Auth to the GCP project
2. Add login/register pages
3. Create protected `/dashboard` route
4. Build client dashboard: projects list, status, deliverables
5. File upload/download via GCS signed URLs
6. Simple invoicing view

### Phase 5: Intelligence Layer (ongoing)

1. AI chat via Vertex AI (Gemini) — already in the same GCP project
2. Codeilus live demo (embed or link)
3. Forge dashboard read-only view
4. Blog content from Notion via MCP
5. Lead scoring from Harvestor patterns

---

## Cost Estimate (GCP Monthly)

| Service | Tier | Estimated Cost |
|---------|------|---------------|
| Cloud Run (prod) | 0-1 instances, 256Mi | ~$0 (free tier: 2M requests/month) |
| Cloud Run (staging) | 0 min instances | ~$0 (scales to zero) |
| Cloud SQL | db-f1-micro, 10GB | ~$7-10/month |
| Cloud Storage | <1GB initially | ~$0.02/month |
| Secret Manager | <10 secrets | ~$0 (free tier: 10K access/month) |
| Cloud Build | <120 min/day | ~$0 (free tier) |
| Artifact Registry | <5GB images | ~$0.50/month |
| **Total** | | **~$8-11/month** |

Firebase Auth and Vertex AI add cost only when Phase 4-5 are active:
- Firebase Auth: free for email/password
- Vertex AI (Gemini): ~$0.0025/1K input tokens (pay per use)

---

## File Structure After All Phases

```
encadeiateia/
├── .git/
├── .gitignore
├── CLAUDE.md                      ← agent context
├── NORTH_STAR.md                  ← vision + ecosystem map
├── EXECUTIVE_SUMMARY.md           ← analysis + virtual agency thesis
├── INFRASTRUCTURE.md              ← this file
├── cloudbuild.yaml                ← production deploy
├── cloudbuild-staging.yaml        ← staging deploy
├── Dockerfile
├── nginx.conf
├── package.json
├── pnpm-lock.yaml
├── vite.config.ts
├── postcss.config.mjs
├── index.html
├── infra/                         ← Terraform (Phase 3)
│   ├── main.tf
│   ├── variables.tf
│   ├── terraform.tfvars
│   ├── outputs.tf
│   └── migrations/
│       └── 001_init.sql
├── src/
│   ├── main.tsx
│   ├── content/
│   │   └── site-content.json      ← Perplexity content data
│   ├── styles/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── routes.ts
│   │   ├── components/
│   │   │   ├── Layout.tsx
│   │   │   ├── Hero.tsx           ← new
│   │   │   ├── ServiceCard.tsx    ← new
│   │   │   ├── ProjectCard.tsx    ← new
│   │   │   ├── ProcessStep.tsx    ← new
│   │   │   ├── ContactForm.tsx    ← new
│   │   │   ├── Footer.tsx         ← rewritten
│   │   │   ├── ui/               ← existing shadcn components
│   │   │   └── figma/
│   │   ├── pages/
│   │   │   ├── Home.tsx           ← rewritten
│   │   │   ├── Services.tsx       ← new
│   │   │   ├── Projects.tsx       ← new (replaces Showcase)
│   │   │   ├── Process.tsx        ← new
│   │   │   ├── About.tsx          ← rewritten
│   │   │   ├── Blog.tsx
│   │   │   ├── BlogPost.tsx
│   │   │   ├── Contact.tsx        ← new
│   │   │   ├── Dashboard.tsx      ← Phase 4
│   │   │   └── NotFound.tsx
│   │   └── lib/
│   │       ├── db.ts              ← Phase 3 (API client)
│   │       └── auth.ts            ← Phase 4 (Firebase)
│   └── guidelines/
└── ATTRIBUTIONS.md
```

---

## Quick Reference: GCP Commands

```bash
# Connect Cloud Build to GitHub
gcloud builds triggers create github \
  --repo-owner=encadeiateia-maker \
  --repo-name=encadeiateia \
  --branch-pattern="^main$" \
  --build-config=cloudbuild.yaml \
  --name=encadeiateia-prod

gcloud builds triggers create github \
  --repo-owner=encadeiateia-maker \
  --repo-name=encadeiateia \
  --branch-pattern="^staging$" \
  --build-config=cloudbuild-staging.yaml \
  --name=encadeiateia-staging

# Check Cloud Run services
gcloud run services list --region=europe-west1

# View build logs
gcloud builds log --stream

# Terraform
cd infra && terraform init && terraform plan && terraform apply

# Cloud SQL connect (local)
gcloud sql connect encadeiateia-db --user=encadeiateia_app --database=encadeiateia
```

---

## Cross-References

| Document | What it covers |
|----------|---------------|
| `CLAUDE.md` | Quick agent context — stack, structure, conventions |
| `NORTH_STAR.md` | Vision, ecosystem map, 3-layer plan, tech decisions |
| `EXECUTIVE_SUMMARY.md` | All 8 repos analyzed, virtual agency model, execution roadmap |
| `INFRASTRUCTURE.md` | This file — GCP architecture, CI/CD, Terraform, schema, costs |
| Cinefilm Terraform | `/Users/bm/cod/in-progress/local-agentic-medium/infra/main.tf` — source template |
| Solo OS compose | `/Users/bm/cod/dir8/solo-os/docker-compose.yml` — Supabase + engines pattern |
| LPP schema | `/Users/bm/landig-page/infra/docker/init-db.sql` — multi-tenant SQL reference |
