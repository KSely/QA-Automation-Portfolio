# Test Design — QA Automation Portfolio

## Purpose and baseline

Status: Reviewed documentation baseline with completed DEF-001/DEF-002 evidence, verified Jest unit results, verified Playwright accessibility evidence including closed DEF-003/DEF-004, and verified Selenium/Playwright API JSON Schema Validation evidence. Execution status for the remaining catalogue is not assessed by this document.

Explain how the existing behaviors and automated cases can be classified, where formal techniques are defensible, and which conditions remain unimplemented. This document does not retrofit undocumented historical design intent or claim coverage measurements that were not collected.

Sources: [REQUIREMENTS.md](REQUIREMENTS.md), application source, Jest unit specifications, Java/JavaScript specifications, TestNG/Playwright configuration, and JMX plans. [TEST_CASES.md](TEST_CASES.md) maps exact existing methods/specifications/variants. [TEST_PLAN.md](TEST_PLAN.md) defines scope and proposed process criteria.

Cycle evidence and closure are tracked in [RTM.md](RTM.md) and [DEFECT_LOG.md](DEFECT_LOG.md), separately from baseline execution status.

## Test design methodology

1. Identify the current source-derived behavior and its test boundary.
2. Distinguish product behavior, environment prerequisites, and configured QA targets.
3. Identify observable conditions and expected outcomes that source actually supports.
4. Separate ambiguous behavior and suspected defects from approved expectations.
5. Map existing assertions, not only test names, to each condition.
6. Apply a formal technique only when its model/data selection is defensible.
7. Record proposed missing conditions without assigning final future case IDs.
8. Keep technique, test level, interface, execution mode, and result independent.

The design process is informed by ISTQB terminology, but this document does not claim certification of the framework or conformance to a formal documentation standard. Existing source remains authoritative.

## How Test Cases Are Classified

| Dimension | Values | Interpretation in this portfolio |
|---|---|---|
| Test Level | Unit; Integration; System; End-to-End scope | Jest directly tests the contact validation module. E2E is a workflow-scope tag overlapping system/integration, not an exclusive extra level. |
| Test Type / Purpose | Functional; Regression; Smoke; Cross-browser; Accessibility; API; Database; Performance; Load; Stress | Practical multi-tag taxonomy mixing objectives, selection purposes, interfaces, and workloads; not a mutually exclusive hierarchy. |
| Test Approach | Black-box; Gray-box; White-box; Undetermined | Relative to the selected test object and oracle. |
| Test Design Technique | Equivalence Partitioning; Boundary Value Analysis; Decision Table; State Transition; Use Case; Error Guessing; Checklist-based; Not specifically technique-driven | Technique is based on condition selection, not programming language or runner. |
| Scenario | Positive; Negative; Mixed / Not applicable | A negative scenario can have a Passed execution result. |
| Interface | UI; API; Database; Performance endpoint | Multiple interfaces may apply. Performance endpoint is an HTTP/API interface under workload. |
| Execution | Manual; Automated | Manually dispatching CI does not make the tests manual. |

### Approach rules

- API tests can be Black-box when they validate external HTTP behavior without internal structural objectives.
- Direct PostgreSQL verification makes these application-level UI/API tests Gray-box because the oracle uses persistence internals.
- Direct DB tests are classified relative to the whole application; a DB-as-test-object view could classify SQL-interface checks differently.
- White-box is reserved for design intentionally targeting internal structure, branches, paths, or implementation logic.
- Reading source during analysis does not automatically make a test White-box.
- DOM attributes/validity inspection does not automatically make a test White-box.
- Measured structural evidence is limited to **100% statement, branch, function, and line coverage for the contact validation module.** It is not application or portfolio coverage.
- A case may use a black-box technique for input selection while its overall approach is Gray-box or White-box relative to the selected test object and oracle.

### Project examples

