# ADR-004: Firebase Auth for Client Portal

**Status**: Accepted
**Date**: 2026-03-14
**Deciders**: BM

## Context

The client portal (Phase 4) needs authentication. Options:

1. **Firebase Auth** — GCP-native, free tier, magic link support
2. **Supabase Auth** — Used in Solo OS, good DX
3. **Lucia Auth** — Used in LPP, self-hosted
4. **Auth0** — Industry standard, external vendor
5. **Custom JWT** — Roll our own

## Decision

Use Firebase Auth with magic link (passwordless) sign-in.

## Rationale

- Same GCP project — no new vendor, no credential crossing
- Free tier covers all foreseeable needs (email/password unlimited, 10K phone/month)
- Magic link is the best UX for infrequent-login clients
- Firebase Admin SDK verifies JWTs in Cloud Run with zero config
- Identity Platform is the upgrade path if enterprise features needed later
- Keeps the "GCP-native" principle from ADR-001

## Why Not Supabase Auth

- Would require adding Supabase as a backend, contradicting ADR-001
- Solo OS uses Supabase Auth for internal tools — different context
- Adding Supabase just for auth is overkill

## Why Not Lucia

- LPP uses Lucia but it's self-hosted — requires maintaining session storage
- More code to write and maintain
- Firebase is zero-maintenance

## Consequences

- Firebase SDK added to frontend bundle (~30KB gzipped)
- Firebase Admin SDK added to API dependencies
- Client accounts must be created in Firebase + our `clients` table
- Magic link emails come from Firebase (customizable template)
- If switching auth providers later, need to migrate user accounts
