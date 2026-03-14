# Environment Strategy

**Product**: Encadeiateia Virtual Agency Platform
**Last updated**: 2026-03-14

---

## Environments

### Local Development

| Property | Value |
|----------|-------|
| URL | `http://localhost:5173` |
| Backend | None (JSON file) / localhost API (Phase 3) |
| Database | None / local Docker Postgres (Phase 3) |
| Auth | None / Firebase emulator (Phase 4) |
| How to run | `pnpm dev` |
| Data | `site-content.json` / seed data |

### Staging

| Property | Value |
|----------|-------|
| URL | `encadeiateia-staging-*.run.app` |
| Cloud Run service | `encadeiateia-staging` |
| Trigger | Push to `staging` branch |
| Cloud Build config | `cloudbuild-staging.yaml` |
| Database | Cloud SQL (shared instance, same schema) |
| Min instances | 0 (scales to zero) |
| Max instances | 1 |
| Purpose | Preview and verify before production |
| Who can access | Anyone with the URL (no auth gate) |

### Production

| Property | Value |
|----------|-------|
| URL | `encadeiateia-*.run.app` → custom domain (future) |
| Cloud Run service | `encadeiateia` |
| Trigger | Push to `main` branch |
| Cloud Build config | `cloudbuild.yaml` |
| Database | Cloud SQL (shared instance, same schema) |
| Min instances | 0 (scales to zero, first request ~1s cold start) |
| Max instances | 3 |
| Purpose | Live site for visitors and clients |

---

## Branch Strategy

```
feature/xyz  →  staging  →  main
   (dev)       (preview)   (production)
```

1. Create feature branch from `main`
2. Develop and test locally (`pnpm dev`)
3. Push feature branch → merge to `staging`
4. Cloud Build deploys to staging Cloud Run
5. Verify on staging URL
6. Merge `staging` to `main`
7. Cloud Build deploys to production Cloud Run

### Rules

- `main` is always deployable
- Never push directly to `main` — always go through `staging`
- `staging` may be broken — that's acceptable
- Feature branches are short-lived (hours to days, not weeks)

---

## Environment Variables

### Phase 2 (No Backend)
No environment variables needed — all content from JSON.

### Phase 3+ (Backend)

| Variable | Staging | Production | Source |
|----------|---------|------------|--------|
| `DATABASE_URL` | Cloud SQL connection string | Cloud SQL connection string | Secret Manager |
| `DB_PASSWORD` | Auto-generated | Auto-generated | Secret Manager |
| `API_KEY` | Admin API key | Admin API key | Secret Manager |
| `GCS_BUCKET` | `{project}-encadeiateia-media` | Same | Terraform output |
| `CORS_ORIGIN` | Staging Cloud Run URL | Production Cloud Run URL | Cloud Run env |

### Phase 4+ (Auth)

| Variable | Value | Source |
|----------|-------|--------|
| `FIREBASE_PROJECT_ID` | GCP project ID | Cloud Run env |
| `FIREBASE_API_KEY` | Firebase web API key | Firebase Console |

---

## Docker Image Tags

| Tag Pattern | Environment | Example |
|------------|-------------|---------|
| `:$COMMIT_SHA` | Production | `:a1b2c3d` |
| `:latest` | Production (also) | `:latest` |
| `:staging-$COMMIT_SHA` | Staging | `:staging-e4f5g6h` |

---

## Resource Limits

| Resource | Staging | Production |
|----------|---------|------------|
| CPU | 1 | 1 |
| Memory | 256Mi | 256Mi |
| Min instances | 0 | 0 |
| Max instances | 1 | 3 |
| Timeout | 60s | 60s |
| Concurrency | 80 | 80 |
