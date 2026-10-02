# Requirements Traceability Matrix

## Scope and evidence model

This matrix covers the completed DEF-001 through DEF-004 cycles, the verified Jest contact-validation unit layer, the verified Playwright accessibility execution/retest, and the verified Selenium/Playwright API JSON Schema Validation evidence. [REQUIREMENTS.md](REQUIREMENTS.md) defines source-derived scope; [TEST_CASES.md](TEST_CASES.md) contains 101 existing catalogue entries: the previous 96 plus 5 Playwright accessibility cases. Test existence and requirement coverage do not imply successful execution of every catalogue case.

[DEFECT_LOG.md](DEFECT_LOG.md) preserves original reproduction, exact errors, commands, and lifecycle evidence. DEF-001 through DEF-004 are Closed / Fixed / Retest Passed. Their browser evidence is local Chromium evidence with no retries and one worker, not production evidence. The Jest section separately records the verified local and GitHub Actions unit result; the API section records the verified 15/15 Selenium and 13/13 Playwright API results and successful corresponding workflows.

## Jest unit-testing traceability

| Requirement / Condition | Requirement ID | Test Case ID | Automation Reference | Execution Evidence | Current Coverage Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Empty and whitespace-only required values return the required-field error | REQ-API-002 | A-UNIT-007–014 | [contactValidation.test.js](../../tests/unit/contactValidation.test.js) — `validateContactInput` cases | 15-test suite passed locally and in GitHub Actions | Direct unit coverage of represented variants | Covers empty/whitespace name, email, and message; all-empty input; and one combined-invalid precedence condition. No HTTP or DB assertion occurs. |
| Trimmed email-format decision | REQ-API-003 | A-UNIT-002–005; A-UNIT-015 | [contactValidation.test.js](../../tests/unit/contactValidation.test.js) — `isValidEmail` and invalid-email decision cases | Same verified Jest execution | Direct unit coverage of represented regex partitions | Covers missing `@`, incomplete domain, missing local part, surrounding whitespace, and the invalid-email result. It is not complete email-standard coverage. |
| Valid contact input passes validation before the route's persistence path | REQ-API-004 | A-UNIT-001; A-UNIT-006 | [contactValidation.test.js](../../tests/unit/contactValidation.test.js) — valid email/contact cases | Same verified Jest execution | Validation precondition covered at unit level | Does not call the route, assert HTTP 200, access PostgreSQL, or prove insertion/persistence; API, UI, and integration tests retain responsibility for that evidence. |
| Required-field rejection precedes invalid-email rejection | REQ-API-005 | A-UNIT-014 | [contactValidation.test.js](../../tests/unit/contactValidation.test.js) — required-field error precedence | Same verified Jest execution | Implemented and verified at unit level | Empty name plus malformed email returns `All fields are required.`. Other combined-invalid permutations are not separately represented. |

Jest 30.5.2 executed 1 suite with 15 passed, 0 failed, and 0 skipped. `npm run test:coverage` recorded **100% statement, branch, function, and line coverage for the contact validation module.** This evidence does not establish whole-application coverage. The Unit Tests workflow runs on push and pull request with Node.js 22; the suite requires no PostgreSQL service, browser, Express startup, or application network request.

## DEF-001 traceability

