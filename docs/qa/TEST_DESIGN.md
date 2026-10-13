# Test Design — QA Automation Portfolio

## Purpose and baseline

Status: Reviewed documentation baseline. DEF-001 through DEF-006 are completed and closed. Jest unit testing covers contact and authentication validation. Playwright authentication/authorization integration coverage, manual authentication smoke testing, Playwright accessibility testing, and Selenium/Playwright API JSON Schema Validation have also been completed.

This document explains how the existing tests are classified, which test design techniques apply, and where coverage is still missing.

Sources include [REQUIREMENTS.md](REQUIREMENTS.md), the application source, Jest tests, Selenium/TestNG tests, Playwright tests, configuration files, and JMeter plans. [TEST_CASES.md](TEST_CASES.md) contains the implemented test cases. [TEST_PLAN.md](TEST_PLAN.md) defines the overall scope and test approach.

Execution evidence and defect history are recorded in [RTM.md](RTM.md) and [DEFECT_LOG.md](DEFECT_LOG.md).

## Test design methodology

1. Review the implemented behavior and define what is being tested.
2. Separate product behavior from environment and test-configuration requirements.
3. Identify test conditions and expected results supported by the implementation.
4. Keep unclear behavior and suspected defects separate from confirmed requirements.
5. Map test assertions to the related conditions and requirements.
6. Apply a formal test design technique only where it clearly fits the test condition.
7. Record missing coverage without creating test IDs before the tests are implemented.
8. Keep test level, test type, technique, interface, execution type, and result as separate classifications.

ISTQB terminology is used where it is helpful and applicable to the project.

## How Test Cases Are Classified

| Dimension | Values | Meaning in this portfolio |
|---|---|---|
| Test Level | Unit; Integration; System; End-to-End scope | Jest directly tests the contact and authentication validation modules. E2E describes a complete workflow and may include both System and Integration testing. |
| Test Type / Purpose | Functional; Regression; Smoke; Cross-browser; Accessibility; API; Database; Performance; Load; Stress | A test can have more than one purpose or type. |
| Test Approach | Black-box; Gray-box; White-box; Undetermined | Classification depends on what is being tested and what information the test uses. |
| Test Design Technique | Equivalence Partitioning; Boundary Value Analysis; Decision Table; State Transition; Use Case; Error Guessing; Checklist-based; Not specifically technique-driven | The technique is based on how test conditions and data are selected. |
| Scenario | Positive; Negative; Mixed / Not applicable | Positive/negative describes the scenario, not whether the test passed or failed. |
| Interface | UI; API; Database; Performance endpoint | A test can use more than one interface. |
| Execution | Manual; Automated | A manually triggered automated test is still an automated test. |

### Approach rules

- API tests are classified as Black-box when they verify external HTTP behavior without using internal implementation details.
- UI or API tests that also query PostgreSQL are classified as Gray-box because they use internal database information for verification.
- Direct database tests are classified relative to the application as the main test object.
- White-box is used when tests intentionally exercise internal logic, branches, or implementation structure.
- Reading source code while designing a test does not automatically make the test White-box.
- Inspecting DOM attributes or browser validation does not automatically make a test White-box.
- The verified structural coverage result is **100% statement, branch, function, and line coverage for the contact validation module only**. It is not whole-application coverage.
- A test can use a Black-box design technique such as Equivalence Partitioning while still being Gray-box overall if it also checks the database.

### Project examples

