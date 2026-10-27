# QA Automation Portfolio — Test Plan

- Test Plan ID: TP-QAP-001
- Status: Reviewed
- Current status: DEF-001 through DEF-006 are closed. Jest, Playwright authentication/authorization, accessibility, API schema validation, and manual authentication smoke testing are complete.
- Current automated coverage: 129 automated test cases

---

## Purpose

This test plan defines the QA scope, test approach, environments, automation coverage, test data, reporting, risks, and current test results for the QA Automation Portfolio.

The portfolio is the Application Under Test (AUT) and shows practical QA/SDET work across unit, UI, API, database, accessibility, authentication, authorization, performance, and CI testing.

---

## Documentation Set

The QA documentation is organized as follows:

- `REQUIREMENTS.md` — testable application requirements
- `TEST_DESIGN.md` — test design techniques and coverage
- `TEST_CASES.md` — automated test cases
- `RTM.md` — requirement-to-test traceability
- `DEFECT_LOG.md` — confirmed defects and retest history
- `TEST_SUMMARY_REPORT.md` — completed test runs and results

The automation repositories contain the executable tests.

Use the QA documents together with the source code and automated tests when reviewing coverage.

---

## Project Repositories

| Repository | Responsibility |
|---|---|
| QA-Automation-Portfolio | Application under test, Jest unit tests, QA documentation |
| QA-Portfolio-Selenium | Java Selenium UI, REST Assured API, JDBC database testing |
| QA-Portfolio-Playwright | JavaScript Playwright UI, API, database, authentication, accessibility, and cross-browser testing |
| QA-Portfolio-Performance | JMeter smoke, baseline, load, and stress testing |

---

## Test Objectives

The main objectives are to:

- verify important page content and navigation
- validate contact-form behavior and persistence
- test backend APIs directly
- verify PostgreSQL persistence and cleanup
- test registration, login, logout, sessions, and protected routes
- verify user/admin authorization
- test backend authorization independently from frontend route guards
- run UI tests across configured desktop browsers
- check selected accessibility requirements
- run performance workloads against the status endpoint
- maintain traceability between requirements, tests, defects, and test results

---

## Scope

### In Scope

The current test scope includes:

- Home, Project, and Automation pages
- Navigation and main content
- Contact-form validation and submission
- `GET /api/status`
- `POST /contact`
- Contact persistence and non-persistence
- JSON Schema Validation
- Jest contact-validation testing
- Jest authentication-validation testing
- React authentication routes:
  - `/auth/login`
  - `/auth/register`
  - `/auth/account`
  - `/auth/admin`
- Registration
- Login
- Logout
- Session restoration and invalidation
- Protected Account access
- User/Admin authorization
- Backend authorization
- PostgreSQL `users` persistence
- bcrypt password hashing
- PostgreSQL-backed sessions
- Controlled user/admin role setup
- Test-data creation and cleanup
- Desktop cross-browser testing
- Automated accessibility checks for selected portfolio pages
- Keyboard focus and contrast regression checks
- JMeter smoke, baseline, load, and stress scenarios

Not every in-scope feature has complete automation. Known gaps are documented in this plan, `TEST_DESIGN.md`, `TEST_CASES.md`, and `RTM.md`.

### Out of Scope

The current portfolio does not cover:

- OAuth
- MFA
- password reset
- email verification
- full penetration testing
- CSRF protection testing
- authentication rate-limiting testing
- deployment and rollback testing
- JMeter endurance testing
- production capacity certification
- full WCAG certification
- visual regression testing
- dedicated mobile test suites
- production-data modification

Add these areas when the related application functionality or test environment exists.

---

## Application Under Test

The application uses:

- Node.js
- Express
- EJS
- React
- PostgreSQL
- `express-session`
- `connect-pg-simple`
- bcrypt

The original portfolio pages are server-rendered with EJS.

Authentication pages are implemented in React under `/auth`.

PostgreSQL stores contact messages, users, and authentication sessions.

The application runs on port `3000`.

