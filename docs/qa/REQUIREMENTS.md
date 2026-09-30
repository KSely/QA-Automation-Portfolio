# Source-derived Requirements — QA Automation Portfolio

These requirements are source-derived testable behaviors extracted from the
current implementation. They are used as the baseline for QA planning,
test design, traceability, and coverage analysis.

They are not independently approved business requirements from a Product Owner
or Business Analyst.

Source code remains authoritative.

## Baseline status and interpretation

Status: Reviewed documentation baseline before the improvement cycle. Execution status: Not assessed in this documentation baseline.

The word "shall" records the implemented behavioral baseline for testing; it does not confer independent product approval. QA and Performance requirements describe configured verification targets, not achieved compatibility or capacity.

Coverage statuses are static source assessments:
- Represented: existing assertions address the stated narrow behavior; no passing result is implied.
- Partial: some clauses, variants, or consequences are asserted; limitations are identified.
- Gap: no dedicated assertion found.
- Configured: execution configuration exists; result evidence is not assessed.

[TEST_PLAN.md](TEST_PLAN.md) defines scope/process; [TEST_DESIGN.md](TEST_DESIGN.md) explains conditions; [TEST_CASES.md](TEST_CASES.md) resolves all case IDs and variants. [RTM.md](RTM.md) and [DEFECT_LOG.md](DEFECT_LOG.md) connect DEF-001 evidence; [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md) summarizes the completed cycles. Code/configuration changes require deliberate baseline review.

## Source reference key