| Existing case | Classification | Reason |
|---|---|---|
| A-UNIT-014: required-field error takes precedence | Unit; Functional/Regression; White-box; Decision Table; Negative; Module; Automated | Calls the validation function directly and verifies the required-field branch when both required-field and email-format conditions are invalid. |
| P-UI-004: successful contact submission with DB verification | System/E2E scope; Integration verification; Functional/Regression/Cross-browser/Database; Gray-box; Use Case; Positive; UI + Database; Automated | Exercises the contact workflow and then verifies the result in PostgreSQL. |
| P-API-004: omitted name | System; Functional/API; Black-box; Equivalence Partitioning; Negative; API; Automated | Verifies HTTP 400, the expected response values, and the contact-response schema. |
| S-API-004: whitespace name | Integration; Functional/API/Database; Gray-box; Equivalence Partitioning; Negative; API + Database; Automated | Verifies HTTP 400, the expected response, schema, and non-persistence in PostgreSQL. |
| P-A11Y-001: Home-page axe scan | System; Accessibility/Regression; Black-box; Checklist-based; Positive expectation; UI; Automated | Runs automated accessibility rules against the rendered page. The initial failure identified DEF-003, and the post-fix run passed. |
| P-UI-018: registration and protected Account workflow | System/End-to-End scope; Integration verification; Functional/Regression/Cross-browser/Database; Gray-box; Use Case; Positive; UI + API + Database; Automated | Verifies UI registration, safe response/session cookie, protected Account state, normalized user data, bcrypt hash behavior, default role, and cleanup. |
| P-API-020: admin authorization matrix | System/Integration; Functional/API/Database; Gray-box; Decision Table; Mixed; API + Database; Automated | Verifies unauthenticated 401, normal-user 403, and admin 200 after controlled test-owned role elevation. |
| J-PERF-007: 1,000-user plan | System; Performance/Stress; Black-box; Not specifically technique-driven; Positive requests under high workload; Performance endpoint; Automated | Represents a configured stress workload. The virtual-user count is not a Boundary Value Analysis test. |

### API response validation model

API tests use several types of assertions together:

| Assertion level | Purpose | Existing implementation |
|---|---|---|
| HTTP | Verify status code and, where applicable, JSON content type | REST Assured and Playwright request assertions |
| Functional values | Verify expected status values, success values, and response messages | Existing status and contact assertions |
| JSON Schema Validation | Verify response structure, required properties, and data types | Selenium uses `matchesJsonSchemaInClasspath(...)`; Playwright uses Ajv through `utils/schemaValidator.js` |
| Persistence | Verify database insertion or non-persistence where applicable | JDBC and `pg` checks in selected contact tests |

The status schemas require `status` and `message` as strings. The contact schemas require `success` as a boolean and `message` as a string.

JSON Schema Validation adds structure and type checks to the existing API tests. It does not replace the functional assertions and does not create separate test-case IDs.

## Technique Selection Rationale

The test design technique is selected based on the behavior being tested.

| Technique | Why it fits this project |
|---|---|
| Equivalence Partitioning | Used for representative valid and invalid contact and authentication inputs |
| Boundary Value Analysis | Used for field lengths, password limits, and scroll thresholds |
| Decision Table Testing | Used when the result depends on combinations of validation, registration, session, or role conditions |
| State Transition Testing | Used for contact-form states and authentication/session changes such as login, logout, refresh, and role-based access |
| Use Case Testing | Used for complete user workflows such as submitting a contact form, registering, logging in, accessing protected pages, and logging out |
| Error Guessing | Used for likely failure conditions based on implementation and previous defects |
| Checklist-based Testing | Used for repeatable UI, navigation, accessibility, authentication, and security-related checks |

Simple visibility or navigation checks are marked **Not specifically technique-driven** when no formal test design technique is needed.

## Equivalence Partitioning

**Definition:** A Black-box technique that divides inputs into groups expected to behave the same way. Representative values are selected from each group.

**Applicable requirements:** Contact validation: REQ-CONTACT-002, REQ-API-002–004, REQ-DB-003. Authentication: REQ-API-006–010, REQ-API-014, and REQ-DB-006.

| Partition | Project example | Expected behavior |
|---|---|---|
| Omitted contact required field | name key absent, others valid | 400 required-fields message |
| Empty contact value | name = "" | 400 required-fields message |
| Whitespace-only contact value | name = "   " | 400 required-fields message |
| Valid contact values | synthetic name, accepted email, nonblank message | Insert and 200 when the database is available |
| Invalid nonblank contact email | test@ or @example.com | 400 invalid-email message |
| Browser-invalid contact form | empty required input or malformed email | Browser validation prevents normal submission |
| Valid registration input | valid email, valid password, matching confirmation | Validation accepts the input and registration can continue |
| Invalid registration email | malformed or unsupported email value | Registration validation rejects the input |
| Password missing a required character type | no uppercase, lowercase, number, or special character | Registration validation rejects the input |
| Password confirmation mismatch | valid password and different confirmation | Registration validation rejects the input |
| Existing registration email | valid registration data for an email already stored | 409 conflict; no second account |
| Valid login credentials | normalized registered email and correct password | Login succeeds and a session is created |
| Invalid login credentials | unknown email or incorrect password | 401 generic invalid-credentials response |
| Client supplies role=admin during registration | otherwise-valid registration | New account remains role=user |

