# QA Automation Portfolio — Test Plan

- Test Plan ID: TP-QAP-001
- Status: Reviewed
- Current baseline: DEF-001 through DEF-006 are closed. Jest unit testing, Playwright authentication/authorization automation, Playwright accessibility testing, API JSON Schema Validation, and manual authentication/authorization smoke testing have been completed.
- Verified execution evidence:
  - Jest: 28 passed, 0 failed across 2 suites
  - Playwright accessibility after DEF-006: 6 passed, 0 failed
  - Selenium API: 15 passed
  - Playwright API: 13 passed
  - Final full Playwright run: 100 configured executions passed, 0 failed, 0 skipped across Chromium/Firefox/WebKit UI, Chromium accessibility, API, and database projects
  - Authentication UI/API/session/database behavior: 14 unique Playwright cases passed; manual smoke evidence remains historical supporting evidence
- Source of truth: application code, test code, and configuration files

## Purpose

This test plan defines the scope, test approach, environments, test data, reporting, and main QA activities for the QA Automation Portfolio.

It describes the automation that currently exists, verified execution evidence, and areas where additional coverage is still needed.

## Documentation relationship

[REQUIREMENTS.md](REQUIREMENTS.md) → [TEST_DESIGN.md](TEST_DESIGN.md) → [TEST_CASES.md](TEST_CASES.md) → Automation repositories → GitHub Actions CI → [RTM.md](RTM.md) / [DEFECT_LOG.md](DEFECT_LOG.md) → [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md)

- `REQUIREMENTS.md` defines the testable application requirements.
- `TEST_DESIGN.md` explains the test design techniques, classifications, and coverage gaps.
- `TEST_CASES.md` contains 129 documented automated test cases, including 28 Jest unit tests and 52 unique Playwright cases.
- The automation repositories contain the executable tests.
- `RTM.md` maps requirements to tests and available execution evidence.
- `DEFECT_LOG.md` records confirmed defects. DEF-001 through DEF-006 are Closed / Fixed / Retest Passed.
- `TEST_SUMMARY_REPORT.md` records completed test and defect-verification cycles.
- `PERFORMANCE_TEST_REPORT.md` is planned for a later stage.

These documents form the current QA documentation set.

## Roles and Responsibilities

This is a personal portfolio project, so the same person may perform both QA and application-development responsibilities.

- **QA Owner** — test planning, test design, automation, test execution, defect reporting, traceability, and QA documentation.
- **Application Owner** — application implementation and defect fixes.
- **GitHub Actions** — runs the configured automated CI workflows.

## Objectives

- Verify implemented page content, navigation, and contact-form behavior.
- Test contact and authentication validation logic at unit level.
- Keep browser validation, backend validation, authentication, and authorization responsibilities separate.
- Verify contact persistence and non-persistence where existing tests support it.
- Maintain automated coverage for registration, login, logout, sessions, protected routes, and role-based authorization.
- Verify backend authorization separately from frontend route guards.
- Run UI tests across configured desktop browsers without assuming compatibility until results are available.
- Test the status endpoint with the existing JMeter workload profiles.
- Maintain traceability between requirements, test cases, defects, and execution evidence.
- Keep manual smoke results separate from automated test results.

## Scope

The application and QA documentation are stored in `QA-Automation-Portfolio`. The project also uses three separate automation repositories.

| Repository | Responsibility |
|---|---|
| QA-Automation-Portfolio | Application under test and Jest unit tests for contact and authentication validation |
| QA-Portfolio-Selenium | Java Selenium UI testing, REST Assured API testing, and JDBC database testing |
| QA-Portfolio-Playwright | JavaScript Playwright UI, accessibility, API, and PostgreSQL testing |
| QA-Portfolio-Performance | JMeter smoke, baseline, load, and stress testing |

### In Scope

- Home and Project page content and navigation.
- Automation page availability and navigation.
- Contact-form input, browser validation, submission, and success behavior.
- Status and Contact API responses.
- HTTP status, response values/messages, and JSON Schema Validation.
- Jest unit testing for contact required fields, whitespace, email validation, and validation errors.
- Jest unit testing for authentication email normalization, registration validation, password rules and boundaries, password confirmation, and login-input normalization.
- React authentication pages:
  - `/auth/login`
  - `/auth/register`
  - `/auth/account`
  - `/auth/admin`
