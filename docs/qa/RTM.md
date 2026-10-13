# Requirements Traceability Matrix

## Scope and Evidence

This matrix links requirements to existing automated tests, manual evidence, defect evidence, and known coverage gaps.

Current evidence includes:

- DEF-001 through DEF-006 defect cycles;
- 28 passing Jest unit tests for contact and authentication validation;
- Playwright accessibility execution and retest;
- Selenium and Playwright API JSON Schema Validation runs;
- manual authentication and authorization smoke testing;
- the final 100-execution Playwright run, including automated authentication, session, RBAC, and cleanup evidence.

[REQUIREMENTS.md](REQUIREMENTS.md) defines the current requirements. [TEST_CASES.md](TEST_CASES.md) contains 129 documented automated test cases.

Not every documented test case has been executed in one combined run. Manual authentication evidence remains separate from the current Playwright automation evidence.

[DEFECT_LOG.md](DEFECT_LOG.md) contains defect reproduction and lifecycle details. DEF-001 through DEF-006 are Closed / Fixed / Retest Passed.

## Jest Unit-Testing Traceability

| Requirement / Condition | Requirement ID | Test Case ID | Automation Reference | Execution Evidence | Current Coverage Status | Notes |
|---|---|---|---|---|---|---|
| Empty and whitespace-only required contact values return the required-field error | REQ-API-002 | A-UNIT-007–014 | [contactValidation.test.js](../../tests/unit/contactValidation.test.js) — `validateContactInput` cases | 28-test Jest run passed locally and in GitHub Actions | Direct unit coverage of represented variants | Covers empty/whitespace name, email, and message; all-empty input; and one combined-invalid precedence condition. No HTTP or DB assertion occurs. |
| Trimmed contact email-format decision | REQ-API-003 | A-UNIT-002–005; A-UNIT-015 | [contactValidation.test.js](../../tests/unit/contactValidation.test.js) — `isValidEmail` and invalid-email cases | Same verified Jest run | Direct unit coverage of represented regex partitions | Covers missing `@`, incomplete domain, missing local part, surrounding whitespace, and invalid-email handling. It is not complete email-standard coverage. |
| Valid contact input passes validation before persistence | REQ-API-004 | A-UNIT-001; A-UNIT-006 | [contactValidation.test.js](../../tests/unit/contactValidation.test.js) — valid email/contact cases | Same verified Jest run | Validation covered at unit level | Route-level HTTP 200, PostgreSQL insertion, and persistence are covered by higher-level tests. |
| Required-field rejection takes priority over invalid-email rejection | REQ-API-005 | A-UNIT-014 | [contactValidation.test.js](../../tests/unit/contactValidation.test.js) — required-field precedence | Same verified Jest run | Implemented and verified at unit level | Empty name plus malformed email returns `All fields are required.` Other combined-invalid cases are not separately covered. |
| Password length boundaries and required character classes are enforced | REQ-API-007 | A-UNIT-016–023 | [authValidation.test.js](../../tests/unit/authValidation.test.js) — `validatePassword` cases | Same verified Jest run | Direct unit coverage of implemented password rules | Covers 7/8/64/65-character boundaries and missing uppercase, lowercase, number, and special-character conditions. Route-level HTTP 400 behavior is not covered here. |
| Registration email is normalized and valid registration input is accepted | REQ-API-006 | A-UNIT-024–025 | [authValidation.test.js](../../tests/unit/authValidation.test.js) — `normalizeEmail` and valid `validateRegistrationInput` cases | Same verified Jest run | Validation covered at unit level | HTTP 201, user creation, bcrypt persistence, session creation, default role, and response fields require higher-level testing. |
| Invalid registration email and mismatched confirmation are rejected | REQ-API-007 | A-UNIT-026–027 | [authValidation.test.js](../../tests/unit/authValidation.test.js) — invalid registration cases | Same verified Jest run | Direct unit coverage of represented validation conditions | Route-level HTTP 400 and database non-persistence are not covered here. |
| Valid login input is normalized before credential verification | REQ-API-009 | A-UNIT-028 | [authValidation.test.js](../../tests/unit/authValidation.test.js) — `validateLoginInput` normalization | Same verified Jest run | Input normalization covered at unit level | Credential verification, HTTP 200/401 behavior, generic error handling, and session creation require higher-level tests. |