| Key | Physical implementation |
|---|---|
| A1 | [Application entry point](../../index.js): middleware, routes, validation, SQL, startup |
| A2 | [Home template](../../views/index.ejs): fields, headings, links |
| A3 | [Project template](../../views/project.ejs): sections and navigation destination |
| A4 | [Automation template](../../views/automation.ejs): automation content |
| A5 | [Header](../../views/partials/header.ejs): page-dependent navigation |
| A6 | [Footer](../../views/partials/footer.ejs): fetch, form state, scroll behavior |
| A7 | [Schema](../../database/schema.sql): messages columns/constraints/defaults |
| S1 | [TestNG suites](https://github.com/KSely/QA-Portfolio-Selenium/tree/main/src/test/resources/test-suites) and [DriverFactory](https://github.com/KSely/QA-Portfolio-Selenium/blob/main/src/main/java/com/qaautomation/portfolio/driver/DriverFactory.java) |
| S2 | [JDBC helper](https://github.com/KSely/QA-Portfolio-Selenium/blob/main/src/main/java/com/qaautomation/portfolio/database/DatabaseHelper.java) |
| P1 | [Playwright configuration](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/playwright.config.js) |
| P2 | [PostgreSQL helper](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/utils/databaseHelper.js) |
| J1 | [JMeter plans](https://github.com/KSely/QA-Portfolio-Performance/tree/main/tests) |
| C1 | [Selenium CI](https://github.com/KSely/QA-Portfolio-Selenium/blob/main/.github/workflows/selenium-ci.yml) |
| C2 | [Playwright CI](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/.github/workflows/playwright-ci.yml) |
| C3 | [Performance workflows](https://github.com/KSely/QA-Portfolio-Performance/tree/main/.github/workflows) |

Application/document links are relative. Sibling-repository links use verified GitHub origins and tracked paths on main; those links can evolve after this baseline.

## UI

| Requirement ID | Requirement statement | Category | Source / implementation basis | Existing automated coverage | Coverage status | Notes / limitations |
|---|---|---|---|---|---|---|
| REQ-UI-001 | The home route shall render the portfolio title and main heading. | UI | A1 GET /; A2 title via A5 and main heading | P-UI-001 | Represented | Checks title pattern/heading visibility, not all home content or browser errors. |
| REQ-UI-002 | The home skills link shall target the skills section. | UI | A2 skills-button and skills anchor | S-UI-001 | Partial | Checks section display after click; does not assert URL fragment. |
| REQ-UI-003 | View QA Project shall target the featured-project section. | UI | A2 project-button and project anchor | S-UI-002; P-UI-002 | Represented | Playwright checks fragment and heading; Selenium checks display. |
| REQ-UI-004 | View Project Details shall open the project page. | UI | A2 project-details-button; A1 /project | S-UI-003; P-UI-003 | Represented | Selenium checks overview display; Playwright also checks URL/heading. |
| REQ-UI-005 | The project page shall contain overview, architecture, technology, QA, strategy, API, and database sections. | UI | A3 section structure | S-UI-013–019; P-UI-008–014; P-UI-015 (related page-error check) | Represented | Existing content checks cover visibility; P-UI-015 adds startup pageerror coverage on /project, not full page correctness. Displayed documentation claims are not independently validated. |
| REQ-UI-006 | Project navigation shall target the corresponding section anchors. | UI | A5 project navigation; A3 anchors | S-UI-020–025 | Partial | Six anchors covered; overview navigation is not explicitly asserted. |
| REQ-UI-007 | GET /project/automation shall render automation content. | UI | A1 route; A4 template | P-UI-016 (related page-error check only) | Partial | Direct route load and absence of startup pageerrors are checked; automation content is not explicitly asserted. Link navigation remains separate under REQ-UI-009. DEF-001 is fixed and verified in Chromium. |
| REQ-UI-008 | The scroll-to-top control shall become visible when scrollY exceeds 400 and request scrolling to the top on click. | UI | A6 scroll and click listeners | None | Gap | Threshold and smooth-scroll request are implemented; no browser execution evidence assessed. |
| REQ-UI-009 | The project page and project navigation shall provide links targeting /project/automation. | UI | A3 automation link; A5 project navigation link | None | Gap | Split from the earlier REQ-UI-007; no click/destination automation currently exists. |

## Contact

| Requirement ID | Requirement statement | Category | Source / implementation basis | Existing automated coverage | Coverage status | Notes / limitations |
|---|---|---|---|---|---|---|
| REQ-CONTACT-001 | Name, email, and message controls shall accept entered text. | Contact | A2 inputs/textarea | S-UI-004–006 | Represented | Uses ordinary representative values; not a length/Unicode boundary suite. |
| REQ-CONTACT-002 | The browser form shall require all three fields and apply HTML email validation to email. | Contact | A2 required attributes and type=email | S-UI-008–012; P-UI-005–007 | Represented with tool-specific gaps | Selenium covers all empty fields; Playwright lacks empty-email UI case. Browser constraints do not equal server regex/whitespace checks. |
| REQ-CONTACT-003 | A browser-valid form submission shall send URL-encoded fields to POST /contact. | Contact | A6 FormData, URLSearchParams, fetch | S-UI-007; P-UI-004 | Partial | Successful workflows exercise the path; request encoding is not explicitly intercepted/asserted. |
| REQ-CONTACT-004 | Submission shall disable the send button and display Sending... while its request is pending. | Contact | A6 before fetch | P-UI-017 (related recovery check) | Partial | Pending disabled/Sending state is not explicitly asserted. DEF-002 adds verified restoration after valid-JSON rejection; this is source-derived recovery context, not a new approved business requirement. |
| REQ-CONTACT-005 | A successful contact response shall display confirmation, reset the form, and restore the send button. | Contact | A6 data.success branch | S-UI-007; P-UI-004 | Partial | Success visibility/text is covered; reset and button restoration are not explicit assertions. |

## API

| Requirement ID | Requirement statement | Category | Source / implementation basis | Existing automated coverage | Coverage status | Notes / limitations |
|---|---|---|---|---|---|---|
| REQ-API-001 | GET /api/status shall return 200 JSON with status=ok and message=QA Automation Portfolio backend is running. | API | A1 status route | S-API-001; P-API-001–002; J-PERF-001–007 | Represented | JMeter checks only code/status substring; endpoint does not establish DB readiness. |
| REQ-API-002 | For ordinary scalar form values, an omitted, empty, or whitespace-only required field shall return 400 with success=false and message=All fields are required. | API | A1 required-field check | S-API-003–008, S-API-013–015; P-API-004–009; P-UI-017 | Represented with variant gaps | Playwright has no explicit empty-string API cases. Structured/non-string bodies are not covered by this contract. |
| REQ-API-003 | With all fields nonblank, email failing the implemented regex shall return 400 with success=false and message=Invalid email address. | API | A1 regex applied to email.trim() | S-API-009–012; P-API-010–013 | Partial | Four invalid examples per framework; not a complete email standard or all accepted/rejected values. |
| REQ-API-004 | For accepted inputs within storage limits and an available database, the handler shall insert before returning 200 with success=true and message=Message sent successfully! | API | A1 awaited insert and success response | S-API-002; P-API-003; successful UI cases indirectly | Represented | No stable application-specific database-failure JSON contract is defined. |
| REQ-API-005 | Required-field rejection shall precede email-format rejection when both conditions are invalid. | API | A1 ordering of return branches | None explicitly combining both faults | Gap | Source-derived precedence; human review should confirm that this is desired product behavior. |

## Database

| Requirement ID | Requirement statement | Category | Source / implementation basis | Existing automated coverage | Coverage status | Notes / limitations |
|---|---|---|---|---|---|---|
| REQ-DB-001 | The configured test environment shall permit the required PostgreSQL connection. | Database / environment | A1 connection configuration; S2/P2; test connection code | S-DB-001; P-DB-001 | Partial | Tests use their own clients; they do not prove that the application connection is ready. |
| REQ-DB-002 | Accepted contact submissions shall persist the submitted name, email, and message. | Database | A1 parameterized insert | S-UI-007; S-API-002; P-UI-004; P-API-003 | Partial | Helpers primarily match email/message. Stored name, timestamp, exact count, and duplicate detection are not asserted. Direct-insert DB tests do not prove application field mapping. |
| REQ-DB-003 | Requests rejected by contact validation shall not insert a message. | Database | A1 returns before insert | S-API-003–015; P-API-007–013; P-UI-005–007 indirectly for browser rejection; P-UI-017 for server rejection | Partial | PW missing-field API cases check response only. Browser-rejected cases do not demonstrate server validation. |
| REQ-DB-004 | The application schema shall define a generated primary key, non-null name/email/message, 255-character name/email limits, and a default created_at timestamp. | Database | A7 | S-DB-002; P-DB-002 provide limited lifecycle exercise | Partial | No systematic constraint/timestamp checks. PW asserts returned ID is defined, not primary-key uniqueness. JMeter workflow name limit is 100: environment drift. Default timestamp applies when omitted; column is not declared NOT NULL. |

REQ-DB-004 is intentionally retained as a compound schema requirement: generated primary key, NOT NULL fields, VARCHAR limits, and timestamp default. Existing DB cases exercise only a subset. Keeping one schema identifier avoids implying separate, fully implemented constraint coverage; the individual clauses remain explicit for later traceability.

## QA / Verification Requirements

REQ-QA-001 and REQ-QA-002 describe verification-framework/configuration requirements, not product feature requirements. They specify test selection and browser projects without asserting successful compatibility.

| Requirement ID | Requirement statement | Category | Source / implementation basis | Existing automated coverage | Coverage status | Notes / limitations |
|---|---|---|---|---|---|---|
| REQ-QA-001 | The Selenium cross-browser suite shall select Chrome, Firefox, and Edge for the UI classes. | QA / Cross-browser | S1 suite and driver factory | S-UI-001–025 via cross-browser suite | Configured | CI invokes default Chrome smoke/regression, not the cross-browser suite. No compatibility result is assessed. |
| REQ-QA-002 | Playwright shall select Chromium, Firefox, and WebKit for UI specs and run API/DB specs in separate single projects. | QA / Cross-browser | P1; C2 | P-UI-001–017; P-API-001–013; P-DB-001–002 | Configured | 17 UI cases × 3 browsers = 51 UI browser executions; plus 13 API and 2 DB = 66 configured full-run executions before retries. DEF-001/DEF-002 ran Chromium UI only, not all 66. Configuration is not proof of compatibility. |

## Performance

| Requirement ID | Requirement statement | Category | Source / implementation basis | Existing automated coverage | Coverage status | Notes / limitations |
|---|---|---|---|---|---|---|
| REQ-PERF-001 | Each JMeter plan shall assert status code 200 and response content containing "status":"ok". | Performance / response correctness | J1 response assertions | J-PERF-001–007 | Configured and represented | No database query occurs in this endpoint. This is a functional oracle within workload tests. |
| REQ-PERF-002 | JMeter shall use the defined smoke, baseline, load, and stress profiles and support result collection for those executions. | Performance / workload configuration | J1 thread groups/timers/listeners; C3 command-line output | J-PERF-001–007 | Configured | Exact profiles in TEST_CASES.md. No capacity, sustained-concurrency, production SLA, or breaking-point requirement is inferred. |

## Requirement ID refinement

- Earlier REQ-UI-007 combined rendering and navigation. It now retains rendering only; the navigation clause is REQ-UI-009.
- REQ-UI-008 and all other existing IDs remain unchanged. No IDs were shifted or retired.
- REQ-DB-004 remains an explicitly compound schema requirement; no DB IDs were added.
- The split did not create an automated test. Subsequently P-UI-016 added a related page-error check under REQ-UI-007; REQ-UI-009 still has no dedicated link/navigation assertion.

## Observed behavior, suspected defects, and clarification

These observations are deliberately not assigned new requirement IDs or presented as desired product rules.

| Observation / unresolved area | Classification | Source basis | Required interpretation |
|---|---|---|---|
| Shared footer previously attached a handler to a missing form on project/automation pages | Reproduced as DEF-001; Closed / Fixed / Retest Passed | A3/A4 include A6; A6 now uses contactForm?.addEventListener | Original source suspicion was reproduced, covered by P-UI-015/P-UI-016, and fixed/verified in Chromium. See [DEFECT_LOG.md](DEFECT_LOG.md); visible rendering alone was not proof of an error-free page. |
| Valid-JSON rejection previously left button disabled | DEF-002 confirmed, fixed, retest passed; Closed | A6 restoration now follows the data.success branch; P-UI-017 | Button recovery verified in Chromium. Network/request and malformed/non-JSON recovery remain unverified; no catch/finally was added. Error feedback remains a separate gap. |
| Truthy non-string fields can reach trim(); unsupported/malformed bodies lack a defined error contract | Requirement requiring clarification | A1 parser/handler | Define expected HTTP/error behavior before specifying future acceptance criteria. |
| Validation trims for checks but insert uses original field values | Observed current behavior; intent unclear | A1 | Do not claim normalization on storage. Human review must decide intended whitespace policy. |
| Oversized name/email reaches storage constraints without explicit application length validation | Requirement requiring clarification | A1/A7 | 255 is a schema limit, not a promised 400 API response. |
| JMeter CI creates name VARCHAR(100) | Observed environment inconsistency | C3 versus A7/C1/C2 | Do not reinterpret this as a universal product limit. |
| API error precedence follows code ordering | Source-derived behavior requiring intent review | A1 | Covered by REQ-API-005 as a baseline, not independent business approval. |

## Coverage gaps and future behavior

Existing source-supported gaps include automation-page content/link assertions beyond the new startup pageerror check, form lifecycle assertions, full persistence verification, schema boundaries, and combined-invalid-input precedence. These remain gaps even though source implements parts of the behavior.

Further failure recovery beyond valid-JSON button restoration, stable database-outage responses, revised normalization, stronger isolation, changed CI/versioning, and representative write-load tests are proposed future work. They are not additional current requirements in this baseline.

Future changes must deliberately update the affected requirement, case/design mapping, and coverage status. DEF-001 outcomes are recorded in [RTM.md](RTM.md) and [DEFECT_LOG.md](DEFECT_LOG.md); [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md) records DEF-001 and DEF-002 cycle outcomes.
