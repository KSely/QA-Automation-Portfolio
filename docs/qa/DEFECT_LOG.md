# Defect Log

Defects are recorded here only after reproduction or confirmation. Source-only observations remain suspected until reproduced. Status, severity, and priority are subject to human review.

## DEF-001 — Shared footer JavaScript throws a TypeError on pages without the contact form

| Field | Value |
| --- | --- |
| Defect ID | DEF-001 |
| Status | Closed |
| Severity | Medium |
| Priority | High |
| Reproduction date | 2026-09-29 |

Severity reflects the observed script-block failure while page rendering and sampled navigation remain functional. High priority is the requested triage classification; it does not imply a page outage or demonstrated contact-submission failure.

### Environment

- Local QA Automation Portfolio application at `http://localhost:3000`.
- Windows; Codex in-app browser, using real browser page loads and captured console output.
- Browser version and running server process details were not verified.
- The application was already reachable; no additional application process was started for the reproduction.
- Evidence below comes from the earlier focused read-only reproduction, not a new execution during creation of this record.

### Preconditions — Original Reproduction

- The local application is running and the three page routes are accessible.
- JavaScript is enabled and browser console errors can be inspected.
- The shared footer contains the unconditional contact-form event-handler registration described below.
- No contact data or form submission is needed.

### Steps to Reproduce — Before Fix

1. Open `http://localhost:3000/` in a fresh browser tab and inspect its console as the control page.
2. Open `http://localhost:3000/project` in another fresh tab and inspect its console after loading.
3. Open `http://localhost:3000/project/automation` in another fresh tab and inspect its console after loading.
4. Inspect the DOM for `#contact-form` on each page and observe whether the two project pages render.
5. For the limited impact check on `/project`, select the Database navigation link, then use the scroll-to-top button after it appears. Do not submit the contact form.

### Expected Result

Shared footer initialization should complete without throwing a contact-form registration error on pages that do not contain the form. Those pages should continue to render and support their available navigation controls.

This expectation describes the defect acceptance condition; it is not a new requirement added to the reviewed requirements baseline.

### Actual Result — Original Reproduction

- `/project` and `/project/automation` each produce a TypeError during shared footer initialization.
- Both pages still visibly render their content and styling.
- `#contact-form` is absent on both affected pages and present on `/`.
- The home control page rendered its form with no captured console errors or warnings.
- Execution fails in the contact-form script block. The observation does not establish failure of all JavaScript on either page.
- Project Database navigation and scroll-to-top continued to work during the limited impact check.
- Contact submission was not exercised.

### Evidence

Captured browser error on `/project`:

```text
TypeError: Cannot read properties of null (reading 'addEventListener')
    at http://localhost:3000/project:731:15
```

Captured browser error on `/project/automation`:

```text
TypeError: Cannot read properties of null (reading 'addEventListener')
    at http://localhost:3000/project/automation:417:15
```

Browser DOM inspection found one `#contact-form` on `/` and zero on each affected page. Screenshots inspected during reproduction showed both project pages rendered. On `/project`, navigation changed the URL fragment to `#database-testing`; the scroll-to-top button gained the `show` class and lost it after the return-to-top action completed.

These are observations from the reproduction recorded in the accompanying chat. No screenshot files or execution-report artifacts are attached to this log. Stack locations refer to the rendered HTML from that run and may change with template edits.

### Affected Pages — Original Reproduction

| Page | Role | Observed outcome |
| --- | --- | --- |
| `/project` | Affected | TypeError; visible rendering retained |
| `/project/automation` | Affected | TypeError; visible rendering retained |
| `/` | Control | Contact form present; no captured console errors or warnings |

### Requirement / Coverage Links

