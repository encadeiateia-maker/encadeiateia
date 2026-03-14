# Technical Architecture Document

**Product**: Encadeiateia Virtual Agency Platform
**Last updated**: 2026-03-14
**Version**: 1.0

---

## 1. System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENTS                              │
│              Browser (Desktop / Mobile)                       │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    CLOUD RUN (europe-west1)                   │
│                                                              │
│  ┌─────────────────────┐    ┌─────────────────────────┐     │
│  │   encadeiateia      │    │  encadeiateia-staging    │     │
│  │   (production)      │    │  (preview)               │     │
│  │                     │    │                          │     │
│  │   nginx:alpine      │    │  nginx:alpine            │     │
│  │   serving dist/     │    │  serving dist/           │     │
│  │   SPA routing       │    │  SPA routing             │     │
│  │   port 8080         │    │  port 8080               │     │
│  └─────────┬───────────┘    └─────────┬────────────────┘    │
│            │                          │                      │
│  ┌─────────▼──────────────────────────▼────────────────┐    │
│  │              encadeiateia-api (Phase 3)              │    │
│  │              Cloud Run service                       │    │
│  │              Node.js / Express or Hono               │    │
│  │              port 8080                               │    │
│  └─────────┬──────────┬──────────┬─────────────────────┘    │
│            │          │          │                           │
└────────────┼──────────┼──────────┼───────────────────────────┘
             │          │          │
    ┌────────▼───┐ ┌────▼────┐ ┌──▼──────────┐
    │ Cloud SQL  │ │  GCS    │ │ Secret      │
    │ Postgres15 │ │ Media   │ │ Manager     │
    │            │ │ Bucket  │ │             │
    │ posts      │ │         │ │ db-password │
    │ projects   │ │ images  │ │ api-keys    │
    │ leads      │ │ files   │ │             │
    │ clients    │ │         │ │             │
    └────────────┘ └─────────┘ └─────────────┘
             │
    ┌────────▼──────────┐
    │  Firebase Auth    │
    │  (Phase 4)        │
    │  Magic link login │
    │  JWT verification │
    └───────────────────┘
             │
    ┌────────▼──────────┐
    │  Vertex AI        │
    │  (Phase 5)        │
    │  Gemini chat      │
    └───────────────────┘
```

## 2. Component Architecture

### 2.1 Frontend (React SPA)

```
src/
├── main.tsx                    Entry point
├── content/
│   └── site-content.json       Structured content data
├── styles/
│   ├── index.css               Global styles
│   ├── tailwind.css            Tailwind imports
│   ├── theme.css               CSS custom properties
│   └── fonts.css               Font declarations
└── app/
    ├── App.tsx                  RouterProvider wrapper
    ├── routes.ts                Route definitions
    ├── lib/
    │   ├── api.ts              API client (Phase 3)
    │   ├── auth.ts             Firebase Auth wrapper (Phase 4)
    │   └── utils.ts            Shared utilities
    ├── components/
    │   ├── Layout.tsx           Shell: nav + footer + outlet
    │   ├── Hero.tsx             Homepage hero section
    │   ├── ServiceCard.tsx      Service block component
    │   ├── ProjectCard.tsx      Portfolio card component
    │   ├── ProcessStep.tsx      Process timeline step
    │   ├── ContactForm.tsx      Lead capture form
    │   ├── Footer.tsx           Site footer
    │   ├── ChatWidget.tsx       AI chat (Phase 5)
    │   ├── ProtectedRoute.tsx   Auth guard (Phase 4)
    │   └── ui/                  shadcn/radix primitives
    └── pages/
        ├── Home.tsx             Landing page (all sections)
        ├── Services.tsx         Expanded service detail
        ├── Projects.tsx         Portfolio grid + filters
        ├── Process.tsx          Process detail + FAQ
        ├── About.tsx            Founder story + stack
        ├── Contact.tsx          Dedicated contact page
        ├── Blog.tsx             Blog listing
        ├── BlogPost.tsx         Individual post
        ├── Dashboard.tsx        Client portal (Phase 4)
        ├── ProjectDetail.tsx    Client project view (Phase 4)
        ├── Login.tsx            Auth page (Phase 4)
        └── NotFound.tsx         404
```

### 2.2 Data Flow

**Phase 2 (Static)**:
```
site-content.json → import → React component → render
```

**Phase 3 (Dynamic)**:
```
Browser → fetch(/api/posts) → Cloud Run API → Cloud SQL → JSON response → React component
```

**Phase 4 (Authenticated)**:
```
Browser → Firebase Auth → JWT → fetch(/api/projects, {Authorization: Bearer <jwt>})
→ Cloud Run API → verify JWT → Cloud SQL → JSON response → Dashboard component
```

### 2.3 API Design (Phase 3)

**Base URL**: `https://api.encadeiateia.com` or `https://encadeiateia-api-*.run.app`

#### Public Endpoints

```
GET    /api/posts                 List published blog posts
GET    /api/posts/:slug           Get single post by slug
GET    /api/projects              List featured projects
GET    /api/projects/:slug        Get single project
POST   /api/leads                 Submit contact form
GET    /api/health                Health check
```

#### Authenticated Endpoints (Phase 4)