Jest 30.5.2 executed 2 suites with **28 passed, 0 failed, and 0 skipped**.

The two suites contain:

- 15 contact-validation tests;
- 13 authentication-validation tests.

The tests passed locally and in the GitHub Actions Unit Tests workflow using Node.js 22.

The previously verified `npm run test:coverage` result showed **100% statement, branch, function, and line coverage for the contact validation module only**.

No structural coverage percentage is currently recorded for the authentication validation module.

The Jest unit tests do not require PostgreSQL, a browser, Express startup, Railway, or application network requests.

## Authentication and Authorization Traceability

The authentication feature is implemented in the application.

The validation layer has automated Jest coverage. Playwright adds dedicated UI/API/session/authorization/database coverage with real session cookies and test-owned cleanup. Manual smoke evidence remains a separate historical layer.

| Requirement / Condition | Requirement ID | Existing Automated Test Case ID(s) | Current Evidence | Coverage Status | Planned Verification |
|---|---|---|---|---|---|
| React authentication routes exist under `/auth` | REQ-UI-010 | P-UI-018; P-UI-021; P-UI-023–024 | Register, Login, Account, and Admin journeys passed in Chromium, Firefox, and WebKit | Represented | React-page accessibility remains separate |
| Guest Login/Register behavior | REQ-UI-011 | P-UI-018; P-UI-021 | Logged-out Register and Login routes are exercised | Partial | Authenticated GuestRoute redirect to Account is not a dedicated assertion |
| Account requires authentication | REQ-UI-012 | P-UI-019–020; P-UI-022 | Guest redirect, refresh persistence, and protected denial after logout passed cross-browser | Represented | Browser Back behavior remains untested |
| Admin UI enforces role state | REQ-UI-013 | P-UI-023–024 | Normal user denied; controlled test-owned admin allowed | Represented | Backend authorization is independently covered by P-API-020 |
| Account displays email/role and supports logout | REQ-UI-014 | P-UI-018; P-UI-020–021; P-UI-024 | Account identity/role and Logout assertions passed cross-browser | Represented | — |
| Valid registration input validation | REQ-API-006 | A-UNIT-024–025; P-API-014; P-UI-018 | Jest validation and Playwright HTTP/UI/session/persistence checks passed | Represented | Jest and higher-level evidence remain distinct |
| Registration validation rules | REQ-API-007 | A-UNIT-016–023; A-UNIT-026–027 | Jest validation passed | Partial | Add route-level HTTP 400 and non-persistence verification |
| Duplicate registration returns 409 | REQ-API-008 | P-API-015 | Duplicate normalized email returned 409 | Partial | Second-account row count is not independently asserted |
| Login success and generic invalid-credentials behavior | REQ-API-009 | A-UNIT-028; P-API-016–017; P-UI-021 | Valid login passed; wrong password and unknown email returned the same generic 401 | Represented | — |
| Current-user endpoint requires/restores authenticated session | REQ-API-010 | P-API-014; P-API-018; P-UI-019 | Authenticated `/me`, unauthenticated 401, and refresh restoration passed | Represented | — |
| Logout destroys authenticated access | REQ-API-011 | P-API-019; P-UI-020 | Subsequent `/me` and Account access were denied | Partial | Cookie-clearing response details are not separately asserted |
| Admin endpoint enforces authentication and role | REQ-API-012 | P-API-020; P-UI-023–024 | 401/403/200 API matrix and representative UI states passed | Represented | — |
| Authentication responses exclude password hash | REQ-API-013 | P-API-014 | Registration response excludes credentials/password hash and contains safe user data | Represented | — |
| Public registration cannot elevate role | REQ-API-014 | P-API-014; P-UI-018 | Client `role=admin` is ignored; returned and persisted role remains `user` | Represented | Controlled role elevation is test-owned DB setup, not public behavior |
| Session cookie attributes | REQ-API-015 | P-UI-018 | Real cookie exists with HttpOnly, SameSite=Lax, and approximately 24-hour lifetime | Partial | Secure was not asserted over local HTTP; production HTTPS behavior is unverified |
| `SESSION_SECRET` is required at startup | REQ-API-016 | None | Application contains a startup guard requiring `SESSION_SECRET`. Railway deployment failed when the variable was missing and succeeded after it was configured | Manual/configuration evidence; automated gap | Optional startup/configuration automation |
| `users` schema and constraints | REQ-DB-005 | None | Schema reviewed | Gap | Add automated schema/constraint checks if useful |
| Registration persists normalized email, bcrypt hash, and default user role | REQ-DB-006 | P-UI-018; P-API-014 | Direct PostgreSQL assertions and scoped cleanup passed | Represented | Uses test-owned UUID email data |
| Sessions use PostgreSQL-backed storage and identify account by user ID | REQ-DB-007 | P-UI-019–020; P-API-014; P-API-019 | Real persistence/invalidation behavior passed; associated session rows are removed during cleanup | Partial | Session-row contents and storage structure are not independently asserted |
| Controlled local role-management utility supports authorization testing | REQ-QA-003 | None | `npm run set-role` remains manually verified; automated auth tests use a separate scoped PostgreSQL helper | Manual evidence; automated CLI gap | Helper-based role setup does not count as CLI-utility coverage |