**Existing coverage:** Selenium API tests S-API-003–015, Playwright API tests P-API-004–013, negative UI tests, and A-UNIT-001–015 cover contact-validation partitions. The authentication Jest suite adds 13 unit tests for valid normalized input, invalid registration email, password rules, password confirmation mismatch, and normalized login input. P-UI-018–024 and P-API-014–020 cover selected registration, login, session, role, and protected-access partitions at higher levels.

The authentication unit tests verify validation logic only. They do not test HTTP responses, sessions, database persistence, or browser behavior.

**Current gaps:** Contact gaps include explicit Playwright empty-string API cases, an empty-email UI case, tabs/newlines, more accepted email formats, mixed whitespace/Unicode values, and storage normalization. Authentication gaps include route-level invalid-registration variants, selected boundaries, duplicate-email race behavior, authenticated GuestRoute redirect behavior, stale/deleted-user sessions, and malformed authentication payloads.

**Future coverage:** Use representative values from each important input group. When testing one invalid condition, keep the other inputs valid so the failure is easy to identify. Authentication tests should also verify the related response, session, and database behavior where needed.

The current tests can be mapped to Equivalence Partitioning, although EP was not formally documented when every test was originally created.

## Boundary Value Analysis

**Definition:** A Black-box technique that tests values at and around important boundaries.

**Applicable requirements:** REQ-DB-004 schema lengths; REQ-UI-008 scroll threshold; REQ-API-002 minimum nonblank contact behavior; REQ-API-007 authentication password limits; REQ-DB-005 authentication email storage/validation boundary.

| Boundary | Proposed or existing conditions | Notes |
|---|---|---|
| Contact name VARCHAR(255) | 254, 255, 256 ordinary characters, other fields valid | Database boundary; the application has no separate name-length validation response |
| Contact email VARCHAR(255) | 254, 255, 256 characters using an email format accepted by the current regex | Test length separately from email format |
| Nonblank contact name/message | Length 0, 1, 2 using non-whitespace characters | Whitespace-only input is a separate partition |
| Authentication password minimum | 7, 8, 9 characters while keeping all required character types | 8 is the implemented minimum |
| Authentication password maximum | 63, 64, 65 characters while keeping all required character types | 64 is the implemented maximum |
| Authentication email maximum | 319, 320, 321 characters using valid email structure where practical | Validation rejects normalized email length above 320 |
| Scroll threshold | scrollY 399, 400, 401 | The control becomes visible only above 400 |

**Existing coverage:** Authentication password boundaries are covered by Jest with 7-character rejection, 8-character acceptance, 64-character acceptance, and 65-character rejection. Existing contact empty-input tests touch the lower boundary but do not provide a complete BVA set.

**Current gaps:** Contact/database length boundaries, authentication email-length boundaries, scroll-threshold tests, and route-level verification of password-boundary failures are not yet automated.

**Future coverage:** When testing password length, keep all other password rules valid and change only the length. For database boundaries, use a known schema and verify persistence or non-persistence where appropriate.

Important notes:

- 255 is the PostgreSQL contact-column limit, not a separate application validation rule.
- Authentication password limits of 8 and 64 are implemented validation boundaries.
- Authentication email values above 320 characters are rejected by the validation layer.
- JMeter workflows currently use VARCHAR(100) for the contact name; this is an environment/schema difference, not the application-wide limit.
- No small maximum length is defined for the contact message.
- JMeter virtual-user counts are workload settings, not BVA.
- An empty-field test is not automatically BVA just because its length is zero.

## Decision Table Testing

**Definition:** A Black-box technique used when the expected result depends on a combination of conditions.

**Applicable requirements:** Contact validation: REQ-API-002–005 and REQ-DB-003. Authentication and authorization: REQ-API-006–016, REQ-UI-011–014, and REQ-DB-006–007.

For contact validation, required-field checks happen before email-format validation. For authentication, the decision tables cover registration validation, duplicate accounts, session state, and user/admin access.

### Contact validation decision table

Definitions:

