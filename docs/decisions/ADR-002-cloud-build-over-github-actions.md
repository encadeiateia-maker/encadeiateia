# ADR-002: Use Cloud Build Instead of GitHub Actions

**Status**: Accepted
**Date**: 2026-03-14
**Deciders**: BM

## Context

Need CI/CD pipeline for automated deployments. Two options:

1. **GitHub Actions**: Industry standard, runs on GitHub infrastructure
2. **Cloud Build**: GCP-native, already has a working `cloudbuild.yaml`

## Decision

Use Cloud Build with GitHub triggers.

## Rationale

- `cloudbuild.yaml` already exists and works
- Cloud Build has **native access** to Artifact Registry, Cloud Run, and Secret Manager — no service account key export needed
- GitHub Actions would require storing a GCP SA key JSON as a GitHub secret — additional security surface
- Cloud Build free tier: 120 build-minutes/day (more than enough)
- GitHub triggers give the same push-to-deploy experience as GitHub Actions
- One fewer system to configure and maintain

## Trade-offs

**What we lose vs GitHub Actions:**
- No PR status checks visible in GitHub UI (can add via Cloud Build GitHub app)
- Less community ecosystem (fewer reusable actions)
- Build logs in GCP Console instead of GitHub

**What we gain:**
- Zero credential management between GitHub and GCP
- Native access to all GCP services during build
- Already working configuration
- Simpler security posture

## Consequences

- Set up Cloud Build GitHub triggers via GCP Console or CLI
- PR previews need Cloud Build GitHub app installed for status reporting
- Build logs viewed in GCP Console (not GitHub)