### Main Routes

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Home page with contact form |
| GET | `/project` | Project details |
| GET | `/project/automation` | Automation coverage page |
| GET | `/auth/*` | React authentication application |
| GET | `/api/status` | Application status |
| POST | `/contact` | Contact submission |
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | Logout and session invalidation |
| GET | `/api/auth/me` | Current authenticated user |
| GET | `/api/auth/admin` | Admin-only access |

Public registration creates a normal `user` account.

Admin access is created only through controlled QA setup.

Authentication sessions store the user ID rather than the full user record.

The authentication cookie is configured with:

- HttpOnly
- SameSite=Lax
- Secure in production
- 24-hour maximum age

Application startup requires `SESSION_SECRET`.

---

## Test Levels and Types

| Test Level | Current Coverage |
|---|---|
| Unit | Jest contact and authentication validation |
| Integration | API/database persistence, selected authentication/database behavior |
| System | UI, API, accessibility, authentication, authorization |
| End-to-End | Contact submission and authentication flows across UI, backend, database, and session layers |

The portfolio includes unit, functional, smoke, regression, API, database, cross-browser, accessibility, authentication, authorization, session, performance, load, and stress testing.

---

## Test Strategy

The test approach is:

1. Review the current application behavior and configuration.
2. Identify testable requirements and important risks.
3. Map automated tests to requirements.
4. Use appropriate test design techniques.
5. Execute the relevant automated suites.
6. Record the environment and versions used for each important test run.
7. Keep manual test results separate from automated test results.
8. Record failures accurately and link confirmed defects.
9. Clean up test-created data.
10. Keep requirement, test, defect, and result traceability up to date.

### API Validation

API tests combine:

- HTTP status checks
- response-value checks
- response-message checks
- JSON Schema Validation
- database persistence or non-persistence checks where applicable

Selenium uses REST Assured JSON Schema Validator. Playwright uses Ajv.

Schema validation is used together with functional assertions.

### Test Classification

- UI and API behavior tests without internal checks — Black-box
- UI/API tests that also query PostgreSQL — Gray-box
- Direct database tests — Gray-box
- Jest validation-module tests — White-box

White-box coverage applies only to the tested validation modules, not to the full application.

---

## Current Automation Coverage

The portfolio contains **129 unique automated test cases**.

| Project | Unique Cases |
|---|---:|
| Selenium | 42 |
| Playwright | 52 |
| Jest | 28 |
| JMeter | 7 |
| **Total** | **129** |

### Selenium

- 25 UI
- 15 API
- 2 database
- Chrome, Firefox, and Edge supported locally

### Playwright

- 24 UI
- 20 API
- 6 accessibility
- 2 database
- 52 unique cases
- 100 configured full-suite executions

The 24 UI cases run across Chromium, Firefox, and WebKit.

### Jest

- 15 contact-validation tests
- 13 authentication-validation tests
- 28 total

Verified 100% statement, branch, function, and line coverage applies only to `contactValidation.js`.

### JMeter

Seven performance scenarios:

- smoke
- baseline
- load
- stress 100
- stress 200
- stress 500
- stress 1000

---

## Authentication and Authorization Coverage

Playwright includes 14 unique authentication cases.

UI coverage includes registration, session persistence, logout, existing-user login, guest protection, normal-user admin denial, and admin access.

API coverage includes registration, duplicate normalized email, existing-user login, generic invalid-login response, unauthenticated `/me`, logout invalidation, and the `/admin` authorization matrix.

The automated coverage also verifies selected:

- PostgreSQL user persistence
- bcrypt password hashing
- default `user` role
- controlled role elevation
- session-cookie behavior
- cleanup of test-owned users and sessions

Backend middleware is treated as the real security boundary. Frontend route guards are treated as UX/navigation controls.

---

## Accessibility Coverage

Playwright accessibility testing currently includes six automated cases.

Coverage includes:

- axe-core scans
- selected color-contrast validation
- keyboard focus
- Enter activation
- accessible names
- form semantics
- authentication navigation focus-state regression

