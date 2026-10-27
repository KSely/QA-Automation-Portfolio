# Test Design — QA Automation Portfolio

## Purpose

This document explains how the current automated tests are designed and classified.

It covers:

- test levels and test types
- Black-box, Gray-box, and White-box classification
- test design techniques
- examples from the current automation
- current coverage gaps

Related documents:

- `REQUIREMENTS.md`
- `TEST_PLAN.md`
- `TEST_CASES.md`
- `RTM.md`
- `DEFECT_LOG.md`

DEF-001 through DEF-006 are closed.

Current automation includes Jest, Selenium, Playwright, API schema validation, authentication/authorization testing, accessibility testing, database checks, and JMeter performance testing.

---

## Test Design Approach

The test design process is:

1. Review the implemented behavior.
2. Identify the behavior that needs to be tested.
3. Define expected results.
4. Separate product behavior from environment or test-configuration requirements.
5. Select the test level and test type.
6. Apply a test design technique where it is useful.
7. Map tests to requirements.
8. Record missing coverage separately from implemented tests.

ISTQB terminology is used where it helps describe the test design.

---

## Test Classification

| Dimension | Values |
|---|---|
| Test Level | Unit, Integration, System, End-to-End |
| Test Type | Functional, Regression, Smoke, Cross-browser, Accessibility, API, Database, Performance, Load, Stress |
| Test Approach | Black-box, Gray-box, White-box |
| Test Design Technique | Equivalence Partitioning, Boundary Value Analysis, Decision Table, State Transition, Use Case, Error Guessing, Checklist-based |
| Scenario | Positive, Negative, Mixed |
| Interface | UI, API, Database, Performance endpoint |
| Execution | Manual, Automated |

A test can belong to more than one category.

### Classification Rules

- API tests are Black-box when they verify HTTP behavior only.
- UI or API tests that also query PostgreSQL are Gray-box.
- Direct database checks are Gray-box relative to the application.
- Jest validation tests are White-box because they call validation functions directly.
- Reading source code while designing a test does not automatically make the test White-box.
- Inspecting DOM attributes does not automatically make a test White-box.
- Equivalence Partitioning and Boundary Value Analysis are Black-box design techniques.
- A Gray-box test can still use a Black-box design technique.
- Smoke and Regression describe test purpose.
- Cross-browser describes where the test runs.
- Positive and Negative describe the scenario, not the result.
- A manually triggered automated test is still automated.

The verified 100% statement, branch, function, and line coverage applies only to `contactValidation.js`.

---

## Current Examples

| Test | Classification | Reason |
|---|---|---|
| A-UNIT-014 | Unit; Functional/Regression; White-box; Decision Table; Negative | Calls the validation function directly and checks which validation rule is returned when more than one input is invalid |
| P-UI-004 | System/E2E; Functional/Regression/Cross-browser/Database; Gray-box; Use Case; Positive | Submits the contact form and verifies the database result |
| P-API-004 | System; Functional/API; Black-box; Equivalence Partitioning; Negative | Verifies HTTP 400, response values, and schema |
| S-API-004 | Integration; Functional/API/Database; Gray-box; Equivalence Partitioning; Negative | Verifies HTTP response and non-persistence in PostgreSQL |
| P-A11Y-001 | System; Accessibility/Regression; Black-box; Checklist-based | Runs axe against the Home page |
| P-UI-018 | System/E2E; Functional/Regression/Cross-browser/Database; Gray-box; Use Case; Positive | Registers a user and verifies session, account data, password hash, role, and cleanup |
| P-API-020 | System/Integration; Functional/API/Database; Gray-box; Decision Table; Mixed | Verifies 401, 403, and 200 responses for admin access |
| J-PERF-007 | System; Performance/Stress; Black-box | Runs the 1,000-user JMeter stress profile |

JMeter virtual-user counts are workload settings, not Boundary Value Analysis.

---

## API Validation

API tests use several types of checks together.

| Check | Purpose |
|---|---|
| HTTP | Status code and content type |
| Functional | Response values and messages |
| JSON Schema | Structure, required fields, and data types |
| Database | Persistence or non-persistence where needed |

Selenium uses REST Assured JSON Schema Validator.