- N/E/M = name, email, or message is present and remains nonempty after `trim()`.
- F = `email.trim()` matches the implemented email regex.
- Y = Yes.
- N = No.
- — = this condition does not affect the result because an earlier condition already determines it.
- The success case assumes valid storage lengths and an available database.
- Malformed requests, structured values, and database failures are outside this table.

| Condition / action | DT-01 | DT-02 | DT-03 | DT-04 | DT-05 |
|---|---|---|---|---|---|
| Name present/nonblank (N) | N | Y | Y | Y | Y |
| Email present/nonblank (E) | — | N | Y | Y | Y |
| Message present/nonblank (M) | — | — | N | Y | Y |
| Email format accepted (F) | — | — | — | N | Y |
| HTTP status | 400 | 400 | 400 | 400 | 200 |
| success field | false | false | false | false | true |
| Response message | All fields are required. | All fields are required. | All fields are required. | Invalid email address. | Message sent successfully! |
| Database insertion | No | No | No | No | Yes, before success response |

DT-01 through DT-03 show the different required-field conditions. The implementation handles them with one combined required-field check.

**Existing coverage:** Missing, empty, and whitespace tests cover DT-01–03. Invalid-email tests cover DT-04. Positive API tests cover DT-05. A-UNIT-014 checks an empty required field together with a malformed email and confirms that the required-field error is returned first. A-UNIT-015 covers the invalid-email path when all required fields are present.

**Current gaps:** Blank message plus malformed email, additional combinations of missing fields, and other multiple-invalid-input cases are not separately covered.

**Future coverage:** Add selected combinations such as a blank message with malformed email and multiple missing fields. Expected behavior should remain the required-field error with no database insert where the current form contract applies.

### Authentication registration decision table

Definitions:

- E = normalized email is valid and within the implemented length limit.
- P = password meets the implemented length and character requirements.
- C = password confirmation matches.
- D = normalized email already exists.
- R = client attempts to submit a role value.
- Y = Yes.
- N = No.
- — = this condition does not affect the result because an earlier condition already determines it.

| Condition / action | AUTH-REG-01 | AUTH-REG-02 | AUTH-REG-03 | AUTH-REG-04 | AUTH-REG-05 | AUTH-REG-06 |
|---|---|---|---|---|---|---|
| Valid email (E) | N | Y | Y | Y | Y | Y |
| Valid password (P) | — | N | Y | Y | Y | Y |
| Confirmation matches (C) | — | — | N | Y | Y | Y |
| Existing email (D) | — | — | — | Y | N | N |
| Client supplies role=admin (R) | — | — | — | — | N | Y |
| Expected HTTP status | 400 | 400 | 400 | 409 | 201 | 201 |
| Account created | No | No | No | No | Yes | Yes |
| Persisted role | — | — | — | — | user | user |
| Authenticated session created | No | No | No | No | Yes | Yes |

The registration route does not use a client-supplied role when creating the account. It inserts the email and password hash, and PostgreSQL applies the default `user` role.

### Authentication and authorization access decision table

| Session / role condition | AUTH-ACCESS-01 | AUTH-ACCESS-02 | AUTH-ACCESS-03 |
|---|---|---|---|
| Authenticated session | N | Y | Y |
| Current role | — | user | admin |
| GET `/api/auth/me` | 401 | 200 | 200 |
| GET `/api/auth/admin` | 401 | 403 | 200 |
| React Account route | Redirect to Login | Allowed | Allowed |
| React Admin route | Redirect to Login | Access denied | Allowed |

**Existing coverage:** The authentication Jest tests cover validation logic. P-API-014 covers AUTH-REG-05/06, P-API-015 covers duplicate-email 409, and P-API-020 covers the `/admin` 401/403/200 access matrix. P-UI-023–024 cover representative normal-user denial and admin UI access. Manual smoke evidence remains a separate historical record.

**Current gaps:** Dedicated route-level automation is still needed for registration HTTP 400 validation variants. P-API-015 does not independently assert the post-conflict database row count, and session-store contents are not directly inspected.

**Future coverage:** Implement these route-level cases using the most appropriate API framework without copying every scenario into every framework. Each test should have isolated test data and reliable cleanup.

The DT identifiers are design-analysis labels, not final test-case IDs.

## State Transition Testing

**Definition:** A Black-box technique used to test how the system moves from one state to another after an event or action.

