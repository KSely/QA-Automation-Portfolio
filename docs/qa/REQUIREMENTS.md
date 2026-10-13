# Requirements — QA Automation Portfolio

## Purpose and Baseline

These requirements describe testable behavior found in the current application implementation.

They are used for:

- test planning;
- test design;
- test-case mapping;
- traceability;
- coverage analysis.

They are based on the current application code and configuration and should be reviewed when implementation changes.

## Coverage Status

The coverage status shows how each requirement is currently represented in testing:

- **Represented** — existing automated tests cover the stated behavior.
- **Partial** — some parts or variants are covered, but additional testing is needed.
- **Gap** — no dedicated automated test currently covers the requirement.
- **Configured** — test configuration exists, but this status alone does not indicate a successful execution result.

Manual test evidence is recorded separately from automated coverage.

[TEST_PLAN.md](TEST_PLAN.md) defines the overall test scope and approach.

[TEST_DESIGN.md](TEST_DESIGN.md) explains test design techniques and coverage gaps.

[TEST_CASES.md](TEST_CASES.md) contains the documented automated test cases.

[RTM.md](RTM.md) maps requirements to test and execution evidence.

[DEFECT_LOG.md](DEFECT_LOG.md) contains confirmed defect details.

[TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md) summarizes completed test cycles.

## Source Reference Key