| Existing case | Independent classifications | Reason |
|---|---|---|
| A-UNIT-014: required-field error takes precedence | Unit; Functional/Regression; White-box; Decision Table; Negative; Module; Automated | Directly invokes the pure validation function and verifies the first rejection branch when required and email-format conditions are both invalid. |
| P-UI-004: successful contact submission with DB verification | System/E2E scope; Integration verification; Functional/Regression/Cross-browser/Database; Gray-box; Use Case; Positive; UI + Database; Automated | Exercises the user journey and then reads PostgreSQL. |
| P-API-004: omitted name | System; Functional/API; Black-box; Equivalence Partitioning; Negative; API; Automated | Asserts HTTP 400, exact rejection values, and the contact-response schema; no DB assertion in this PW family. |
| S-API-004: whitespace name | Integration; Functional/API/Database; Gray-box; Equivalence Partitioning; Negative; API + Database; Automated | Asserts HTTP 400, exact rejection values, the contact-response schema, and non-persistence. |
| P-A11Y-001: Home-page axe scan | System; Accessibility/Regression; Black-box; Checklist-based; Positive expectation; UI; Automated | Runs WCAG-oriented automated rules against the rendered page. Its initial failure confirmed DEF-003; its post-fix pass verifies the fix. The historical failure does not change the positive test-condition classification. |
| J-PERF-007: 1,000-user plan | System; Performance/Stress; Black-box; Not specifically technique-driven; Positive requests under high workload; Performance endpoint; Automated | Workload configuration is not BVA; samples do not become separate cases. |

### API response validation model

The existing API cases use complementary assertion levels rather than treating a schema check as a replacement for functional behavior:

| Assertion level | Purpose | Existing implementation |
|---|---|---|
| HTTP | Verify status and, where represented, JSON content type | REST Assured and Playwright request assertions |
| Functional values | Verify exact status values, success booleans, and success/rejection messages | Existing status and contact assertions remain in place |
| JSON Schema Validation | Verify object structure, required properties, and data types | Selenium uses `matchesJsonSchemaInClasspath(...)`; Playwright uses Ajv validators compiled once through `utils/schemaValidator.js` |
| Persistence | Verify insertion or represented non-persistence behavior | Existing JDBC or `pg` checks remain in selected contact cases |

The status-response schemas require string `status` and `message` properties. The contact-response schemas require boolean `success` and string `message` properties. This is schema-based contract validation within the existing API cases. It creates no new test-design technique, requirement, or test-case ID and retains the existing formal technique classifications.

## Technique Selection Rationale

Techniques are selected from the behavior model and the question being investigated, not merely because Selenium, Playwright, or JMeter is used. Applicability does not mean that a technique is already fully represented.

| Technique | Why it fits this project |
|---|---|
| Equivalence Partitioning | Representative valid/invalid input classes for contact validation |
| Boundary Value Analysis | Ordered field-length and scroll-threshold boundaries |
| Decision Table Testing | Combinations of validation conditions and rejection precedence |
| State Transition Testing | Contact form lifecycle states and events; current coverage is partial |
| Use Case Testing | The user's complete contact-submission goal and workflow |
| Error Guessing | Experience-driven fault hypotheses grounded in concrete code observations |
| Checklist-based Testing | Repeatable UI, content, navigation, semantic, keyboard, and automated accessibility checks |

Simple existing visibility/navigation checks remain Not specifically technique-driven where a formal technique is not supported by their design.

## Equivalence Partitioning

**Definition:** A black-box technique that groups inputs expected to receive equivalent treatment and selects representative values.

**Applicability / requirements:** Contact inputs and server/browser validation: REQ-CONTACT-002, REQ-API-002–004, REQ-DB-003.

| Partition | Project example | Expected current behavior |
|---|---|---|
| Omitted required field | name key absent, others valid | 400 required-fields message |
| Empty scalar | name = "" | 400 required-fields message |
| Whitespace-only scalar | name = "   " | 400 required-fields message |
| Ordinary accepted values | synthetic name, accepted email, nonblank message | Insert and 200, with storage/DB prerequisites satisfied |
| Nonblank invalid email | test@ or @example.com | 400 invalid-email message |
| Browser-invalid form | empty required input or malformed email | Native validity prevents normal submission |

**Existing automated representation:** Selenium required-value provider (S-API-003–008), invalid-email provider (S-API-009–012), omitted fields (S-API-013–015), PW missing/whitespace/email families (P-API-004–013), negative UI cases, and A-UNIT-001–013/015. The Jest cases intentionally cover valid, invalid-format, empty, and whitespace-only partitions at the pure-module boundary. Positive API data represents a valid partition; successful UI flows are primarily classified Use Case.

**Identified gaps:** PW explicit empty-string API cases and empty-email UI case; tabs/newlines; accepted email diversity; mixed whitespace and Unicode; distinction between validation trimming and original-value storage.