- Registration, login, logout, session restoration, protected routes, and user/admin authorization.
- PostgreSQL `users` table and authentication persistence behavior.
- bcrypt password hashing.
- PostgreSQL-backed session storage.
- Controlled user/admin role setup through the local `set-role` QA utility.
- PostgreSQL connectivity and contact-message persistence.
- Test-data creation and cleanup.
- Configured desktop cross-browser testing.
- Playwright accessibility testing for Home, Project, and Automation pages.
- Selected keyboard and contact-form accessibility checks.
- Focused keyboard-state contrast coverage for the shared authentication navigation link.
- Future accessibility coverage for the React authentication pages.
- Existing JMeter status-endpoint workload profiles.

Not every in-scope feature is fully automated. Current gaps are documented in `TEST_DESIGN.md`, `TEST_CASES.md`, and `RTM.md`.

### Out of Scope

- Payment, email delivery, and unrelated CRUD features that are not implemented.
- OAuth, MFA, password reset, and email verification.
- Full penetration or security testing.
- CSRF protection and authentication rate limiting, which are not currently implemented.
- Production capacity certification or production-readiness approval.
- Deployment and rollback testing.
- JMeter endurance testing.
- Postman collection coverage; no Postman collection is currently implemented in this project.
- Full manual accessibility certification.
- Visual regression testing.
- Dedicated mobile test suites.
- Treating manual authentication smoke testing as automated coverage.
- Modifying production data for portfolio testing.

## Application Under Test

The application uses Node.js and Express. The original portfolio pages are server-rendered with EJS, while the authentication pages use React under `/auth`.

PostgreSQL is used for application data and session storage.

The Express application handles:

- page routing;
- contact-form requests;
- authentication API routes;
- session configuration;
- React build serving;
- application startup.

PostgreSQL access uses a shared `pg.Pool`.

Contact and authentication validation are kept in separate JavaScript modules. Authentication-related database queries are handled by a user service. Express middleware protects authenticated and admin-only API routes.

The React authentication client uses React Router, authentication context, protected/guest routes, and a shared authentication API client.

Frontend route guards control page navigation and user experience. Backend middleware provides the actual authentication and authorization protection for API access.

| Method | Endpoint | Current behavior |
|---|---|---|
| GET | `/` | Home page with contact form |
| GET | `/project` | Project details |
| GET | `/project/automation` | Automation descriptions |
| GET | `/auth/*` | React authentication application and client-side routes |
| GET | `/api/status` | Returns 200 status JSON; does not query the database |
| POST | `/contact` | Validates contact data, inserts accepted messages, and returns JSON |
| POST | `/api/auth/register` | Validates registration, hashes password, creates user, creates session, and returns user data |
| POST | `/api/auth/login` | Validates login input, verifies credentials, creates session, and returns user data |
| POST | `/api/auth/logout` | Destroys the session and clears the authentication cookie |
| GET | `/api/auth/me` | Returns the authenticated user or 401 |
| GET | `/api/auth/admin` | Requires admin access; a non-admin user receives 403 |

The application runs on port 3000.

Accepted contact messages are stored in PostgreSQL. They are not sent by email.

Public registration creates a normal `user` account. Admin roles are not assigned through the public registration API. For testing, roles can be changed locally using the controlled `set-role` QA utility.

Authentication uses `express-session` with PostgreSQL-backed session storage. The session stores the user ID rather than the full user record.

The authentication cookie is configured with:

- HttpOnly;
- SameSite=Lax;
- Secure in production;
- 24-hour maximum age.

Application startup requires `SESSION_SECRET`.

## Test Levels

| Test level | Current coverage |
|---|---|
| Unit | Jest tests the contact-validation and authentication-validation modules. The 28 unit tests run without PostgreSQL, a browser, or Express startup |
| Integration | Contact API/UI tests verify selected PostgreSQL behavior. Direct database tests also exist. Playwright authentication tests verify user persistence, bcrypt hash behavior, default role, controlled role elevation, and real session behavior; direct session-store contents remain a gap |
| System | Browser and API tests run against the application. Playwright covers representative authentication UI/API/session/authorization behavior in addition to the historical manual smoke evidence |
| End-to-End | The contact workflow covers browser → backend → database. Playwright authentication journeys cover registration/login/session/logout/protected Account and user/admin access with test-owned cleanup |

## Test Types

The project includes:

- Unit testing;
- Functional testing;
- Regression testing;
- Smoke testing;
- Cross-browser testing;
- Accessibility testing;
- API testing;
- Database testing;
- Authentication and authorization testing;
- Session testing;
- Performance testing;
- Load and stress testing.

