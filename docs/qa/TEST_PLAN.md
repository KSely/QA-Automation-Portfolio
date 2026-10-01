# QA Automation Portfolio — Test Plan

- Test Plan ID: TP-QAP-001
- Status: Reviewed documentation baseline; proposed process criteria remain subject to human review.
- Baseline: Reviewed implementation, with DEF-001/DEF-002 evidence, the verified Jest contact-validation unit layer, and verified Playwright accessibility evidence recorded separately.
- Execution status: Jest unit layer verified; the initial Playwright accessibility run recorded 3 passed and 2 failed, and the post-fix retest recorded 5 passed and 0 failed with DEF-003/DEF-004 closed; execution status for the remaining catalogue is not assessed in this documentation baseline.
- Source authority: Source code, configuration, and executable test definitions take precedence over this snapshot.

## Purpose

Define a practical scope, approach, environments, test-data policy, evidence model, and lifecycle criteria for the complete QA Automation Portfolio. This plan records existing automation and identifies gaps without representing future improvements as implemented.

Review of this baseline records the inspected implementation; it does not imply external product or release approval or test execution.

## Documentation relationship

[REQUIREMENTS.md](REQUIREMENTS.md) → [TEST_DESIGN.md](TEST_DESIGN.md) → [TEST_CASES.md](TEST_CASES.md) → Automation repositories → GitHub Actions CI → [RTM.md](RTM.md) / [DEFECT_LOG.md](DEFECT_LOG.md); [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md) records completed cycles.

- REQUIREMENTS.md defines the current source-derived testable baseline.
- TEST_DESIGN.md explains the design techniques, classifications, and gaps.
- TEST_CASES.md maps implemented automated cases and exact parameter variants, including the application-local Jest unit tests.
- Automation repositories execute selected cases; their existence does not prove a passing result.
- [RTM.md](RTM.md) links current DEF-001/DEF-002 requirements/conditions and the Jest unit cases to their applicable product requirements and execution evidence.
- [DEFECT_LOG.md](DEFECT_LOG.md) records reproduced defects; DEF-001 and DEF-002 are Closed / Fixed / Retest Passed within their confirmed scopes.
- [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md) summarizes completed DEF-001/DEF-002 cycles and the verified Jest unit execution.
- PERFORMANCE_TEST_REPORT.md is deferred.
- This test plan governs scope and proposed process criteria across the set.

The four baseline documents, RTM.md, DEFECT_LOG.md, and TEST_SUMMARY_REPORT.md form the active documentation set. Application/document links are relative; sibling-repository source links use GitHub origins and paths verified from local Git configuration. Links to main may change as those repositories evolve.

## Roles and Responsibilities

These are portfolio responsibilities, not separate staffed team positions. The portfolio owner may perform both owner roles.

- QA Owner — test planning, test design, automation, authorized execution, defect reporting, traceability, and QA documentation.
- Application Owner — implementation and defect fixes for the portfolio application.
- GitHub Actions — automated execution of configured CI suites; it does not provide human approval.

## Objectives

- Verify implemented page content, navigation, and contact behavior.
- Verify the extracted server-side contact-validation logic in isolation.
- Separate browser validation from server-side validation.
- Verify successful persistence and implemented rejected-request non-persistence checks.
- Record configured browser execution without claiming proven compatibility.
- Evaluate the status endpoint under the actual JMeter workload profiles.
- Make test conditions, automation references, limitations, and future evidence traceable.
- Distinguish source observations, proposed behavior, implemented assertions, and verified results.

## Scope

The documentation hub and application-local unit layer are in QA-Automation-Portfolio. Three independent repositories provide external automation:

| Repository | Existing responsibility |
|---|---|
| QA-Automation-Portfolio | Application under test plus application-local Jest unit tests for the contact validation module |
| QA-Portfolio-Selenium | Java UI, REST Assured API, and JDBC database automation |
| QA-Portfolio-Playwright | JavaScript UI, accessibility, request-fixture API, and pg database automation |
| QA-Portfolio-Performance | JMeter smoke, baseline, load, and stress-labelled status workloads |

### In Scope

- Home/project content, section links, and project navigation.
- Automation-page availability and navigation as source-supported features with an automation gap.
- Contact field input, browser validation, successful submission, and success feedback.
- Status response and server-side required-field/email validation.
- Isolated Jest coverage of required-field, whitespace, email-format, and validation-error behavior in the contact validation module.
- PostgreSQL connectivity, message persistence, non-persistence assertions, and test-data lifecycle.
- Configured desktop cross-browser execution.
- Chromium automated accessibility scans for Home, Project, and Automation pages, plus selected keyboard and contact-form semantic checks.
- Existing status-endpoint JMeter workload profiles and result interpretation.

In-scope features are not necessarily fully covered. Coverage status is recorded per requirement.