| Key | Implementation |
|---|---|
| A1 | [Application entry point](../../index.js): middleware, routes, validation, SQL, startup |
| A2 | [Home template](../../views/index.ejs): fields, headings, links |
| A3 | [Project template](../../views/project.ejs): sections and navigation destination |
| A4 | [Automation template](../../views/automation.ejs): automation content |
| A5 | [Header](../../views/partials/header.ejs): page-dependent navigation |
| A6 | [Footer](../../views/partials/footer.ejs): fetch, form state, scroll behavior |
| A7 | [Schema](https://github.com/KSely/QA-Automation-Portfolio/blob/main/database/schema.sql): messages and users columns, constraints, defaults, unique email, and role constraint |
| A8 | [Authentication validation](https://github.com/KSely/QA-Automation-Portfolio/blob/main/utils/authValidation.js): email normalization, password rules, registration and login validation |
| A9 | [Authentication routes](https://github.com/KSely/QA-Automation-Portfolio/blob/main/routes/authRoutes.js): registration, login, logout, current-user, and admin endpoints |
| A10 | [Authentication middleware](https://github.com/KSely/QA-Automation-Portfolio/blob/main/middleware/authMiddleware.js): authentication and role checks |
| A11 | [User service](https://github.com/KSely/QA-Automation-Portfolio/blob/main/services/userService.js): parameterized user lookup and creation queries |
| A12 | [React authentication client](https://github.com/KSely/QA-Automation-Portfolio/tree/main/client/src): routes, authentication context, API client, protected/guest routing, and authentication pages |
| A13 | [Database initialization and pool](https://github.com/KSely/QA-Automation-Portfolio/tree/main/database): shared PostgreSQL pool and schema initialization |
| A14 | [User-role utility](https://github.com/KSely/QA-Automation-Portfolio/blob/main/scripts/setUserRole.js): controlled local user/admin role assignment for development and authorization testing |
| S1 | [TestNG suites](https://github.com/KSely/QA-Portfolio-Selenium/tree/main/src/test/resources/test-suites) and [DriverFactory](https://github.com/KSely/QA-Portfolio-Selenium/blob/main/src/main/java/com/qaautomation/portfolio/driver/DriverFactory.java) |
| S2 | [JDBC helper](https://github.com/KSely/QA-Portfolio-Selenium/blob/main/src/main/java/com/qaautomation/portfolio/database/DatabaseHelper.java) |
| P1 | [Playwright configuration](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/playwright.config.js) |
| P2 | [PostgreSQL helper](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/utils/databaseHelper.js) |
| J1 | [JMeter plans](https://github.com/KSely/QA-Portfolio-Performance/tree/main/tests) |
| C1 | [Selenium CI](https://github.com/KSely/QA-Portfolio-Selenium/blob/main/.github/workflows/selenium-ci.yml) |
| C2 | [Playwright CI](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/.github/workflows/playwright-ci.yml) |
| C3 | [Performance workflows](https://github.com/KSely/QA-Portfolio-Performance/tree/main/.github/workflows) |

Application links are relative to this repository. Links to the other automation repositories point to their current `main` branches and may change as those repositories are updated.

## UI

| Requirement ID | Requirement statement | Category | Source / implementation basis | Existing automated coverage | Coverage status | Notes / limitations |
|---|---|---|---|---|---|---|
| REQ-UI-001 | The home route shall render the portfolio title and main heading. | UI | A1 GET `/`; A2 title via A5 and main heading | P-UI-001 | Represented | Checks the title pattern and heading visibility, not all Home-page content or browser errors. |
| REQ-UI-002 | The home skills link shall target the skills section. | UI | A2 skills button and skills anchor | S-UI-001 | Partial | Verifies the Skills section after the click but does not check the URL fragment. |
| REQ-UI-003 | View QA Project shall target the featured-project section. | UI | A2 project button and project anchor | S-UI-002; P-UI-002 | Represented | Playwright checks the fragment and heading; Selenium checks section visibility. |
| REQ-UI-004 | View Project Details shall open the project page. | UI | A2 project-details button; A1 `/project` | S-UI-003; P-UI-003 | Represented | Selenium checks the Overview section; Playwright also checks the URL and heading. |
| REQ-UI-005 | The project page shall contain overview, architecture, technology, QA, strategy, API, and database sections. | UI | A3 section structure | S-UI-013–019; P-UI-008–014; P-UI-015 (related page-error check) | Represented | Content tests verify section visibility. P-UI-015 separately checks startup JavaScript errors on `/project`. |
| REQ-UI-006 | Project navigation shall target the corresponding section anchors. | UI | A5 project navigation; A3 anchors | S-UI-020–025 | Partial | Six section links are covered; Overview navigation is not explicitly tested. |
| REQ-UI-007 | GET `/project/automation` shall render automation content. | UI | A1 route; A4 template | P-UI-016 (related page-error check only) | Partial | The route is opened directly and checked for startup page errors, but the automation content is not explicitly asserted. DEF-001 is fixed and verified in Chromium. |
| REQ-UI-008 | The scroll-to-top control shall become visible when `scrollY` exceeds 400 and request scrolling to the top on click. | UI | A6 scroll and click listeners | None | Gap | The behavior is implemented but does not yet have dedicated browser automation. |
| REQ-UI-009 | The project page and project navigation shall provide links targeting `/project/automation`. | UI | A3 automation link; A5 project navigation link | None | Gap | No dedicated click/navigation test currently covers this requirement. |
| REQ-UI-010 | The authentication area shall provide React routes for login, registration, account, and admin access under `/auth`. | UI / Authentication | A12 | P-UI-018; P-UI-021; P-UI-023–024 | Represented | The automated journeys exercise Register, Login, Account, and Admin routes in Chromium, Firefox, and WebKit. |
| REQ-UI-011 | Login and registration pages shall be available to unauthenticated users and redirect an already authenticated user to the account page. | UI / Authentication | A12 | P-UI-018; P-UI-021 | Partial | Unauthenticated registration and login are exercised. The authenticated `GuestRoute` redirect is not a dedicated assertion. |
| REQ-UI-012 | The account page shall require an authenticated user; an unauthenticated user attempting to open it shall be redirected to login. | UI / Authentication | A12; A9; A10 | P-UI-019–020; P-UI-022 | Represented | Covers session restoration, direct guest denial, and protected Account denial after logout. |
| REQ-UI-013 | The admin page shall allow the admin role and shall display an access-denied state to an authenticated user without the admin role. | UI / Authorization | A12; A10 | P-UI-023–024 | Represented | A normal user receives Access denied; an admin created through controlled test-owned role elevation receives access. Backend enforcement is covered separately by P-API-020. |
| REQ-UI-014 | The account page shall display the authenticated user's email and role and shall provide a logout action. | UI / Authentication | A12 | P-UI-018; P-UI-020–021; P-UI-024 | Represented | Automated UI coverage verifies account identity/role and the logout action. |

## Contact

| Requirement ID | Requirement statement | Category | Source / implementation basis | Existing automated coverage | Coverage status | Notes / limitations |
|---|---|---|---|---|---|---|
| REQ-CONTACT-001 | Name, email, and message controls shall accept entered text. | Contact | A2 inputs/textarea | S-UI-004–006 | Represented | Uses representative values; length and Unicode boundaries are not covered. |
| REQ-CONTACT-002 | The browser form shall require all three fields and apply HTML email validation to email. | Contact | A2 required attributes and `type=email` | S-UI-008–012; P-UI-005–007 | Represented with tool-specific gaps | Selenium covers all empty fields. Playwright does not currently include a separate empty-email UI case. Browser validation is separate from server-side regex and whitespace validation. |
| REQ-CONTACT-003 | A browser-valid form submission shall send URL-encoded fields to POST `/contact`. | Contact | A6 FormData, URLSearchParams, fetch | S-UI-007; P-UI-004 | Partial | Successful UI workflows exercise this path, but the request encoding is not explicitly intercepted and asserted. |
| REQ-CONTACT-004 | Submission shall disable the send button and display `Sending...` while its request is pending. | Contact | A6 before fetch | P-UI-017 (related recovery check) | Partial | P-UI-017 verifies button recovery after a server rejection, but the pending disabled/`Sending...` state is not separately asserted. |
| REQ-CONTACT-005 | A successful contact response shall display confirmation, reset the form, and restore the send button. | Contact | A6 `data.success` branch | S-UI-007; P-UI-004 | Partial | Success feedback is covered. Form reset and button restoration are not separate assertions. |

## API

| Requirement ID | Requirement statement | Category | Source / implementation basis | Existing automated coverage | Coverage status | Notes / limitations |
|---|---|---|---|---|---|---|
| REQ-API-001 | GET `/api/status` shall return 200 JSON with `status=ok` and `message=QA Automation Portfolio backend is running`. | API | A1 status route | S-API-001; P-API-001–002; J-PERF-001–007 | Represented | JMeter checks the response code and status content. The endpoint itself does not verify database readiness. |
| REQ-API-002 | For ordinary scalar form values, an omitted, empty, or whitespace-only required field shall return 400 with `success=false` and `message=All fields are required.` | API | A1 required-field check | S-API-003–008, S-API-013–015; P-API-004–009; P-UI-017; A-UNIT-007–014 | Represented with variant gaps | Jest covers the represented empty/whitespace and precedence logic. Playwright has no explicit empty-string API cases. Structured/non-string request bodies are not covered by this requirement. |
| REQ-API-003 | With all fields nonblank, email failing the implemented regex shall return 400 with `success=false` and `message=Invalid email address.` | API | A1 regex applied to `email.trim()` | S-API-009–012; P-API-010–013; A-UNIT-002–005; A-UNIT-015 | Partial | Current tests cover selected invalid-email partitions, not every possible valid or invalid email format. |
| REQ-API-004 | For accepted inputs within storage limits and an available database, the handler shall insert before returning 200 with `success=true` and `message=Message sent successfully!` | API | A1 awaited insert and success response | S-API-002; P-API-003; successful UI cases indirectly; A-UNIT-001 and A-UNIT-006 (validation only) | Represented | Jest verifies validation acceptance only. API/UI integration tests provide the HTTP and PostgreSQL evidence. A stable application-specific database-failure JSON contract is not currently defined. |
| REQ-API-005 | Required-field rejection shall precede email-format rejection when both conditions are invalid. | API | A1 ordering of return branches | A-UNIT-014 | Represented at unit level | A-UNIT-014 verifies the precedence for one combined-invalid condition. Other combinations are not separately covered. |
| REQ-API-006 | POST `/api/auth/register` with a valid normalized email, a password satisfying the implemented password rules, and matching confirmation shall create an account and return 201 with safe user data. | API / Authentication | A8; A9; A11 | A-UNIT-024–025; P-API-014; P-UI-018 | Represented | Jest verifies input logic; Playwright verifies HTTP/UI registration, user creation, safe response data, session creation, persistence, and cleanup. |
| REQ-API-007 | Registration shall reject invalid email, password length outside 8–64 characters, missing required password character classes, or mismatched password confirmation with HTTP 400. | API / Authentication | A8; A9 | A-UNIT-016–023; A-UNIT-026–027 | Partial | Jest covers the implemented validation rules and password boundaries. Route-level HTTP 400 behavior is not yet automated. |
| REQ-API-008 | Registration with an email that already exists shall return HTTP 409 and shall not create a second account. | API / Authentication | A9; A11; A7 | P-API-015 | Partial | The normalized duplicate-email request returns 409. A separate database row-count assertion is not included. |
| REQ-API-009 | POST `/api/auth/login` with valid credentials shall authenticate the user and return safe user data; an unknown email or incorrect password shall return HTTP 401 using the same generic invalid-credentials response. | API / Authentication | A8; A9; A11 | A-UNIT-028; P-API-016–017; P-UI-021 | Represented | Covers valid login and equivalent generic 401 responses for wrong-password and unknown-email cases. |
| REQ-API-010 | GET `/api/auth/me` shall return the current authenticated user for a valid session and shall return HTTP 401 when no authenticated session exists. | API / Session | A9; A10; A11 | P-API-014; P-API-018; P-UI-019 | Represented | Registration establishes a real session, `/me` restores it, refresh preserves UI access, and an unauthenticated request returns 401. |
| REQ-API-011 | POST `/api/auth/logout` shall destroy the authenticated session, clear the authentication cookie, and prevent subsequent protected access with that session. | API / Session | A9 | P-API-019; P-UI-020 | Partial | Subsequent API and Account access are denied. Cookie-clearing response details are not a separate assertion. |
| REQ-API-012 | GET `/api/auth/admin` shall return HTTP 401 for an unauthenticated request, HTTP 403 for an authenticated non-admin user, and successful access for an authenticated admin user. | API / Authorization | A9; A10; A11 | P-API-020; P-UI-023–024 | Represented | The API 401/403/200 matrix and representative UI user/admin behavior are automated. |
| REQ-API-013 | Authentication API responses shall expose only safe account fields and shall not return the stored password hash. | API / Security | A9; A11 | P-API-014 | Represented | Registration response assertions exclude credentials/password hash and verify safe user fields. |
| REQ-API-014 | Public registration shall not allow a client-supplied role to elevate a new account; newly created accounts shall receive the default `user` role unless the role is changed through the controlled administrative mechanism. | API / Security | A9; A11; A7; A14 | P-API-014; P-UI-018 | Represented | Playwright submits `role=admin` through the API and verifies returned and persisted role `user`; the UI registration also verifies the default role. |
| REQ-API-015 | The authentication session cookie shall be HttpOnly, use SameSite=Lax, use Secure in production, and have a 24-hour maximum age. | API / Session Security | A1 | P-UI-018 | Partial | Local HTTP automation verifies a real cookie, HttpOnly, SameSite=Lax, and an approximately 24-hour lifetime. Secure is production-dependent and was not asserted locally; production HTTPS cookie behavior is unverified. |
| REQ-API-016 | Application startup shall require a non-empty `SESSION_SECRET` before session-based authentication is enabled; startup shall fail if the variable is missing. | API / Configuration | A1 | None | Gap | The startup guard is implemented in `index.js`. The Railway deployment failed when `SESSION_SECRET` was missing and succeeded after the variable was configured. Dedicated startup/configuration automation has not yet been added. |

## Database

| Requirement ID | Requirement statement | Category | Source / implementation basis | Existing automated coverage | Coverage status | Notes / limitations |
|---|---|---|---|---|---|---|
| REQ-DB-001 | The configured test environment shall permit the required PostgreSQL connection. | Database / Environment | A1 connection configuration; S2/P2; test connection code | S-DB-001; P-DB-001 | Partial | The tests verify database connectivity through their own clients. They do not verify that the application's PostgreSQL connection is ready. |
| REQ-DB-002 | Accepted contact submissions shall persist the submitted name, email, and message. | Database | A1 parameterized insert | S-UI-007; S-API-002; P-UI-004; P-API-003 | Partial | Current helpers mainly identify records by email and message. Stored name, timestamp, exact row count, and duplicate detection are not fully asserted. |
| REQ-DB-003 | Requests rejected by contact validation shall not insert a message. | Database | A1 returns before insert | S-API-003–015; P-API-007–013; P-UI-005–007 indirectly for browser rejection; P-UI-017 for server rejection | Partial | Some Playwright missing-field API cases verify only the response. Browser-blocked submissions do not test server-side validation. |
| REQ-DB-004 | The application schema shall define a generated primary key, non-null name/email/message, 255-character name/email limits, and a default `created_at` timestamp. | Database | A7 | S-DB-002; P-DB-002 provide limited lifecycle coverage | Partial | Current DB tests cover only part of the schema. The JMeter environment uses `VARCHAR(100)` for name, while the application schema uses `VARCHAR(255)`. |
| REQ-DB-005 | The application schema shall define a `users` table with a generated primary key, unique non-null email, non-null `password_hash`, a default `user` role constrained to `user` or `admin`, and a database-generated `created_at` timestamp. | Database / Authentication | A7 | None | Gap | Dedicated automated schema and constraint checks for the `users` table have not yet been added. |
| REQ-DB-006 | Successful registration shall persist the normalized email, a bcrypt password hash rather than the plaintext password, and the default `user` role. | Database / Authentication | A8; A9; A11; A7 | P-UI-018; P-API-014 | Represented | Direct PostgreSQL checks verify normalized email, bcrypt hash behavior, default `user` role, and test-owned cleanup. |
| REQ-DB-007 | Authenticated sessions shall be stored in PostgreSQL, while application session data shall identify the authenticated account by user ID rather than storing the complete user record. | Database / Session | A9; A10; A13 | P-UI-019–020; P-API-014; P-API-019 | Partial | Real session persistence and invalidation are verified, and cleanup removes associated test-owned session rows. Session-row contents and storage structure are not independently asserted. |

REQ-DB-004 remains one combined schema requirement covering the existing `messages` table. Current database tests cover only part of it, so the individual schema conditions remain listed for future coverage.

## QA / Verification Requirements

These requirements describe test-framework configuration and QA support behavior rather than end-user application features.

| Requirement ID | Requirement statement | Category | Source / implementation basis | Existing automated coverage | Coverage status | Notes / limitations |
|---|---|---|---|---|---|---|
| REQ-QA-001 | The Selenium cross-browser suite shall select Chrome, Firefox, and Edge for the UI classes. | QA / Cross-browser | S1 suite and driver factory | S-UI-001–025 through the cross-browser suite | Configured | CI currently runs the default Chrome smoke/regression path, not the full cross-browser suite. |
| REQ-QA-002 | Playwright shall select Chromium, Firefox, and WebKit for UI specs and run accessibility, API, and DB specs in separate single projects. | QA / Cross-browser | P1; C2 | P-UI-001–024; P-A11Y-001–006; P-API-001–020; P-DB-001–002 | Configured and verified | 24 UI cases × 3 browsers = 72 UI executions; plus 6 Chromium accessibility, 20 API, and 2 DB = 100 configured executions before retries. The final full run passed 100/100. |
| REQ-QA-003 | The repository shall provide a controlled local utility for assigning an existing account the `user` or `admin` role for authorization testing without exposing public role-elevation functionality. | QA / Authorization Support | A14 | None | Gap | The utility was manually verified. P-UI-024/P-API-020 use a scoped PostgreSQL test helper for role elevation, not the application CLI utility; dedicated CLI automation has not been added. |

## Performance

| Requirement ID | Requirement statement | Category | Source / implementation basis | Existing automated coverage | Coverage status | Notes / limitations |
|---|---|---|---|---|---|---|
| REQ-PERF-001 | Each JMeter plan shall assert status code 200 and response content containing `"status":"ok"`. | Performance / Response Correctness | J1 response assertions | J-PERF-001–007 | Configured and represented | These checks verify the status endpoint response. The endpoint does not query the database. |
| REQ-PERF-002 | JMeter shall use the defined smoke, baseline, load, and stress profiles and support result collection for those executions. | Performance / Workload Configuration | J1 thread groups/timers/listeners; C3 command-line output | J-PERF-001–007 | Configured | Workload details are listed in `TEST_CASES.md`. No production SLA, sustained-capacity target, or breaking-point requirement is currently defined. |

## Requirement ID History

- REQ-UI-007 originally covered both automation-page rendering and navigation. Rendering remains REQ-UI-007, while navigation is now REQ-UI-009.
- Existing requirement IDs were kept when authentication was added.
- Authentication requirements were added as REQ-UI-010–014, REQ-API-006–016, REQ-DB-005–007, and REQ-QA-003.
- REQ-DB-004 remains the combined schema requirement for the `messages` table. REQ-DB-005 covers the separate `users` table.
- P-UI-016 provides a page-error check related to REQ-UI-007. REQ-UI-009 still has no dedicated navigation test.
- Authentication requirements now include Jest unit coverage, Playwright UI/API/database integration evidence, manual smoke evidence, and implementation review.

## Observations and Open Questions

The following items describe current behavior or areas that still need clarification. They are not separate requirements.

| Observation / Open Area | Current Status | Source | Notes |
|---|---|---|---|
| Shared footer previously attached a handler to a missing form on Project/Automation pages | DEF-001 — Closed / Fixed / Retest Passed | A3/A4 include A6; A6 now uses `contactForm?.addEventListener` | The issue was reproduced by P-UI-015/P-UI-016 and verified after the fix in Chromium. |
| Valid-JSON rejection previously left the send button disabled | DEF-002 — Closed / Fixed / Retest Passed | A6; P-UI-017 | Button recovery is verified in Chromium. Network/request and malformed/non-JSON recovery still need coverage. |
| Authentication navigation overflowed onto the white page background on the crowded Project navigation | DEF-005 — Closed / Fixed / Retest Passed | A5; A3; P-A11Y-002 | The scoped wrapping fix keeps the authentication link on the dark navbar. This is defect evidence, not a new accessibility requirement. |
| Keyboard focus applied insufficient-contrast authentication-link text on the dark navbar | DEF-006 — Closed / Fixed / Retest Passed | A5; shared navbar CSS; P-A11Y-006 | Manual reproduction covered all three shared-navigation pages; automated focused-state regression is on `/project` in Chromium. This is defect evidence, not a new accessibility requirement. |
| Truthy non-string contact fields can reach `trim()`; malformed/unsupported request bodies do not have a defined error contract | Needs clarification | A1 parser/handler | Define expected API behavior before adding acceptance criteria and automated tests. |
| Validation trims values for checking, but the insert uses the original field values | Current behavior; intent unclear | A1 | Storage normalization should be defined before tests assume trimming during persistence. |
| Oversized contact name/email values can reach database limits without application-level length validation | Current behavior | A1/A7 | `255` is a database schema limit, not a defined HTTP 400 validation response. |
| JMeter CI creates the contact name column as `VARCHAR(100)` | Environment difference | C3 compared with A7/C1/C2 | The application schema uses `VARCHAR(255)`; the JMeter value should not be treated as the application-wide limit. |
| API validation-error precedence follows the current branch order | Current behavior | A1 | REQ-API-005 records the current required-field-before-email behavior. |

## Coverage Gaps and Future Work

Current coverage gaps include:

- automation-page content and navigation;
- complete contact-form state and recovery behavior;
- stronger contact persistence checks;
- database schema and boundary checks;
- invalid-registration route variants and selected authentication boundaries;
- authenticated GuestRoute redirects and protected-destination restoration;
- `users` table schema/constraint verification;
- direct session-store row/content verification;
- production Secure-cookie verification and actual 24-hour expiration behavior;
- automated testing of the local role-management utility;
- full accessibility coverage for the React Login, Register, Account, and Admin pages.

Possible future application and QA improvements include:

- network and malformed-response recovery;
- defined database-outage responses;
- clearer normalization rules;
- stronger test-data isolation;
- CI/versioning improvements;
- representative write-performance testing;
- CSRF protection;
- authentication rate limiting;
- OAuth;
- MFA;
- password reset;
- email verification;
- formal database migration tooling.

These items should be added to the requirements and traceability documentation when they are implemented or formally defined.
