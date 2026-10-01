# Existing Automated Test Cases — Baseline Catalogue

## Baseline status

Status: Reviewed documentation baseline with completed defect-cycle evidence and verified application-local Jest unit results.

Every row has Automation Status = Existing. The original 81 Selenium, Playwright, and JMeter entries retain Execution Status = Not assessed in this documentation baseline; the 15 Jest entries record their verified passing execution. IDs are stable documentation identifiers and are not annotations added to automation code. No final IDs are allocated to proposed future conditions.

[REQUIREMENTS.md](REQUIREMENTS.md) defines the source-derived baseline; [TEST_DESIGN.md](TEST_DESIGN.md) explains classification; [TEST_PLAN.md](TEST_PLAN.md) describes scope and proposed process criteria. [RTM.md](RTM.md) links cycle-specific and Jest evidence, while [DEFECT_LOG.md](DEFECT_LOG.md) records DEF-001 and DEF-002 closure.

## Test Case Classification Legend

| Term | Meaning |
|---|---|
| Sys | System test through the running application's interface |
| Int | Integration verification, including real database interaction |
| E2E | End-to-End workflow scope; can overlap System and Integration |
| F / R / Sm / CB | Functional / Regression purpose / Smoke selection / configured Cross-browser execution |
| API / DB / Perf | HTTP-interface / Database / Performance tags |
| Baseline / Load / Stress | JMeter workload categories; Stress is the plan label, not proof of exceeding known capacity |
| Black-box | Interface-contract check without structural coverage design |
| Gray-box | Application-level test using internal persistence knowledge |
| EP | Equivalence Partitioning, a black-box design technique; may coexist with a Gray-box test oracle |
| Use Case | Retrospective mapping of the successful user journey |
| Not specifically technique-driven | No formal technique confidently supported by the existing design |
| ST | Selenium WebDriver + TestNG |
| RA | REST Assured + TestNG |
| JT | JDBC + TestNG |
| PW / pg | Playwright Test / node-postgres |
| JM | Apache JMeter |
| A-UNIT | Application-local Jest unit test |
| Module | Exported pure JavaScript function boundary |
| Positive / Negative | Scenario/data classification, independent of execution outcome |

All rows are automated. Manual workflow dispatch still executes automated tests. R and CB describe intended suite/project use, not necessarily literal tags on tests. White-box is assigned only to the Jest cases that directly exercise the validation module; BVA, Decision Table, State Transition, and Error Guessing are assigned only where the implemented case design supports them.

DOM required/validity checks are classified Black-box interface checks here; the application-level DB checks are Gray-box. Direct connectivity classifications depend on the test boundary. See TEST_DESIGN.md for ambiguity.

Requirement links are limited to the asserted subset. A case mapped to a compound requirement does not establish full coverage of every clause. Direct DB insert tests only exercise part of REQ-DB-004; they do not prove application field mapping under REQ-DB-002.

## Priority model

Priority is a portfolio risk assessment, separate from severity, technique, and execution outcome.

- High: contact input/submission/validation, persistence/non-persistence, and DB connectivity needed for integration checks.
- Medium: main/project navigation, status response contracts, database helper lifecycle checks, and JMeter profiles.
- Low: informational section visibility without a primary functional workflow assertion.
- Cross-browser configuration does not automatically raise a low-impact content assertion. CI membership and automation alone do not imply High priority.
- Database insert/delete helper cases are Medium; real contact persistence checks remain High.
- Home/project availability and navigation are Medium; contact-related value acceptance and required-field checks are High.

The 96 existing entries contain 56 High, 27 Medium, and 13 Low priorities. The 15 application-local unit cases are High because they verify contact acceptance/rejection logic. Assignments are subject to human risk review and do not claim a formal business approval.

## 1. Selenium UI

Repository: QA-Portfolio-Selenium.

