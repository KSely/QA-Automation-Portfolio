# Automated Test Cases — QA Automation Portfolio

## Catalogue Status

This catalogue documents the automated tests currently implemented across the portfolio repositories.

All rows have `Automation Status = Existing`.

Execution evidence is recorded as follows:

- the 28 Jest unit cases have verified passing results: 15 contact-validation tests and 13 authentication-validation tests;
- the 6 Playwright accessibility cases record their verified Chromium results, including the initial DEF-003/DEF-004 failures, the successful post-fix retest, and the DEF-006 focused-state regression;
- the 14 Playwright authentication cases record their verified UI/API integration results;
- the original 81 Selenium, Playwright, and JMeter cases keep `Execution Status = Not assessed in this documentation baseline`.

Targeted execution evidence for DEF-001 through DEF-006, Jest, accessibility, API JSON Schema Validation, and the final Playwright run is documented in [RTM.md](RTM.md), [DEFECT_LOG.md](DEFECT_LOG.md), and [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md).

Test IDs are stable documentation identifiers. Future tests receive IDs only after they are implemented and added to the catalogue.

[REQUIREMENTS.md](REQUIREMENTS.md) defines the requirements.

[TEST_DESIGN.md](TEST_DESIGN.md) explains the test-design techniques and classification.

[TEST_PLAN.md](TEST_PLAN.md) defines test scope and approach.

## Test Case Classification Legend

| Term | Meaning |
|---|---|
| Sys | System testing through the running application |
| Int | Integration testing, including database interaction |
| E2E | End-to-End workflow; may also include System and Integration coverage |
| F | Functional |
| R | Regression |
| Sm | Smoke |
| CB | Cross-browser |
| API | API testing |
| DB | Database testing |
| Perf | Performance testing |
| Baseline / Load / Stress | JMeter workload categories |
| Black-box | Testing through an external interface without using implementation structure |
| Gray-box | Application-level testing that also uses internal knowledge such as database state |
| White-box | Direct testing of internal code/module logic |
| EP | Equivalence Partitioning |
| BVA | Boundary Value Analysis |
| Decision Table | Testing combinations of conditions and expected outcomes |
| State Transition | Testing behavior across changes in application state |
| Error Guessing | Tests based on likely failure conditions |
| Checklist-based Testing | Tests based on a defined set of checks |
| Use Case | Testing a user workflow from start to expected result |
| Not specifically technique-driven | No formal test-design technique is assigned |
| ST | Selenium WebDriver + TestNG |
| RA | REST Assured + TestNG |
| JT | JDBC + TestNG |
| PW / pg | Playwright Test / node-postgres |
| A11Y / axe | Accessibility Testing / `@axe-core/playwright` and axe-core |
| JM | Apache JMeter |
| A-UNIT | Application-local Jest unit test |
| Module | Exported JavaScript function boundary |
| Positive / Negative | Scenario classification, independent of the actual execution result |

All cases in this catalogue are automated.

Manual workflow dispatch still runs automated tests.

Regression and cross-browser classifications describe how a case is used in a suite or project; they are not required to appear as literal test tags.

Formal techniques such as BVA, Decision Table, State Transition, Error Guessing, and EP are assigned only where the implemented test design supports them.

Browser DOM validation is treated as Black-box testing. Tests that directly verify database state are classified as Gray-box.

Requirement mappings show the behavior actually asserted by a test. A test mapped to a compound requirement may cover only part of that requirement.

## Priority Model

Priority is based on the risk and importance of the behavior being tested.

- **High** — contact validation and submission, persistence/non-persistence, database connectivity required for integration testing, and authentication validation.
- **Medium** — main navigation, project navigation, status API contracts, database helper lifecycle checks, accessibility checks with moderate impact, and JMeter workload profiles.
- **Low** — informational section visibility without a primary functional workflow.

Cross-browser configuration or CI execution does not automatically make a test High priority.

The current catalogue contains:

- **85 High**
- **31 Medium**
- **13 Low**
- **129 total automated cases**