## DEF-001 Traceability

| Requirement / Condition | Requirement ID | Test Case ID | Automation Reference | Defect ID | Execution Evidence | Coverage Status | Notes |
|---|---|---|---|---|---|---|---|
| Project-page content/rendering | REQ-UI-005 | P-UI-008–014 | QA-Portfolio-Playwright/tests/ui/project.spec.js | DEF-001 (related page scope) | All seven passed in the broader Chromium 16/16 run | Existing content assertions covered | These tests verify page content but do not check all JavaScript page errors. |
| Automation-page rendering | REQ-UI-007 | P-UI-016 (related check only) | QA-Portfolio-Playwright/tests/ui/pageErrors.spec.js | DEF-001 | Pre-fix FAIL; post-fix focused PASS; broader Chromium PASS | Partial | Direct route-load/pageerror check; no content assertion. |
| No startup page errors on `/project` | No separate product ID; related REQ-UI-005 | P-UI-015 | QA-Portfolio-Playwright/tests/ui/pageErrors.spec.js — project page should load without JavaScript page errors | DEF-001 | Pre-fix FAIL; post-fix focused PASS; broader Chromium PASS | Implemented and verified in Chromium | The pageerror listener is registered before navigation and the error list is checked after load. |
| No startup page errors on `/project/automation` | No separate product ID; related REQ-UI-007 | P-UI-016 | QA-Portfolio-Playwright/tests/ui/pageErrors.spec.js — automation page should load without JavaScript page errors | DEF-001 | Pre-fix FAIL; post-fix focused PASS; broader Chromium PASS | Implemented and verified in Chromium | This does not cover navigation links under REQ-UI-009 or later interaction errors. |
| Successful contact workflow and persistence | REQ-CONTACT-003; REQ-CONTACT-005; REQ-DB-002 | P-UI-004 | QA-Portfolio-Playwright/tests/ui/contact.spec.js — successful contact submission | DEF-001 (regression impact check) | Post-fix focused PASS; broader Chromium PASS | Partial requirement coverage | Success message and email/message persistence were verified. Cleanup completed without error, but no separate post-delete assertion was performed. |
| Automation-page link/navigation | REQ-UI-009 | None dedicated | No dedicated navigation assertion | DEF-001 (scope boundary only) | No dedicated execution evidence | Gap | P-UI-016 opens the route directly and does not verify navigation to it. |

The automation references above point to the sibling Playwright repository.

During DEF-001 verification, `pageErrors.spec.js` was local and uncommitted, so no published GitHub revision is referenced for that historical run.

### DEF-001 Historical Execution

- Pre-fix focused `pageErrors` run: **2 failed** with `TypeError: Cannot read properties of null (reading 'addEventListener')`.
- Post-fix focused `pageErrors` run: **2 passed**.
- Post-fix focused run including the successful contact test: **3 passed**.
- Broader Chromium UI run: **16 passed, 0 failed, 0 skipped**.
- The 16-case run contained:
  - Home: 3
  - Contact: 4
  - Project: 7
  - Page errors: 2
- The broader run covered P-UI-001–016.
- Repeated focused and regression runs are not counted as additional unique test cases.
- At DEF-001 closure, the catalogue contained **80 entries**.
- Playwright contained **31 unique cases**:
  - 16 UI
  - 13 API
  - 2 DB
