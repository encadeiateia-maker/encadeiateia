# Definition of Done (DoD)

**Product**: Encadeiateia Virtual Agency Platform
**Last updated**: 2026-03-14

---

## Per Task

A task is **done** when:

- [ ] Code is written and works as described in the acceptance criteria
- [ ] No TypeScript errors (`pnpm build` succeeds)
- [ ] No console errors in browser
- [ ] Responsive on mobile (375px) and desktop (1440px)
- [ ] Changes pushed to `staging` branch
- [ ] Verified working on staging Cloud Run URL
- [ ] Merged to `main` and deployed to production

## Per Epic

An epic is **done** when:

- [ ] All P0 tasks within the epic are done
- [ ] All exit criteria in the Roadmap are met
- [ ] No regressions in existing functionality
- [ ] Documentation updated if architecture changed

## Per Phase

A phase is **done** when:

- [ ] All epics within the phase are done
- [ ] End-to-end flow verified on production
- [ ] ROADMAP.md updated (statuses marked done)
- [ ] Any new GCP resources documented in INFRASTRUCTURE.md
- [ ] Decision log updated if decisions were made

---

## Quality Standards

### Code
- TypeScript strict mode (no `any` unless justified)
- Components use content from `site-content.json` or API — never hardcoded strings
- Tailwind for styling — no inline styles
- Imports use `@/` path alias
- No unused imports or variables

### UI/UX
- All interactive elements have hover/focus states
- Form fields show validation errors inline
- Loading states for async operations
- Error states for failed API calls
- Smooth transitions (not jarring layout shifts)
- Dark theme consistent (slate-950/900 backgrounds, cyan-to-purple gradients)

### Performance
- Lighthouse Performance score > 90
- No layout shift (CLS < 0.1)
- Images use lazy loading
- Static assets have cache headers

### Security
- No secrets in code or environment variables
- All user input validated server-side
- Parameterized SQL queries
- Firebase JWT verified on every authenticated request
- CORS configured to allow only known origins

### Accessibility
- All images have alt text
- Form fields have labels
- Color contrast meets WCAG AA
- Keyboard navigation works for all interactive elements