- [REQUIREMENTS.md](REQUIREMENTS.md): the shared-footer entry under **Observed behavior, suspected defects, and clarification** is the original source-only observation now reproduced by DEF-001. The requirement observation now links the reproduced and fixed issue.
- [REQUIREMENTS.md](REQUIREMENTS.md): **REQ-UI-005** (project content) and **REQ-UI-007** (automation-page rendering) provide related page scope, not explicit error-free-console requirements. Visible content remained rendered during reproduction.
- [REQUIREMENTS.md](REQUIREMENTS.md): **REQ-UI-006** (project anchor navigation) and **REQ-UI-008** (scroll-to-top) provide context for the limited unaffected-functionality observations. This check did not validate their complete scope or scroll threshold boundaries.
- [TEST_DESIGN.md](TEST_DESIGN.md): **Checklist-based Testing**, startup pageerror coverage now implemented for the two affected routes; broader browser-error coverage remains partial.
- [TEST_CASES.md](TEST_CASES.md): the former shared-footer browser-error gap is now addressed by P-UI-015 and P-UI-016 for these routes. [RTM.md](RTM.md) links their pre-fix and post-fix evidence.

### Root Cause / Technical Observation — Before Fix

The [shared footer](../../views/partials/footer.ejs) selects the contact form and registers a submit handler without checking whether the element exists:

```javascript
var contactForm = document.querySelector("#contact-form");
// Other element selections occur between these statements.
contactForm.addEventListener("submit", function(event) {
```

At reproduction, these statements were at source lines 60 and 65. The [project template](../../views/project.ejs) and [automation template](../../views/automation.ejs) both include the shared footer but have no contact form. The selector therefore returns `null`, and accessing `addEventListener` throws. The [home template](../../views/index.ejs) includes the form and the same footer. Page routes are defined in [index.js](../../index.js).

### Workaround — Before Fix

No workaround to prevent the console error has been verified. The affected pages remained readable and the sampled project controls remained usable despite the error.

### Resolution

**Fixed.** The only application change was in [views/partials/footer.ejs](../../views/partials/footer.ejs):

```diff
- contactForm.addEventListener("submit", function(event) {
+ contactForm?.addEventListener("submit", function(event) {
```

Optional chaining prevents submit-handler registration when #contact-form is absent, while preserving the existing handler on the home page where the form exists. No API or unrelated footer behavior was changed.

### Retest Status

**Passed.** Local Chromium verification used the existing Playwright configuration, no retries, and one worker.

| Test / stage | Before fix | After fix |
| --- | --- | --- |
| project page should load without JavaScript page errors (P-UI-015) | FAIL | PASS |
| automation page should load without JavaScript page errors (P-UI-016) | FAIL | PASS |
| contact form should submit successfully with valid data (P-UI-004) | Not part of pre-fix focused run | PASS |

Both pre-fix automated failures received `TypeError: Cannot read properties of null (reading 'addEventListener')` instead of an empty page-error array. The first post-fix focused run passed 2/2; the subsequent focused contact-inclusive run passed 3/3 (4.5 seconds).

Broader Chromium UI regression: **16 passed, 0 failed, 0 skipped** (12.4 seconds).

| Coverage | Passed |
| --- | ---: |
| Home UI | 3 |
| Contact UI | 4 |
| Project UI | 7 |
| DEF-001 page-error regression | 2 |

Commands were run from QA-Portfolio-Playwright:

```text
node node_modules/@playwright/test/cli.js test tests/ui/pageErrors.spec.js --project=chromium --retries=0 --workers=1 --reporter=line
node node_modules/@playwright/test/cli.js test tests/ui/pageErrors.spec.js tests/ui/contact.spec.js --grep 'project page should load without JavaScript page errors|automation page should load without JavaScript page errors|contact form should submit successfully with valid data' --project=chromium --retries=0 --workers=1 --reporter=line
node node_modules/@playwright/test/cli.js test tests/ui --project=chromium --retries=0 --workers=1 --reporter=line
```

Contact success-message and DB persistence assertions passed. Existing awaited cleanup completed without error; it does not independently assert the deleted row count or post-delete absence. No pageerrors were captured by the two new tests. The contact test does not capture pageerrors, so it does not establish an error-free home console.