**Proposed future conditions:** Select representative values for each agreed partition; verify exact error class and appropriate non-persistence. Keep all other fields valid when isolating one partition. Clarify intended normalization before asserting transformed storage.

These are defensible retrospective EP classifications, not proof that formal partition documentation existed when tests were written.

## Boundary Value Analysis

**Definition:** A black-box technique selecting values at and adjacent to boundaries of ordered partitions.

**Applicability / requirements:** REQ-DB-004 schema lengths; REQ-UI-008 scroll visibility threshold; minimum nonblank name/message behavior in REQ-API-002.

| Boundary | Proposed conditions | Qualification |
|---|---|---|
| Name VARCHAR(255) | 254, 255, 256 ordinary characters, other fields valid | Database boundary; handler has no explicit length-validation response contract. |
| Email VARCHAR(255) | 254, 255, 256 characters using format accepted by current regex | Isolate length from format; do not claim compliance with all email standards. |
| Nonblank name/message | Length 0, 1, 2 using non-whitespace characters | Whitespace is a separate partition; this is not a general one-character email acceptance rule. |
| Scroll threshold | scrollY 399, 400, 401 | Source shows visibility only above 400; inspect actual browser coordinates during future execution. |

**Existing automated representation:** Empty input cases overlap a possible lower boundary, but no systematic adjacent-value BVA suite is implemented.

**Identified gaps:** Length-boundary and scroll-threshold assertions; storage outcomes and controlled error behavior for oversize fields.

**Proposed future conditions:** Execute boundary checks against an identified schema; agree on expected application failure semantics before specifying a 400 response for oversized data.

Qualifications:
- 255 is a PostgreSQL schema boundary, not an explicit application-level validation rule.
- JMeter workflows use name VARCHAR(100): environment/schema drift, not a universal application boundary.
- No small maximum message length is defined; do not invent one.
- JMeter virtual-user values are workload choices, not automatically BVA.
- Do not label all empty-field tests BVA merely because zero is a numerical value.

## Decision Table Testing

**Definition:** A black-box technique deriving cases from combinations of conditions and their resulting actions.

**Applicability / requirements:** REQ-API-002–005 and REQ-DB-003. The handler checks required fields before the email format and returns before insertion on rejection.

### Formal contact validation decision table

Definitions:
- N/E/M = the corresponding name/email/message exists as an ordinary scalar string and remains nonempty after trim().
- F = email.trim() matches the implemented regex.
- Y = true; N = false; — = immaterial for this rule because an earlier rejection determines the outcome.
- Table assumes parsable URL-encoded input. Successful-rule expectations require accepted storage lengths and an available database.
- Structured values, malformed requests, and DB errors are outside the defined success/rejection rules.

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

The first three rules partition the required-field failure space for documentation; the implementation uses one combined required-field conditional, not three separate handlers.

**Existing automated representation:** Individual missing/empty/whitespace cases exercise DT-01–03, invalid emails exercise DT-04, and positive API cases exercise DT-05. A-UNIT-014 intentionally combines an empty required field with a malformed email and verifies required-field precedence; A-UNIT-015 verifies the invalid-email path when every required field is present. Earlier external cases retain their existing EP classifications rather than being relabelled retrospectively.

**Identified gaps:** A-UNIT-014 covers empty name plus malformed email and establishes required-field precedence for that combination. Blank message plus malformed email, multiple simultaneous missing fields beyond all-empty input, and other combined-invalid permutations are not separately represented.

**Proposed future conditions:** Blank message plus malformed email, selected multiple-missing combinations, and all fields omitted from a parseable form body. Expect required-field error and no insert where the current scalar-form contract applies. Review intended precedence with a human before treating additional combinations as independent product policy.

DT identifiers identify analysis rules, not new final test-case IDs.

## State Transition Testing

**Definition:** A black-box technique that derives tests from states, events, and resulting transitions.

**Applicability / requirements:** Limited but natural for contact form lifecycle: REQ-CONTACT-002, 004, 005. No complex business state machine exists.