- Configured Playwright execution count before retries was `16 × 3 + 13 + 2 = 63`.
- The value 63 represents configured executions, not a verified 63-test run.
- Other catalogue cases kept their existing execution status; the DEF-001 cycle did not execute all 80 cases.

## Remaining Coverage Review

Some coverage areas still need separate decisions or additional automation.

Important areas include:

- rendering checks versus JavaScript page-error checks;
- unit validation versus route/session/database behavior;
- additional combined-invalid contact conditions;
- remaining authentication validation variants, authenticated GuestRoute behavior, session-store details, production cookie behavior, and React-page accessibility;
- product-level accessibility requirements and manual accessibility acceptance criteria.

The contact Jest tests cover one combined required-field/email-error precedence condition. Other combined-invalid scenarios remain separate test-design decisions.

Authentication validation has verified Jest evidence, and the principal higher-level Playwright UI/API/session/RBAC workflows are automated. Remaining gaps are listed above and in [TEST_DESIGN.md](TEST_DESIGN.md).

[TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md) contains the completed execution summaries.

`PERFORMANCE_TEST_REPORT.md` remains planned for a later stage.

## DEF-002 Traceability

| Requirement / Condition | Requirement ID | Test Case ID | Automation Reference | Defect ID | Execution Evidence | Coverage Status | Notes |
|---|---|---|---|---|---|---|---|
| Recover from valid-JSON rejection | REQ-CONTACT-004 (related lifecycle only) | P-UI-017 | QA-Portfolio-Playwright/tests/ui/contact.spec.js — contact form should recover after server-side validation rejection | DEF-002 | Pre-fix FAIL; focused post-fix PASS; broader Chromium 17/17 PASS | Implemented and verified | Pending state is not separately asserted. REQ-CONTACT-005 covers successful submission, not rejection recovery. |
| Whitespace-name rejection and non-persistence | REQ-API-002; REQ-DB-003 | P-UI-017 | Same UI case with PostgreSQL helper | DEF-002 | HTTP 400 / `success=false` observed; matching row absent before and after fix | Asserted subset verified | Rejected input did not require cleanup because no matching row was inserted. |
| Successful-contact impact check | REQ-CONTACT-003; REQ-CONTACT-005; REQ-DB-002 | P-UI-004 | QA-Portfolio-Playwright/tests/ui/contact.spec.js | DEF-002 | Focused PASS; broader Chromium PASS | Existing asserted subset verified | Persistence passed and cleanup completed without error; no separate post-delete assertion was performed. |

DEF-002 is **Closed / Fixed / Retest Passed**.

Before the fix, P-UI-017 failed because:

- expected enabled button, received disabled;
- expected `Send Message`, received `Sending...`;
- expected button text not to remain `Sending...`.

The fix moved button restoration outside the `data.success` branch.

Broader Chromium regression on 2026-09-30:

- **17 executed**
- **17 passed**
- **0 failed**
- **0 skipped**
- duration: **15.6 seconds**
- Chromium
- no retries
- one worker

Both DEF-001 regression cases also passed.

At DEF-002 closure:

- catalogue: **81 entries**
- Playwright: **32 unique cases**
  - 17 UI
  - 13 API
  - 2 DB
- configured Playwright executions before retries: `17 × 3 + 13 + 2 = 66`

The value 66 is a configured execution count, not a verified 66-test run.

Firefox/WebKit, separate API/DB projects, Selenium, and JMeter were not executed as part of the DEF-002 cycle.

### Historical Catalogue Growth

After the contact-validation Jest tests were added, the catalogue contained **96 entries**:

- previous 81 entries;
- A-UNIT-001–015.

These 15 tests were added after the DEF-001/DEF-002 execution cycles and do not change their historical scope.

The later authentication-validation addition introduced A-UNIT-016–028 and increased the catalogue at that time to **114 entries**.

These additional tests also do not change the historical DEF-001 or DEF-002 execution results.

The subsequent Playwright authentication work added 14 unique cases, and DEF-006 added one accessibility case, increasing the current catalogue to **129 entries**. These additions likewise do not rewrite earlier cycle results.

Network/request failures and malformed/non-JSON recovery are still not verified.