Firefox/WebKit and separate API/DB projects were not run in this cycle. No production or cross-browser compatibility conclusion is claimed. Evidence is the recorded local command output from this chat, not CI evidence; no immutable report or commit identifier was captured. No tests were rerun while updating these documents.

### Notes

- Scope is limited to the observed local browser environment and three routes; cross-browser impact has not been established.
- Contact submission was not assessed during the original reproduction; it and persistence were verified in the post-fix cycle above.
- Requirements coverage, design, catalogue, plan, and [RTM.md](RTM.md) now reference this completed cycle; baseline catalogue execution statuses remain distinct from cycle results.
- Creating this record did not rerun the reproduction or any automated tests, change application/test/workflow code, or modify PostgreSQL data.

## DEF-002 — Contact form remains disabled after server-side validation rejection

| Field | Value |
| --- | --- |
| Defect ID | DEF-002 |
| Status | Closed |
| Severity | Medium |
| Priority | High |
| Reproduction date | 2026-09-29 |

### Environment

Local Windows workspace; existing application at `http://localhost:3000/`; Codex in-app browser. Exact browser version was not recorded. The DEF-001 optional-chaining fix was present. This record uses the preceding focused reproduction evidence; no tests were rerun to create it.

### Preconditions — Before Fix

- Application is reachable and JavaScript is enabled.
- Start from a fresh home-page load, with the contact form available and no prior success message visible.
- Use the synthetic data below; the whitespace-only name satisfies native required-field validation but fails the server's trimmed-value check.

### Steps to Reproduce

1. Open `/` in a fresh browser page.
2. Enter Name: three ASCII spaces (`"   "`).
3. Enter Email: `recovery.probe.20260929@example.com`.
4. Enter Message: `Read-only recovery rejection probe 20260929`.
5. Click **Send Message**.
6. Observe the button and message area after the rejected submission.
7. Correct Name to `Recovery Probe` without reloading and inspect whether the submit button becomes available.

### Expected Result

After a failed request, the user should not remain stuck with a disabled **Sending...** button. The form should allow correction and normal button-based retry. This is a recovery expectation, not a newly invented product requirement or a prescribed error-message design.

### Actual Result — Before Fix

| Stage | Button state | Button text | Message area |
| --- | --- | --- | --- |
| Before submission | Enabled | Send Message | Success message hidden |
| After submission | Disabled | Sending... | No visible success/error message |
| After server rejection | Remained disabled | Sending... | No visible success/error message |
| After correcting Name | Remained disabled | Sending... | No visible success/error message |

Normal button-based retry was unavailable without reloading. Keyboard resubmission was not tested. The fast local request's in-flight state was not separately timed; the disabled state persisted across subsequent observations.

### Evidence

Browser interaction confirmed the disabled button, unchanged **Sending...** label, hidden success message, and lack of visible error feedback. No browser console/page errors were captured.

Browser network-response details were not exposed by the inspection interface. A separate request with the identical rejected payload corroborated the server response:

```text
HTTP 400
Content-Type: application/json; charset=utf-8

{"success":false,"message":"All fields are required."}
```

A read-only database lookup found no row matching the probe email and message (`probeRowExists: false`). No cleanup was required. These observations are recorded in the reproduction chat; no screenshot or report artifact is attached.

### Affected Functionality

Contact form on `/`: recovery and normal button-based retry after a browser-valid submission receives a valid JSON server rejection with `success=false`. The server's validation rejection itself is expected; the confirmed defect is the unrecovered UI state.

### Requirement / Coverage Links