DEF-003 through DEF-006 were found and verified through accessibility-related testing.

Automated accessibility checks do not prove full WCAG compliance.

Manual review is still useful for complete keyboard navigation, screen-reader behavior, reading order, zoom/reflow, and full error-feedback behavior.

The React authentication pages do not yet have dedicated full accessibility coverage.

---

## Environments and Browsers

| Environment | Current Setup |
|---|---|
| Local | Application and PostgreSQL run locally |
| Application Unit CI | GitHub `ubuntu-latest`, Node.js 22 |
| External CI | Ubuntu runner, Node.js 22, PostgreSQL 16 |
| Selenium CI | Java 25, Maven |
| Performance CI | Java 21, JMeter 5.6.3 |

Important executions should record the relevant application and automation commit SHAs.

### Selenium Browsers

- Chrome
- Firefox
- Edge

The Selenium cross-browser suite was verified locally and is not currently part of CI.

### Playwright Browsers

UI:

- Chromium
- Firefox
- WebKit

Accessibility runs in Chromium. API and database projects run once and are not browser-specific.

Browser support is considered verified only after the tests pass in that browser.

No dedicated mobile viewport project currently exists.

---

## Database Coverage

The application uses PostgreSQL.

The `messages` table stores contact submissions. The `users` table stores authentication users, password hashes, roles, and timestamps. Authentication sessions are stored in PostgreSQL using `connect-pg-simple`.

Current checks cover:

- connectivity
- contact persistence
- contact non-persistence
- normalized authentication email
- bcrypt hash behavior
- default user role
- controlled admin elevation
- test-owned user/session cleanup

Remaining gaps include direct session-store behavior and selected table-constraint/failure scenarios.

---

## Test Data Strategy

The project uses synthetic data only.

Current rules:

- use unique data where possible
- keep non-target fields valid when testing one invalid condition
- delete only data created by the test
- avoid broad database cleanup
- use unique authentication emails
- do not store real reusable passwords
- clean up test-created users and sessions
- keep user/admin setup controlled and reversible

Playwright authentication tests use UUID-based emails and scoped cleanup.

Final verification found no remaining Playwright authentication users or contact messages from those tests.

Some older negative contact tests may not clean up unexpected database writes automatically. This is a known gap.

---

## Defect Management

Confirmed defects are documented in `DEFECT_LOG.md`.

Current closed defects:

- DEF-001 — shared footer JavaScript error
- DEF-002 — contact submit button recovery failure
- DEF-003 — Home CTA contrast issue
- DEF-004 — architecture label contrast issue
- DEF-005 — authentication navigation contrast issue
- DEF-006 — authentication keyboard-focus contrast issue

All six are Closed / Fixed / Retest Passed.

Application defects are kept separate from automation, environment, and documentation issues.

Typical lifecycle:

```text
New → Triaged → In Progress → Ready for Retest → Closed
```

---

## Reporting

| Framework | Reporting |
|---|---|
| Jest | Console output and local coverage |
| Selenium | Allure, screenshots, Surefire/TestNG |
| Playwright | HTML report, screenshots, traces, axe diagnostics |
| JMeter | JTL, logs, CSV summaries, HTML dashboards |

Current limitations:

- successful CI runs do not always keep report artifacts
- some reports are uploaded only on failure
- local report directories can be replaced by later runs
- some historical JMeter CSV summaries came from different test runs

Committed JTL files are the main JMeter result source. Older mismatched CSV summaries are stored under `results/historical/`.

---

## CI Strategy

| Workflow | Trigger | Main Scope |
|---|---|---|
| Application Unit Tests | Push / PR | Jest |
| Selenium CI | Push / PR | API → DB → UI smoke → UI regression |
| Playwright CI | Push / PR | API → DB → smoke → accessibility → UI |
| JMeter CI | Push / PR | Smoke → baseline |
| JMeter Performance | Manual | Selected load or stress scenario |

