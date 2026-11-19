# Frontend redesign coverage

Date: 2026-11-19. Scope: 69 page components, 75 leaf route entries including six dashboard aliases and the catch-all.

## Implemented

- Unified Astryx theme: navy ink, blue actions, neutral surfaces, semantic status colors, scalable typography and spacing, consistent radii/elevation. Inter and Manrope are bundled locally.
- All 69 existing page components received the presentation migration: tokenized colors/type/spacing, Astryx layout wrappers, responsive grid tracks and readable status labels. This is a shared-system redesign; it does not mean every page has a bespoke composition.
- Public homepage, navigation and service cards received dedicated component redesigns. Public mobile navigation and all six portal shells use accessible Astryx drawers; existing destinations and role controls remain.
- Public and portal skip links, customer profile link semantics, notification labels, reduced-motion handling and visible focus treatment added. Native table semantics and local horizontal scroll wrappers retained.
- Existing APIs, route definitions, role data, form validation, financial calculations and workflow handlers retained. No backend changes or remote operations.

## Evidence and limits

- Structural comparison against the local baseline found unchanged API calls, useState/useQuery/useMutation initializers and onSubmit/onChange/onValueChange expressions across all 69 pages. This is a bounded source check, not proof of every runtime behavior.
- Route tests cover all 75 entries below; existing inventory tests retain their expected content checks. New interaction tests exercise mobile menu state, service navigation and portal drawer controls.
- Browser access host is unavailable. **None of the redesigned routes has been visually verified in this run.** Desktop/tablet/mobile screenshots, native focus trapping, measured contrast, zoom/reflow and real backend flows remain unverified.
- Experimental theme editor PNG rendering failed with an unknown CSS-file-extension error. The final theme uses the supported compiled local-theme workflow instead; theme source and generated outputs are kept together under src/themes/finservkart. No preview screenshot is claimed.
- Some existing portal screens use local fixture/simulated behavior. The redesign preserves it; production backend readiness is not asserted.
- Marketing metrics and certification/security claims were carried forward, not independently verified or expanded.

## Architecture and maintenance

Project-owner authorization: the complete redesign brief in this session, 2026-11-19, supersedes the earlier visual-direction approval gate. No merge or deployment authorization is implied.

`Surface` and `Inline` are transitional wrappers over Astryx VStack that preserve existing layout semantics. This avoids business-flow rewrites during the shared style migration. Numeric compatibility tokens in `src/themes/finservkart/tokens.ts` centralize inherited values; semantic theme tokens govern new shared components. A future targeted cleanup can replace remaining inline compositions with higher-level Astryx patterns.

Theme source: `src/themes/finservkart/finservkartTheme.ts`. Rebuild with `npx --no-install astryx theme build src/themes/finservkart/finservkartTheme.ts --out src/themes/finservkart/finservkart.css`. Do not edit generated CSS/JS/declarations. Local font faces are maintained in `finservkart.fonts.css`. `src/astryx-themes.ts` is CLI-owned.

Existing global CSS is limited to document-level font defaults, box sizing, focus, skip links and reduced motion; theme palettes and component appearance are not added as :root overrides.

## Route coverage

