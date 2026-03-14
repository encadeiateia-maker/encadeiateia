# User Stories & Acceptance Criteria

**Product**: Encadeiateia Virtual Agency Platform
**Last updated**: 2026-03-14

---

## Epic 1: CI/CD & Environments

### US-1.1: Automated Production Deployment
**As** the builder,
**I want** code pushed to `main` to automatically deploy to production,
**So that** I never manually deploy again.

**Acceptance Criteria:**
- [ ] Push to `main` triggers Cloud Build
- [ ] Docker image built and pushed to Artifact Registry
- [ ] Cloud Run service `encadeiateia` updated with new image
- [ ] Site is live within 3 minutes of push
- [ ] Failed builds do not affect running production

### US-1.2: Staging Environment
**As** the builder,
**I want** a staging environment that mirrors production,
**So that** I can verify changes before they go live.

**Acceptance Criteria:**
- [ ] Push to `staging` branch triggers Cloud Build
- [ ] Deploys to separate Cloud Run service `encadeiateia-staging`
- [ ] Staging URL is accessible and shows latest staging code
- [ ] Staging scales to zero when not in use (no cost when idle)

### US-1.3: Branch Strategy
**As** the builder,
**I want** a clear branch workflow,
**So that** I always know what's deployed where.

**Acceptance Criteria:**
- [ ] `main` = production (always deployable)
- [ ] `staging` = preview (may be broken)
- [ ] Feature work happens on feature branches → merge to `staging` → verify → merge to `main`

---

## Epic 2: Homepage Rewrite

### US-2.1: Clear Value Proposition
**As** a visitor,
**I want** to immediately understand what encadeiateia does and for whom,
**So that** I can decide in 5 seconds if this is relevant to me.

**Acceptance Criteria:**
- [ ] Hero headline communicates the core offer ("Ship AI-native products without hiring a team")
- [ ] Subheadline adds specificity (one person, production-ready, automation)
- [ ] Primary CTA is above the fold ("Schedule a 30-minute call")
- [ ] Secondary CTA links to portfolio ("See real projects")
- [ ] Micro-copy establishes location and target market

### US-2.2: Service Understanding
**As** a visitor,
**I want** to see exactly what services are offered with concrete deliverables,
**So that** I can identify which service fits my needs.

**Acceptance Criteria:**
- [ ] 5 service blocks displayed with icon, title, description
- [ ] Each block shows 3 deliverables (what you get)
- [ ] Each block shows 3 outcomes (why it matters)
- [ ] Services are scannable — visitor can skim in 30 seconds
- [ ] Dedicated /services page with expanded detail

### US-2.3: Portfolio Proof
**As** a visitor,
**I want** to see real projects with problems solved and results achieved,
**So that** I trust this agency can deliver.

**Acceptance Criteria:**
- [ ] 5 portfolio cards on homepage
- [ ] Each card: title, category tag, problem (1 sentence), solution (1 sentence), result (1 sentence with metric/timeframe)
- [ ] Dedicated /projects page with all cards + category filter
- [ ] Each card links to expanded detail (optional, Phase 3)

### US-2.4: Process Transparency
**As** a visitor,
**I want** to understand how engagements work before I reach out,
**So that** I feel confident the process is structured and predictable.

**Acceptance Criteria:**
- [ ] 4-step process section: Discovery, Architecture, Build, Deploy
- [ ] Each step shows duration and 2 bullet descriptions
- [ ] Visual progression (numbered steps or timeline)
- [ ] Dedicated /process page with FAQ

### US-2.5: Contact Form
**As** a visitor,
**I want** to describe my project and submit my details,
**So that** I can start a conversation without searching for an email.

**Acceptance Criteria:**
- [ ] Form with 6 fields: name, email, company, role, budget range, project description
- [ ] Client-side validation (email format, required fields)
- [ ] Submit button with clear label ("Send project details")
- [ ] Success state after submission (thank you message)
- [ ] Form accessible from homepage and dedicated /contact page
- [ ] Phase 2: logs to console; Phase 3: saves to database

### US-2.6: Updated Navigation
**As** a visitor,
**I want** clear navigation to all sections,
**So that** I can find what I'm looking for quickly.

**Acceptance Criteria:**
- [ ] Nav items: Home, Services, Projects, Process, About, Contact
- [ ] Active page highlighted
- [ ] Mobile hamburger menu
- [ ] CTA button in header ("Schedule a call" or "Contact")
- [ ] Footer with 3 columns: Company links, Services links, Connect (LinkedIn, GitHub, Email)

### US-2.7: About Page
**As** a visitor,
**I want** to understand who is behind this agency,
**So that** I can decide if I want to work with this person.

**Acceptance Criteria:**
- [ ] Personal story (founder, background, why AI-native, why Lisbon)
- [ ] How engagements work (communication style, tools)
- [ ] Tech stack overview
- [ ] Links to LinkedIn and GitHub
- [ ] CTA to contact

### US-2.8: SEO Foundations
**As** the builder,
**I want** proper meta tags on every page,
**So that** search engines index the site correctly.

