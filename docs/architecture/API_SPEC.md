# API Specification

**Product**: Encadeiateia Virtual Agency Platform
**Base URL**: `https://encadeiateia-api-{hash}.run.app` (Phase 3)
**Auth**: Firebase JWT (Phase 4), API Key (admin)
**Format**: JSON
**Last updated**: 2026-03-14

---

## Authentication

### Public Endpoints
No authentication required.

### Client Endpoints (`/api/me/*`)
```
Authorization: Bearer <firebase-jwt>
```
JWT issued by Firebase Auth. Verified server-side via Firebase Admin SDK.

### Admin Endpoints (`/api/admin/*`)
```
X-API-Key: <secret-manager-key>
```
API key stored in GCP Secret Manager. Used by builder for content management.

---

## Public Endpoints

### `GET /api/health`

Health check.

**Response** `200`:
```json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2026-03-14T12:00:00Z"
}
```

---

### `GET /api/posts`

List published blog posts.

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | int | 1 | Page number |
| `limit` | int | 10 | Items per page (max 50) |
| `category` | string | — | Filter by category |

**Response** `200`:
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Building Multi-Agent Systems",
      "slug": "building-multi-agent-systems",
      "excerpt": "How to orchestrate AI agents...",
      "category": "AI",
      "cover_image": "https://storage.googleapis.com/...",
      "published_at": "2026-03-10T08:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 24,
    "pages": 3
  }
}
```

---

### `GET /api/posts/:slug`

Get single blog post by slug.

**Response** `200`:
```json
{
  "id": "uuid",
  "title": "Building Multi-Agent Systems",
  "slug": "building-multi-agent-systems",
  "content": "# Full markdown content...",
  "category": "AI",
  "cover_image": "https://storage.googleapis.com/...",
  "published_at": "2026-03-10T08:00:00Z",
  "updated_at": "2026-03-12T14:30:00Z"
}
```

**Response** `404`:
```json
{ "error": "Post not found" }
```

---

### `GET /api/projects`

List portfolio projects.

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `category` | string | — | Filter by category |
| `featured` | boolean | — | Featured projects only |

**Response** `200`:
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Multi-tenant Web Platform",
      "slug": "multi-tenant-web-platform",
      "category": "SaaS Platform",
      "problem": "Agencies needed modern websites without...",
      "solution": "Built a multi-tenant platform...",
      "result": "New sites go live in hours...",
      "tech_stack": ["React", "Next.js", "Docker", "Traefik"],
      "cover_image": "https://storage.googleapis.com/...",
      "featured": true
    }
  ]
}
```

---

### `GET /api/projects/:slug`

Get single project by slug.

**Response** `200`: Full project object (same shape as list item, plus `live_url`).

---

### `POST /api/leads`

Submit contact form.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "company": "Acme Corp",
  "role": "CTO",
  "budget": "10k–20k EUR",
  "projectDescription": "We need to automate our onboarding workflow..."
}
```

**Validation:**
| Field | Required | Rules |
|-------|----------|-------|
| `name` | Yes | 1-200 chars |
| `email` | Yes | Valid email format |
| `company` | No | Max 200 chars |
| `role` | No | Max 100 chars |
| `budget` | No | Max 100 chars |
| `projectDescription` | No | Max 5000 chars |

**Response** `201`:
```json
{
  "message": "Thank you. I'll review your project details and reply within 24 hours.",
  "id": "uuid"
}
```

**Response** `400`:
```json
{
  "error": "Validation failed",
  "details": [
    { "field": "email", "message": "Invalid email format" }
  ]
}
```

**Response** `429`:
```json
{
  "error": "Too many submissions. Please try again later."
}
```

Rate limit: 3 submissions per IP per hour.

---

## Client Endpoints (Phase 4)

### `GET /api/me`

Get current client profile.

**Response** `200`:
```json
{
  "id": "uuid",
  "company_name": "Acme Corp",
  "contact_name": "Jane Doe",
  "email": "jane@company.com",
  "plan": "standard",
  "created_at": "2026-01-15T10:00:00Z"
}
```

---

### `GET /api/me/projects`

List client's projects.

**Response** `200`:
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Onboarding Automation",
      "status": "building",
      "description": "Automated employee onboarding workflow...",
      "started_at": "2026-02-01T00:00:00Z",
      "updated_at": "2026-03-10T16:00:00Z"
    }
  ]
}
```

---

### `GET /api/me/projects/:id`

Get project detail with deliverables and files.

**Response** `200`:
```json
{
  "id": "uuid",
  "title": "Onboarding Automation",
  "status": "building",
  "description": "...",
  "deliverables": [
    { "name": "Requirements document", "completed": true },
    { "name": "Architecture diagram", "completed": true },
    { "name": "MVP deployment", "completed": false }
  ],
  "files": [
    {
      "id": "uuid",
      "name": "architecture-v2.pdf",
      "size_bytes": 245000,
      "uploaded_at": "2026-03-05T12:00:00Z"
    }
  ],
  "started_at": "2026-02-01T00:00:00Z",
  "updated_at": "2026-03-10T16:00:00Z"
}
```

---

### `GET /api/me/projects/:id/files/:fileId`

Get signed download URL for a file.

**Response** `200`:
```json
{
  "download_url": "https://storage.googleapis.com/...?X-Goog-Signature=...",
  "expires_at": "2026-03-14T13:00:00Z"
}
```

Signed URL expires in 1 hour.

---

## Admin Endpoints (Phase 3)

### Posts CRUD
```
POST   /api/admin/posts           → 201 { id, slug }
PUT    /api/admin/posts/:id       → 200 { updated }
DELETE /api/admin/posts/:id       → 204
```

### Projects CRUD
```
POST   /api/admin/projects        → 201 { id, slug }
PUT    /api/admin/projects/:id    → 200 { updated }
DELETE /api/admin/projects/:id    → 204
```

### Leads Management
```
GET    /api/admin/leads                          → 200 { data, pagination }
GET    /api/admin/leads?status=new               → 200 (filtered)
PUT    /api/admin/leads/:id    { status: "contacted" } → 200
```

### Client Management (Phase 4)
```
POST   /api/admin/clients         → 201 { id }
POST   /api/admin/clients/:id/projects  → 201 { id }
PUT    /api/admin/clients/:id/projects/:id  → 200
```

---

## Error Format

All errors follow the same shape:

```json
{
  "error": "Human-readable error message",
  "details": []  // optional, for validation errors
}
```

**HTTP Status Codes:**
| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 204 | No Content (delete) |
| 400 | Validation error |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (valid token, wrong scope) |
| 404 | Not found |
| 429 | Rate limited |
| 500 | Server error |