- [REQUIREMENTS.md](REQUIREMENTS.md): **REQ-CONTACT-004** describes the pending disabled/Sending state; it does not define implemented failure recovery. **REQ-CONTACT-005** describes success-only restoration, not rejection recovery.
- [REQUIREMENTS.md](REQUIREMENTS.md): **REQ-API-002** provides the whitespace rejection contract; **REQ-DB-003** provides the related non-persistence behavior. Neither is asserted to be violated by this observation.
- [REQUIREMENTS.md](REQUIREMENTS.md): the failed/rejected-contact recovery observation under **Observed behavior, suspected defects, and clarification** is now confirmed here only for the valid-JSON rejection path. That observation now links to this fixed valid-JSON path; broader failure modes remain unverified.
- [TEST_DESIGN.md](TEST_DESIGN.md): **State Transition Testing**, the `Submitting + success=false` row, now records the implemented recovery transition and P-UI-017.
- [TEST_CASES.md](TEST_CASES.md): the former valid-JSON button-recovery gap is now covered by P-UI-017; error feedback, retry sequences, and network/JSON failures remain gaps. **P-API-007** covers whitespace-name rejection/non-persistence at the API interface, not UI recovery; it was not executed during this reproduction. P-UI-017 detects the recovery defect through the UI with a DB non-persistence check.

### Root Cause / Technical Observation — Before Fix

The [shared footer](../../views/partials/footer.ejs) disables the button and sets **Sending...** before `fetch`, parses the response as JSON, and restores the button only inside `if (data.success)`. There is no recovery branch for `success=false` and no `catch`/`finally` recovery path.

The [contact route](../../index.js) rejects the whitespace-only name before the insert with HTTP 400 and the JSON body above. The [home template](../../views/index.ejs) supplies the required inputs, submit button, and initially hidden success message. These three files were inspected to correlate the observed UI behavior with the implementation.

### Workaround — Before Fix

Reloading the page provides a fresh enabled form, after which values must be entered again. Correcting the name alone did not restore the button. A successful resubmission after this workaround was not exercised in this reproduction.

### Resolution

**Fixed.** In [views/partials/footer.ejs](../../views/partials/footer.ejs), button restoration moved outside the success-only branch:

```javascript
if (data.success) {
  successMessage.classList.remove("d-none");
  contactForm.reset();
}
sendButton.disabled = false;
sendButton.textContent = "Send Message";
```

After a valid JSON rejection with success=false, the button is enabled and its label restored. Success confirmation/reset behavior is preserved. This does not implement catch/finally recovery for network or JSON-parsing failures.

### Retest Status

**Passed.** Verification date: 2026-09-30. Local Chromium, no retries, one worker.

| Stage | Case / test | Result |
| --- | --- | --- |
| Pre-fix automated regression | P-UI-017 — contact form should recover after server-side validation rejection | FAIL as expected |
| Post-fix focused recovery | P-UI-017 | PASS (3.1 seconds) |
| Post-fix successful contact | P-UI-004 — contact form should submit successfully with valid data | PASS (3.1 seconds) |
| Broader Chromium UI regression | P-UI-001–017 | 17 passed, 0 failed, 0 skipped (15.6 seconds) |

Exact pre-fix assertion failures on #send-message-button, each after 5000 ms:
- Expected enabled, received disabled.
- Expected "Send Message", received "Sending...".
- Expected not "Sending...", received "Sending...".

Both pre-fix and post-fix runs observed HTTP 400 with `{"success":false,"message":"All fields are required."}`. No matching rejected-submission DB row existed; cleanup was unnecessary. Valid submission persistence passed and existing cleanup completed without error. That successful-contact cleanup does not independently assert post-delete absence.

The broader run comprised home 3, contact 5, project 7, and DEF-001 page-error 2. Both DEF-001 regression tests passed. Only Chromium UI ran; Firefox, WebKit, separate API/DB projects, Selenium, and JMeter were not executed. Network/request and malformed/non-JSON response recovery remain unverified and were not fixed by this change.