The one-request JMeter smoke plan is mainly used to confirm that the performance-test setup and endpoint are working. It is not a capacity test.

Playwright with axe-core provides automated accessibility checks at the UI/System level.

Automated accessibility testing does not prove full WCAG compliance. Manual checks are still needed for:

- keyboard-only navigation;
- focus visibility;
- zoom and responsive reflow;
- screen-reader behavior;
- reading order;
- validation and error feedback.

The React authentication pages are not yet included in the dedicated accessibility automation.

## Test Approach

1. Review the current application code and configuration.
2. Identify testable behavior and unclear areas.
3. Map existing tests and test data to the related requirements.
4. Apply appropriate test design techniques and document missing coverage.
5. Record the environment, versions, scope, and expected evidence before a test run.
6. Record Passed, Failed, Blocked, Skipped, retry, and cleanup results accurately.
7. Keep authentication unit-test results separate from API, session, database, browser, and authorization results.
8. Keep manual authentication smoke testing separate from automated coverage.
9. Verify backend authorization separately from frontend route guards.

### API validation approach

API tests use several layers of verification:

- **HTTP checks** — status code and content type;
- **Functional checks** — expected response values and messages;
- **JSON Schema Validation** — response structure, required properties, and data types;
- **Database checks** — persistence or non-persistence where applicable.

Selenium uses the REST Assured JSON Schema Validator. Playwright uses Ajv.

Schema validation supports the existing functional API tests; it does not replace the functional assertions.

### Black-box / Gray-box / White-box

- UI and API tests that verify external behavior without internal implementation checks are classified as Black-box.
- UI/API tests that also query PostgreSQL are classified as Gray-box.
- Direct database tests are treated as Gray-box relative to the application.
- Jest validation tests are classified as White-box because they directly test exported validation functions and their internal decision logic.
- The Jest White-box classification and measured coverage apply only to those validation modules, not to the whole application.
- Reading source code or inspecting the DOM does not automatically make a test White-box.

## Environments

| Environment | Current setup |
|---|---|
| Local | Application and PostgreSQL run locally. Record OS, tool versions, browser versions, and repository revisions when executing tests |
| Application unit CI | GitHub `ubuntu-latest`, Node.js 22, `npm ci`, `npm test`; no PostgreSQL, browser, external service, or application startup |
| External CI | Ubuntu runner, Node.js 22 application setup, PostgreSQL 16 service container |
| Selenium CI | Java 25 and Maven |
| Performance CI | Java 21 and JMeter 5.6.3 |
| External frontend resources | Bootstrap CSS/JS from jsDelivr |

Versions and environment details can change. Record the application and automation commit SHA for important executions.

## Browsers

- Selenium cross-browser suite: Chrome, Firefox, and Edge.
- Selenium CI currently uses the default Chrome UI path in headless mode.
- The Selenium cross-browser suite is not currently run by CI.
- Playwright UI projects: Chromium, Firefox, and WebKit.
- Playwright accessibility testing runs in Chromium.
- Playwright API and database projects run once and are not browser-specific.
- Browser configuration alone does not prove compatibility.
- No dedicated mobile viewport or responsive test project is currently configured.

## Database

The application schema contains tables for contact messages and authentication users.

### `messages` table

The `messages` table includes:

- generated primary key;
- `name VARCHAR(255)` — NOT NULL;
- `email VARCHAR(255)` — NOT NULL;
- `message TEXT` — NOT NULL;
- `created_at` with a default timestamp.

### `users` table

The `users` table includes:

- generated primary key;
- unique, non-null email;
- non-null `password_hash`;
- default role `user`;
- role limited to `user` or `admin`;
- database-generated `created_at` timestamp.

The application uses a shared `pg.Pool` for PostgreSQL access.

Authentication sessions are stored in PostgreSQL using `connect-pg-simple`. The application session stores the authenticated user ID rather than the complete user record.

Standalone Selenium and Playwright database projects mainly cover database connectivity and the contact-message lifecycle. Selected Playwright authentication UI/API cases also query PostgreSQL directly.

Implemented authentication database checks include normalized-email persistence, bcrypt hash behavior, default `user` role, test-owned role elevation, and scoped cleanup of user/session rows. Remaining dedicated checks include:

- `users` table constraints;
- unique email constraint;
- direct session-store schema/content behavior.

### Environment difference

Selenium and Playwright CI use the application schema with `VARCHAR(255)` for the contact name.

The JMeter workflows currently create the contact name column as `VARCHAR(100)`.