| State / event | Current transition or observation | Existing checks |
|---|---|---|
| Ready + browser-invalid submission | Native validity prevents normal submit-handler execution | Negative UI cases inspect validity; PW also checks success hidden/non-persistence |
| Ready + browser-valid submit | Button disabled, label Sending..., request starts | Not explicitly asserted |
| Submitting + success=true | Confirmation shown, form reset, button restored | Success visibility/text covered, other effects not explicit |
| Submitting + valid JSON success=false | Button restored after the success-only branch; inputs remain available for correction | P-UI-017 verifies rejection, enabled button/restored label, and non-persistence |
| Submitting + network/JSON failure | No catch/finally recovery implemented | No automated recovery check |
| Successful display + another submission | New submit event can occur; prior success is not explicitly cleared first | No sequence coverage |

**Existing automated representation:** Partial. Success tests check a final state but not all transitions. P-DB-002 checks row existence before/after deletion, but this is not sufficient evidence of formal application state-transition design.

**Identified gaps:** Loading control state, reset field values, second submission, stale success visibility, and recovery after network/JSON failures; valid-JSON button recovery is covered.

**Proposed future conditions:** Observe transitions with controlled response timing; verify the existing success transition fully. Define remaining network/JSON failure expectations before adding those assertions. Valid-JSON button recovery is implemented, but error feedback and an actual corrected retry are not asserted.

**DEF-002 example:** Idle → Submitting → server success=false (valid JSON) → Recoverable state (button enabled, label Send Message). Pre-fix P-UI-017 failed because the button stayed disabled/Sending. Moving restoration outside data.success fixed that transition. Focused recovery and successful-contact tests passed, followed by 17/17 Chromium UI regression; DEF-001 cases still passed. Network and malformed-response recovery remain unverified. This is partial State Transition coverage, not complete lifecycle coverage; the combined UI/DB test uses a Gray-box oracle. See [DEFECT_LOG.md](DEFECT_LOG.md) and [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md).

## Use Case Testing

**Definition:** Derive scenarios from an actor's goal and its main and alternative interaction flows.

**Applicability / requirements:** Submit a contact message through the UI; REQ-CONTACT-003/005 and REQ-DB-002.

**Project example:** Open home → enter valid synthetic values → submit → observe success → query persisted email/message → remove owned record.

**Existing automated representation:** S-UI-007 and P-UI-004 implement this main success flow with database verification. This is a retrospective mapping to a user journey, not a claim of pre-existing use-case specifications.

**Identified gaps:** Full stored-row correctness, form reset/button assertions, correction after rejection, second submission, and navigation through the automation page.

**Proposed future conditions:** Describe alternative/recovery flows after resolving their intended outcomes. Keep simple section visibility/navigation tests as Not specifically technique-driven unless a meaningful actor goal and flow are explicitly modelled.

## Error Guessing

**Definition:** An experience-based technique using likely fault patterns and prior observations to select conditions.

**Applicability / requirements:** Shared-page scripts, contact error handling, body parsing, and persistence side effects. Some desired outcomes require clarification rather than an existing requirement ID.

**Project examples:** Footer without contact form; rejected fetch; non-JSON response; duplicate field names/structured form values reaching trim(); negative API unexpectedly inserting data; cleanup throwing after an assertion failure.

**Existing automated representation:** A-UNIT-002–004, A-UNIT-008, A-UNIT-010, A-UNIT-012, and A-UNIT-013 deliberately cover likely validation faults: missing `@`, missing local part, incomplete domain, whitespace-only fields, and all required fields empty. Earlier external invalid-email/whitespace cases retain EP where original error-guessing provenance cannot be established.

**Identified gaps:** Direct checks for the listed failure hypotheses.

**Proposed future conditions:** Design focused reproductions of source observations, record expected behavior or clarification needs, and retain original plus cleanup failure information. Negative testing is not automatically Error Guessing.

## Checklist-based Testing

**Definition:** An experience-based approach applying an explicit list of checks consistently.

**Applicability / requirements:** Page content, navigation, form labels, and browser presentation; REQ-UI-001–009 and contact UI behavior.

**Project examples:** Required sections visible; link reaches destination; fields labelled; browser console free of relevant application errors; mobile menu operates; keyboard can reach controls.

**Existing automated representation:** Visibility/navigation assertions resemble checklist items, but no formal checklist artifact or derivation exists. They remain Not specifically technique-driven in the catalogue. P-UI-015 and P-UI-016 explicitly check absence of startup JavaScript page errors after direct navigation. P-A11Y-001–005 apply a defined automated accessibility checklist through three axe scans and two focused keyboard/semantic checks.