Commands used from QA-Portfolio-Playwright:
```text
node node_modules/@playwright/test/cli.js test tests/ui/contact.spec.js --grep 'contact form should recover after server-side validation rejection' --project=chromium --retries=0 --workers=1 --reporter=line
node node_modules/@playwright/test/cli.js test tests/ui/contact.spec.js --grep 'contact form should submit successfully with valid data' --project=chromium --retries=0 --workers=1 --reporter=line
node node_modules/@playwright/test/cli.js test tests/ui --project=chromium --retries=0 --workers=1 --reporter=line
```

Evidence is recorded local command output from this chat, not CI or a full portfolio result. See [RTM.md](RTM.md) and [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md).

### Notes

- Confirmation is limited to the valid-JSON `success=false` rejection scenario.
- Network/request failure: **Not Attempted**. Malformed/non-JSON response: **Not Attempted**. Safe offline/response-interception controls were not exposed by the available browser interface; neither scenario is claimed as reproduced or assigned a separate defect ID.
- No database row matching the probe was found; no broad or test-owned cleanup was performed.
- P-UI-017 and the minimal application fix were added in the completed cycle. This documentation update did not run tests or change source. Error feedback, retry submission itself, and network/non-JSON recovery are not established by the passing button-recovery assertions.

## DEF-003 — Insufficient color contrast on "View Project Details" button

| Field | Value |
| --- | --- |
| Defect ID | DEF-003 |
| Status | Closed |
| Severity | Medium |
| Priority | High |
| Reproduction date | 2026-10-01 |

Severity reflects impaired readability of a primary call to action, particularly for users with low vision. High priority reflects the element's prominence and the size of the measured contrast shortfall. Both classifications remain subject to human review.

### Environment

- Local QA Automation Portfolio application at `http://localhost:3000/`.
- Local Windows environment using the QA-Portfolio-Playwright `accessibility` project in Chromium.
- Playwright 1.62.1, `@axe-core/playwright` 4.13.0, and axe-core 4.13.0.
- Verified command: `npm run test:accessibility -- --retries=0 --workers=1`.
- The initial accessibility execution contained 5 tests: 3 passed, 2 failed, and 0 skipped.
- The post-fix accessibility retest contained 5 tests: 5 passed, 0 failed, and 0 skipped.
- This record uses the verified execution evidence; no tests were rerun during documentation closure.

### Preconditions

- The local application is running and the Home page is reachable.
- The dedicated Playwright accessibility project and Chromium browser are available.
- The Home page renders the `#project-details-button` element with the visible text **View Project Details**.

### Steps to Reproduce

1. Start the application using the existing local test environment.
2. From QA-Portfolio-Playwright, run `npm run test:accessibility -- --retries=0 --workers=1`.
3. Allow P-A11Y-001 to navigate to `/` and run its axe scan.
4. Review the `color-contrast` violation reported for `#project-details-button`.

### Expected Result

The **View Project Details** text should meet the applicable WCAG AA minimum contrast ratio of **4.5:1** for normal text.

No standalone accessibility product requirement currently exists in [REQUIREMENTS.md](REQUIREMENTS.md). This expected result records the axe rule's accessibility criterion and confirmed defect condition; it does not invent an approved product requirement.

### Actual Result

The primary project call to action is rendered with white text on a teal background at a measured contrast ratio of **2.48:1**, below the expected **4.5:1** minimum.

### Evidence

```text
Page: /
Rule: color-contrast
axe impact: serious
Element: #project-details-button
Visible text: View Project Details
Foreground: #ffffff
Background: #14b8a6
Measured contrast: 2.48:1
Expected minimum: 4.5:1
```

The Home-page axe test failed with one `color-contrast` violation. The assertion expected zero automatically detectable violations and received one. This was a genuine AUT finding, not a test-infrastructure failure.

### Affected Functionality

Home-page primary project call to action on `/`. The evidence establishes insufficient text contrast; it does not establish that the link is inoperable. Existing functional navigation behavior is outside this defect's assertion.

### Requirement / Coverage Links

