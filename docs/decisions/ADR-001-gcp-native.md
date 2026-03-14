# ADR-001: Stay GCP-Native Instead of Adding Supabase

**Status**: Accepted
**Date**: 2026-03-14
**Deciders**: BM

## Context

Encadeiateia needs a backend (database, auth, storage, secrets). Two options:

1. **GCP-native**: Cloud SQL + Firebase Auth + GCS + Secret Manager
2. **Supabase hosted**: Managed Postgres + Auth + Storage + Realtime

The Solo OS project uses self-hosted Supabase. The Cinefilm project has a proven Terraform template for GCP.

## Decision

Use GCP-native services for encadeiateia.

## Rationale

- Already paying for GCP — no new vendor or billing account
- Cinefilm Terraform template is copy-paste ready — proven in production
- Cloud Build has native access to all GCP services — no credential export needed
- Secret Manager is more secure than environment variables
- Vertex AI (for Phase 5 chat) is in the same project
- Cloud SQL free tier (db-f1-micro) is sufficient for MVP
- Firebase Auth is free for email/password and magic link

## Trade-offs

**What we lose vs Supabase:**
- No auto-generated REST API (PostgREST) — we'll build our own
- No built-in Realtime (WebSocket subscriptions) — not needed yet
- No Supabase Dashboard for data browsing — use Cloud SQL Studio or psql
- Slightly more setup (Terraform vs Supabase dashboard click)

**What we gain:**
- Single vendor, single bill
- Native integration (Cloud Build → Cloud Run → Cloud SQL, no credentials crossing boundaries)
- Proven Terraform template from Cinefilm
- Vertex AI access without extra setup

## Consequences

- Must write API endpoints manually (no PostgREST)
- Must manage database migrations (SQL files, not Supabase dashboard)
- If Realtime is needed later (client portal notifications), evaluate adding Supabase or using Firebase Cloud Messaging

## Alternatives Considered

- **Supabase hosted**: Good DX, but adds a vendor. Reserve for Solo OS where it's the core.
- **PlanetScale**: MySQL, not PostgreSQL. Doesn't align with ecosystem.
- **Neon**: Serverless Postgres. Good option but less GCP-integrated.