**Applicable requirements:** Contact form: REQ-CONTACT-002, REQ-CONTACT-004, REQ-CONTACT-005. Authentication/session behavior: REQ-UI-011–014, REQ-API-006, REQ-API-009–012, REQ-API-015, and REQ-DB-007.

### Contact form transitions

| State / event | Expected or observed transition | Existing checks |
|---|---|---|
| Ready + browser-invalid submission | Browser validation prevents normal submit-handler execution | Negative UI cases check validity; Playwright also checks hidden success state and non-persistence |
| Ready + browser-valid submit | Button becomes disabled, label changes to Sending..., request starts | Not explicitly asserted |
| Submitting + success=true | Success message appears, form resets, button is restored | Success message is covered; reset/button restoration are not fully asserted |
| Submitting + valid JSON success=false | Button is restored and input remains available for correction | P-UI-017 verifies rejection, restored button/label, and non-persistence |
| Submitting + network/JSON failure | No catch/finally recovery is currently implemented | No automated recovery check |
| Success shown + another submission | Another submit event can occur | No sequence coverage |

### Authentication/session transitions

| State / event | Expected transition | Existing evidence |
|---|---|---|
| Logged out + successful registration | Account created → session created → user becomes authenticated → Account page opens | P-UI-018; P-API-014 |
| Logged out + successful login | Session created → authenticated user → Account page opens | P-UI-021; P-API-016 |
| Logged out + direct Account navigation | Protected route detects no authenticated user → redirects to Login | P-UI-022 |
| Authenticated user + page refresh | `/api/auth/me` restores the current user → protected page remains available | P-UI-019 |
| Authenticated user + Logout | Session destroyed → React user state cleared → Login page | P-UI-020; P-API-019 |
| Logged out + direct Account navigation after Logout | Authentication check fails → Login page | P-UI-020 |
| Authenticated user + Admin navigation | Role check fails → Access denied; backend `/admin` returns 403 | P-UI-023; P-API-020 |
| Authenticated admin + Admin navigation | Frontend allows access → backend `/admin` succeeds | P-UI-024; P-API-020 |
| Authenticated account + controlled role elevation | Current role is reloaded and admin access succeeds | P-UI-024; P-API-020 |

**Existing coverage:** Contact state coverage is partial. Authentication validation is automated at unit level; P-UI-018–024 and P-API-014–020 now cover representative session and authorization transitions with real cookies and PostgreSQL-backed application behavior.

**Current gaps:** Browser Back behavior after logout, authenticated GuestRoute redirects, requested-destination restoration, stale/deleted-user sessions, actual cookie expiration, and direct session-store-content assertions remain uncovered.

**Future coverage:** Use Playwright for the most important browser/session flows and API-level tests for 401/403/session behavior. Do not duplicate every state transition in Selenium, Playwright, and pytest.

**DEF-002 example:**
Idle → Submitting → server returns `success=false` → Recoverable state.

Before the fix, P-UI-017 failed because the button remained disabled with `Sending...`. After the fix, the button was restored correctly. The focused recovery test passed, the successful contact test passed, and the broader Chromium UI run passed 17/17. Network and malformed-response recovery are still not verified.

## Use Case Testing

**Definition:** A technique that tests complete user goals and the main steps needed to complete them.

**Applicable requirements:** Contact submission: REQ-CONTACT-003, REQ-CONTACT-005, and REQ-DB-002. Authentication: REQ-UI-010–014, REQ-API-006, REQ-API-009–012, and REQ-DB-006–007.

### Contact example

Open Home → enter valid data → submit → verify success message → verify data in PostgreSQL → remove test-owned data.

### Authentication examples

- **Registration:** Open Register → enter valid data → submit → account is created → session is created → Account shows email and role=user.
- **Login:** Log out → log in with registered credentials → Account becomes available.
- **Authorization:** Normal user opens Admin → access denied / backend 403 → controlled role change to admin → refresh → Admin access succeeds.
- **Session:** Authenticate → refresh protected page → session remains active → logout → protected route redirects to Login.

**Existing coverage:** S-UI-007 and P-UI-004 automate the successful contact workflow with database verification. P-UI-018–024 automate the selected authentication user journeys, and P-API-014–020 verify their API/session/authorization counterparts. Jest authentication tests cover validation only and are not End-to-End tests.

**Current gaps:** Authenticated GuestRoute redirect behavior, requested-destination restoration, browser Back after logout, route-level invalid-registration variants, and additional session-failure states remain uncovered.

