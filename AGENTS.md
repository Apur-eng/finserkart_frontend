# Repository Guidance

This is the active Finservkart React/TypeScript/Vite frontend repository.

## Approved design reset ? 2026-11-20

The user explicitly superseded the previous Astryx design direction. Do not use Astryx components, themes, CLI, generated styles or another large UI library. Use semantic HTML, local React components and maintained CSS. This instruction supersedes Astryx-specific clauses in older workspace skills and historical design documents.

- Use src/components/ui.tsx for accessible form controls, panels and operational layouts. Public pages use semantic HTML and src/styles/public.css.
- Keep named design values in src/styles/globals.css. Do not reintroduce numbered generated tokens.
- Preserve routes, API contracts, auth, permissions, commission and payment behavior, demo access and role switching. Demo mode must not execute real financial operations.
- Partner onboarding is an enquiry through the existing contact flow until a production onboarding contract is approved. Do not invent financial promises, testimonials, credentials or public contact details.
- Keep React, strict TypeScript, Vite and React Router. Add dependencies only when necessary.
- Inspect existing changes before editing; preserve unrelated work. Work locally, without external integrations, pushes, merges or deployments unless explicitly requested.
- Verify with npm run test, npm run lint and npm run build. Astryx doctor is retired. Include relevant interaction coverage and inspect responsive layouts in a browser when available.
- Report verification limits accurately; SSR and jsdom are not visual browser checks.

Workspace safety and documentation-authority rules still apply. Backend changes are outside scope.