- [TEST_CASES.md](TEST_CASES.md): **P-A11Y-001**, Home-page automated accessibility scan, failed before the fix and passed after the fix in local Chromium.
- [RTM.md](RTM.md): accessibility traceability links P-A11Y-001 pre-fix and post-fix evidence to DEF-003 without creating a new requirement ID.
- [REQUIREMENTS.md](REQUIREMENTS.md): **REQ-UI-004** provides related functional page/navigation scope only; it does not specify color contrast or WCAG conformance.
- The existing Playwright Home-page axe scan provided the passing regression retest and remains ongoing regression coverage.

### Root Cause / Technical Observation — Before Fix

axe measured foreground `#ffffff` against background `#14b8a6` on `#project-details-button`. At the rendered normal-text size and weight, the resulting **2.48:1** ratio does not meet the **4.5:1** threshold. No CSS or application source was changed or reinterpreted while creating this record.

### Workaround — Before Fix

No application-level workaround was verified. User-agent or operating-system contrast settings may affect an individual user's presentation, but they do not resolve the confirmed application styling defect.

### Resolution

**Fixed.** The only application change for DEF-003 was in [public/styles/main.css](../../public/styles/main.css). The CTA-specific selector now uses white text on a darker teal background:

```css
#project-details-button {
  background-color: #0f766e;
  border-color: #0f766e;
  color: white;
}
```

The base contrast is **5.473:1**. Hover, focus, focus-visible, and active states use `#115e59` with white text, producing **7.584:1**. The selector was narrowed from the general `.btn-info` override to `#project-details-button`; no HTML, layout, typography, JavaScript, or unrelated brand color changed.

### Retest Status

**Passed.** Verification date: 2026-10-01. The existing QA-Portfolio-Playwright accessibility project ran locally in Chromium with no retries and one worker:

```text
npm run test:accessibility -- --retries=0 --workers=1
```

Post-fix result: **5 total, 5 passed, 0 failed, 0 skipped** (8.1 seconds). P-A11Y-001 passed with no `color-contrast` violation for `#project-details-button`. P-A11Y-002–005 also passed. No axe rule, tag, element, or page section was suppressed or excluded.

### Notes

- Status is Closed / Fixed / Retest Passed.
- Automated axe evidence cannot establish complete page accessibility or full WCAG compliance.
- The initial five-test run confirmed DEF-003 and DEF-004 with 3 passed and 2 failed. The post-fix run passed all five implemented automated accessibility checks.

## DEF-004 — Insufficient color contrast for architecture connector labels

| Field | Value |
| --- | --- |
| Defect ID | DEF-004 |
| Status | Closed |
| Severity | Medium |
| Priority | Medium |
| Reproduction date | 2026-10-01 |

Severity reflects a WCAG AA contrast failure affecting small architecture-label text. Medium priority reflects the smaller contrast shortfall and informational role of the labels compared with the primary call to action in DEF-003. Both classifications remain subject to human review.

### Environment

- Local QA Automation Portfolio application at `http://localhost:3000/project`.
- Local Windows environment using the QA-Portfolio-Playwright `accessibility` project in Chromium.
- Playwright 1.62.1, `@axe-core/playwright` 4.13.0, and axe-core 4.13.0.
- Verified command: `npm run test:accessibility -- --retries=0 --workers=1`.
- The initial accessibility execution contained 5 tests: 3 passed, 2 failed, and 0 skipped.
- The post-fix accessibility retest contained 5 tests: 5 passed, 0 failed, and 0 skipped.
- This record uses the verified execution evidence; no tests were rerun during documentation closure.

### Preconditions

- The local application is running and the Project page is reachable.
- The dedicated Playwright accessibility project and Chromium browser are available.
- The Project page renders the architecture diagram and its connector labels.

### Steps to Reproduce

1. Start the application using the existing local test environment.
2. From QA-Portfolio-Playwright, run `npm run test:accessibility -- --retries=0 --workers=1`.
3. Allow P-A11Y-002 to navigate to `/project` and run its axe scan.
4. Review the `color-contrast` violation reported for the architecture connector labels.