**Future coverage:** Use Playwright for a small number of complete authentication user journeys. Use Selenium for selected cross-browser UI flows and pytest/API tools for detailed API/DB variations. Keep simple validation cases at the unit or API level.

## Error Guessing

**Definition:** An experience-based technique used to test likely failure areas based on previous defects, implementation details, and common error patterns.

**Applicable areas:** Shared-page scripts, contact error handling, request parsing, database side effects, authentication/session handling, authorization, and security-sensitive inputs.

### Project examples

- shared footer used on a page without the contact form;
- rejected fetch response;
- malformed or non-JSON response;
- unexpected structured form values;
- rejected contact request inserting data;
- cleanup failure after a test;
- duplicate registration race;
- different login errors exposing whether an account exists;
- client-supplied `role=admin`;
- password hash returned in an API response;
- protected endpoint accessible without a session;
- normal user receiving admin access;
- stale session for a deleted user;
- protected access remaining after logout;
- browser Back showing protected content after logout;
- missing `SESSION_SECRET`;
- SQL-injection-style input in authentication fields.

**Existing coverage:** Contact unit tests cover several invalid-input conditions. Authentication Jest tests cover invalid email, password-rule failures, boundary failures, and password confirmation mismatch. Playwright now verifies duplicate normalized email, equivalent generic invalid-login errors, client-supplied role rejection, safe registration response fields, protected-route denial, logout invalidation, and user/admin authorization.

**Current gaps:** Duplicate-email race behavior, stale/deleted-user sessions, browser Back after logout, malformed auth payloads, SQL-injection-style inputs, session-store failures, invalid/expired cookies, and production Secure-cookie behavior remain uncovered.

**Future coverage:** Convert the most useful high-risk conditions into repeatable tests. Backend authentication and authorization must still be verified even when frontend route guards exist. Not every negative test should be classified as Error Guessing.

## Checklist-based Testing

**Definition:** An experience-based approach that uses a repeatable list of checks.

**Applicable requirements:** UI content, navigation, form labels, authentication pages, protected routes, role-based access, keyboard behavior, and accessibility. This applies mainly to REQ-UI-001–014 and related authentication requirements.

### Project examples

- required sections are visible;
- navigation links reach the correct destination;
- form controls have labels;
- browser pages load without relevant JavaScript errors;
- mobile navigation works;
- keyboard users can reach controls;
- Login/Register fields have correct labels and autocomplete attributes;
- password guidance is connected to the password field;
- authentication errors are announced;
- Account shows email and role;
- protected pages redirect when the user is not logged in;
- normal user receives Admin access denied;
- admin user receives Admin access;
- logout removes protected access.

**Existing coverage:** Existing UI tests already cover several checklist-style conditions. P-UI-015 and P-UI-016 check for startup page errors. P-UI-018–024 cover representative authentication routes, account identity/role, protection, and authorization. P-A11Y-001–006 provide automated accessibility checks for the EJS portfolio and the focused shared authentication-navigation state.

**Current gaps:** A maintained checklist covering all planned checks, automation-page navigation, broader keyboard/mobile checks, browser-error checks on more pages, and authentication-page accessibility.

Login, Register, Account, and Admin still need dedicated axe scans, keyboard-flow checks, focus-order checks, and alert/status announcement checks.

**Future coverage:** Maintain a simple checklist showing whether each item is covered by automation, manual testing, or still planned. Add selected accessibility checks to the React authentication routes without treating axe results as complete WCAG proof.

**DEF-001 example:**
Source review found an event handler attached to a form that did not exist on some pages. Browser reproduction confirmed the TypeError on `/project` and `/project/automation`. P-UI-015 and P-UI-016 failed before the fix and passed after optional chaining was added. The contact test and broader 16-case Chromium UI regression also passed.

## Accessibility Testing

The Playwright accessibility layer is classified as **System/UI Accessibility Testing**. It uses `@axe-core/playwright` and axe-core in a dedicated Chromium project.

The current automated accessibility scope includes:

- full-page scans for Home, Project, and Automation pages;
- one keyboard focus/Enter navigation check;
- one keyboard-focused authentication-navigation contrast check;
- selected contact-form accessible-name, required-field, and focus checks.

