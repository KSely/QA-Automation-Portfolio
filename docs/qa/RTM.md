# Requirements Traceability Matrix

## Scope and evidence model

This matrix covers the completed DEF-001 and DEF-002 cycles and the verified Jest contact-validation unit layer. [REQUIREMENTS.md](REQUIREMENTS.md) defines source-derived scope; [TEST_CASES.md](TEST_CASES.md) contains 96 existing catalogue entries: the previous 81 plus 15 application-local Jest cases. Test existence and requirement coverage do not imply successful execution of every catalogue case.

[DEFECT_LOG.md](DEFECT_LOG.md) preserves original reproduction, exact errors, commands, and closure evidence. DEF-001 and DEF-002 are Closed / Fixed / Retest Passed. Their results below are local Chromium results with no retries and one worker, not CI or production evidence. The Jest section separately records the verified local and GitHub Actions unit result.

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

Review mapping and classification boundaries, particularly rendering versus pageerror assertions. Other routes and later interactions need separate coverage decisions. The new unit cases resolve the documented required-error precedence gap for one combined condition; other combined-invalid permutations remain separate design decisions. [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md) summarizes both defect cycles and the Jest unit result; PERFORMANCE_TEST_REPORT.md remains deferred.

## DEF-002 traceability and current inventory

| Requirement / Condition | Requirement ID | Test Case ID | Automation Reference | Defect ID | Execution Evidence | Current Coverage Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Recover from valid-JSON rejection | REQ-CONTACT-004 (related lifecycle only) | P-UI-017 | QA-Portfolio-Playwright/tests/ui/contact.spec.js — contact form should recover after server-side validation rejection | DEF-002 | Pre-fix FAIL; focused post-fix PASS; broader Chromium 17/17 PASS | Implemented and verified asserted recovery | Pending state is not asserted; success-only REQ-CONTACT-005 is not a failure-recovery contract. |
| Whitespace-name rejection and non-persistence | REQ-API-002; REQ-DB-003 | P-UI-017 | Same UI case with existing PostgreSQL helper | DEF-002 | HTTP 400 / success=false observed; matching row absent pre/post fix | Asserted subset verified | No new product requirement; no cleanup needed for rejected input. |
| Successful-contact impact check | REQ-CONTACT-003; REQ-CONTACT-005; REQ-DB-002 | P-UI-004 | QA-Portfolio-Playwright/tests/ui/contact.spec.js | DEF-002 | Focused PASS; broader Chromium PASS | Existing asserted subset verified | Persistence passed; cleanup completed without error; no independent post-delete assertion. |

DEF-002 is Closed / Fixed / Retest Passed. The pre-fix failures were expected enabled/received disabled; expected Send Message/received Sending...; expected not Sending.../received Sending.... Button restoration moved outside data.success. Broader regression on 2026-09-30: 17 executed, 17 passed, 0 failed, 0 skipped, 15.6 seconds; Chromium, no retries, one worker. Both DEF-001 cases passed again.

At DEF-002 closure, the catalogue contained 81 entries; Playwright had 32 unique cases (17 UI, 13 API, 2 DB). Configured Playwright total before retries was 17 × 3 + 13 + 2 = 66. This was not a 66-execution or full 81-case run. Firefox/WebKit, separate API/DB projects, Selenium, and JMeter were not executed.

Current inventory after the Jest addition: 96 catalogue entries, comprising the prior 81 entries plus A-UNIT-001–015. The verified Jest run covers those 15 unit cases only; it does not change the historical defect-cycle execution scope or Playwright configuration arithmetic.

Network/request and malformed/non-JSON recovery remain unverified and were not fixed. Rejection feedback, later retry interactions, and stronger cleanup verification remain gaps. Evidence and commands: [DEFECT_LOG.md](DEFECT_LOG.md); cycle summary: [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md).