| Route | Page | Source redesign | Rendered visual review |
| --- | --- | --- | --- |
| `/` | HomePage | Applied | Unverified |
| `/about` | AboutPage | Applied | Unverified |
| `/services` | ServicesPage | Applied | Unverified |
| `/services/:id` | ServiceDetailPage | Applied | Unverified |
| `/login` | LoginPage | Applied | Unverified |
| `/register` | RegisterPage | Applied | Unverified |
| `/forgot-password` | ForgotPasswordPage | Applied | Unverified |
| `/privacy-policy` | PrivacyPolicyPage | Applied | Unverified |
| `/terms-and-conditions` | TermsPage | Applied | Unverified |
| `/contact` | ContactPage | Applied | Unverified |
| `/customer` | CustomerDashboardPage | Applied | Unverified |
| `/customer/dashboard` | CustomerDashboardPage | Applied | Unverified |
| `/customer/applications` | CustomerApplicationsPage | Applied | Unverified |
| `/customer/applications/new` | NewApplicationPage | Applied | Unverified |
| `/customer/applications/:id` | ApplicationDetailsPage | Applied | Unverified |
| `/customer/applications/:id/tracker` | ApplicationTrackerPage | Applied | Unverified |
| `/customer/documents` | DocumentCentrePage | Applied | Unverified |
| `/customer/documents/upload` | DocumentUploadPage | Applied | Unverified |
| `/customer/conversations` | CustomerConversationsPage | Applied | Unverified |
| `/customer/payments` | CustomerPaymentsPage | Applied | Unverified |
| `/customer/profile` | CustomerProfilePage | Applied | Unverified |
| `/customer/notifications` | CustomerNotificationsPage | Applied | Unverified |
| `/customer/support` | CustomerSupportPage | Applied | Unverified |
| `/agent` | AgentDashboardPage | Applied | Unverified |
| `/agent/dashboard` | AgentDashboardPage | Applied | Unverified |
| `/agent/customers/onboard` | AgentOnboardCustomerPage | Applied | Unverified |
| `/agent/customers` | AgentCustomerDirectoryPage | Applied | Unverified |
| `/agent/applications` | AgentApplicationsPage | Applied | Unverified |
| `/agent/applications/:id` | AgentApplicationDetailsPage | Applied | Unverified |
| `/agent/commissions` | AgentCommissionsPage | Applied | Unverified |
| `/agent/payouts` | AgentPayoutsPage | Applied | Unverified |
| `/agent/profile` | AgentProfilePage | Applied | Unverified |
| `/agent/notifications` | AgentNotificationsPage | Applied | Unverified |
| `/ca` | CADashboardPage | Applied | Unverified |
| `/ca/dashboard` | CADashboardPage | Applied | Unverified |
| `/ca/applications` | CAAssignedApplicationsPage | Applied | Unverified |
| `/ca/applications/:id` | CAApplicationDetailsPage | Applied | Unverified |
| `/ca/applications/:id/workflow` | CAWorkflowPage | Applied | Unverified |
| `/ca/documents` | CADocumentReviewPage | Applied | Unverified |
| `/ca/conversations` | CAConversationsPage | Applied | Unverified |
| `/ca/deliverables` | CADeliverablesPage | Applied | Unverified |
| `/ca/completed` | CACompletedApplicationsPage | Applied | Unverified |
| `/ca/profile` | CAProfilePage | Applied | Unverified |
| `/ca/notifications` | CANotificationsPage | Applied | Unverified |
| `/franchise` | FranchiseDashboardPage | Applied | Unverified |
| `/franchise/dashboard` | FranchiseDashboardPage | Applied | Unverified |
| `/franchise/agents` | FranchiseAgentsPage | Applied | Unverified |
| `/franchise/customers` | FranchiseCustomersPage | Applied | Unverified |
| `/franchise/applications` | FranchiseApplicationsPage | Applied | Unverified |
| `/franchise/commissions` | FranchiseCommissionsPage | Applied | Unverified |
| `/franchise/payouts` | FranchisePayoutsPage | Applied | Unverified |
| `/franchise/reports` | FranchiseReportsPage | Applied | Unverified |
| `/franchise/profile` | FranchiseProfilePage | Applied | Unverified |
| `/coordinator` | CoordinatorDashboardPage | Applied | Unverified |
| `/coordinator/dashboard` | CoordinatorDashboardPage | Applied | Unverified |
| `/coordinator/applications` | CoordinatorApplicationsPage | Applied | Unverified |
| `/coordinator/applications/:id` | CoordinatorApplicationDetailsPage | Applied | Unverified |
| `/coordinator/ca-assignment` | CoordinatorCAAssignmentPage | Applied | Unverified |
| `/coordinator/cas` | CoordinatorCAManagementPage | Applied | Unverified |
| `/coordinator/documents` | CoordinatorDocumentMonitoringPage | Applied | Unverified |
| `/coordinator/transactions` | CoordinatorTransactionsPage | Applied | Unverified |
| `/coordinator/notifications` | CoordinatorNotificationsPage | Applied | Unverified |
| `/admin` | AdminDashboardPage | Applied | Unverified |
| `/admin/dashboard` | AdminDashboardPage | Applied | Unverified |
| `/admin/users` | AdminUserManagementPage | Applied | Unverified |
| `/admin/applications` | AdminApplicationsPage | Applied | Unverified |
| `/admin/cas` | AdminCAManagementPage | Applied | Unverified |
| `/admin/commissions` | AdminCommissionManagementPage | Applied | Unverified |
| `/admin/services` | AdminServiceCataloguePage | Applied | Unverified |
| `/admin/finances` | AdminFinancialReportsPage | Applied | Unverified |
| `/admin/support` | AdminSupportPage | Applied | Unverified |
| `/admin/activity` | AdminActivityLogsPage | Applied | Unverified |
| `/admin/settings` | AdminSettingsPage | Applied | Unverified |
| `/admin/profile` | AdminProfilePage | Applied | Unverified |
| `/*` | NotFoundPage | Applied | Unverified |

## Preview

Final checks in this repository:

- `npm run test`: 164 tests passed across 12 files.
- `npm run build`: TypeScript and Vite passed. Main JS chunk remains large (1,418.34 kB minified / 325.43 kB gzip); route splitting is follow-up performance work.
- `npm run lint`: exit 0; one pre-existing unsafe optional-chain warning and one generated Astryx declaration warning (triple-slash reference).
- `npx --no-install astryx doctor --built dist`: exit 0, 21 pass, 1 CLI-path warning, 0 fail. This build-output check does not certify source purity or visual quality.
- `git -c core.whitespace=cr-at-eol diff --check`: passed with Windows line endings accounted for. Route definitions, API sources and role fixture data have no diff.

From `D:/Fivenskart_main/finserkart_frontend`, run `npm run dev -- --host 127.0.0.1` and open the URL Vite prints. Use `/`, `/customer`, `/agent`, `/ca`, `/franchise`, `/coordinator` and `/admin` to review the seven areas. Live service data still depends on the existing API setup.