| Requirement / Condition | Requirement ID | Test Case ID | Automation Reference | Defect ID | Execution Evidence | Current Coverage Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Project-page content/rendering scope | REQ-UI-005 | P-UI-008–014 | QA-Portfolio-Playwright/tests/ui/project.spec.js | DEF-001 (related page scope) | All seven passed in broader Chromium 16/16 run | Existing content assertions represented | Visibility does not prove complete page correctness or absence of pageerrors. |
| Automation-page rendering scope | REQ-UI-007 | P-UI-016 (related check only) | QA-Portfolio-Playwright/tests/ui/pageErrors.spec.js | DEF-001 | Pre-fix FAIL; post-fix focused PASS; broader Chromium PASS | Partial | Direct load/pageerror check; no content assertion. Initial reproduction also visually confirmed rendering despite the error. |
| No startup pageerrors on /project | No separate product ID; related REQ-UI-005 | P-UI-015 | QA-Portfolio-Playwright/tests/ui/pageErrors.spec.js — project page should load without JavaScript page errors | DEF-001 | Pre-fix FAIL; post-fix focused PASS; broader Chromium PASS | Implemented and verified in Chromium | Listener registered before navigation; empty error list asserted after load. |
| No startup pageerrors on /project/automation | No separate product ID; related REQ-UI-007 | P-UI-016 | QA-Portfolio-Playwright/tests/ui/pageErrors.spec.js — automation page should load without JavaScript page errors | DEF-001 | Pre-fix FAIL; post-fix focused PASS; broader Chromium PASS | Implemented and verified in Chromium | Does not assert navigation links under REQ-UI-009 or later interaction errors. |
| Successful contact workflow and persistence | REQ-CONTACT-003; REQ-CONTACT-005; REQ-DB-002 | P-UI-004 | QA-Portfolio-Playwright/tests/ui/contact.spec.js — contact form should submit successfully with valid data | DEF-001 (regression impact check) | Post-fix focused PASS; broader Chromium PASS | Partial requirement coverage, verified asserted subset | Success message and email/message persistence checked; cleanup completed without error, without a post-delete assertion. |
| Automation-page link/navigation | REQ-UI-009 | None dedicated | No dedicated navigation assertion | DEF-001 (scope boundary only) | No dedicated execution evidence | Gap | P-UI-016 opens the route directly and must not be counted as link coverage. |

Automation paths are plain sibling-repository references. The new pageErrors.spec.js was local and uncommitted during verification; no published GitHub file link or immutable revision is assumed.

## DEF-001 execution reconciliation (historical)

- Pre-fix focused pageErrors run: 2 failed with `TypeError: Cannot read properties of null (reading 'addEventListener')`.
- Post-fix focused pageErrors run: 2 passed.
- Post-fix focused run including successful contact: 3 passed.
- Broader Chromium UI run: 16 passed, 0 failed, 0 skipped — home 3, contact 4, project 7, pageErrors 2.
- Broader run covers P-UI-001–016. These repeated runs are not additional unique cases.
- At DEF-001 closure: catalogue 80 entries; Playwright 31 unique cases (16 UI, 13 API, 2 DB).
- At DEF-001 closure, configured multi-project arithmetic: 16 × 3 + 13 + 2 = 63 before retries. This is configuration, not an executed 63-case result.
- Other catalogue entries retain their baseline execution status; this matrix does not claim all 80 passed.

## Remaining review

Review mapping and classification boundaries, particularly rendering versus pageerror assertions. Other routes and later interactions need separate coverage decisions. The new unit cases resolve the documented required-error precedence gap for one combined condition; other combined-invalid permutations remain separate design decisions. Accessibility requirements and manual accessibility acceptance criteria remain a product-definition/documentation gap. [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md) summarizes both completed defect cycles, the Jest unit result, and the accessibility execution; PERFORMANCE_TEST_REPORT.md remains deferred.

## DEF-002 traceability and current inventory

| Requirement / Condition | Requirement ID | Test Case ID | Automation Reference | Defect ID | Execution Evidence | Current Coverage Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Recover from valid-JSON rejection | REQ-CONTACT-004 (related lifecycle only) | P-UI-017 | QA-Portfolio-Playwright/tests/ui/contact.spec.js — contact form should recover after server-side validation rejection | DEF-002 | Pre-fix FAIL; focused post-fix PASS; broader Chromium 17/17 PASS | Implemented and verified asserted recovery | Pending state is not asserted; success-only REQ-CONTACT-005 is not a failure-recovery contract. |
| Whitespace-name rejection and non-persistence | REQ-API-002; REQ-DB-003 | P-UI-017 | Same UI case with existing PostgreSQL helper | DEF-002 | HTTP 400 / success=false observed; matching row absent pre/post fix | Asserted subset verified | No new product requirement; no cleanup needed for rejected input. |
| Successful-contact impact check | REQ-CONTACT-003; REQ-CONTACT-005; REQ-DB-002 | P-UI-004 | QA-Portfolio-Playwright/tests/ui/contact.spec.js | DEF-002 | Focused PASS; broader Chromium PASS | Existing asserted subset verified | Persistence passed; cleanup completed without error; no independent post-delete assertion. |