**Acceptance Criteria:**
- [ ] Unique `<title>` per page
- [ ] Unique `<meta name="description">` per page
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Canonical URLs
- [ ] Sitemap.xml (generated at build or static)

---

## Epic 3: Backend & Lead Pipeline

### US-3.1: Database Setup
**As** the builder,
**I want** a managed PostgreSQL database provisioned via Terraform,
**So that** I have a reliable, reproducible backend.

**Acceptance Criteria:**
- [ ] Cloud SQL PostgreSQL 15 instance created via `terraform apply`
- [ ] Database `encadeiateia` with app user
- [ ] Password stored in Secret Manager
- [ ] Service account with Cloud SQL Client role
- [ ] Connection works from Cloud Run via Cloud SQL Proxy

### US-3.2: Lead Capture
**As** the builder,
**I want** contact form submissions saved to the database,
**So that** no lead is ever lost.

**Acceptance Criteria:**
- [ ] POST endpoint accepts form data
- [ ] Lead saved to `leads` table with timestamp
- [ ] Response confirms success to frontend
- [ ] Duplicate email within 24h is flagged (not rejected)

### US-3.3: Lead Notification
**As** the builder,
**I want** to receive an email when a new lead is submitted,
**So that** I can respond quickly.

**Acceptance Criteria:**
- [ ] New lead triggers notification (email or Slack)
- [ ] Notification includes: name, email, company, budget, description
- [ ] Delivery within 5 minutes of submission
- [ ] Implementation: Cloud Function, n8n webhook, or simple SMTP

### US-3.4: Dynamic Blog
**As** the builder,
**I want** to publish blog posts from a database,
**So that** I don't need to redeploy to add content.

**Acceptance Criteria:**
- [ ] `posts` table with title, slug, content, category, published flag
- [ ] Blog listing page fetches published posts, ordered by date
- [ ] Individual post page fetched by slug
- [ ] Unpublished posts are not visible to visitors
- [ ] Content supports markdown rendering

### US-3.5: Dynamic Portfolio
**As** the builder,
**I want** portfolio projects stored in a database,
**So that** I can add/edit projects without code changes.

**Acceptance Criteria:**
- [ ] `projects` table with fields matching portfolio card structure
- [ ] Projects page fetches from database
- [ ] Featured flag controls homepage display
- [ ] Sort order controls display sequence

---

## Epic 4: Client Portal

### US-4.1: Client Authentication
**As** a client,
**I want** to log in securely with a magic link,
**So that** I don't need to remember a password.

**Acceptance Criteria:**
- [ ] Firebase Auth configured with email link (passwordless)
- [ ] Login page at /login
- [ ] Magic link sent to client's email
- [ ] Clicking link logs client in and redirects to /dashboard
- [ ] Session persists across browser tabs
- [ ] Logout button in dashboard header

### US-4.2: Project Dashboard
**As** a client,
**I want** to see all my projects and their status,
**So that** I always know where things stand.

**Acceptance Criteria:**
- [ ] /dashboard route (protected, requires auth)
- [ ] Lists all projects for the logged-in client
- [ ] Each project shows: title, status badge, last updated date
- [ ] Statuses: Discovery, Architecture, Building, Testing, Deployed, Ongoing
- [ ] Click project → detail view

### US-4.3: Project Detail
**As** a client,
**I want** to see detailed project information,
**So that** I can track progress and access deliverables.

**Acceptance Criteria:**
- [ ] Project title, description, status, timeline
- [ ] Deliverables list with completion status
- [ ] Files section (downloadable via GCS signed URLs)
- [ ] Activity log (status changes, notes)

### US-4.4: File Sharing
**As** a client,
**I want** to download deliverables and upload assets,
**So that** we can exchange files without email attachments.

**Acceptance Criteria:**
- [ ] Download button generates GCS signed URL (expires in 1 hour)
- [ ] Upload area for client-provided assets
- [ ] File size limit: 50MB per file
- [ ] Supported formats: PDF, PNG, JPG, ZIP, SVG, DOCX

---

## Epic 5: Intelligence Layer

### US-5.1: AI Chat Widget
**As** a visitor,
**I want** to ask questions about services in a chat widget,
**So that** I can get answers without waiting for a human.

**Acceptance Criteria:**
- [ ] Chat bubble in bottom-right corner
- [ ] Opens chat window with welcome message
- [ ] Sends question to Vertex AI Gemini
- [ ] Streams response back to user
- [ ] Context: knows about services, process, and portfolio
- [ ] Fallback: "Would you like to schedule a call?" if unsure

### US-5.2: Codeilus Live Demo
**As** a visitor,
**I want** to try the codebase analysis tool on a real repo,
**So that** I can evaluate the service before committing.

**Acceptance Criteria:**
- [ ] Input field: "Paste a GitHub repository URL"
- [ ] Triggers Codeilus analysis (or shows pre-analyzed demo)
- [ ] Shows: architecture diagram, key files, learning path preview
- [ ] CTA: "Want this for your codebase? Let's talk."