Playwright uses Ajv.

JSON Schema Validation is used together with normal functional assertions.

---

# Test Design Techniques

## Equivalence Partitioning

Equivalence Partitioning groups inputs that are expected to behave the same way. One or more representative values are selected from each group.

### Contact Examples

| Partition | Example | Expected Result |
|---|---|---|
| Missing required field | `name` is omitted | HTTP 400 |
| Empty value | `name = ""` | HTTP 400 |
| Whitespace-only value | `name = "   "` | HTTP 400 |
| Invalid email | `test@` | HTTP 400 |
| Valid contact data | valid name, email, message | Insert + HTTP 200 |
| Browser-invalid form | empty required field or malformed email | Browser blocks normal submission |

### Authentication Examples

| Partition | Example | Expected Result |
|---|---|---|
| Valid registration | valid email/password/confirmation | Account created |
| Invalid registration email | malformed email | Validation error |
| Missing password character type | no uppercase/lowercase/number/special character | Validation error |
| Password confirmation mismatch | valid password + different confirmation | Validation error |
| Existing email | duplicate normalized email | HTTP 409 |
| Valid login | registered email + correct password | Session created |
| Invalid login | wrong email or password | HTTP 401 |
| Client sends `role=admin` | valid registration payload plus role | Account remains `user` |

### Existing Coverage

Contact partitions are covered by:

- Selenium API tests
- Playwright API tests
- negative UI tests
- Jest contact-validation tests

Authentication partitions are covered by:

- Jest authentication-validation tests
- P-UI-018–024
- P-API-014–020

### Current Gaps

- more contact whitespace/Unicode combinations
- more accepted email formats
- storage normalization cases
- route-level invalid-registration variants
- selected authentication boundaries
- duplicate-email race behavior
- stale/deleted-user sessions
- malformed authentication payloads

---

## Boundary Value Analysis

Boundary Value Analysis tests values at and around important limits.

### Current Boundaries

| Boundary | Values |
|---|---|
| Contact name length | 254, 255, 256 |
| Contact email length | 254, 255, 256 |
| Nonblank contact input | 0, 1, 2 characters |
| Password minimum | 7, 8, 9 |
| Password maximum | 63, 64, 65 |
| Authentication email maximum | 319, 320, 321 |
| Scroll threshold | 399, 400, 401 |

### Existing Coverage

Jest covers:

- 7-character password rejected
- 8-character password accepted
- 64-character password accepted
- 65-character password rejected

Contact empty-input tests cover part of the lower boundary.

### Current Gaps

- contact database length boundaries
- authentication email-length boundaries
- scroll threshold automation
- route-level password-boundary validation

### Notes

- 255 is the PostgreSQL contact-column limit.
- Password limits are 8 and 64.
- Authentication email length above 320 is rejected by validation.
- JMeter uses a different contact-name column size in its CI setup; this is an environment difference.
- JMeter virtual-user counts are not BVA.
- An empty-field test is not automatically BVA.

---

## Decision Table Testing

Decision Table Testing is used when the result depends on a combination of conditions.

### Contact Validation

Required-field checks are evaluated before email-format validation.

| Condition / Action | DT-01 | DT-02 | DT-03 | DT-04 | DT-05 |
|---|---|---|---|---|---|
| Name present | No | Yes | Yes | Yes | Yes |
| Email present | — | No | Yes | Yes | Yes |
| Message present | — | — | No | Yes | Yes |
| Email valid | — | — | — | No | Yes |
| HTTP status | 400 | 400 | 400 | 400 | 200 |
| success | false | false | false | false | true |
| DB insert | No | No | No | No | Yes |

Current tests cover the main required-field, invalid-email, and success combinations.

A-UNIT-014 verifies that the required-field error takes priority when both a required field and email format are invalid.

### Registration

| Condition / Action | REG-01 | REG-02 | REG-03 | REG-04 | REG-05 | REG-06 |
|---|---|---|---|---|---|---|
| Valid email | No | Yes | Yes | Yes | Yes | Yes |
| Valid password | — | No | Yes | Yes | Yes | Yes |
| Confirmation matches | — | — | No | Yes | Yes | Yes |
| Email already exists | — | — | — | Yes | No | No |
| Client sends `role=admin` | — | — | — | — | No | Yes |
| HTTP status | 400 | 400 | 400 | 409 | 201 | 201 |
| Account created | No | No | No | No | Yes | Yes |
| Stored role | — | — | — | — | user | user |
| Session created | No | No | No | No | Yes | Yes |