DEF-002 is Closed / Fixed / Retest Passed. The pre-fix failures were expected enabled/received disabled; expected Send Message/received Sending...; expected not Sending.../received Sending.... Button restoration moved outside data.success. Broader regression on 2026-09-30: 17 executed, 17 passed, 0 failed, 0 skipped, 15.6 seconds; Chromium, no retries, one worker. Both DEF-001 cases passed again.

At DEF-002 closure, the catalogue contained 81 entries; Playwright had 32 unique cases (17 UI, 13 API, 2 DB). Configured Playwright total before retries was 17 × 3 + 13 + 2 = 66. This was not a 66-execution or full 81-case run. Firefox/WebKit, separate API/DB projects, Selenium, and JMeter were not executed.

Inventory after the Jest addition was 96 catalogue entries, comprising the prior 81 entries plus A-UNIT-001–015. The verified Jest run covers those 15 unit cases only; it does not change the historical DEF-001/DEF-002 execution scope.

Network/request and malformed/non-JSON recovery remain unverified and were not fixed. Rejection feedback, later retry interactions, and stronger cleanup verification remain gaps. Evidence and commands: [DEFECT_LOG.md](DEFECT_LOG.md); cycle summary: [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md).

## API JSON Schema validation traceability

No new product requirement or test-case ID was created for schema validation. The schemas strengthen the assertion mechanism for existing API requirements and cases. Functional HTTP, exact-value/message, and applicable persistence assertions remain responsible for behavior beyond response structure and types.
REQ-API-005 remains covered by its existing functional precedence tests; JSON Schema validation does not add separate evidence for that requirement.

| Requirement / response contract | Existing Test Case IDs | Selenium mechanism and evidence | Playwright mechanism and evidence | Coverage note |
| --- | --- | --- | --- | --- |
| REQ-API-001 — status response | S-API-001; P-API-001–002 | `matchesJsonSchemaInClasspath(...)` validates required string `status` and `message`; included in the 15/15 API pass and successful Selenium CI workflow | Ajv validates the same required properties/types in P-API-001; P-API-002 separately checks JSON content type; included in the 13/13 API pass and successful Playwright CI workflow | Exact status/message values and HTTP/content-type assertions remain separate functional evidence. |
| REQ-API-002 — required-field rejection | S-API-003–008; S-API-013–015; P-API-004–009 | Contact schema requires boolean `success` and string `message`; existing HTTP 400, exact rejection, and JDBC non-persistence assertions remain | Ajv validates the same response shape/types; existing HTTP 400, exact rejection, and represented `pg` non-persistence assertions remain | Schema validation does not expand the represented input partitions. |
| REQ-API-003 — invalid-email rejection | S-API-009–012; P-API-010–013 | Contact schema plus existing HTTP 400, exact invalid-email message, and JDBC non-persistence assertions | Contact schema plus existing HTTP 400, exact invalid-email message, and `pg` non-persistence assertions | Existing email variants and mappings are unchanged. |
| REQ-API-004 — accepted contact | S-API-002; P-API-003 | Contact schema plus existing HTTP 200, exact success values, JDBC persistence, and cleanup assertions | Contact schema plus existing HTTP 200, exact success values, `pg` persistence, and cleanup assertions | Schema success does not independently prove insertion or cleanup. |