The Selenium, Playwright, and JMeter workflows start the AUT and PostgreSQL before running tests.

The current application requires `SESSION_SECRET` at startup.

The application repository does not automatically trigger every external automation repository when application-only code changes.

No automated deployment, promotion, rollback, or Continuous Deployment workflow is currently implemented.

---

## Verified Execution Evidence

Verified test results include:

- Jest: **28/28 passed**
- Selenium API: **15/15 passed**
- Playwright API schema-validation run: **13/13 passed**
- Playwright authentication automation: **7 UI + 7 API unique cases passed**
- Accessibility after DEF-006: **6/6 passed**
- Final Playwright full run: **100/100 configured executions passed**
- DEF-001 Chromium regression: **16/16 passed**
- DEF-002 Chromium regression: **17/17 passed**

The final Playwright full run includes:

```text
24 UI × 3 browsers = 72
6 accessibility     =  6
20 API              = 20
2 database          =  2
────────────────────────
Total               = 100
```

The 100-result Playwright run is not 100 unique cases.

The 129 cases were not executed as one combined test run.

Manual authentication smoke test results are recorded separately from automated results.

---

## Entry and Exit Criteria

Before a planned run, confirm the test scope, selected cases, relevant versions, required browsers/tools, application/database readiness, test data, cleanup approach, and known blockers.

A planned run is complete when selected tests have recorded results, failures are explained or linked to defects, blocked/skipped/retried cases are recorded, cleanup problems are documented, and relevant environment/version information is known.

If the environment cannot produce reliable results, testing should pause until the blocker is resolved.

---

## Risk-Based Prioritization

| Priority | Main Focus |
|---|---|
| High | Contact submission, authentication, authorization, sessions, persistence, database connectivity, CI reliability |
| Medium | Navigation, cross-browser behavior, reporting, API contracts, accessibility, performance workloads |
| Low | Informational and cosmetic checks |

A test is not High priority simply because it is automated or runs in CI.

Individual priorities are recorded in `TEST_CASES.md`.

---

## Risks and Current Gaps

Current risks and gaps include:

- incomplete cleanup in some older negative contact scenarios
- incomplete contact network/non-JSON failure coverage
- selected authentication negative cases not yet covered
- stale/deleted-user session behavior not covered
- direct session-store behavior not fully tested
- production `Secure` cookie behavior not executed in the local HTTP environment
- actual 24-hour session expiration not time-elapsed tested
- CSRF protection is not currently implemented
- authentication rate limiting is not currently implemented
- React authentication pages need dedicated accessibility coverage
- reports may be replaced or unavailable after successful runs
- external automation repos are not triggered automatically by every AUT-only change
- current JMeter testing focuses on the lightweight status endpoint
- JMeter does not currently cover endurance testing
- application CPU, memory, and database resource monitoring are not collected in performance runs
- production capacity is not established by the current local JMeter results

These items are current project limitations and coverage gaps.

---

## Deliverables

Current QA deliverables:

- `TEST_PLAN.md`
- `REQUIREMENTS.md`
- `TEST_DESIGN.md`
- `TEST_CASES.md`
- `RTM.md`
- `DEFECT_LOG.md`
- `TEST_SUMMARY_REPORT.md`

Current automation coverage includes:

- 129 unique documented cases
- 28 Jest tests
- 42 Selenium cases
- 52 Playwright cases
- 7 JMeter scenarios
- 100 configured Playwright full-suite executions
- six closed defects

---

## Maintenance

Update the QA documentation when application behavior, requirements, tests, defects, test data, CI, reporting, or environments change.

Current improvement areas include:

- authentication accessibility coverage
- additional authentication negative scenarios
- session-store checks
- production cookie/security verification
- stronger contact failure handling
- stronger database assertions
- improved test-data cleanup
- CI traceability
- more representative performance tests
- longer-duration performance testing

Add OAuth, MFA, password reset, email verification, CSRF protection, and authentication rate limiting to the test scope only after those features are implemented.
