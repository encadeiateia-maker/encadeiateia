# Operations Runbook

**Product**: Encadeiateia Virtual Agency Platform
**Last updated**: 2026-03-14

---

## Environments

| Environment | URL | Cloud Run Service | Branch |
|-------------|-----|-------------------|--------|
| Production | `encadeiateia-*.run.app` | `encadeiateia` | `main` |
| Staging | `encadeiateia-staging-*.run.app` | `encadeiateia-staging` | `staging` |
| Local | `http://localhost:5173` | — | any |

---

## Common Operations

### Deploy to Staging

```bash
git checkout staging
git merge feature/my-branch
git push origin staging
# Cloud Build triggers automatically
# Check: https://console.cloud.google.com/cloud-build/builds
```

### Deploy to Production

```bash
git checkout main
git merge staging
git push origin main
# Cloud Build triggers automatically
```

### Rollback Production

```bash
# List revisions
gcloud run revisions list --service=encadeiateia --region=europe-west1

# Route traffic to previous revision
gcloud run services update-traffic encadeiateia \
  --region=europe-west1 \
  --to-revisions=encadeiateia-00042-abc=100
```

### Check Service Status

```bash
# List services
gcloud run services list --region=europe-west1

# Describe service
gcloud run services describe encadeiateia --region=europe-west1

# View logs
gcloud run services logs read encadeiateia --region=europe-west1 --limit=50
```

### Check Build Status

```bash
# Recent builds
gcloud builds list --limit=10

# Stream build logs
gcloud builds log <BUILD_ID> --stream

# View in console
open https://console.cloud.google.com/cloud-build/builds
```

### Local Development

```bash
cd /Users/bm/encadeiateia/encadeiateia
pnpm install
pnpm dev
# Opens at http://localhost:5173
```

### Build Locally (Verify Before Push)

```bash
pnpm build
# Check dist/ output
ls -la dist/
```

### Docker Build Locally

```bash
docker build -t encadeiateia:local .
docker run -p 8080:8080 encadeiateia:local
# Opens at http://localhost:8080
```

---

## Database Operations (Phase 3+)

### Connect to Cloud SQL

```bash
# Via Cloud SQL Proxy
gcloud sql connect encadeiateia-db --user=encadeiateia_app --database=encadeiateia

# Via psql (if Cloud SQL Proxy running locally)
psql -h 127.0.0.1 -U encadeiateia_app -d encadeiateia
```

### Run Migrations

```bash
# Connect to Cloud SQL and run migration file
gcloud sql connect encadeiateia-db --user=encadeiateia_app --database=encadeiateia < infra/migrations/001_init.sql
```

### Check Lead Count

```sql
SELECT status, COUNT(*) FROM leads GROUP BY status;
```

### Export Leads

```sql
\COPY (SELECT name, email, company, budget, project_description, created_at FROM leads WHERE status = 'new' ORDER BY created_at DESC) TO '/tmp/new-leads.csv' WITH CSV HEADER;
```

---

## Terraform Operations (Phase 3+)

### Apply Infrastructure Changes

```bash
cd infra
terraform init
terraform plan       # Review changes
terraform apply      # Apply changes
```

### Destroy (DANGER)

```bash
cd infra
terraform destroy    # Destroys ALL resources — use with extreme caution
```

---

## Incident Response

### Site Down

1. Check Cloud Run: `gcloud run services describe encadeiateia --region=europe-west1`
2. Check recent builds: `gcloud builds list --limit=5`
3. If bad deploy: rollback (see above)
4. If Cloud Run issue: check GCP Status Dashboard
5. Check logs: `gcloud run services logs read encadeiateia --region=europe-west1 --limit=100`

### Build Failing

1. Check build logs: `gcloud builds log <BUILD_ID>`
2. Common causes:
   - `pnpm install` failing → check `pnpm-lock.yaml` is committed
   - TypeScript errors → run `pnpm build` locally
   - Docker build failing → test `docker build` locally
3. Fix, push to staging first, verify, then merge to main

### Database Connection Issues (Phase 3+)

1. Check Cloud SQL status: `gcloud sql instances describe encadeiateia-db`
2. Check Cloud Run service account has `roles/cloudsql.client`
3. Verify connection name in Cloud Run env vars
4. Check Secret Manager for password: `gcloud secrets versions access latest --secret=encadeiateia-db-password`

### Lead Form Not Working (Phase 3+)

1. Check browser console for errors
2. Check API logs: `gcloud run services logs read encadeiateia-api --region=europe-west1`
3. Check database connection
4. Verify CORS configuration allows frontend origin

---

## Monitoring Dashboards

| What | Where |
|------|-------|
| Cloud Run metrics | GCP Console → Cloud Run → encadeiateia → Metrics |
| Build history | GCP Console → Cloud Build → History |
| Error reporting | GCP Console → Error Reporting |
| Cloud SQL metrics | GCP Console → SQL → encadeiateia-db → Metrics |
| Logs | GCP Console → Logging → Cloud Run |

---

## Contacts & Escalation

| Role | Who | Contact |
|------|-----|---------|
| Builder / Operator | BM | — |
| GCP Support | Google | console.cloud.google.com/support |
| Domain / DNS | Cloudflare (if used) | dash.cloudflare.com |