P-A11Y-001 and P-A11Y-002 initially failed because of color-contrast issues and led to DEF-003 and DEF-004. After the CSS fixes, both passed. P-A11Y-003–005 passed in both the initial and post-fix runs. Existing P-A11Y-002 later detected DEF-005 on the crowded Project navigation; DEF-006 added P-A11Y-006 to run axe while the shared authentication link retains keyboard focus. Both defects are Closed / Fixed / Retest Passed, and the current accessibility project passed 6/6 in Chromium.

Automated accessibility checks can find issues such as:

- missing accessible names;
- invalid ARIA;
- some landmark or semantic problems;
- some color-contrast problems.

They cannot prove full WCAG compliance.

Manual accessibility testing should still include:

- full keyboard-only navigation;
- logical tab order;
- visible focus;
- 200% zoom and responsive reflow;
- screen-reader names, roles, states, and announcements;
- heading structure and reading order;
- validation and error-message usability.

The React authentication pages (`/auth/login`, `/auth/register`, `/auth/account`, and `/auth/admin`) are not yet included in the dedicated Playwright accessibility suite.

The implementation includes labels, required attributes, alert/status roles, `aria-live`, password guidance, and visible focus styling, but these still need testing.

Future authentication accessibility coverage should include representative axe scans, keyboard navigation, focus behavior, accessible names, error announcements, and responsive/zoom checks.

No separate accessibility requirement ID is currently defined in [REQUIREMENTS.md](REQUIREMENTS.md). Existing accessibility tests and defects are tracked through the current documentation and traceability.

## Classification Notes

- EP and BVA are Black-box design techniques.
- A test can still be Gray-box if it uses the database as part of verification.
- Data-driven providers and loops are execution methods, not test design techniques.
- Smoke and Regression describe test purpose or selection.
- Cross-browser describes where the test is executed.
- Positive/Negative describes the scenario, not the test result.
- End-to-End describes the workflow scope and may overlap System and Integration testing.
- Direct database tests may be classified differently depending on whether the test object is the application or the database.
- DOM/browser validation checks are treated as interface-level checks in this portfolio.
- A status-only API test is classified as System/Black-box here.
- JMeter stress profiles are workload configurations, not proof that the system reached a breaking point.
- JMeter samples are measurements, not separate designed test cases.
- Frontend `ProtectedRoute` and `GuestRoute` improve user flow, but backend middleware remains the real authentication/authorization security control.
- Manual Register/Login/Logout/Admin smoke testing remains historical execution evidence; P-UI-018–024 and P-API-014–020 provide the current automated higher-level coverage.
- The local `set-role` utility is a QA/development helper, not a public application feature.
- Authentication and authorization are separate: a valid session can still receive 403 if the user does not have the required role.
- Password verification should confirm that plaintext is not stored and that a hash exists. The hash should not be exposed or reversed.
- Client-supplied role data is not trusted. Registration relies on the database default `user` role.
- Configuration alone does not prove browser compatibility, performance capacity, or production readiness.

## Coverage Gaps and Future Work

Authentication/authorization automation now covers the principal UI/API/session/RBAC workflows. Remaining gaps are narrower conditions and production-specific behavior.

Priority areas include:

- password and email boundaries;
- route-level invalid-registration variants;
- authenticated GuestRoute redirects and protected-destination restoration;
- duplicate-email race behavior and explicit post-conflict row-count verification;
- `users` table constraints;
- direct session-store content/failure behavior;
- stale/deleted-user and invalid/expired session behavior;
- browser Back after logout;
- production Secure-cookie verification and actual expiration behavior;
- automated verification of the local role-management utility;
- accessibility of Login, Register, Account, and Admin pages.

Other remaining areas include network/JSON failure recovery, contact error feedback and retry behavior, form reset/button restoration, browser errors on additional routes, contact length boundaries, additional combined-invalid cases, fuller database persistence checks, database outages, automation-page navigation, broader manual accessibility, mobile behavior, and performance testing for representative contact-form submissions.

Future items such as CSRF protection, authentication rate limiting, OAuth, MFA, password reset, email verification, database migrations, and performance improvements are not part of the current tested implementation.

New test-case IDs should be added only when the related tests are implemented.

## Reference

This document uses standard QA and ISTQB terminology where it fits the project. Project-specific classifications are based on the current implementation and existing tests.