This is a test-environment schema difference and should not be treated as the application-wide limit.

## Tools and Frameworks

- **Application/backend:** Node.js, Express, EJS, Bootstrap, browser JavaScript, body-parser, dotenv, `pg`, bcrypt, express-session, connect-pg-simple.
- **Authentication frontend:** React, React DOM, React Router, Vite, Bootstrap, custom CSS.
- **Unit testing:** Jest 30.5.2 for contact and authentication validation.
- **Selenium automation:** Java, Selenium WebDriver, TestNG, Maven Surefire, REST Assured 5.5.6, REST Assured JSON Schema Validator 5.5.6, JDBC, Allure.
- **Playwright automation:** JavaScript, Playwright Test, Ajv 8.20.0, `@axe-core/playwright` 4.13.0, axe-core 4.13.0, Playwright page/request fixtures, `pg`, HTML reporter.
- **Performance testing:** Apache JMeter, JMX plans, HTTP samplers, assertions, timers, JTL, CSV, HTML dashboards.
- **CI:** GitHub Actions.

Tool and dependency versions should be confirmed from the project configuration and lockfiles when needed.

## Process Criteria

The following criteria describe how future test executions should be prepared, completed, paused, and resumed.

### Entry Criteria

Before starting a planned test run:

- define the test scope and selected test cases;
- record application and automation versions;
- confirm required tools and browsers are available;
- confirm the application is reachable;
- confirm required database access and schema;
- make sure the environment can safely use test data;
- define test-data ownership and cleanup;
- record known blockers and expected evidence.

### Exit Criteria

A planned test run can be considered complete when:

- every selected test has a recorded result;
- failures are linked to a defect, environment problem, or documented exception;
- important unresolved issues are recorded;
- blocked, skipped, retried, and cleanup-failure cases are documented;
- the application and test versions used for the run are recorded;
- performance results include the workload, sample count, errors, response-time information, and throughput where applicable.

Completing one selected test scope does not mean the entire portfolio or application is fully tested.

### Suspension Criteria

Pause testing when reliable results cannot be produced because of issues such as:

- application or database unavailable;
- wrong database target;
- incompatible database schema;
- browser or runtime failure;
- test-data contamination;
- unstable performance-test environment;
- incorrect or unknown workload configuration.

### Resumption Criteria

Testing can continue after:

- the blocker is resolved;
- application/database readiness is checked again;
- schema and configuration changes are recorded;
- test-data isolation is restored;
- affected tests and related regression checks are rerun where needed.

## Test Data Strategy

### Current implementation

The project uses synthetic test data for names, emails, messages, and authentication accounts.

Successful contact tests and direct database tests generally remove their test records after execution.

Some negative contact tests do not currently clean up unexpected database writes automatically.

Most existing contact database checks identify records by email and message rather than comparing every stored field.

Manual authentication smoke testing used a synthetic local account. The `set-role` QA utility was used to test both `user` and `admin` access.

Playwright authentication tests use UUID-based emails. Cleanup identifies only the normalized test-owned user, uses parameterized PostgreSQL queries, deletes session rows whose stored `userId` belongs to that user, and then deletes that user. Final verification found zero Playwright authentication users and zero Playwright contact messages remaining.

### Test-data rules for future automation

- Use unique data for each test or test run.
- Keep non-target fields valid when testing one invalid condition.
- Delete only data created by the test.
- Clean up unexpected database writes from negative tests.
- If both the test assertion and cleanup fail, keep the original test failure visible.
- Record cleanup failures.
- Do not perform broad database deletion.
- Use unique authentication emails.
- Do not store real or reusable passwords in the repository.
- Use only synthetic test credentials.
- Clean up authentication users and sessions created by automated tests where appropriate.
- Keep normal-user and admin setup clear and reversible.
- Do not use the public registration API to create admin accounts.

## Defect Management

Confirmed defects are recorded in `DEFECT_LOG.md`.

Each defect should include:

- expected behavior;
- actual behavior;
- reproduction steps;
- related requirement and test-case IDs;
- application/test version;
- environment;
- evidence;
- severity;
- priority;
- current status.

Application defects should be kept separate from automation, environment, and documentation issues.

Typical defect lifecycle:

New → Triaged → In Progress → Ready for Retest → Closed

Other statuses such as Blocked, Deferred, Rejected, or Reopened can be used when needed.

DEF-001 through DEF-006 were reproduced, fixed, retested, and closed.