### Out of Scope

- Authentication, authorization, payment, email-delivery, or CRUD features not implemented.
- Production capacity certification, production readiness, and deployment/rollback testing.
- Endurance execution and unsupported claims of Postman collection coverage.
- Complete manual accessibility assessment, accessibility certification, visual regression, security, and mobile suites.
- Running tests, changing source, or modifying databases as part of creating this baseline.

## Application Under Test

The application is a server-rendered Node.js/Express monolith with logical presentation, HTTP handling, validation, and persistence responsibilities.

EJS views and static assets are physically separate. Routing, database connection, SQL insertion, and startup remain in [index.js](../../index.js). Server-side contact validation is delegated to the small pure [contact validation module](../../utils/contactValidation.js). This extraction does not introduce controller, service, repository, or domain-model layers.

| Method | Endpoint | Current behavior |
|---|---|---|
| GET | / | Home page with contact form |
| GET | /project | Project details |
| GET | /project/automation | Automation descriptions |
| GET | /api/status | Constant 200 status JSON; no DB query |
| POST | /contact | URL-encoded contact validation, parameterized insert, JSON response |

The server listens on port 3000. Accepted contacts are stored; they are not emailed. The footer sends URLSearchParams through fetch.

## Test Levels

| Level / scope | Existing representation |
|---|---|
| Unit | Jest directly tests the pure contact validation module; 15 implemented cases run without PostgreSQL, a browser, external services, or Express startup |
| Integration | Contact API/UI checks plus direct PostgreSQL verification; direct database connectivity and lifecycle tests |
| System | Browser behavior and external HTTP response checks against the running application |
| End-to-End scope | Successful browser contact flow through backend and database; overlaps system/integration rather than being an exclusive level |

## Test Types

Unit, functional, regression, smoke, cross-browser, accessibility, API, database, and performance tags are used. Load and stress describe workload categories. The one-request JMeter smoke plan primarily verifies correctness/readiness of the test setup; it is not meaningful capacity evidence.

Automated Accessibility Testing uses Playwright and axe-core for system/UI-level WCAG-oriented rule evaluation. It does not establish full accessibility or full WCAG compliance. Manual keyboard-only navigation, focus visibility, zoom/reflow, screen-reader behavior, reading order, and validation-feedback usability remain separate.

These tags mix quality objectives, selection purposes, interfaces, and workload categories. They are not a mutually exclusive formal hierarchy.

## Test Approach

1. Inspect source and configuration as the current behavioral baseline.
2. Extract testable statements and identify ambiguity or suspected defects separately.
3. Map existing tests and exact data variants.
4. Apply defensible design techniques and record unimplemented conditions.
5. For a future authorized execution, identify versions, scope, environment, and expected evidence.
6. Classify results and cleanup failures without hiding skipped, blocked, or retry-recovered cases.

### Black-box / Gray-box distinctions

- External UI/HTTP checks without internal structural objectives are classified Black-box.
- Application-level tests that query PostgreSQL are classified Gray-box because their oracle uses internal persistence knowledge.
- Pure DB connectivity classification depends on the stated test boundary; this baseline uses Gray-box relative to the portfolio application.
- The Jest cases directly exercise exported validation functions and their decision branches, so they are classified White-box relative to that module. This classification and the measured coverage do not extend to the Express application or portfolio.
- Source inspection, DOM access, or writing automated code does not alone make a test White-box.

## Environments

| Environment | Existing setup / recording requirement |
|---|---|
| Local | Application and PostgreSQL configured locally; record actual OS, tool versions, browser versions, and repository revisions for any future run |
| Application unit CI | GitHub-hosted `ubuntu-latest`; Node.js 22; `npm ci` and `npm test`; no PostgreSQL, browser, external service, or application startup |
| CI | Ubuntu runner, Node.js 22 application setup, PostgreSQL 16 service container |
| Selenium CI | Java 25 and Maven |
| Performance CI | Java 21 and JMeter 5.6.3 |
| External frontend resources | Bootstrap CSS/JS from jsDelivr; rendering depends partly on resource availability |

Counts and versions are a snapshot. Local templates do not prove that a working environment exists. Capture the application SHA and automation SHA when execution begins.

## Browsers

- Selenium cross-browser suite: Chrome, Firefox, Edge.
- Selenium current CI: default Chrome UI path, headless when CI is set; cross-browser suite not invoked.
- Playwright: Chromium, Firefox, and WebKit UI projects; the accessibility project executes once in Chromium; API and database projects execute once.
- Browser configuration is not evidence of successful compatibility testing.
- No mobile viewport project or dedicated responsive suite was identified.

## Database

[Application schema](../../database/schema.sql): messages with generated id, name VARCHAR(255), email VARCHAR(255), message TEXT, and default created_at timestamp. Name, email, and message are NOT NULL.