Visible rejection feedback, retry behavior after rejection, and stronger cleanup verification also remain gaps.

See [DEFECT_LOG.md](DEFECT_LOG.md) for detailed defect evidence and [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md) for cycle summaries.

## API JSON Schema Validation Traceability

JSON Schema Validation is used inside the existing API tests.

It adds response-structure and data-type checks but does not create separate product requirements or new test-case IDs.

Functional assertions still verify HTTP status, exact values/messages, and database behavior where applicable.

REQ-API-005 continues to use its existing functional precedence tests. Schema validation does not add separate coverage for that requirement.

| Requirement / Response Contract | Existing Test Case IDs | Selenium Evidence | Playwright Evidence | Coverage Note |
|---|---|---|---|---|
| REQ-API-001 — status response | S-API-001; P-API-001–002 | `matchesJsonSchemaInClasspath(...)` verifies required string `status` and `message`; included in the 15/15 API pass and successful Selenium CI run | Ajv verifies the same properties/types in P-API-001; P-API-002 separately checks JSON content type; included in the 13/13 API pass and successful Playwright CI run | Exact values and HTTP/content-type checks remain separate functional assertions. |
| REQ-API-002 — required-field rejection | S-API-003–008; S-API-013–015; P-API-004–009 | Contact schema verifies boolean `success` and string `message`; HTTP 400, exact rejection values, and JDBC non-persistence remain separately asserted | Ajv verifies the same response structure; HTTP 400, exact rejection values, and represented `pg` non-persistence remain separately asserted | Schema validation does not add new input partitions. |
| REQ-API-003 — invalid-email rejection | S-API-009–012; P-API-010–013 | Contact schema plus HTTP 400, exact invalid-email message, and JDBC non-persistence assertions | Contact schema plus HTTP 400, exact invalid-email message, and `pg` non-persistence assertions | Existing email variants remain unchanged. |
| REQ-API-004 — accepted contact | S-API-002; P-API-003 | Contact schema plus HTTP 200, exact success values, JDBC persistence, and cleanup | Contact schema plus HTTP 200, exact success values, `pg` persistence, and cleanup | Schema validation alone does not prove database insertion or cleanup. |

Selenium uses REST Assured 5.5.6 with `io.rest-assured:json-schema-validator:5.5.6`.

Playwright uses Ajv 8.20.0 through a shared schema-validation helper.

Verified API execution evidence:

- Selenium API: **15/15 passed**
- Playwright API: **13/13 passed**
- both related GitHub Actions workflows succeeded

These schema checks remain part of the existing API test cases.

Current catalogue:

- **129 unique documented automated cases**
- Playwright: **52 unique cases**
  - 24 UI
  - 6 accessibility
  - 20 API
  - 2 DB
- Playwright configured executions before retries: **100**

The authentication Jest additions did not change the Playwright counts or the earlier API schema-validation results. The later Playwright authentication and DEF-006 additions are included in the current totals above.

The final full Playwright run executed all **100 configured executions** and passed **100**, with **0 failed** and **0 skipped**, in approximately **1.2 minutes**. This is a multi-project execution count, not 100 unique cases and not a combined run of the 129-case portfolio catalogue.

## Accessibility Testing Traceability

There is currently no separate accessibility product requirement ID in [REQUIREMENTS.md](REQUIREMENTS.md).

Existing accessibility tests and confirmed defects are mapped to related page/function requirements where appropriate.