The registration API does not use a client-supplied role. PostgreSQL applies the default `user` role.

### Authentication / Authorization

| Condition | ACCESS-01 | ACCESS-02 | ACCESS-03 |
|---|---|---|---|
| Authenticated | No | Yes | Yes |
| Role | — | user | admin |
| `/api/auth/me` | 401 | 200 | 200 |
| `/api/auth/admin` | 401 | 403 | 200 |
| Account route | Login redirect | Allowed | Allowed |
| Admin route | Login redirect | Access denied | Allowed |

### Existing Coverage

- Jest covers registration validation logic.
- P-API-014 covers successful registration and default-role behavior.
- P-API-015 covers duplicate email.
- P-API-020 covers the 401/403/200 admin matrix.
- P-UI-023–024 cover normal-user denial and admin access.

### Current Gaps

- route-level HTTP 400 registration variants
- post-conflict database row-count check
- direct session-store checks
- more combined-invalid-input cases

Decision-table IDs are design labels, not test-case IDs.

---

## State Transition Testing

State Transition Testing checks how the application moves from one state to another after an action.

### Contact Form

| State / Event | Expected Result | Coverage |
|---|---|---|
| Ready + browser-invalid submit | Browser validation blocks normal submission | Covered |
| Ready + valid submit | Button disabled, label changes, request starts | Partial |
| Submitting + success | Success shown, form reset, button restored | Partial |
| Submitting + `success=false` | Button restored, input remains editable | Covered by P-UI-017 |
| Submitting + network/non-JSON error | Recovery behavior | Not covered |
| Success + another submit | New submission possible | Not covered |

DEF-002 was found in this area.

Before the fix, the submit button remained disabled after a server-side rejection.

After the fix, P-UI-017 and the broader Chromium regression passed.

### Authentication and Session

| State / Event | Expected Result | Coverage |
|---|---|---|
| Logged out + register | Account + session created | P-UI-018, P-API-014 |
| Logged out + login | Session created | P-UI-021, P-API-016 |
| Logged out + Account route | Redirect to Login | P-UI-022 |
| Authenticated + refresh | User restored from `/api/auth/me` | P-UI-019 |
| Authenticated + logout | Session removed, Login shown | P-UI-020, P-API-019 |
| User + Admin route | Access denied / 403 | P-UI-023, P-API-020 |
| Admin + Admin route | Access allowed | P-UI-024, P-API-020 |

### Current Gaps

- browser Back after logout
- authenticated GuestRoute redirects
- requested-destination restoration
- stale/deleted-user sessions
- actual session expiration
- direct session-store checks

---

## Use Case Testing

Use Case Testing checks complete user flows.

### Contact

Open Home → enter valid data → submit → verify success → verify PostgreSQL row → clean up test data.

Covered by:

- S-UI-007
- P-UI-004

### Registration

Open Register → enter valid data → submit → account created → session created → Account shows email and role.

Covered by:

- P-UI-018
- P-API-014

### Login

Log out → log in with existing credentials → Account is available.

Covered by:

- P-UI-021
- P-API-016

### Authorization

User opens Admin → access denied → controlled role change → refresh → Admin access allowed.

Covered by:

- P-UI-023
- P-UI-024
- P-API-020

### Session

Authenticate → refresh → protected page remains available → logout → protected route redirects to Login.

Covered by:

- P-UI-019
- P-UI-020
- P-API-019

### Current Gaps

- GuestRoute redirect behavior
- requested-destination restoration
- browser Back after logout
- more invalid-registration API cases
- additional session failure cases

---

## Error Guessing

Error Guessing is used for likely failure areas based on previous defects, implementation details, and common failure patterns.

Current examples include:

- shared JavaScript running on pages without the expected element
- rejected fetch response
- malformed/non-JSON response
- unexpected structured form values
- rejected contact request inserting data
- cleanup failure
- duplicate registration race
- login errors exposing whether an account exists
- client-supplied `role=admin`
- password hash returned in API response
- protected endpoint accessible without a session
- normal user receiving admin access
- stale session for a deleted user
- protected access remaining after logout
- browser Back showing protected content after logout
- missing `SESSION_SECRET`
- SQL-injection-style authentication input

### Existing Coverage

Current tests cover:

- invalid contact input
- invalid authentication input
- password-rule failures
- password boundaries
- duplicate normalized email
- generic invalid-login response
- client-supplied role
- safe registration response fields
- protected-route denial
- logout invalidation
- user/admin authorization

### Current Gaps

- duplicate-email race behavior
- stale/deleted-user sessions
- browser Back after logout
- malformed authentication payloads
- SQL-injection-style inputs
- session-store failures
- invalid/expired cookies
- production Secure-cookie behavior

Only useful, repeatable, high-risk cases should be added to automation.

---

## Checklist-Based Testing

Checklist-based testing is used for repeatable UI, navigation, accessibility, authentication, and authorization checks.

Examples:

- required sections are visible
- navigation links open the correct page
- form controls have labels
- pages load without relevant JavaScript errors
- mobile navigation works
- keyboard users can reach controls
- authentication fields have correct labels
- password guidance is connected to the password field
- authentication errors are announced
- Account shows email and role
- protected pages redirect when logged out
- normal user cannot access Admin
- admin user can access Admin
- logout removes protected access

### Existing Coverage

Current UI and accessibility tests cover many of these checks.

Examples:

- P-UI-015 and P-UI-016 check page JavaScript errors.
- P-UI-018–024 cover authentication routes, Account data, protected access, and authorization.
- P-A11Y-001–006 cover automated accessibility checks for the EJS portfolio and the shared authentication-navigation state.

### Current Gaps

- dedicated authentication-page accessibility checks
- wider keyboard coverage
- more mobile checks
- browser-error checks on more routes
- a maintained checklist showing automated/manual/planned status

---

## Accessibility Test Design

Playwright accessibility testing runs in Chromium using `@axe-core/playwright`.

Current automated coverage includes:

- Home page axe scan
- Project page axe scan
- Automation page axe scan
- keyboard focus and Enter navigation
- authentication navigation contrast
- selected contact-form accessible-name, required-field, and focus checks

Current result:

- P-A11Y-001–006: **6/6 passed**

Accessibility testing identified:

- DEF-003
- DEF-004
- DEF-005
- DEF-006

All four defects are closed and passed retest.

Automated accessibility checks can detect issues such as:

- missing accessible names
- invalid ARIA
- some semantic problems
- some contrast problems

They do not replace manual accessibility testing.

Manual checks are still needed for:

- full keyboard navigation
- logical focus order
- 200% zoom and reflow
- screen-reader behavior
- reading order
- error-message usability

The React Login, Register, Account, and Admin pages still need dedicated accessibility testing.

---

## Current Coverage Gaps

The main remaining gaps are:

### Authentication / Authorization

- selected email/password boundaries
- route-level invalid-registration variants
- GuestRoute behavior
- protected-destination restoration
- duplicate-email race behavior
- direct session-store checks
- stale/deleted-user sessions
- invalid/expired session behavior
- browser Back after logout
- production Secure-cookie verification
- actual session-expiration testing
- authentication-page accessibility

### Contact Form / API

- network failure recovery
- malformed/non-JSON response recovery
- stronger error feedback and retry checks
- more database length boundaries
- more combined-invalid-input cases
- stronger persistence checks

### UI / Accessibility

- browser-error checks on more pages
- broader keyboard testing
- more mobile/responsive testing
- authentication-page axe scans
- screen-reader/manual accessibility testing

### Performance

- representative contact/authentication endpoints
- endurance testing
- resource monitoring
- production-like environment
- defined performance thresholds

---

## Final Notes

- New test-case IDs are added only when the related automated tests are implemented.
- Frontend route guards do not replace backend authentication and authorization checks.
- Authentication and authorization are tested separately.
- Client-supplied roles are not trusted.
- Password hashes should never be returned by the API.
- JMeter stress workloads do not prove production capacity.
- Configuration alone does not prove browser compatibility or production readiness.