- DEF-001 — shared footer JavaScript error on pages without the contact form;
- DEF-002 — contact submit button did not recover after a server-side validation rejection;
- DEF-003 — insufficient color contrast on the View Project Details button;
- DEF-004 — insufficient color contrast on architecture connector labels.
- DEF-005 — insufficient color contrast on the authentication navigation link after Project-page navigation overflow;
- DEF-006 — insufficient text contrast on the authentication navigation link during keyboard focus.

Network/request failure and malformed/non-JSON contact-response recovery are still not verified.

No authentication/authorization behavior defect was logged from the completed automated run. DEF-005 and DEF-006 affected the shared authentication navigation link's presentation, not authentication logic.

## Reporting

| Framework | Current reporting | Current limitation |
|---|---|---|
| Jest | Console output from `npm test`; local coverage from `npm run test:coverage` | Current verified run is 28 tests across contact and authentication validation. The previously verified 100% statement, branch, function, and line coverage applies only to the contact validation module |
| Selenium | Allure results/screenshots and Surefire/TestNG output | Allure results are uploaded by CI only on failure; some environment metadata still describes Local/Windows even when CI runs on Ubuntu |
| Playwright | HTML report, failure screenshots, first-retry traces, and axe accessibility diagnostics | Separate suite runs may replace the HTML report directory; CI report upload is failure-based |
| JMeter | JTL files, logs, CSV summaries, and local HTML dashboards | CI uploads raw results/logs only on failure; no performance acceptance threshold is currently defined |

CI workflow artifacts are retained for seven days.

A configured report path does not guarantee that a report artifact exists for every run.

Some historical JMeter stress CSV/JTL sample counts differ, so they should not be treated as results from the same execution unless the run is verified.

## CI Execution

