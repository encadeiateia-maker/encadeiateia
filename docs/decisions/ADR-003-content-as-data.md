# ADR-003: Content as Data (JSON → Database Migration)

**Status**: Accepted
**Date**: 2026-03-14
**Deciders**: BM

## Context

The homepage rewrite (Phase 2) needs structured content: hero text, service descriptions, portfolio cards, process steps, contact form fields, footer text.

Options:
1. **Hardcode in JSX** — fastest, but rigid
2. **JSON file** — separate content from components, easy to update
3. **Database from day one** — most flexible, but requires backend (Phase 3)

## Decision

Start with a **JSON content file** (`src/content/site-content.json`), migrate to database reads in Phase 3.

## Rationale

- Phase 2 has no backend — JSON file is the only option that doesn't block
- Content is already structured as JSON (from Perplexity)
- Components import JSON, making them pure presentation
- When the API exists (Phase 3), replace `import` with `fetch` — components don't change
- JSON file serves as database seed data when migrating

## Migration Path

```
Phase 2: import content from '@/content/site-content.json'
Phase 3: const content = await fetch('/api/content').then(r => r.json())
```

Component interface stays the same. Only the data source changes.

## Consequences

- Content changes in Phase 2 require a code push (acceptable — still auto-deploys)
- JSON structure must match the eventual API response shape
- Components must accept data as props, not import directly (keep them reusable)