The application uses one pg.Client. Tests connect through JDBC or pg to the configured test database, normally qa_portfolio.

Current environment discrepancy: Selenium/Playwright CI align with the 255-character name column; both JMeter workflows create VARCHAR(100). Do not treat this as one universal application boundary.

## Tools and frameworks

- Application: Node.js, Express, EJS, Bootstrap, browser JavaScript, body-parser, dotenv, pg, and Jest 30.5.2 for application-local unit testing.
- Selenium: Java, Selenium WebDriver, TestNG, Maven Surefire, REST Assured, JDBC, Allure.
- Playwright: JavaScript, Playwright Test, `@axe-core/playwright` 4.13.0, axe-core 4.13.0, built-in page/request fixtures, pg, HTML reporter.
- Performance: JMeter JMX plans, HTTP samplers, assertions, timers, JTL, CSV, HTML dashboards.
- Execution orchestration: GitHub Actions.
- Manifest/lockfiles and actual runtime observations remain authoritative for versions.

## Proposed Process Criteria

The criteria below are planning proposals. They are not existing automated gates, historical outcomes, or new product capabilities.

### Entry Criteria

- Selected scope, required cases, and environment are identified.
- Application and automation revisions are recorded.
- Required runtime/browser tools are available.
- HTTP availability and needed database access/schema are checked separately.
- The selected environment is authorized for test-data changes.
- Isolated data and cleanup ownership are defined.
- Known blockers and expected evidence locations are recorded.

### Exit Criteria

- Every selected case has a recorded disposition.
- Failures are explained and linked to a defect, environment issue, or documented exception.
- Unresolved critical/high-impact issues are resolved or explicitly accepted by the designated reviewer.
- Coverage limitations, blocked/skipped cases, retry outcomes, and cleanup failures are recorded.
- Evidence is attributable to the executed revisions and environment.
- Performance results include workload, sample count, errors, timing distribution, and throughput; no production SLA or latency gate is invented.
- A completed scope is not described as complete portfolio coverage or production approval.

### Suspension Criteria

Application/DB unavailability; wrong database target; incompatible schema; browser/runtime failure; contamination that invalidates assertions; unstable performance environment or unknown workload configuration.

### Resumption Criteria

Resolve the blocker; recheck affected readiness and schema; document version/configuration changes; restore isolation; rerun affected cases and relevant checks.

## Test Data Strategy

### Existing implementation

Synthetic names, emails, and messages are used. Successful contact tests and direct DB tests generally clean up records. Timestamp-derived identifiers and some fixed negative values are present. Negative tests do not uniformly clean up unexpected persistence. Existence checks mostly match email/message rather than complete rows.

### Proposed execution discipline

- Use a run/test identity unique across browsers, retries, and concurrent runs.
- Keep other inputs valid when isolating one invalid partition.
- Identify and delete only records owned by the case.
- Clean up unexpected writes from negative cases.
- Preserve the original assertion failure if cleanup also fails.
- Record cleanup results; do not perform broad deletion.
- Treat this strategy as proposed where current helper/test code does not implement it.

## Defect Management Approach

A formal defect workflow is proposed, not claimed as already operational.

Record observed versus expected behavior, reproduction steps, requirement/case links, repository revisions, environment, evidence, severity, priority, and disposition. Distinguish application, automation, environment, and documentation issues.

Proposed lifecycle: New → Triaged → In progress → Ready for retest → Closed. Use Blocked, Deferred, Rejected, or Reopened where justified.

Source-only observations remain suspected defects until reproduced/confirmed. The shared-footer missing-form path was subsequently reproduced as DEF-001, fixed, and verified in Chromium; see [DEFECT_LOG.md](DEFECT_LOG.md). The valid-JSON rejection button path was confirmed as DEF-002, fixed, and verified in Chromium. Network/request and malformed/non-JSON recovery remain unverified; visible rejection feedback remains a gap.

## Reporting

| Framework | Existing reporting | Limitation |
|---|---|---|
| Jest | Console results from `npm test`; local module coverage from `npm run test:coverage` | Unit coverage is limited to the imported contact validation module; the CI workflow does not publish a coverage artifact |
| Selenium | Allure metadata/results/screenshots; Surefire/TestNG outputs | Workflow uploads Allure results only on failure; environment properties describe Local/Windows even in Ubuntu CI |
| Playwright | HTML, failure screenshots, first-retry traces; accessibility failures include concise axe rule/impact/selector diagnostics; one retry by default | Independent suite commands reuse/replace the HTML report directory; failure-only upload |
| JMeter | JTL, logs, CSV summaries, local HTML dashboards | CI uploads raw results/logs only on failure; no latency/throughput acceptance gate |

Artifact retention is seven days in the workflows. An output path is not evidence that a retained artifact exists. Some historical stress CSV/JTL counts disagree; do not attribute them to the same run without verification.