**Identified gaps:** Explicit checklist ownership, automation-page rendering (REQ-UI-007) and navigation (REQ-UI-009), comprehensive manual keyboard/mobile checks, and browser-error assertions beyond /project and /project/automation startup. DEF-001 partially addresses browser-error coverage. The accessibility layer covers selected routes and interactions only; it does not cover every page state, later interaction, or manual accessibility condition.

**Proposed future conditions:** Create a reviewed checklist mapping each item to existing automation, a proposed case, or a manual check. A planned manual check is not a historical manual execution.

**DEF-001 example:** Source inspection identified an unconditional handler on a possibly absent form → browser reproduction confirmed the TypeError on /project and /project/automation → two Black-box System regression checks registered pageerror listeners before navigation → both failed pre-fix with `TypeError: Cannot read properties of null (reading 'addEventListener')` → both passed after optional chaining guarded registration. The successful-contact check and broader 16-case Chromium UI run also passed. This evidence is limited to Chromium; see [DEFECT_LOG.md](DEFECT_LOG.md).

## Accessibility Testing

The implemented Playwright accessibility layer is classified as **System/UI Accessibility Testing**. It uses `@axe-core/playwright` and axe-core in a dedicated Chromium project. The three automated scans evaluate supported WCAG A/AA-oriented rule tags against the rendered Home, Project, and Automation pages. The two focused checks exercise one main-navigation focus/Enter path and selected contact-form accessible-name, required-attribute, and keyboard-focus behavior.

The axe scans are Black-box checks of externally rendered behavior. Their WCAG-oriented rule selection is an automated oracle, not evidence that all WCAG success criteria can be machine tested. P-A11Y-001 and P-A11Y-002 initially failed on genuine `color-contrast` findings linked to DEF-003 and DEF-004, then passed after the targeted fixes. P-A11Y-003–005 passed in both the initial and post-fix local Chromium runs. Both defects are Closed / Fixed / Retest Passed.

Automated accessibility coverage can detect issues such as missing accessible names, invalid ARIA, some landmark/semantic problems, and some color-contrast failures. It cannot establish full accessibility or full WCAG compliance.

Manual accessibility remains separate and should include:

- complete keyboard-only navigation and logical tab order;
- visible focus across interactive states;
- 200% zoom and responsive reflow;
- screen-reader names, roles, states, and announcements;
- meaningful heading structure and reading order; and
- usability of validation and error feedback.

No standalone accessibility product requirement exists in [REQUIREMENTS.md](REQUIREMENTS.md). The implemented cases and confirmed defects are traced without inventing one.

## Interpretation and ambiguity

- EP/BVA are black-box design techniques; an integration case may still be Gray-box because its oracle reads the DB.
- Data-driven providers/loops are execution mechanisms, not techniques.
- Smoke and Regression describe selection/purpose; Cross-browser describes execution coverage.
- Negative scenario classification is independent of Passed/Failed outcome.
- End-to-End describes flow scope and can overlap System and Integration.
- Direct DB tests change classification if the test object changes from the whole application to the database interface.
- Browser DOM validity checks are treated as interface-contract checks here; a stricter taxonomy may call them Gray-box, but not White-box without structural design.
- A status-only API case is System/Black-box in this baseline; organizations may use "API integration" more broadly. State the boundary instead of treating the label as universal.
- JMeter stress labels represent profiles, not proven capacity exceedance or breaking points.
- JMeter samples are measurements, not designed case count.
- No automated compatibility, performance-capacity, or production-readiness conclusion follows from configuration alone.

## Coverage gaps and future conditions

Priorities for later design review: network/JSON failure recovery and rejection feedback/retry sequences, success reset/button verification, browser errors beyond the two covered startup routes, schema-length boundaries, additional combined-invalid conditions beyond the tested required-error precedence case, complete persisted fields/count, DB outages, automation-page navigation, comprehensive manual accessibility and accessibility requirement definition, mobile behavior, and contact-write workload testing.

No final future case IDs are assigned here. Failure handling, revised API contracts, stronger DB assertions, isolation, CI/schema reproducibility, reporting, and performance improvements are not implemented by these documents.

## Reference

Definitions use established testing terminology; project-specific mappings are based on the inspected source. See the [ISTQB CTFL syllabus](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) for terminology. This document does not claim that every listed technique was used during original test development.