Selenium uses REST Assured 5.5.6 with `io.rest-assured:json-schema-validator:5.5.6`; Playwright uses Ajv 8.20.0 through a helper that compiles each schema once and returns validation status/errors. These schema-based API Contract Validation checks remain within the existing cases. The catalogue remains **101 unique cases**. Playwright remains **37 unique cases** (17 UI, 5 accessibility, 13 API, 2 database) and **71 configured executions before retries**.

## Accessibility testing traceability

No standalone accessibility product requirement exists in [REQUIREMENTS.md](REQUIREMENTS.md). The matrix therefore records implemented test and defect evidence without creating a requirement ID solely to complete traceability. Existing functional requirements appear only where the assertions overlap their established scope.

| Requirement / Condition | Requirement ID | Test Case ID | Automation Reference | Defect ID | Execution Evidence | Current Coverage Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home-page automated accessibility scan | No accessibility product ID; related page scope REQ-UI-004 | P-A11Y-001 | QA-Portfolio-Playwright/tests/accessibility/accessibility.spec.js — Home-page axe scan | DEF-003 | Pre-fix FAIL — `color-contrast`; 2.48:1 versus 4.5:1. Post-fix PASS — 5.473:1 base; 7.584:1 interactive states. | Fixed; retest passed; closed | Affected `#project-details-button`. The same scan remains regression coverage; functional link operation was not the original failed assertion. |
| Project-page automated accessibility scan | No accessibility product ID; related page scope REQ-UI-005 | P-A11Y-002 | Same specification — Project-page axe scan | DEF-004 | Pre-fix FAIL — `color-contrast`; 4.263:1 versus 4.5:1. Post-fix PASS — 5.152:1. | Fixed; retest passed; closed | Affected three architecture connector labels. Project content/navigation remained outside the original failed assertion. |
| Automation-page automated accessibility scan | No accessibility product ID; related page scope REQ-UI-007 | P-A11Y-003 | Same specification — Automation-page axe scan | None | PASS in initial execution and post-fix retest | Implemented and verified in Chromium | A passing automated scan does not establish complete accessibility or full WCAG compliance. |
| Main navigation focus and Enter activation | REQ-UI-006 (Architecture-link subset); no accessibility product ID | P-A11Y-004 | Same specification — main navigation keyboard check | None | PASS in initial execution and post-fix retest | Implemented and verified asserted subset | Checks one Project-page navigation link; it is not a complete keyboard-only or tab-order assessment. |
| Contact accessible names, required semantics, and focus sequence | REQ-CONTACT-002 (required-attribute subset); no accessibility product ID | P-A11Y-005 | Same specification — contact form accessibility check | None | PASS in initial execution and post-fix retest | Implemented and verified asserted subset | Checks current labels, required attributes, a short focus sequence, and enabled submit state; it does not assess validation announcements or screen-reader usability. |

Verified command for both phases: `npm run test:accessibility -- --retries=0 --workers=1` in the Chromium `accessibility` project. Initial result: **5 total, 3 passed, 2 failed, 0 skipped**; both failures were genuine AUT findings that confirmed DEF-003 and DEF-004. Post-fix retest: **5 total, 5 passed, 0 failed, 0 skipped**. Both defects progressed Confirmed → Fixed → Retest Passed → Closed. No axe rule, tag, element, or page section was suppressed or excluded. The scans used `@axe-core/playwright` 4.13.0 and axe-core 4.13.0 with supported WCAG A/AA-oriented tags.

Current inventory after the accessibility addition: **101 catalogue entries**. Playwright now has 37 unique cases: 17 UI, 5 accessibility, 13 API, and 2 database. Configured full Playwright execution before retries is 71: 51 cross-browser UI executions, 5 Chromium accessibility executions, 13 API, and 2 DB. Only the five accessibility cases were executed for this evidence.

Manual keyboard-only navigation, logical tab order, visible focus, zoom/reflow, screen-reader behavior, meaningful reading order, and validation-feedback usability remain outside the automated evidence. No complete WCAG compliance conclusion is claimed.