## CI Execution

| Workflow source | Trigger | Existing sequence |
|---|---|---|
| [Application Unit Tests](../../.github/workflows/unit-tests.yml) | Push / pull request | Node.js 22 → `npm ci` → `npm test` |
| [Selenium CI](https://github.com/KSely/QA-Portfolio-Selenium/blob/main/.github/workflows/selenium-ci.yml) | Push to main / PR targeting main | Compile → API → DB → UI smoke → UI regression |
| [Playwright CI](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/.github/workflows/playwright-ci.yml) | Push to main / PR targeting main | API → DB → smoke → Chromium accessibility → UI |
| [JMeter CI](https://github.com/KSely/QA-Portfolio-Performance/blob/main/.github/workflows/jmeter-ci.yml) | Push to main / PR targeting main | Smoke → baseline |
| [JMeter performance](https://github.com/KSely/QA-Portfolio-Performance/blob/main/.github/workflows/jmeter-performance.yml) | Manual dispatch | Selected load/stress plan |

The application Unit Tests workflow checks out this repository and runs the isolated Jest suite without PostgreSQL or application startup. Each external automation/performance workflow checks out its test repository and the application, provisions PostgreSQL 16, installs dependencies, creates configuration/table, starts the application in the background, and polls /api/status.

The external workflows' application checkout has no explicit ref. Status polling does not prove application-to-database readiness. Earlier failures ordinarily skip later test steps. Smoke cases overlap later suites. The application-local workflow covers only the Jest unit layer; no application workflow/cross-repository trigger runs the full set on an application-only change. No CD deployment/promotion/rollback is implemented.

## Risk-Based Prioritization

These are practical portfolio priorities based on user impact, persistence risk, failure visibility, and CI/reproducibility risk. They are not a formal business risk assessment or release authorization.

| Priority | Current focus |
|---|---|
| High | Contact submission; server-side validation; persistence and rejected-request non-persistence; required DB connectivity; CI reliability |
| Medium | Main/project navigation; cross-browser behavior; reporting integrity; status and general API response contracts; helper lifecycle and JMeter workload profiles |
| Lower | Informational content-only visibility and cosmetic/documentation-only presentation checks |

Contact acceptance/rejection contracts retain High priority because their failures can affect user submissions or stored data. Informational checks remain Low even when run across browsers. Automation or CI membership alone does not make a case High priority.

Case-level High/Medium/Low assignments are recorded in TEST_CASES.md. Operational risks such as CI reliability and report integrity may not yet have dedicated automated cases; their plan priority does not invent catalogue entries.

## Risks

- Source-derived requirements can reproduce existing defects rather than independent product intent.
- Schema/configuration drift and implicit application revision weaken reproducibility.
- Data identity collisions and incomplete cleanup can contaminate results.
- DEF-002 covers valid-JSON rejection button recovery; network/JSON failures, error feedback, and corrected retry sequences remain gaps.
- Boolean record checks miss incorrect fields or duplicate rows.
- Missing/replaced reports and static metadata weaken traceability.
- External assets, browser differences, and retries complicate diagnosis.
- Automated accessibility scans cover only machine-detectable rules and selected states; DEF-003/DEF-004 are closed after passing retest, while manual accessibility evidence remains absent.
- Short, paced, status-only performance workloads do not establish persistence performance, sustained capacity, or breaking points.

## Assumptions

Future execution is separately authorized and uses synthetic data in a known test environment. Repository revisions are compatible. Required DB access exists. Schema and tool versions are recorded. Configured support is not assumed to equal verified support.

## Deliverables

Current: TEST_PLAN.md, REQUIREMENTS.md, TEST_DESIGN.md, TEST_CASES.md, [RTM.md](RTM.md), and [DEFECT_LOG.md](DEFECT_LOG.md). DEF-001 evidence includes a 16/16 passing Chromium UI regression run. Accessibility evidence preserves the initial 5-case result of 3 passed and 2 failed for DEF-003/DEF-004 and the post-fix retest result of 5 passed and 0 failed. No full accessibility, Firefox/WebKit accessibility, or production conclusion is implied.

Current cycle summary: [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md), including DEF-002's 17/17 Chromium UI run, the verified 15/15 Jest unit run, and the 5-case accessibility execution. Deferred: PERFORMANCE_TEST_REPORT.md.

## Baseline maintenance and human review

Update the documents deliberately when an improvement changes behavior, assertions, data, configuration, or evidence. Further failure handling beyond the confirmed valid-JSON button fix, API error contracts, stronger DB assertions, isolation, reproducibility, reporting, and performance changes are not implemented by this baseline.

Human review remains necessary for process ownership/severity thresholds, acceptance criteria, ambiguous normalization/error behavior, future performance targets, and the chosen classification boundary for direct DB tests.