The 28 Jest unit cases are High because they verify contact and authentication acceptance/rejection logic.

Accessibility priorities follow the impact of the affected functionality and the recorded defect triage.

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

Sources: [StatusApiTest](https://github.com/KSely/QA-Portfolio-Selenium/blob/main/src/test/java/com/qaautomation/portfolio/api/StatusApiTest.java), [ContactApiTest](https://github.com/KSely/QA-Portfolio-Selenium/blob/main/src/test/java/com/qaautomation/portfolio/api/ContactApiTest.java), and the status/contact response schemas under `src/test/resources/schemas`. CI runs the API suite. REST Assured 5.5.6 uses `io.rest-assured:json-schema-validator:5.5.6` and `matchesJsonSchemaInClasspath(...)` for schema-based contract validation.

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

S-API-001 validates the status-response schema, which requires string `status` and `message` properties.

S-API-002–015 validate the contact-response schema, which requires boolean `success` and string `message` properties. Existing HTTP status, response-value, persistence, and non-persistence assertions remain in place.

The latest schema-enabled Selenium API run passed **15/15 cases**, and the related GitHub Actions workflow succeeded. JSON Schema Validation did not create new test IDs.

All Selenium contact negative cases verify non-persistence. Missing-email cases identify records by unique message, while missing-message cases use unique email. Positive contact tests clean up test data in `finally`.

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

Sources: [home specs](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/tests/ui/home.spec.js), [contact specs](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/tests/ui/contact.spec.js), [project specs](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/tests/ui/project.spec.js), and `QA-Portfolio-Playwright/tests/ui/auth.spec.js`.

Rows 001–003 are in home.spec.js, 004–007 and 017 in contact.spec.js, 008–014 in project.spec.js, 015–016 in pageErrors.spec.js, and 018–024 in auth.spec.js. Each is configured for Chromium, Firefox, and WebKit. DEF-001 and DEF-002 used Chromium only; the final full Playwright run executed all UI cases across all three browser projects. P-UI-001 is smoke-selected; CI also runs all UI specs.

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
| P-UI-018 | REQ-UI-010; REQ-UI-014; REQ-API-006; REQ-API-013–015; REQ-DB-006; REQ-QA-002 | user should register and reach the protected Account page | Registration, persistence, cookie, and default role | High | Sys/E2E + Int | F/R/CB/DB | Gray-box | Use Case | Positive | UI + API + DB | PW + pg | Existing | Passed — final full run in Chromium, Firefox, and WebKit |
| P-UI-019 | REQ-UI-012; REQ-API-010; REQ-QA-002 | authenticated session should survive an Account page refresh | Session restoration after refresh | High | Sys | F/R/CB | Black-box | State Transition | Positive | UI | PW | Existing | Passed — final full run in Chromium, Firefox, and WebKit |
| P-UI-020 | REQ-UI-012; REQ-UI-014; REQ-API-011; REQ-QA-002 | logout should invalidate Account access and the server session | Logout and protected-access invalidation | High | Sys/E2E | F/R/CB/API | Black-box | State Transition | Positive | UI + API | PW | Existing | Passed — final full run in Chromium, Firefox, and WebKit |
| P-UI-021 | REQ-UI-010; REQ-UI-011; REQ-UI-014; REQ-API-009; REQ-QA-002 | existing user should login successfully | Existing-user login | High | Sys/E2E | F/R/CB | Black-box | Use Case | Positive | UI | PW | Existing | Passed — final full run in Chromium, Firefox, and WebKit |
| P-UI-022 | REQ-UI-012; REQ-API-010; REQ-QA-002 | guest should be redirected away from the protected Account page | Guest Account denial | High | Sys | F/R/CB | Black-box | State Transition | Negative | UI | PW | Existing | Passed — final full run in Chromium, Firefox, and WebKit |
| P-UI-023 | REQ-UI-013; REQ-API-012; REQ-QA-002 | normal user should see Access denied on the Admin page | Normal-user Admin denial | High | Sys | F/R/CB | Black-box | Decision Table | Negative | UI | PW | Existing | Passed — final full run in Chromium, Firefox, and WebKit |
| P-UI-024 | REQ-UI-013; REQ-API-012; REQ-QA-002 | admin user should access the Admin page | Admin authorization after test-owned role elevation | High | Sys + Int | F/R/CB/DB | Gray-box | Decision Table | Positive | UI + DB | PW + pg | Existing | Passed — final full run in Chromium, Firefox, and WebKit |

DEF-001 verification used P-UI-015 and P-UI-016. Both failed before the fix and passed after the fix in Chromium. P-UI-004 also passed, and the broader Chromium UI regression passed **16/16**.

P-UI-015 and P-UI-016 check JavaScript `pageerror` events during initial page load. They do not verify all page content, REQ-UI-009 navigation, console warnings, or errors caused by later interactions.

P-UI-017 covers server-side validation rejection and recovery. It verifies HTTP 400, `success=false`, button recovery, restored button text, and database non-persistence. Because it also checks database state, the overall case is classified as Gray-box / System + Integration and uses State Transition as its primary design technique.

For DEF-002, P-UI-017 failed before the fix and passed after it. P-UI-004 also passed, and the broader Chromium UI regression passed **17/17 in 15.6 seconds**.

P-UI-004 verifies the exact success message and email/message persistence. It does not separately verify the complete stored record, form reset, or button restoration. Browser-validation negative cases verify non-persistence but do not exercise backend rejection. No dedicated empty-email Playwright UI case currently exists.

P-UI-018–024 use UUID-based test accounts and test-owned cleanup. They cover registration, refresh persistence, logout invalidation, login, guest protection, user denial, and admin access. They do not duplicate the Jest registration-validation matrix.

See [DEFECT_LOG.md](DEFECT_LOG.md), [RTM.md](RTM.md), and [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md) for the execution evidence.

## 5. Playwright Accessibility

Repository: QA-Portfolio-Playwright.

Source: `QA-Portfolio-Playwright/tests/accessibility/accessibility.spec.js`. The dedicated `accessibility` project runs once in Chromium and uses `@axe-core/playwright` 4.13.0 with axe-core 4.13.0. The verified local command used no retries and one worker.

No standalone accessibility product requirement exists in [REQUIREMENTS.md](REQUIREMENTS.md). Existing functional requirements are referenced only where an assertion overlaps their established scope; the accessibility expectations and defect evidence are not presented as newly approved product requirements.

| Test ID | Requirement ID(s) | Test method / specification / plan | Feature | Priority | Test Level | Test Type(s) | Test Approach | Test Design Technique | Positive / Negative | Interface | Framework | Automation Status | Execution Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P-A11Y-001 | No accessibility product requirement ID; related page scope REQ-UI-004 | home page should have no automatically detectable accessibility violations | Home automated accessibility scan | High | Sys | A11Y/R | Black-box | Checklist-based Testing | Positive | UI | PW + axe | Existing | Passed — post-fix local Chromium; pre-fix failed and confirmed DEF-003 |
| P-A11Y-002 | No accessibility product requirement ID; related page scope REQ-UI-005 | project page should have no automatically detectable accessibility violations | Project automated accessibility scan | Medium | Sys | A11Y/R | Black-box | Checklist-based Testing | Positive | UI | PW + axe | Existing | Passed — post-fix local Chromium; pre-fix failed and confirmed DEF-004 |
| P-A11Y-003 | No accessibility product requirement ID; related page scope REQ-UI-007 | automation page should have no automatically detectable accessibility violations | Automation automated accessibility scan | Medium | Sys | A11Y/R | Black-box | Checklist-based Testing | Positive | UI | PW + axe | Existing | Passed — initial and post-fix local Chromium runs |
| P-A11Y-004 | REQ-UI-006 (Architecture-link subset); no accessibility product requirement ID | main navigation should support keyboard focus and activation | Navigation focus and Enter activation | Medium | Sys | A11Y/R | Black-box | Checklist-based Testing | Positive | UI | PW | Existing | Passed — initial and post-fix local Chromium runs |
| P-A11Y-005 | REQ-CONTACT-002 (required-attribute subset); no accessibility product requirement ID | contact form fields should expose accessible names and keyboard focus | Contact names, required semantics, and focus sequence | High | Sys | A11Y/R | Black-box | Checklist-based Testing | Positive | UI | PW | Existing | Passed — initial and post-fix local Chromium runs |
| P-A11Y-006 | No accessibility product requirement ID; related authentication-navigation scope REQ-UI-010 | authentication navigation link should retain accessible contrast when keyboard focused | Authentication-link focused-state contrast | Medium | Sys | A11Y/R | Black-box | Checklist-based Testing | Positive | UI | PW + axe | Existing | Passed — focused DEF-006 retest, 6-case accessibility run, and final full Playwright run |

Initial accessibility execution: **5 total, 3 passed, 2 failed, 0 skipped**. P-A11Y-001 failed on `color-contrast` for `#project-details-button` and confirmed DEF-003. P-A11Y-002 failed on `color-contrast` for three architecture connector labels and confirmed DEF-004. Both were genuine AUT findings, not test-infrastructure failures. P-A11Y-003–005 passed.

Post-fix accessibility retest: **5 total, 5 passed, 0 failed, 0 skipped**. P-A11Y-001 and P-A11Y-002 passed after their scoped CSS fixes; P-A11Y-003–005 remained passing. No axe rule, tag, element, or page section was suppressed or excluded. DEF-003 and DEF-004 are Closed / Fixed / Retest Passed.

DEF-005 was detected and retested through existing P-A11Y-002; it did not create a new case ID. DEF-006 added P-A11Y-006, which opens `/project`, tabs to the shared authentication link, preserves keyboard focus, runs axe in the focused state, and checks that no `color-contrast` violation remains. The complete post-DEF-006 accessibility run passed **6/6** in Chromium.

The axe cases use supported WCAG A/AA-oriented tags. They cover automatically detectable issues only and do not establish full WCAG compliance. Manual keyboard-only navigation, logical tab order, visible focus, zoom/reflow, screen-reader behavior, reading order, and validation-feedback usability remain separate work.

## 6. Playwright API

Repository: QA-Portfolio-Playwright.

Sources: [status specs](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/tests/api/statusApi.spec.js), [contact specs](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/tests/api/contactApi.spec.js), `QA-Portfolio-Playwright/tests/api/authApi.spec.js`, schemas under `tests/schemas`, and `utils/schemaValidator.js`. The API project runs once. P-API-001 is also selected by smoke. Ajv 8.20.0 compiles each contact/status schema once and returns validation status plus errors to those existing specifications.

Rows 001–002 are in statusApi.spec.js, 003–013 are generated or declared in contactApi.spec.js, and 014–020 are in authApi.spec.js. Generated contact titles below are expanded to their exact field/description values.

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
| P-API-014 | REQ-API-006; REQ-API-010; REQ-API-013–014; REQ-DB-006 | POST /api/auth/register should create a user session without exposing credentials | Registration, safe response, session, persisted hash/default role | High | Int | F/API/DB | Gray-box | EP | Positive | API + DB | PW + pg | Existing | Passed — final full Playwright API project |
| P-API-015 | REQ-API-008 | POST /api/auth/register should reject a duplicate normalized email | Duplicate normalized email | High | Sys | F/API | Black-box | EP | Negative | API | PW | Existing | Passed — final full Playwright API project |
| P-API-016 | REQ-API-009 | POST /api/auth/login should authenticate an existing user | Existing-user login | High | Sys | F/API | Black-box | EP | Positive | API | PW | Existing | Passed — final full Playwright API project |
| P-API-017 | REQ-API-009 | POST /api/auth/login should use the same generic error for invalid credentials | Wrong-password and unknown-email equivalence | High | Sys | F/API | Black-box | EP | Negative | API | PW | Existing | Passed — final full Playwright API project |
| P-API-018 | REQ-API-010 | GET /api/auth/me should reject an unauthenticated request | Unauthenticated current-user request | High | Sys | F/API | Black-box | Decision Table | Negative | API | PW | Existing | Passed — final full Playwright API project |
| P-API-019 | REQ-API-011 | POST /api/auth/logout should invalidate the authenticated session | Logout session invalidation | High | Sys | F/API | Black-box | State Transition | Positive | API | PW | Existing | Passed — final full Playwright API project |
| P-API-020 | REQ-API-012 | GET /api/auth/admin should enforce authentication and role authorization | Admin 401/403/200 matrix | High | Sys + Int | F/API/DB | Gray-box | Decision Table | Mixed | API + DB | PW + pg | Existing | Passed — final full Playwright API project |

P-API-001 validates the status-response schema, which requires string `status` and `message` properties. P-API-002 separately verifies the JSON content type.

P-API-003–013 validate the contact-response schema, which requires boolean `success` and string `message` properties. Existing HTTP status, response-value, database, and cleanup assertions remain in place.

The latest schema-enabled Playwright API run passed **13/13 cases**, and the related GitHub Actions workflow succeeded. JSON Schema Validation did not create new test IDs.

P-API-004–006 verify the API response only and do not query the database. P-API-007–009 use three ASCII spaces for the tested whitespace-only field. P-API-010–013 use the invalid email values shown in the table. No dedicated empty-string Playwright contact API cases currently exist.

P-API-014–020 cover session-based authentication and role authorization with real cookies. They use UUID-based emails and parameterized cleanup of only the associated test-owned user and session rows. They do not add JSON Schema assertions to the authentication responses.

## 7. Playwright Database

Repository: QA-Portfolio-Playwright.

Source: [databaseConnection.spec.js](https://github.com/KSely/QA-Portfolio-Playwright/blob/main/tests/database/databaseConnection.spec.js). The database project runs once.

| Test ID | Requirement ID(s) | Test method / specification / plan | Feature | Priority | Test Level | Test Type(s) | Test Approach | Test Design Technique | Positive / Negative | Interface | Framework | Automation Status | Execution Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P-DB-001 | REQ-DB-001 | should connect to PostgreSQL database successfully | Connection and SELECT 1 | High | Int | F/DB | Gray-box | Not specifically technique-driven | Positive | DB | PW + pg | Existing | Not assessed in this documentation baseline |
| P-DB-002 | REQ-DB-004 (partial schema exercise) | should create, verify, and clean up test data successfully | Insert/check/delete/check | Medium | Int | F/DB | Gray-box | Not specifically technique-driven | Positive | DB | PW + pg | Existing | Not assessed in this documentation baseline |

P-DB-001 directly constructs pg.Client and asserts SELECT 1. P-DB-002 asserts returned ID is defined, existence after insert, one deleted row, and absence after deletion. It has fallback cleanup. These are helper/database lifecycle checks, not an application business state-machine suite.

## 8. JMeter Performance

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

## 9. Application Unit Testing

Repository: QA-Automation-Portfolio.

Sources: [contactValidation.test.js](../../tests/unit/contactValidation.test.js) and [authValidation.test.js](../../tests/unit/authValidation.test.js). Production test objects: [contactValidation.js](../../utils/contactValidation.js) and [authValidation.js](../../utils/authValidation.js). Both suites invoke pure validation functions directly and require no PostgreSQL connection, browser, Express startup, Railway service, or network request.

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
| A-UNIT-016 | REQ-API-007 | validatePassword — rejects a seven-character password | Password minimum -1 | High | Unit | F/R | White-box | BVA | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-017 | REQ-API-007 | validatePassword — accepts a valid eight-character password | Password minimum | High | Unit | F/R | White-box | BVA | Positive | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-018 | REQ-API-007 | validatePassword — accepts a valid 64-character password | Password maximum | High | Unit | F/R | White-box | BVA | Positive | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-019 | REQ-API-007 | validatePassword — rejects a 65-character password | Password maximum +1 | High | Unit | F/R | White-box | BVA | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-020 | REQ-API-007 | validatePassword — rejects a password without an uppercase letter | Missing uppercase class | High | Unit | F/R | White-box | EP | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-021 | REQ-API-007 | validatePassword — rejects a password without a lowercase letter | Missing lowercase class | High | Unit | F/R | White-box | EP | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-022 | REQ-API-007 | validatePassword — rejects a password without a number | Missing numeric class | High | Unit | F/R | White-box | EP | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-023 | REQ-API-007 | validatePassword — rejects a password without a special character | Missing special-character class | High | Unit | F/R | White-box | EP | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-024 | REQ-API-006 (normalization precondition) | normalizeEmail — normalizes an email before registration | Registration email normalization | High | Unit | F/R | White-box | EP | Positive | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-025 | REQ-API-006 (validation acceptance precondition) | validateRegistrationInput — accepts valid normalized registration input | Valid registration input | High | Unit | F/R | White-box | EP | Positive | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-026 | REQ-API-007 | validateRegistrationInput — rejects an invalid registration email | Invalid registration email | High | Unit | F/R | White-box | EP | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-027 | REQ-API-007 | validateRegistrationInput — rejects a mismatched password confirmation | Confirmation mismatch | High | Unit | F/R | White-box | Decision Table | Negative | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |
| A-UNIT-028 | REQ-API-009 (input-normalization precondition) | validateLoginInput — normalizes valid login input | Login input normalization | High | Unit | F/R | White-box | EP | Positive | Module | Jest 30.5.2 | Existing | Passed — local and GitHub Actions |

Verified execution: `npm test` completed **2 suites with 28 passed, 0 failed, and 0 skipped**.

The 15 contact-validation tests and 13 authentication-validation tests passed locally and in the GitHub Actions Unit Tests workflow using Node.js 22.

The verified `npm run test:coverage` result showed **100% statement, branch, function, and line coverage for `contactValidation.js`**.

No structural coverage percentage is currently recorded for `authValidation.js`. The contact-module coverage result does not represent whole-application coverage.

## Inventory Reconciliation

| Catalogue Section | Unique Cases |
|---|---:|
| Selenium UI | 25 |
| Selenium API | 15 |
| Selenium Database | 2 |
| Playwright UI | 24 |
| Playwright Accessibility | 6 |
| Playwright API | 20 |
| Playwright Database | 2 |
| JMeter plans | 7 |
| Application Jest Unit | 28 |
| **Total** | **129** |

The previous catalogue contained 114 cases. Adding 14 Playwright authentication cases and one DEF-006 accessibility regression increased the current total to **129 unique documented automated cases**.

Selenium contains **42 unique cases** before browser or suite repetition.

Playwright contains **52 unique cases**:

- 24 UI;
- 6 accessibility;
- 20 API;
- 2 database.

The configured full Playwright execution contains **100 executions before retries**:

- 24 UI cases × 3 browsers = 72;
- 6 Chromium accessibility cases;
- 20 API cases;
- 2 database cases.

Historical executions remain separate:

- DEF-001 broader regression: 16 Chromium UI cases;
- DEF-002 broader regression: 17 Chromium UI cases;
- accessibility execution: 5 Chromium accessibility cases;
- latest Jest execution: 28 unit tests across 2 suites;
- final full Playwright run: 100 passed, 0 failed, 0 skipped in approximately 1.2 minutes.

JMeter samples, retries, setup hooks, helpers, repeated suite selections, and browser repetitions are not counted as additional unique test cases.

The Jest layer is represented by A-UNIT-001–028:

- A-UNIT-001–015 cover contact validation;
- A-UNIT-016–028 cover authentication validation.

These unit tests verify validation logic only. They do not test HTTP routing, sessions, authorization, persistence, or browser behavior.

The Playwright accessibility layer is represented by P-A11Y-001–006.

Its initial execution produced **3 passed and 2 failed** because of DEF-003 and DEF-004. The five-case post-fix retest passed **5/5**. After P-A11Y-006 was added for DEF-006, the complete accessibility project passed **6/6**.

Automated accessibility testing does not replace manual accessibility testing.

## Coverage Gaps and Future Test Conditions

The following test conditions are not yet implemented as catalogue cases.

### Contact and General Application

- network/request and malformed/non-JSON recovery;
- visible contact-form error feedback;
- retry submission after rejection;
- submit-button restoration after network or JSON-processing failures;
- explicit button restoration checks after successful submission;
- form-reset values and repeated-submission behavior;
- browser-error checks on additional pages and later interactions;
- Boundary Value Analysis around contact database length limits;
- additional combined-invalid input conditions;
- complete persistence checks for name, email, message, timestamp, exact row count, and duplicates;
- database outage, startup, and readiness behavior;
- automation-page content verification and navigation;
- Playwright empty-email UI coverage;
- explicit empty-string API cases;
- missing-field API non-persistence checks;
- collision and cleanup-failure scenarios.

Valid-JSON rejection recovery is already covered by P-UI-017. Startup page-error checks for `/project` and `/project/automation` are covered by P-UI-015 and P-UI-016.

### Authentication and Authorization

Implemented Playwright authentication coverage now includes:

- Register, Login, Account, and Admin UI flows;
- guest protected-Account redirect;
- session persistence after refresh;
- logout invalidation;
- `/api/auth/register` 201 and duplicate-email 409 behavior;
- `/api/auth/login` 200/401 behavior;
- `/api/auth/me` 401/200 behavior;
- `/api/auth/admin` 401/403/200 authorization behavior;
- normalized-email persistence;
- default `user` role;
- bcrypt hash persistence instead of plaintext;
- duplicate normalized-email rejection at the API boundary;
- real session persistence and invalidation behavior;
- client-supplied `role=admin` elevation attempts;
- sensitive-field and password-hash exposure checks;
- generic invalid-login responses;
- direct protected-endpoint access;
- repeatable automated user/admin setup and cleanup;
- HttpOnly, SameSite=Lax, and approximate 24-hour cookie lifetime in local HTTP execution.

Remaining authentication conditions include route-level invalid-registration HTTP 400 variants, authenticated GuestRoute redirects, restoration of an originally requested destination, `users` schema constraints, direct session-table assertions, stale/deleted-user sessions, browser Back behavior after logout, production Secure-cookie verification, complete authentication-page accessibility, and automated verification of the local `set-role` utility where useful.

Authentication performance testing should be added only when a meaningful workload model, cleanup strategy, and acceptance criteria are defined.

CSRF protection, authentication rate limiting, OAuth, MFA, password reset, email verification, and formal database migrations are future application features and are not current test cases.

## Catalogue Maintenance

All entries in this document represent existing automation.

Verified execution evidence currently includes:

- 28 passing Jest unit tests;
- the Playwright accessibility initial and post-fix executions;
- targeted DEF-001 and DEF-002 Chromium regression cycles;
- Selenium and Playwright API JSON Schema Validation runs;
- focused DEF-005 and DEF-006 accessibility retests;
- the final full Playwright run: 100 configured executions passed across Chromium UI, Firefox UI, WebKit UI, Chromium accessibility, API, and database projects.

The original Selenium, Playwright, and JMeter catalogue rows keep their documented baseline execution status unless a specific execution result is recorded separately.

The **129 catalogue cases were not executed as one combined test run**. The 100-result Playwright run represents configured project executions, not 100 unique cases and not the full portfolio catalogue.

Current evidence also does not represent complete accessibility, cross-browser compatibility, production performance, deployment readiness, or continuous-delivery validation.

Structural coverage currently applies only to the contact-validation module.

Test-design techniques are assigned only where the existing implementation clearly supports them. Simple navigation, visibility, and status checks remain `Not specifically technique-driven`.

When implementation or automated coverage changes, update the related requirement mapping, test description, classification, and execution evidence.

[RTM.md](RTM.md), [DEFECT_LOG.md](DEFECT_LOG.md), and [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md) contain the corresponding traceability and execution evidence.