| Requirement / Condition | Requirement ID | Test Case ID | Automation Reference | Defect ID | Execution Evidence | Coverage Status | Notes |
|---|---|---|---|---|---|---|---|
| Home-page automated accessibility scan | No accessibility product ID; related REQ-UI-004 | P-A11Y-001 | QA-Portfolio-Playwright/tests/accessibility/accessibility.spec.js — Home-page axe scan | DEF-003 | Pre-fix FAIL — `color-contrast`; 2.48:1 vs 4.5:1. Post-fix PASS — 5.473:1 base; 7.584:1 interactive states | Fixed; retest passed; closed | Affected `#project-details-button`. Functional link behavior was not the failed assertion. |
| Project-page automated accessibility scan | No accessibility product ID; related REQ-UI-005 | P-A11Y-002 | Same specification — Project-page axe scan | DEF-004 | Pre-fix FAIL — `color-contrast`; 4.263:1 vs 4.5:1. Post-fix PASS — 5.152:1 | Fixed; retest passed; closed | Affected three architecture connector labels. Content/navigation were outside the failed assertion. |
| Automation-page automated accessibility scan | No accessibility product ID; related REQ-UI-007 | P-A11Y-003 | Same specification — Automation-page axe scan | None | PASS in initial execution and post-fix retest | Implemented and verified in Chromium | A passing axe scan does not prove complete accessibility or full WCAG compliance. |
| Main navigation focus and Enter activation | REQ-UI-006 (Architecture-link subset); no accessibility product ID | P-A11Y-004 | Same specification — main navigation keyboard check | None | PASS in initial execution and post-fix retest | Implemented and verified asserted subset | Covers one Project-page navigation link, not full keyboard navigation or tab order. |
| Contact accessible names, required semantics, and focus sequence | REQ-CONTACT-002 (required-attribute subset); no accessibility product ID | P-A11Y-005 | Same specification — contact form accessibility check | None | PASS in initial execution and post-fix retest | Implemented and verified asserted subset | Checks labels, required attributes, a short focus sequence, and enabled submit state. It does not test validation announcements or full screen-reader usability. |
| Project authentication link remains within the dark navbar | No accessibility product ID; related page/authentication scope REQ-UI-005 and REQ-UI-010 | P-A11Y-002 (existing page scan) | Same specification — Project-page axe scan | DEF-005 | Pre-fix FAIL — 1.48:1; focused retest PASS — 11.15:1 normal and 7.73:1 hover | Fixed; retest passed; closed | DEF-005 reused the existing Project scan and did not create a new test ID. |
| Shared authentication link retains contrast while keyboard focused | No accessibility product ID; related authentication-navigation scope REQ-UI-010 | P-A11Y-006 | Same specification — `/project` focused authentication-link axe check | DEF-006 | Pre-fix FAIL — 1.22:1; post-fix PASS — 7.73:1; complete accessibility 6/6 PASS | Fixed; retest passed; closed | Manual reproduction covered all three shared-navigation pages. Focus ring and Enter activation continued to work. |

Accessibility command used for both phases:

`npm run test:accessibility -- --retries=0 --workers=1`

### Initial Execution

- **5 total**
- **3 passed**
- **2 failed**
- **0 skipped**

The two failures confirmed DEF-003 and DEF-004.

### Post-Fix Retest

- **5 total**
- **5 passed**
- **0 failed**
- **0 skipped**

Both defects progressed:

Confirmed → Fixed → Retest Passed → Closed

This five-case result is the historical DEF-003/DEF-004 retest. Later evidence is separate:

- DEF-005 focused retest: **1 passed** using existing P-A11Y-002;
- DEF-006 focused retest: **1 passed** using new P-A11Y-006;
- current complete accessibility project: **6 passed, 0 failed, 0 skipped**;
- DEF-005 and DEF-006 are also Closed / Fixed / Retest Passed.

No axe rule, tag, element, or page section was disabled or excluded.

The tests used:

- `@axe-core/playwright` 4.13.0
- axe-core 4.13.0
- Chromium accessibility project
- WCAG A/AA-oriented supported rule tags

At the time accessibility coverage was added, the catalogue contained **101 entries**.

After the later addition of 13 authentication-validation Jest tests, the catalogue increased to **114 entries**. Fourteen Playwright authentication cases and P-A11Y-006 subsequently increased the current catalogue to **129 entries**.

Playwright currently contains **52 unique cases**:

- 24 UI
- 6 accessibility
- 20 API
- 2 database

Configured full Playwright execution before retries is **100**:

- 72 cross-browser UI executions
- 6 Chromium accessibility executions
- 20 API
- 2 DB

Only the five accessibility cases were executed for the historical DEF-003/DEF-004 evidence described above. The later complete accessibility run executed six cases, and the final full Playwright run executed all configured projects.

Manual accessibility testing is still needed for:

- complete keyboard-only navigation;
- logical tab order;
- visible focus;
- zoom and responsive reflow;
- screen-reader behavior;
- reading order;
- validation and error-feedback usability.

The automated accessibility results do not represent complete WCAG compliance.