```
GET    /api/me                    Current client profile
GET    /api/me/projects           Client's projects
GET    /api/me/projects/:id       Project detail with deliverables
POST   /api/me/projects/:id/messages   Send message
GET    /api/me/projects/:id/files      List files
GET    /api/me/projects/:id/files/:id  Get signed download URL
POST   /api/me/projects/:id/files      Upload file
```

#### Admin Endpoints (Phase 3, API key auth)

```
POST   /api/admin/posts           Create post
PUT    /api/admin/posts/:id       Update post
DELETE /api/admin/posts/:id       Delete post
POST   /api/admin/projects        Create project
PUT    /api/admin/projects/:id    Update project
GET    /api/admin/leads           List leads
PUT    /api/admin/leads/:id       Update lead status
POST   /api/admin/clients         Create client account
```

### 2.4 Database Schema

See `INFRASTRUCTURE.md` for full SQL. Summary:

| Table | Phase | Purpose |
|-------|-------|---------|
| `posts` | 3 | Blog content |
| `projects` | 3 | Portfolio / showcase |
| `leads` | 3 | Contact form submissions |
| `clients` | 4 | Client portal accounts |
| `client_projects` | 4 | Project tracking |
| `project_files` | 4 | File metadata (GCS references) |
| `project_messages` | 4 | Client-builder communication |

### 2.5 Authentication Flow (Phase 4)

```
1. Client visits /login
2. Enters email → Firebase sends magic link
3. Client clicks link → Firebase verifies → returns JWT
4. Frontend stores JWT in memory (not localStorage)
5. All /api/me/* requests include Authorization: Bearer <jwt>
6. API verifies JWT via Firebase Admin SDK
7. Extracts firebase_uid → looks up client in clients table
8. Returns client-scoped data only
```

## 3. Infrastructure

### 3.1 Environments

| Environment | Trigger | Cloud Run Service | Database | URL |
|-------------|---------|-------------------|----------|-----|
| Development | `pnpm dev` | None (local Vite) | None (JSON) | localhost:5173 |
| Staging | Push to `staging` | `encadeiateia-staging` | Cloud SQL (shared) | staging-*.run.app |
| Production | Push to `main` | `encadeiateia` | Cloud SQL (shared) | encadeiateia-*.run.app |

### 3.2 CI/CD Pipeline

```
Developer pushes code
       │
       ▼
Cloud Build Trigger fires
       │
       ▼
Step 1: docker build (multi-stage: node:20-alpine → nginx:alpine)
       │
       ▼
Step 2: docker push → Artifact Registry
       │
       ▼
Step 3: gcloud run deploy → Cloud Run (staging or prod)
       │
       ▼
Service live (new revision, traffic shifted)
```

### 3.3 Docker Build

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```

**Build output**: ~15-25MB Docker image (nginx:alpine + static assets)
**Build time**: ~60-90 seconds

### 3.4 Nginx Configuration

```nginx
server {
    listen 8080;
    root /usr/share/nginx/html;
    index index.html;

    # SPA routing — all paths serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Static asset caching — 1 year for hashed files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 4. Security

### 4.1 Transport
- All Cloud Run services enforce HTTPS (automatic TLS)
- HSTS header added by Cloud Run

### 4.2 Authentication
- Firebase Auth handles all client identity
- JWT tokens verified server-side via Firebase Admin SDK
- No session cookies — stateless JWT only
- Magic link tokens expire after 1 hour

### 4.3 Authorization
- Public endpoints: no auth required
- Client endpoints: JWT required, scoped to client's own data
- Admin endpoints: API key required (stored in Secret Manager)

### 4.4 Data Protection
- Cloud SQL encrypted at rest (Google-managed keys)
- GCS encrypted at rest
- Secret Manager for all credentials
- No secrets in environment variables or code
- GDPR: all data in europe-west1

### 4.5 Input Validation
- Contact form: server-side validation (email format, max length)
- API: request body validation (reject unexpected fields)
- SQL: parameterized queries only (no string interpolation)
- File uploads: type validation, size limits (50MB)

## 5. Performance

### 5.1 Frontend
- Vite build with tree-shaking and code splitting
- Static assets served from nginx with 1-year cache
- SPA with client-side routing (no full page reloads)
- Images: lazy loading, WebP where possible

### 5.2 Backend
- Cloud Run auto-scales (0 to N instances)
- Cloud SQL connection pooling
- API responses cached where appropriate (blog posts, projects)
- GCS signed URLs offload file downloads from the API

### 5.3 Targets
| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.0s |
| API response (p95) | < 200ms |
| Deploy time | < 3 minutes |

## 6. Monitoring

### 6.1 Built-in (GCP)
- Cloud Run metrics: request count, latency, error rate, instance count
- Cloud SQL metrics: connections, CPU, memory, storage
- Cloud Build: build success/failure, duration
- Error Reporting: automatic error capture from Cloud Run logs

### 6.2 Application (Phase 3+)
- Structured JSON logs from API
- Request ID tracking
- Lead submission events logged
- Auth events logged (login, logout, failed attempts)

### 6.3 Alerting
- Cloud Run error rate > 5% → email alert
- Cloud SQL storage > 80% → email alert
- Cloud Build failure → email alert