Sources: [HomePageTest](https://github.com/KSely/QA-Portfolio-Selenium/blob/main/src/test/java/com/qaautomation/portfolio/tests/HomePageTest.java), [ProjectPageTest](https://github.com/KSely/QA-Portfolio-Selenium/blob/main/src/test/java/com/qaautomation/portfolio/tests/ProjectPageTest.java).

All 25 cases are in UI regression and the cross-browser suite. Four are selected as smoke. CI runs default Chrome smoke/regression; the Chrome/Firefox/Edge cross-browser suite is configured but not invoked by current CI.

| Test ID | Requirement ID(s) | Test method / specification / plan | Feature | Priority | Test Level | Test Type(s) | Test Approach | Test Design Technique | Positive / Negative | Interface | Framework | Automation Status | Execution Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| S-UI-001 | REQ-UI-002; REQ-QA-001 | HomePageTest.skillsSectionShouldBeDisplayedAfterClickingSkillsButton | Skills navigation | Medium | Sys | F/R/CB/Sm | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-002 | REQ-UI-003; REQ-QA-001 | HomePageTest.projectSectionShouldBeDisplayedAfterClickingProjectButton | Project anchor | Medium | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-003 | REQ-UI-004; REQ-QA-001 | HomePageTest.projectDetailsButtonShouldOpenProjectPage | Project navigation | Medium | Sys | F/R/CB/Sm | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-004 | REQ-CONTACT-001; REQ-QA-001 | HomePageTest.nameFieldShouldAcceptText | Name entry | High | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-005 | REQ-CONTACT-001; REQ-QA-001 | HomePageTest.emailFieldShouldAcceptText | Email entry | High | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-006 | REQ-CONTACT-001; REQ-QA-001 | HomePageTest.messageFieldShouldAcceptText | Message entry | High | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-007 | REQ-CONTACT-003; REQ-CONTACT-005; REQ-DB-002; REQ-QA-001 | HomePageTest.contactFormShouldSubmitSuccessfully | Contact/persistence | High | Sys/E2E + Int | F/R/CB/Sm/DB | Gray-box | Use Case | Positive | UI + DB | ST + JDBC | Existing | Not assessed in this documentation baseline |
| S-UI-008 | REQ-CONTACT-002; REQ-QA-001 | HomePageTest.nameFieldShouldBeRequired | Name required attribute | High | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-009 | REQ-CONTACT-002; REQ-QA-001 | HomePageTest.contactFormShouldNotSubmitWhenNameIsEmpty | Empty name | High | Sys | F/R/CB | Black-box | EP | Negative | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-010 | REQ-CONTACT-002; REQ-QA-001 | HomePageTest.contactFormShouldNotSubmitWithInvalidEmail | Invalid email | High | Sys | F/R/CB | Black-box | EP | Negative | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-011 | REQ-CONTACT-002; REQ-QA-001 | HomePageTest.contactFormShouldNotSubmitWhenEmailIsEmpty | Empty email | High | Sys | F/R/CB | Black-box | EP | Negative | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-012 | REQ-CONTACT-002; REQ-QA-001 | HomePageTest.contactFormShouldNotSubmitWhenMessageIsEmpty | Empty message | High | Sys | F/R/CB | Black-box | EP | Negative | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-013 | REQ-UI-005; REQ-QA-001 | ProjectPageTest.overviewSectionShouldBeDisplayed | Overview visibility | Low | Sys | F/R/CB/Sm | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-014 | REQ-UI-005; REQ-QA-001 | ProjectPageTest.architectureSectionShouldBeDisplayed | Architecture visibility | Low | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-015 | REQ-UI-005; REQ-QA-001 | ProjectPageTest.techStackSectionShouldBeDisplayed | Technology visibility | Low | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-016 | REQ-UI-005; REQ-QA-001 | ProjectPageTest.qaStackSectionShouldBeDisplayed | QA stack visibility | Low | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-017 | REQ-UI-005; REQ-QA-001 | ProjectPageTest.testStrategySectionShouldBeDisplayed | Strategy visibility | Low | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-018 | REQ-UI-005; REQ-QA-001 | ProjectPageTest.apiTestingSectionShouldBeDisplayed | API section visibility | Low | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-019 | REQ-UI-005; REQ-QA-001 | ProjectPageTest.databaseTestingSectionShouldBeDisplayed | DB section visibility | Low | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-020 | REQ-UI-006; REQ-QA-001 | ProjectPageTest.architectureLinkShouldNavigateToArchitectureSection | Architecture anchor | Medium | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-021 | REQ-UI-006; REQ-QA-001 | ProjectPageTest.techStackLinkShouldNavigateToTechStackSection | Technology anchor | Medium | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-022 | REQ-UI-006; REQ-QA-001 | ProjectPageTest.qaStackLinkShouldNavigateToQaStackSection | QA stack anchor | Medium | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-023 | REQ-UI-006; REQ-QA-001 | ProjectPageTest.testStrategyLinkShouldNavigateToTestStrategySection | Strategy anchor | Medium | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-024 | REQ-UI-006; REQ-QA-001 | ProjectPageTest.apiTestingLinkShouldNavigateToApiTestingSection | API section anchor | Medium | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |
| S-UI-025 | REQ-UI-006; REQ-QA-001 | ProjectPageTest.databaseTestingLinkShouldNavigateToDatabaseTestingSection | DB section anchor | Medium | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | ST | Existing | Not assessed in this documentation baseline |

S-UI-007 checks success visibility and email/message existence, not exact success text, stored name, timestamp, row count, reset, or button restoration. Negative Selenium UI cases inspect browser validity; they do not query the database. S-UI-008 checks the required attribute, so its scenario is Positive rather than an invalid submission.

## 2. Selenium API

Repository: QA-Portfolio-Selenium.

Sources: [StatusApiTest](https://github.com/KSely/QA-Portfolio-Selenium/blob/main/src/test/java/com/qaautomation/portfolio/api/StatusApiTest.java), [ContactApiTest](https://github.com/KSely/QA-Portfolio-Selenium/blob/main/src/test/java/com/qaautomation/portfolio/api/ContactApiTest.java). CI runs the API suite.

The table expands every provider variant to its own documentation ID. Empty string, three ASCII spaces, and omitted keys are different variants. Other fields retain the valid values generated by the method.

| Test ID | Requirement ID(s) | Test method / specification / plan | Feature | Priority | Test Level | Test Type(s) | Test Approach | Test Design Technique | Positive / Negative | Interface | Framework | Automation Status | Execution Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| S-API-001 | REQ-API-001 | StatusApiTest.statusEndpointShouldReturn200 | Status response | Medium | Sys | F/API | Black-box | Not specifically technique-driven | Positive | API | RA | Existing | Not assessed in this documentation baseline |
| S-API-002 | REQ-API-004; REQ-DB-002 | ContactApiTest.contactEndpointShouldSubmitMessageSuccessfully | Accepted contact | High | Int | F/API/DB | Gray-box | EP (valid partition) | Positive | API + DB | RA + JDBC | Existing | Not assessed in this documentation baseline |
| S-API-003 | REQ-API-002; REQ-DB-003 | ContactApiTest.contactEndpointShouldReturn400ForInvalidRequiredFieldValue [name = empty string ("")] | Required field rejection | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | RA + JDBC | Existing | Not assessed in this documentation baseline |
| S-API-004 | REQ-API-002; REQ-DB-003 | ContactApiTest.contactEndpointShouldReturn400ForInvalidRequiredFieldValue [name = three spaces ("   ")] | Required field rejection | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | RA + JDBC | Existing | Not assessed in this documentation baseline |
| S-API-005 | REQ-API-002; REQ-DB-003 | ContactApiTest.contactEndpointShouldReturn400ForInvalidRequiredFieldValue [email = empty string ("")] | Required field rejection | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | RA + JDBC | Existing | Not assessed in this documentation baseline |
| S-API-006 | REQ-API-002; REQ-DB-003 | ContactApiTest.contactEndpointShouldReturn400ForInvalidRequiredFieldValue [email = three spaces ("   ")] | Required field rejection | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | RA + JDBC | Existing | Not assessed in this documentation baseline |
| S-API-007 | REQ-API-002; REQ-DB-003 | ContactApiTest.contactEndpointShouldReturn400ForInvalidRequiredFieldValue [message = empty string ("")] | Required field rejection | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | RA + JDBC | Existing | Not assessed in this documentation baseline |
| S-API-008 | REQ-API-002; REQ-DB-003 | ContactApiTest.contactEndpointShouldReturn400ForInvalidRequiredFieldValue [message = three spaces ("   ")] | Required field rejection | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | RA + JDBC | Existing | Not assessed in this documentation baseline |
| S-API-009 | REQ-API-003; REQ-DB-003 | ContactApiTest.contactEndpointShouldReturn400ForInvalidEmailFormats [email = "invalid-email"] | Email format rejection | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | RA + JDBC | Existing | Not assessed in this documentation baseline |
| S-API-010 | REQ-API-003; REQ-DB-003 | ContactApiTest.contactEndpointShouldReturn400ForInvalidEmailFormats [email = "test@"] | Email format rejection | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | RA + JDBC | Existing | Not assessed in this documentation baseline |
| S-API-011 | REQ-API-003; REQ-DB-003 | ContactApiTest.contactEndpointShouldReturn400ForInvalidEmailFormats [email = "@example.com"] | Email format rejection | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | RA + JDBC | Existing | Not assessed in this documentation baseline |
| S-API-012 | REQ-API-003; REQ-DB-003 | ContactApiTest.contactEndpointShouldReturn400ForInvalidEmailFormats [email = "test@example"] | Email format rejection | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | RA + JDBC | Existing | Not assessed in this documentation baseline |
| S-API-013 | REQ-API-002; REQ-DB-003 | ContactApiTest.contactEndpointShouldReturn400WhenNameIsMissing [name key omitted] | Omitted field rejection | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | RA + JDBC | Existing | Not assessed in this documentation baseline |
| S-API-014 | REQ-API-002; REQ-DB-003 | ContactApiTest.contactEndpointShouldReturn400WhenEmailIsMissing [email key omitted] | Omitted field rejection | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | RA + JDBC | Existing | Not assessed in this documentation baseline |
| S-API-015 | REQ-API-002; REQ-DB-003 | ContactApiTest.contactEndpointShouldReturn400WhenMessageIsMissing [message key omitted] | Omitted field rejection | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | RA + JDBC | Existing | Not assessed in this documentation baseline |

All Selenium contact negatives assert non-persistence. Missing email checks by unique message; missing message checks by unique email. Positive contact tests clean up in finally; negative cases do not uniformly clean up unexpected writes. EP labels do not establish complete partition coverage or historical design intent.

## 3. Selenium Database

Repository: QA-Portfolio-Selenium.

Source: [DatabaseConnectionTest](https://github.com/KSely/QA-Portfolio-Selenium/blob/main/src/test/java/com/qaautomation/portfolio/tests/DatabaseConnectionTest.java). CI runs the database suite.

| Test ID | Requirement ID(s) | Test method / specification / plan | Feature | Priority | Test Level | Test Type(s) | Test Approach | Test Design Technique | Positive / Negative | Interface | Framework | Automation Status | Execution Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| S-DB-001 | REQ-DB-001 | DatabaseConnectionTest.databaseConnectionShouldBeSuccessful | JDBC connectivity | High | Int | F/DB | Gray-box | Not specifically technique-driven | Positive | DB | JT | Existing | Not assessed in this documentation baseline |
| S-DB-002 | REQ-DB-004 (partial schema exercise) | DatabaseConnectionTest.messageShouldExistInDatabase | Direct insert/existence; cleanup | Medium | Int | F/DB | Gray-box | Not specifically technique-driven | Positive | DB | JT | Existing | Not assessed in this documentation baseline |

S-DB-001 asserts a non-null/open connection. S-DB-002 directly inserts, verifies existence, and deletes in finally; it does not assert post-delete absence or test the application's insertion path.

## 4. Playwright UI

Repository: QA-Portfolio-Playwright.

Sources: [home specs](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/tests/ui/home.spec.js), [contact specs](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/tests/ui/contact.spec.js), [project specs](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/tests/ui/project.spec.js).

Rows 001–003 are in home.spec.js, 004–007 in contact.spec.js, 008–014 in project.spec.js, 015–016 in QA-Portfolio-Playwright/tests/ui/pageErrors.spec.js, and 017 in contact.spec.js (local, uncommitted at verification). Each is configured for Chromium, Firefox, and WebKit; only Chromium was executed for DEF-001 and DEF-002. P-UI-001 is smoke-selected; CI also runs all UI specs.

| Test ID | Requirement ID(s) | Test method / specification / plan | Feature | Priority | Test Level | Test Type(s) | Test Approach | Test Design Technique | Positive / Negative | Interface | Framework | Automation Status | Execution Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P-UI-001 | REQ-UI-001; REQ-QA-002 | home page should open successfully @smoke | Home title/heading | Medium | Sys | F/R/CB/Sm | Black-box | Not specifically technique-driven | Positive | UI | PW | Existing | Not assessed in this documentation baseline |
| P-UI-002 | REQ-UI-003; REQ-QA-002 | View QA Project link should navigate to the project section | Home project anchor | Medium | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | PW | Existing | Not assessed in this documentation baseline |
| P-UI-003 | REQ-UI-004; REQ-QA-002 | View Project Details link should navigate to the project page | Project navigation | Medium | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | PW | Existing | Not assessed in this documentation baseline |
| P-UI-004 | REQ-CONTACT-003; REQ-CONTACT-005; REQ-DB-002; REQ-QA-002 | contact form should submit successfully with valid data | Contact/persistence | High | Sys/E2E + Int | F/R/CB/DB | Gray-box | Use Case | Positive | UI + DB | PW + pg | Existing | Not assessed in this documentation baseline |
| P-UI-005 | REQ-CONTACT-002; REQ-DB-003 (browser rejection only); REQ-QA-002 | contact form should not submit when name is empty | Empty name | High | Sys + Int | F/R/CB/DB | Gray-box | EP | Negative | UI + DB | PW + pg | Existing | Not assessed in this documentation baseline |
| P-UI-006 | REQ-CONTACT-002; REQ-DB-003 (browser rejection only); REQ-QA-002 | contact form should not submit with invalid email | Invalid email | High | Sys + Int | F/R/CB/DB | Gray-box | EP | Negative | UI + DB | PW + pg | Existing | Not assessed in this documentation baseline |
| P-UI-007 | REQ-CONTACT-002; REQ-DB-003 (browser rejection only); REQ-QA-002 | contact form should not submit when message is empty | Empty message | High | Sys + Int | F/R/CB/DB | Gray-box | EP | Negative | UI + DB | PW + pg | Existing | Not assessed in this documentation baseline |
| P-UI-008 | REQ-UI-005; REQ-QA-002 | project page should open successfully | Project URL/heading | Medium | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | PW | Existing | Not assessed in this documentation baseline |
| P-UI-009 | REQ-UI-005; REQ-QA-002 | Application Architecture section should be visible | Architecture visibility | Low | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | PW | Existing | Not assessed in this documentation baseline |
| P-UI-010 | REQ-UI-005; REQ-QA-002 | Technology Stack section should be visible | Technology visibility | Low | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | PW | Existing | Not assessed in this documentation baseline |
| P-UI-011 | REQ-UI-005; REQ-QA-002 | QA & Testing Stack section should be visible | QA visibility | Low | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | PW | Existing | Not assessed in this documentation baseline |
| P-UI-012 | REQ-UI-005; REQ-QA-002 | Test Strategy & Coverage section should be visible | Strategy visibility | Low | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | PW | Existing | Not assessed in this documentation baseline |
| P-UI-013 | REQ-UI-005; REQ-QA-002 | API Coverage & Endpoints section should be visible | API visibility | Low | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | PW | Existing | Not assessed in this documentation baseline |
| P-UI-014 | REQ-UI-005; REQ-QA-002 | Database Testing section should be visible | DB visibility | Low | Sys | F/R/CB | Black-box | Not specifically technique-driven | Positive | UI | PW | Existing | Not assessed in this documentation baseline |
| P-UI-015 | REQ-UI-005 (related page scope) | project page should load without JavaScript page errors | /project page errors | Medium | Sys | F/R/CB | Black-box | Checklist-based Testing | Positive | UI | PW | Existing | Not assessed in this documentation baseline |
| P-UI-016 | REQ-UI-007 (related page scope) | automation page should load without JavaScript page errors | /project/automation page errors | Medium | Sys | F/R/CB | Black-box | Checklist-based Testing | Positive | UI | PW | Existing | Not assessed in this documentation baseline |
| P-UI-017 | REQ-CONTACT-004 (related lifecycle); REQ-API-002; REQ-DB-003 | contact form should recover after server-side validation rejection | Valid-JSON rejection recovery | High | Sys + Int | F/R/CB/DB | Gray-box | State Transition | Negative | UI + DB | PW + pg | Existing | Not assessed in this documentation baseline |

DEF-001 cycle evidence is separate from catalogue Execution Status: P-UI-015 and P-UI-016 failed before the fix with the null addEventListener TypeError, then passed after the fix in Chromium. The focused contact check (P-UI-004) also passed; the broader Chromium UI run passed all 16 UI cases. See [DEFECT_LOG.md](DEFECT_LOG.md) and [RTM.md](RTM.md). The new tests listen for pageerror before navigation and assert an empty error list after load; they do not assert content, link navigation (REQ-UI-009), console warnings, or errors after later interactions.

P-UI-017 is a negative scenario because whitespace-only input triggers rejection; its expected recovery is healthy behavior. State Transition is the primary technique. Its UI assertions are Black-box, but the combined test is Gray-box / System + Integration because it directly verifies DB non-persistence, consistently with existing contact tests. It checks browser validity, HTTP 400 and exact success=false JSON, enabled button, restored label, and no matching DB row; it conditionally cleans up unexpected test-owned data. No visible error-message or actual retry-submission assertion is made.

DEF-002 cycle: P-UI-017 failed pre-fix, then passed; P-UI-004 also passed. Broader Chromium UI passed 17/17 (15.6 seconds), including P-UI-001–017. Catalogue baseline statuses remain unchanged; see [DEFECT_LOG.md](DEFECT_LOG.md), [RTM.md](RTM.md), and [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md).

P-UI-004 asserts exact success text and email/message existence, not full record correctness/reset/button restoration. Negative UI specs query non-persistence after native browser validation; they do not exercise backend rejection. No empty-email UI specification exists.

## 5. Playwright API

Repository: QA-Portfolio-Playwright.

Sources: [status specs](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/tests/api/statusApi.spec.js), [contact specs](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/tests/api/contactApi.spec.js). The API project runs once. P-API-001 is also selected by smoke.

Rows 001–002 are in statusApi.spec.js; all remaining rows are generated/declared in contactApi.spec.js. Generated titles below are expanded to their exact field/description values.

| Test ID | Requirement ID(s) | Test method / specification / plan | Feature | Priority | Test Level | Test Type(s) | Test Approach | Test Design Technique | Positive / Negative | Interface | Framework | Automation Status | Execution Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P-API-001 | REQ-API-001 | GET /api/status should return backend status @smoke | Status response | Medium | Sys | F/API/Sm | Black-box | Not specifically technique-driven | Positive | API | PW | Existing | Not assessed in this documentation baseline |
| P-API-002 | REQ-API-001 | GET /api/status should return JSON content type | JSON content type | Medium | Sys | F/API | Black-box | Not specifically technique-driven | Positive | API | PW | Existing | Not assessed in this documentation baseline |
| P-API-003 | REQ-API-004; REQ-DB-002 | POST /contact should create a message with valid data | Accepted contact | High | Int | F/API/DB | Gray-box | EP (valid partition) | Positive | API + DB | PW + pg | Existing | Not assessed in this documentation baseline |
| P-API-004 | REQ-API-002 | POST /contact should reject request when name is missing | Omitted name; key absent | High | Sys | F/API | Black-box | EP | Negative | API | PW | Existing | Not assessed in this documentation baseline |
| P-API-005 | REQ-API-002 | POST /contact should reject request when email is missing | Omitted email; key absent | High | Sys | F/API | Black-box | EP | Negative | API | PW | Existing | Not assessed in this documentation baseline |
| P-API-006 | REQ-API-002 | POST /contact should reject request when message is missing | Omitted message; key absent | High | Sys | F/API | Black-box | EP | Negative | API | PW | Existing | Not assessed in this documentation baseline |
| P-API-007 | REQ-API-002; REQ-DB-003 | POST /contact should reject request when name contains only whitespace | name = three spaces ("   ") | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | PW + pg | Existing | Not assessed in this documentation baseline |
| P-API-008 | REQ-API-002; REQ-DB-003 | POST /contact should reject request when email contains only whitespace | email = three spaces ("   ") | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | PW + pg | Existing | Not assessed in this documentation baseline |
| P-API-009 | REQ-API-002; REQ-DB-003 | POST /contact should reject request when message contains only whitespace | message = three spaces ("   ") | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | PW + pg | Existing | Not assessed in this documentation baseline |
| P-API-010 | REQ-API-003; REQ-DB-003 | POST /contact should reject email with missing @ symbol | email = "invalidemail.com" | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | PW + pg | Existing | Not assessed in this documentation baseline |
| P-API-011 | REQ-API-003; REQ-DB-003 | POST /contact should reject email with missing local part | email = "@example.com" | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | PW + pg | Existing | Not assessed in this documentation baseline |
| P-API-012 | REQ-API-003; REQ-DB-003 | POST /contact should reject email with missing domain | email = "user@" | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | PW + pg | Existing | Not assessed in this documentation baseline |
| P-API-013 | REQ-API-003; REQ-DB-003 | POST /contact should reject email with missing top-level domain | email = "user@example" | High | Int | F/API/DB | Gray-box | EP | Negative | API + DB | PW + pg | Existing | Not assessed in this documentation baseline |

P-API-004–006 do not query the database: they check status/body only. P-API-007–009 use fixed whitespace-case values from the source; all have three ASCII spaces in the named field. P-API-010–013 use the exact invalid emails shown and generated message identifiers. No explicit empty-string contact API family exists.

## 6. Playwright Database

Repository: QA-Portfolio-Playwright.

Source: [databaseConnection.spec.js](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/tests/database/databaseConnection.spec.js). The database project runs once.

| Test ID | Requirement ID(s) | Test method / specification / plan | Feature | Priority | Test Level | Test Type(s) | Test Approach | Test Design Technique | Positive / Negative | Interface | Framework | Automation Status | Execution Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P-DB-001 | REQ-DB-001 | should connect to PostgreSQL database successfully | Connection and SELECT 1 | High | Int | F/DB | Gray-box | Not specifically technique-driven | Positive | DB | PW + pg | Existing | Not assessed in this documentation baseline |
| P-DB-002 | REQ-DB-004 (partial schema exercise) | should create, verify, and clean up test data successfully | Insert/check/delete/check | Medium | Int | F/DB | Gray-box | Not specifically technique-driven | Positive | DB | PW + pg | Existing | Not assessed in this documentation baseline |

P-DB-001 directly constructs pg.Client and asserts SELECT 1. P-DB-002 asserts returned ID is defined, existence after insert, one deleted row, and absence after deletion. It has fallback cleanup. These are helper/database lifecycle checks, not an application business state-machine suite.

## 7. JMeter Performance

Repository: QA-Portfolio-Performance.

Source: [JMX plans](https://github.com/KSely/QA-Portfolio-Performance/tree/main/tests). Each JMX plan is one designed workload profile. All send GET http://localhost:3000/api/status and assert response code 200 plus response text containing "status":"ok".

| Test ID | Requirement ID(s) | Test method / specification / plan | Feature | Priority | Test Level | Test Type(s) | Test Approach | Test Design Technique | Positive / Negative | Interface | Framework | Automation Status | Execution Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| J-PERF-001 | REQ-PERF-001; REQ-PERF-002; REQ-API-001 (code/status subset) | api-smoke.jmx | Status: 1 user / 1 iteration | Medium | Sys | F/API/Sm | Black-box | Not specifically technique-driven | Positive requests | Performance endpoint | JM | Existing | Not assessed in this documentation baseline |
| J-PERF-002 | REQ-PERF-001; REQ-PERF-002; REQ-API-001 (code/status subset) | api-baseline.jmx | Status: 5 users / 10 iterations each | Medium | Sys | Perf/Baseline | Black-box | Not specifically technique-driven | Positive requests | Performance endpoint | JM | Existing | Not assessed in this documentation baseline |
| J-PERF-003 | REQ-PERF-001; REQ-PERF-002; REQ-API-001 (code/status subset) | api-load.jmx | Status: 20 users | Medium | Sys | Perf/Load | Black-box | Not specifically technique-driven | Positive requests | Performance endpoint | JM | Existing | Not assessed in this documentation baseline |
| J-PERF-004 | REQ-PERF-001; REQ-PERF-002; REQ-API-001 (code/status subset) | api-stress.jmx | Status: 100 users | Medium | Sys | Perf/Stress | Black-box | Not specifically technique-driven | Positive requests / high workload | Performance endpoint | JM | Existing | Not assessed in this documentation baseline |
| J-PERF-005 | REQ-PERF-001; REQ-PERF-002; REQ-API-001 (code/status subset) | api-stress-200.jmx | Status: 200 users | Medium | Sys | Perf/Stress | Black-box | Not specifically technique-driven | Positive requests / high workload | Performance endpoint | JM | Existing | Not assessed in this documentation baseline |
| J-PERF-006 | REQ-PERF-001; REQ-PERF-002; REQ-API-001 (code/status subset) | api-stress-500.jmx | Status: 500 users | Medium | Sys | Perf/Stress | Black-box | Not specifically technique-driven | Positive requests / high workload | Performance endpoint | JM | Existing | Not assessed in this documentation baseline |
| J-PERF-007 | REQ-PERF-001; REQ-PERF-002; REQ-API-001 (code/status subset) | api-stress-1000.jmx | Status: 1,000 users | Medium | Sys | Perf/Stress | Black-box | Not specifically technique-driven | Positive requests / high workload | Performance endpoint | JM | Existing | Not assessed in this documentation baseline |

### Exact workload configuration

| Test ID | Virtual users | Ramp-up | Duration / iterations | Constant timer |
|---|---:|---:|---|---|
| J-PERF-001 | 1 | 1 second | 1 iteration | None |
| J-PERF-002 | 5 | 5 seconds | 10 iterations per user | None |
| J-PERF-003 | 20 | 5 seconds | 30 seconds | 1 second |
| J-PERF-004 | 100 | 10 seconds | 30 seconds | 1 second |
| J-PERF-005 | 200 | 10 seconds | 30 seconds | 1 second |
| J-PERF-006 | 500 | 25 seconds | 60 seconds | 1 second |
| J-PERF-007 | 1,000 | 50 seconds | 60 seconds | 1 second |

Duration includes ramp-up. Load/stress plans repeat until the configured duration expires. Virtual users do not equal simultaneous in-flight requests; pacing and response time influence throughput. The highest user level is not sustained for the full configured duration.

Automatic CI selects J-PERF-001/002. Manual performance dispatch selects J-PERF-003–007. No endurance plan, contact-write workload, resource-monitoring suite, production SLA, or breaking-point evidence is established.

The smoke plan primarily validates response/setup correctness. Historical JTL/CSV/dashboard artifacts are not treated as current execution outcomes in this catalogue.

## 8. Application Unit Testing

Repository: QA-Automation-Portfolio.

Source: [contactValidation.test.js](../../tests/unit/contactValidation.test.js). Production test object: [contactValidation.js](../../utils/contactValidation.js). The suite invokes pure functions directly and requires no PostgreSQL connection, browser, Express startup, Railway service, or network request.

| Test ID | Requirement ID(s) | Test method / specification / plan | Feature | Priority | Test Level | Test Type(s) | Test Approach | Test Design Technique | Positive / Negative | Interface | Framework | Automation Status | Execution Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A-UNIT-001 | REQ-API-004 (validation acceptance precondition) | isValidEmail — accepts a normally formatted email address | Valid email | High | Unit | F/R | White-box | EP | Positive | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-002 | REQ-API-003 | isValidEmail — rejects an email address without an at sign | Missing @ | High | Unit | F/R | White-box | Error Guessing | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-003 | REQ-API-003 | isValidEmail — rejects an email address with an incomplete domain | Incomplete domain | High | Unit | F/R | White-box | Error Guessing | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-004 | REQ-API-003 | isValidEmail — rejects an email address without a local part | Missing local part | High | Unit | F/R | White-box | Error Guessing | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-005 | REQ-API-003 | isValidEmail — accepts surrounding whitespace around an otherwise valid email | Trimmed email validation | High | Unit | F/R | White-box | EP | Positive | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-006 | REQ-API-004 (validation acceptance precondition) | validateContactInput — accepts complete valid contact input | Valid contact input | High | Unit | F/R | White-box | EP | Positive | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-007 | REQ-API-002 | validateContactInput — rejects an empty name | Empty name | High | Unit | F/R | White-box | EP | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-008 | REQ-API-002 | validateContactInput — rejects a whitespace-only name | Whitespace name | High | Unit | F/R | White-box | Error Guessing | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-009 | REQ-API-002 | validateContactInput — rejects an empty email | Empty email | High | Unit | F/R | White-box | EP | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-010 | REQ-API-002 | validateContactInput — rejects a whitespace-only email | Whitespace email | High | Unit | F/R | White-box | Error Guessing | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-011 | REQ-API-002 | validateContactInput — rejects an empty message | Empty message | High | Unit | F/R | White-box | EP | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-012 | REQ-API-002 | validateContactInput — rejects a whitespace-only message | Whitespace message | High | Unit | F/R | White-box | Error Guessing | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-013 | REQ-API-002 | validateContactInput — rejects input when all fields are empty | All required fields empty | High | Unit | F/R | White-box | Error Guessing | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-014 | REQ-API-002; REQ-API-005 | validateContactInput — returns the required-field error when a required field is empty | Required-error precedence | High | Unit | F/R | White-box | Decision Table | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-015 | REQ-API-003 | validateContactInput — returns the invalid-email error when the email format is invalid | Invalid-email decision path | High | Unit | F/R | White-box | Decision Table | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |

Verified execution: `npm test` completed 1 suite with 15 passed, 0 failed, and 0 skipped. `npm run test:coverage` reported **100% statement, branch, function, and line coverage for the contact validation module.** The module result is not whole-application or portfolio coverage. The GitHub Actions Unit Tests workflow also passed successfully on Node.js 22.

## Inventory reconciliation

| Catalogue section | Designed cases / expanded variants |
|---|---:|
| Selenium UI | 25 |
| Selenium API | 15 |
| Selenium Database | 2 |
| Playwright UI | 17 |
| Playwright API | 13 |
| Playwright Database | 2 |
| JMeter plans | 7 |
| Application Jest Unit | 15 |
| Total documentation entries | 96 |

The previous verified catalogue contained 81 entries. Adding exactly 15 implemented Jest cases produces 96 unique documented cases. Selenium has 42 cases before browser/smoke repetition. Playwright has 32 unique cases. Configured full Playwright multi-project execution before retries remains 66: 17 UI cases × 3 browsers = 51 UI browser executions, plus 13 API and 2 DB. DEF-001's broader run executed 16 Chromium UI cases; DEF-002's broader run executed 17, not all 66. The latest Jest execution is a separate 15-test unit run. JMeter samples are not case count. Cross-framework overlaps are not additional unique business requirements. Setup hooks, helpers, data-provider declarations, retries, and repeated suite selections are not separate designed cases.

The application-local Jest layer is represented by A-UNIT-001–015. It verifies only the extracted contact validation module.

## Coverage Gaps / Proposed Future Test Conditions

These are proposed conditions, not existing cases, approved new product behavior, or assigned future case IDs.

- Network/request and malformed/non-JSON recovery remain unverified; valid-JSON rejection button recovery is implemented and covered by P-UI-017. Visible error feedback and actual retry submission remain gaps.
- Submit button restoration after network/JSON failures and explicit restoration assertions after success; valid-JSON rejection restoration is covered.
- Form reset values and repeated-submission/stale-success behavior.
- Browser-error checks on other pages and later interactions; startup pageerror checks on /project and /project/automation now exist as P-UI-015 and P-UI-016.
- BVA around schema lengths with a known environment and clarified API error expectations.
- Additional combined-invalid-input rules beyond the required-error precedence covered by A-UNIT-014.
- Complete stored name/email/message and timestamp verification.
- Exact row count and duplicate detection.
- Database outage/startup/readiness behavior and an agreed error contract.
- Automation-page content rendering (REQ-UI-007) and navigation links (REQ-UI-009).
- Mobile menu, responsive viewport, keyboard, and relevant accessibility behavior.
- PW empty-email UI and explicit empty-string API cases.
- PW missing-field API non-persistence checks.
- Test-data collision and cleanup failure/unexpected-persistence conditions.
- Representative contact-write performance testing with explicit data cleanup and workload assumptions.
- Sustained-load/endurance design and justified acceptance criteria, if later approved.

## Baseline limitations and future maintenance

All entries describe Existing automation. The 15 Jest entries have verified passing evidence; execution status for the preceding 81 catalogue entries remains separate from the DEF-001/DEF-002 cycle evidence. No claim is made that all 96 entries passed. Full compatibility, production performance, readiness, or CD is not claimed. Structural coverage applies only to the contact validation module.

Formal technique assignments are conservative; simple navigation/visibility/status assertions remain Not specifically technique-driven. Stress labels describe intended workloads only.

Future implementation changes must update the corresponding requirement, assertion description, classification, and coverage status deliberately. [RTM.md](RTM.md) and [DEFECT_LOG.md](DEFECT_LOG.md) are active. [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md) records the completed cycles; PERFORMANCE_TEST_REPORT.md remains deferred.