### Expected Result

Architecture connector-label text should meet the applicable WCAG AA minimum contrast ratio of **4.5:1** for normal text.

No standalone accessibility product requirement currently exists in [REQUIREMENTS.md](REQUIREMENTS.md). This expected result records the axe rule's accessibility criterion and confirmed defect condition; it does not invent an approved product requirement.

### Actual Result

Small architecture connector labels are rendered at a measured contrast ratio of **4.26:1**, below the expected **4.5:1** minimum.

### Evidence

```text
Page: /project
Rule: color-contrast
axe impact: serious
Foreground: #64748b
Background: #eef3f8
Measured contrast: 4.26:1
Expected minimum: 4.5:1

Affected labels/selectors:
- HTTP / HTTPS
  #architecture > .container > .architecture-diagram > .architecture-connector:nth-child(2) > span
- HTTP Requests / Fetch
  .architecture-connector:nth-child(4) > span
- Data Access / Parameterized Queries
  .architecture-connector:nth-child(8) > span
```

The Project-page axe test failed with one `color-contrast` rule violation affecting three nodes. The assertion expected zero automatically detectable violations and received one. This was a genuine AUT finding, not a test-infrastructure failure.

### Affected Functionality

Architecture connector labels on `/project`, including **HTTP / HTTPS**, **HTTP Requests / Fetch**, and **Data Access / Parameterized Queries**. The evidence concerns label readability; it does not establish loss of project-page navigation or content rendering.

### Requirement / Coverage Links

- [TEST_CASES.md](TEST_CASES.md): **P-A11Y-002**, Project-page automated accessibility scan, failed before the fix and passed after the fix in local Chromium.
- [RTM.md](RTM.md): accessibility traceability links P-A11Y-002 pre-fix and post-fix evidence to DEF-004 without creating a new requirement ID.
- [REQUIREMENTS.md](REQUIREMENTS.md): **REQ-UI-005** provides related Project-page content scope only; it does not specify color contrast or WCAG conformance.
- The existing Playwright Project-page axe scan provided the passing regression retest and remains ongoing regression coverage.

### Root Cause / Technical Observation — Before Fix

axe measured foreground `#64748b` against background `#eef3f8` for three small connector-label nodes. At the rendered normal-text size and weight, the resulting **4.26:1** ratio is below the **4.5:1** threshold. No CSS or application source was changed or reinterpreted while creating this record.

### Workaround — Before Fix

No application-level workaround was verified. User-agent or operating-system contrast settings may affect an individual user's presentation, but they do not resolve the confirmed application styling defect.

### Resolution

**Fixed.** The only application change for DEF-004 was in [public/styles/main.css](../../public/styles/main.css). The architecture connector text changed from `#64748b` to `#58677d`, while the `#eef3f8` section background remained unchanged:

```css
.architecture-connector {
  color: #58677d;
}
```

The resulting contrast is **5.152:1**, above the required **4.5:1** minimum. The change is scoped to architecture connectors; no layout, typography, HTML, JavaScript, or unrelated text color changed.

### Retest Status

**Passed.** Verification date: 2026-10-01. The existing QA-Portfolio-Playwright accessibility project ran locally in Chromium with no retries and one worker:

```text
npm run test:accessibility -- --retries=0 --workers=1
```

Post-fix result: **5 total, 5 passed, 0 failed, 0 skipped** (8.1 seconds). P-A11Y-002 passed with no `color-contrast` violation for the three reported connector labels. P-A11Y-001 and P-A11Y-003–005 also passed. No axe rule, tag, element, or page section was suppressed or excluded.

### Notes

- Status is Closed / Fixed / Retest Passed.
- Automated axe evidence cannot establish complete page accessibility or full WCAG compliance.
- The initial five-test run confirmed DEF-003 and DEF-004 with 3 passed and 2 failed. The post-fix run passed all five implemented automated accessibility checks.