| Workflow | Trigger | Main sequence |
|---|---|---|
| [Application Unit Tests](../../.github/workflows/unit-tests.yml) | Push / pull request | Node.js 22 → `npm ci` → `npm test` |
| [Selenium CI](https://github.com/KSely/QA-Portfolio-Selenium/blob/main/.github/workflows/selenium-ci.yml) | Push to main / PR to main | Compile → API → DB → UI smoke → UI regression |
| [Playwright CI](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/.github/workflows/playwright-ci.yml) | Push to main / PR to main | API → DB → smoke → Chromium accessibility → UI |
| [JMeter CI](https://github.com/KSely/QA-Portfolio-Performance/blob/main/.github/workflows/jmeter-ci.yml) | Push to main / PR to main | Smoke → baseline |
| [JMeter Performance](https://github.com/KSely/QA-Portfolio-Performance/blob/main/.github/workflows/jmeter-performance.yml) | Manual | Selected load or stress plan |

The Application Unit Tests workflow runs the 28 Jest tests without PostgreSQL or application startup.

The Selenium, Playwright, and JMeter workflows:

- check out the automation repository and application repository;
- start PostgreSQL 16;
- install dependencies;
- create required configuration/database state;
- start the application;
- poll `/api/status`;
- execute the selected test stages.

### Current CI limitations

The authentication-enabled application requires `SESSION_SECRET` at startup.

Any CI workflow that starts the current application must provide this environment variable.

The external Selenium, Playwright, and JMeter workflows should therefore be checked against the current authentication-enabled application before claiming current CI compatibility.

The `/api/status` readiness check confirms that the HTTP endpoint is responding. It does not confirm database or session-store readiness.

If an earlier CI stage fails, later stages may be skipped.

Smoke tests may overlap with later regression suites.

The application repository currently runs only its Jest unit workflow. An application-only change does not automatically trigger the complete Selenium, Playwright, and JMeter automation set.

No automated CD deployment, promotion, or rollback workflow is currently implemented.

### Verified historical API CI evidence

Verified API executions include:

- Selenium API: 15/15 passed;
- Playwright API: 13/13 passed;
- both related GitHub Actions workflows succeeded.

These runs verify the status/contact API behavior and JSON Schema Validation for the application versions used at that time.

They do not confirm that those older workflow runs are compatible with the later authentication-enabled application.

## Risk-Based Prioritization

Test priority is based on user impact, authentication/authorization risk, database impact, visibility of failures, and CI reliability.

| Priority | Current focus |
|---|---|
| High | Contact submission/validation; registration/login/logout; protected routes; role authorization; persistence/non-persistence; credentials/sessions; required database connectivity; CI reliability |
| Medium | Main/project navigation; cross-browser behavior; reporting; general API contracts; database helper lifecycle; authentication accessibility; JMeter workload profiles |
| Low | Informational content visibility and cosmetic/documentation-only checks |

Contact and authentication workflows remain High priority because failures can affect user submissions, account access, stored data, credentials, or authorization.

Informational content checks remain Low priority even when they run in several browsers.

A test is not High priority simply because it is automated or included in CI.

Individual test priorities are recorded in `TEST_CASES.md`.

## Risks

Current project risks and coverage gaps include:

- requirements based on current implementation may also reflect existing product behavior that later changes;
- schema or configuration differences can reduce repeatability;
- test-data collisions or incomplete cleanup can affect later tests;
- DEF-002 covers valid-JSON rejection recovery, but network/JSON failure recovery and visible error feedback remain gaps;
- simple record-existence checks may miss incorrect fields or duplicate records;
- authentication validation has unit coverage and representative route/session/database/authorization automation, but not every negative or production-specific condition is covered;
- frontend route protection can give false confidence if backend authorization is not tested separately;
- invalid-registration HTTP 400 variants and duplicate-email race behavior remain uncovered;
- stale/deleted-user session behavior is not covered;
- HttpOnly, SameSite=Lax, and approximate lifetime are verified locally; production Secure behavior and actual expiration are not;
- session-store failure behavior is not covered;
- missing or incorrect `SESSION_SECRET` configuration can prevent application startup;
- CSRF protection and authentication rate limiting are not currently implemented;
- missing or replaced reports can weaken execution traceability;
- external frontend resources, browser differences, and retries can make failures harder to diagnose;
- automated accessibility tests cover only machine-detectable issues and selected states;
- focused shared authentication-navigation accessibility is covered; the React authentication pages still need dedicated accessibility coverage;
- current JMeter status-endpoint workloads do not measure contact persistence performance, authentication performance, long-duration capacity, or system breaking points.

## Assumptions

Test execution uses synthetic data in a known test environment.

The required application, database, browser, and automation dependencies are available.

The selected application and automation versions are compatible with each other.

Database schema and tool versions should be recorded for important runs.

Configured browser or environment support is not treated as verified support until tests are executed successfully.

## Deliverables

Current QA documentation:

- `TEST_PLAN.md`
- `REQUIREMENTS.md`
- `TEST_DESIGN.md`
- `TEST_CASES.md`
- `RTM.md`
- `DEFECT_LOG.md`
- `TEST_SUMMARY_REPORT.md`

The current automated catalogue contains **129 documented automated test cases**, including **28 Jest unit tests** and **52 unique Playwright cases**.

Verified evidence currently includes:

- DEF-001 Chromium UI regression: **16/16 passed**;
- DEF-002 Chromium UI regression: **17/17 passed**;
- Jest unit testing: **28/28 passed across 2 suites**;
- initial accessibility run: **3 passed, 2 failed**;
- post-fix accessibility retest: **5/5 passed**;
- current accessibility project after DEF-006: **6/6 passed**;
- Selenium API schema-validation run: **15/15 passed**;
- Playwright API schema-validation run: **13/13 passed**;
- authentication Playwright coverage: **7 UI and 7 API unique cases passed**;
- final full Playwright run: **100/100 configured executions passed** in approximately 1.2 minutes.

Authentication/authorization manual smoke testing is documented separately as historical evidence.

The current evidence does not represent one combined execution of all 129 cases. The 100-result Playwright run is a configured multi-project execution, not 100 unique cases.

`PERFORMANCE_TEST_REPORT.md` is planned for a later stage.

## Maintenance and Review

Update the QA documents when changes affect:

- application behavior;
- requirements;
- test cases;
- test data;
- automation configuration;
- execution evidence;
- defects;
- CI behavior.

Current planned improvements include:

- authentication accessibility testing;
- route-level invalid-registration variants and selected authentication boundaries;
- production Secure-cookie and expiration verification;
- direct session-store verification;
- authenticated GuestRoute and requested-destination behavior;
- stronger contact failure handling;
- API error handling;
- stronger database assertions;
- better test-data isolation;
- CI improvements;
- reporting improvements;
- representative performance testing.

Future application features such as CSRF protection, authentication rate limiting, OAuth, MFA, password reset, email verification, and formal database migration tooling should be added to the QA baseline only after they are implemented.

Manual review is still useful for:

- severity and priority decisions;
- acceptance criteria;
- unclear validation or error behavior;
- authentication/security expectations;
- future performance targets;
- classification questions that depend on the test boundary.
