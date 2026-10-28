# Defect Log
Defects are logged after reproduction or confirmation. Severity and priority reflect the observed impact.

## DEF-001 — Shared footer JavaScript throws a TypeError on pages without the contact form
| Field | Value |
| --- | --- |
| Defect ID | DEF-001 |
| Status | Closed |
| Severity | Medium |
| Priority | High |
| Reproduction date | 2026-09-29 |

### Environment
- Local QA Automation Portfolio application at `http\://localhost:3000`.

- Windows local test environment with manual browser reproduction.

- Exact browser version was not recorded.

- The application was already running and reachable during reproduction.

- This section uses the original recorded reproduction results.

### Preconditions
- The local application is running and the three page routes are accessible.

- JavaScript is enabled and browser console errors can be inspected.

- The shared footer contains the unconditional contact-form event-handler registration described below.

- No contact data or form submission is needed.

### Steps to Reproduce
1\. Open `http\://localhost:3000/` in a fresh browser tab and inspect its console as the control page.

2\. Open `http\://localhost:3000/project` in another fresh tab and inspect its console after loading.

3\. Open `http\://localhost:3000/project/automation` in another fresh tab and inspect its console after loading.

4\. Inspect the DOM for `#contact-form` on each page and observe whether the two project pages render.

5\. For the limited impact check on `/project`, select the Database navigation link, then use the scroll-to-top button after it appears. Do not submit the contact form.

### Expected Result
Shared footer initialization should complete without throwing a contact-form registration error on pages that do not contain the form. Those pages should continue to render and support their available navigation controls.

This is the expected behavior for defect verification, not a new product requirement.

### Actual Result
- `/project` and `/project/automation` each produce a TypeError during shared footer initialization.

- Both pages still visibly render their content and styling.

- `#contact-form` is absent on both affected pages and present on `/`.

- The home control page rendered its form with no captured console errors or warnings.

- Execution fails in the contact-form script block. The observation does not establish failure of all JavaScript on either page.

- Project Database navigation and scroll-to-top continued to work during the limited impact check.

- Contact submission was not exercised.

### Test Evidence
Captured browser error on `/project`:

```text

TypeError: Cannot read properties of null (reading 'addEventListener')

    at http\://localhost:3000/project:731:15

```

Captured browser error on `/project/automation`:

```text

TypeError: Cannot read properties of null (reading 'addEventListener')

    at http\://localhost:3000/project/automation:417:15

```

Browser DOM inspection found one `#contact-form` on `/` and zero on each affected page. Screenshots inspected during reproduction showed both project pages rendered. On `/project`, navigation changed the URL fragment to `#database-testing`; the scroll-to-top button gained the `show` class and lost it after the return-to-top action completed.

These observations come from the recorded local reproduction. No screenshot or execution-report artifacts are attached to this log. Stack locations refer to the rendered HTML from that run and may change after template edits.

### Affected Pages
| Page | Role | Observed outcome |
| --- | --- | --- |
| `/project` | Affected | TypeError; visible rendering retained |
| `/project/automation` | Affected | TypeError; visible rendering retained |
| `/` | Control | Contact form present; no captured console errors or warnings |

### Related Coverage
- [REQUIREMENTS.md](REQUIREMENTS.md): the shared-footer entry under **Observed behavior, suspected defects, and clarification** is the original source-only observation now reproduced by DEF-001. The requirement observation now links the reproduced and fixed issue.

- [REQUIREMENTS.md](REQUIREMENTS.md): **REQ-UI-005** (project content) and **REQ-UI-007** (automation-page rendering) provide related page scope, not explicit error-free-console requirements. Visible content remained rendered during reproduction.

- [REQUIREMENTS.md](REQUIREMENTS.md): **REQ-UI-006** (project anchor navigation) and **REQ-UI-008** (scroll-to-top) provide context for the limited unaffected-functionality observations. This check did not validate their complete scope or scroll threshold boundaries.

- [TEST_DESIGN.md](TEST_DESIGN.md): **Checklist-based Testing**, startup pageerror coverage now implemented for the two affected routes; broader browser-error coverage remains partial.

- [TEST_CASES.md](TEST_CASES.md): the former shared-footer browser-error gap is now addressed by P-UI-015 and P-UI-016 for these routes. [RTM.md](RTM.md) links their pre-fix and post-fix results.

### Root Cause
The [shared footer](../../views/partials/footer.ejs) selects the contact form and registers a submit handler without checking whether the element exists:

```javascript

var contactForm = document.querySelector("#contact-form");

// Other element selections occur between these statements.

contactForm.addEventListener("submit", function(event) {

```

At reproduction, these statements were at source lines 60 and 65. The [project template](../../views/project.ejs) and [automation template](../../views/automation.ejs) both include the shared footer but have no contact form. The selector therefore returns `null`, and accessing `addEventListener` throws. The [home template](../../views/index.ejs) includes the form and the same footer. Page routes are defined in [index.js](../../index.js).

### Workaround
No workaround was verified. The affected pages remained readable and the sampled controls remained usable.

### Resolution
**Fixed.** The only application change was in [views/partials/footer.ejs](../../views/partials/footer.ejs):

```diff

- contactForm.addEventListener("submit", function(event) {

\+ contactForm?.addEventListener("submit", function(event) {

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

Firefox/WebKit and separate API/DB projects were not run in this cycle. No production or cross-browser compatibility conclusion is claimed. Results comes from the recorded local Playwright command output. This cycle did not use CI results, and no separate immutable execution report was retained. No tests were rerun while updating the documentation.

### Notes
- Scope is limited to the observed local browser environment and three routes; cross-browser impact has not been established.

- Contact submission was not assessed during the original reproduction; it and persistence were verified in the post-fix cycle above.

- Related requirements, test design, test cases, test plan, and [RTM.md](RTM.md) reference this completed cycle.

- Creating this record did not rerun tests or modify application, test, workflow, or database data.

## DEF-002 — Contact form remains disabled after server-side validation rejection
| Field | Value |
| --- | --- |
| Defect ID | DEF-002 |
| Status | Closed |
| Severity | Medium |
| Priority | High |
| Reproduction date | 2026-09-29 |

### Environment
Local Windows workspace with the application running at `http\://localhost:3000/`.

The exact browser version was not recorded. The DEF-001 optional-chaining fix was already present.

This section uses the original recorded reproduction results.

### Preconditions
- Application is reachable and JavaScript is enabled.

- Start from a fresh home-page load, with the contact form available and no prior success message visible.

- Use the synthetic data below; the whitespace-only name satisfies native required-field validation but fails the server's trimmed-value check.

### Steps to Reproduce
1\. Open `/` in a fresh browser page.

2\. Enter Name: three ASCII spaces (`"   "`).

3\. Enter Email: `recovery.probe.20260929@example.com`.

4\. Enter Message: `Read-only recovery rejection probe 20260929`.

5\. Click **Send Message**.

6\. Observe the button and message area after the rejected submission.

7\. Correct Name to `Recovery Probe` without reloading and inspect whether the submit button becomes available.

### Expected Result
After a failed request, the user should not remain stuck with a disabled **Sending...** button. The form should allow correction and normal button-based retry. This is a recovery expectation, not a newly invented product requirement or a prescribed error-message design.

### Actual Result
| Stage | Button state | Button text | Message area |
| --- | --- | --- | --- |
| Before submission | Enabled | Send Message | Success message hidden |
| After submission | Disabled | Sending... | No visible success/error message |
| After server rejection | Remained disabled | Sending... | No visible success/error message |
| After correcting Name | Remained disabled | Sending... | No visible success/error message |

Normal button-based retry was unavailable without reloading. Keyboard resubmission was not tested. The fast local request's in-flight state was not separately timed; the disabled state persisted across subsequent observations.

### Test Evidence
Browser interaction confirmed the disabled button, unchanged **Sending...** label, hidden success message, and lack of visible error feedback. No browser console/page errors were captured.

Browser network-response details were not exposed by the inspection interface. A separate request with the identical rejected payload corroborated the server response:

```text

HTTP 400

Content-Type: application/json; charset=utf-8

{"success":false,"message":"All fields are required."}

```

A read-only database lookup found no row matching the probe email and message (`probeRowExists: false`). No cleanup was required. No screenshot or separate execution-report artifact was retained.

### Affected Functionality
Contact form on `/`: recovery and normal button-based retry after a browser-valid submission receives a valid JSON server rejection with `success=false`. The server's validation rejection itself is expected; the confirmed defect is the unrecovered UI state.

### Related Coverage
- [REQUIREMENTS.md](REQUIREMENTS.md): **REQ-CONTACT-004** describes the pending disabled/Sending state; it does not define implemented failure recovery. **REQ-CONTACT-005** describes success-only restoration, not rejection recovery.

- [REQUIREMENTS.md](REQUIREMENTS.md): **REQ-API-002** provides the whitespace rejection contract; **REQ-DB-003** provides the related non-persistence behavior. Neither is asserted to be violated by this observation.

- [REQUIREMENTS.md](REQUIREMENTS.md): the failed/rejected-contact recovery observation under **Observed behavior, suspected defects, and clarification** is now confirmed here only for the valid-JSON rejection path. That observation now links to this fixed valid-JSON path; broader failure modes remain unverified.

- [TEST_DESIGN.md](TEST_DESIGN.md): **State Transition Testing**, the `Submitting + success=false` row, now records the implemented recovery transition and P-UI-017.

- [TEST_CASES.md](TEST_CASES.md): the former valid-JSON button-recovery gap is now covered by P-UI-017; error feedback, retry sequences, and network/JSON failures remain gaps. **P-API-007** covers whitespace-name rejection/non-persistence at the API interface, not UI recovery; it was not executed during this reproduction. P-UI-017 detects the recovery defect through the UI with a DB non-persistence check.

### Root Cause
The [shared footer](../../views/partials/footer.ejs) disables the button and sets **Sending...** before `fetch`, parses the response as JSON, and restores the button only inside `if (data.success)`. There is no recovery branch for `success=false` and no `catch`/`finally` recovery path.

The [contact route](../../index.js) rejects the whitespace-only name before the insert with HTTP 400 and the JSON body above. The [home template](../../views/index.ejs) supplies the required inputs, submit button, and initially hidden success message. These three files were inspected to correlate the observed UI behavior with the implementation.

### Workaround
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

Results come from the recorded local Playwright run, not CI or a full portfolio run. See [RTM.md](RTM.md) and [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md).

### Notes
- Confirmation is limited to the valid-JSON `success=false` rejection scenario.

- Network/request failure: **Not Attempted**. Malformed/non-JSON response: **Not Attempted**. Safe offline/response-interception controls were not exposed by the available browser interface; neither scenario is claimed as reproduced or assigned a separate defect ID.

- No database row matching the probe was found; no broad or test-owned cleanup was performed.

- P-UI-017 and the minimal application fix were added in the completed cycle. No tests were rerun for this documentation update. Error feedback, retry submission itself, and network/non-JSON recovery are not established by the passing button-recovery assertions.

## DEF-003 — Insufficient color contrast on "View Project Details" button
| Field | Value |
| --- | --- |
| Defect ID | DEF-003 |
| Status | Closed |
| Severity | Medium |
| Priority | High |
| Reproduction date | 2026-10-01 |

### Environment
- Local QA Automation Portfolio application at `http\://localhost:3000/`.

- Local Windows environment using the QA-Portfolio-Playwright `accessibility` project in Chromium.

- Playwright 1.62.1, `@axe-core/playwright` 4.13.0, and axe-core 4.13.0.

- Verified command: `npm run test:accessibility -- --retries=0 --workers=1`.

- The initial accessibility execution contained 5 tests: 3 passed, 2 failed, and 0 skipped.

- The post-fix accessibility retest contained 5 tests: 5 passed, 0 failed, and 0 skipped.

- This record uses the verified test results.

### Preconditions
- The local application is running and the Home page is reachable.

- The dedicated Playwright accessibility project and Chromium browser are available.

- The Home page renders the `#project-details-button` element with the visible text **View Project Details**.

### Steps to Reproduce
1\. Start the application using the existing local test environment.

2\. From QA-Portfolio-Playwright, run `npm run test:accessibility -- --retries=0 --workers=1`.

3\. Allow P-A11Y-001 to navigate to `/` and run its axe scan.

4\. Review the `color-contrast` violation reported for `#project-details-button`.

### Expected Result
The **View Project Details** text should meet the applicable WCAG AA minimum contrast ratio of **4.5:1** for normal text.

No standalone accessibility requirement is currently defined in [REQUIREMENTS.md](REQUIREMENTS.md). The axe contrast criterion is used as the defect acceptance condition.

### Actual Result
The primary project call to action is rendered with white text on a teal background at a measured contrast ratio of **2.48:1**, below the expected **4.5:1** minimum.

### Test Evidence
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

The Home-page axe test failed with one `color-contrast` violation. The assertion expected zero automatically detectable violations and received one. This was an application defect, not a test-infrastructure failure.

### Affected Functionality
Home-page primary project call to action on `/`. The defect is limited to text contrast. Link navigation was not the failed behavior.

### Related Coverage
- [TEST_CASES.md](TEST_CASES.md): **P-A11Y-001**, Home-page automated accessibility scan, failed before the fix and passed after the fix in local Chromium.

- [RTM.md](RTM.md): accessibility traceability links P-A11Y-001 pre-fix and post-fix results to DEF-003 without creating a new requirement ID.

- [REQUIREMENTS.md](REQUIREMENTS.md): **REQ-UI-004** provides related functional page/navigation scope only; it does not specify color contrast or WCAG conformance.

- The existing Playwright Home-page axe scan provided the passing regression retest and remains ongoing regression coverage.

### Root Cause
axe measured foreground `#ffffff` against background `#14b8a6` on `#project-details-button`. At the rendered normal-text size and weight, the resulting **2.48:1** ratio does not meet the **4.5:1** threshold. No CSS or application source was changed or reinterpreted while creating this record.

### Workaround
No application-level workaround was verified.

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

- Automated axe checks do not establish full WCAG compliance.

- The initial five-test run confirmed DEF-003 and DEF-004 with 3 passed and 2 failed. The post-fix run passed all five implemented automated accessibility checks.

## DEF-004 — Insufficient color contrast for architecture connector labels
| Field | Value |
| --- | --- |
| Defect ID | DEF-004 |
| Status | Closed |
| Severity | Medium |
| Priority | Medium |
| Reproduction date | 2026-10-01 |

### Environment
- Local QA Automation Portfolio application at `http\://localhost:3000/project`.

- Local Windows environment using the QA-Portfolio-Playwright `accessibility` project in Chromium.

- Playwright 1.62.1, `@axe-core/playwright` 4.13.0, and axe-core 4.13.0.

- Verified command: `npm run test:accessibility -- --retries=0 --workers=1`.

- The initial accessibility execution contained 5 tests: 3 passed, 2 failed, and 0 skipped.

- The post-fix accessibility retest contained 5 tests: 5 passed, 0 failed, and 0 skipped.

- This record uses the verified test results.

### Preconditions
- The local application is running and the Project page is reachable.

- The dedicated Playwright accessibility project and Chromium browser are available.

- The Project page renders the architecture diagram and its connector labels.

### Steps to Reproduce
1\. Start the application using the existing local test environment.

2\. From QA-Portfolio-Playwright, run `npm run test:accessibility -- --retries=0 --workers=1`.

3\. Allow P-A11Y-002 to navigate to `/project` and run its axe scan.

4\. Review the `color-contrast` violation reported for the architecture connector labels.

### Expected Result
Architecture connector-label text should meet the applicable WCAG AA minimum contrast ratio of **4.5:1** for normal text.

No standalone accessibility requirement is currently defined in [REQUIREMENTS.md](REQUIREMENTS.md). The axe contrast criterion is used as the defect acceptance condition.

### Actual Result
Small architecture connector labels are rendered at a measured contrast ratio of **4.263:1**, below the expected **4.5:1** minimum.

### Test Evidence
```text

Page: /project

Rule: color-contrast

axe impact: serious

Foreground: #64748b

Background: #eef3f8

Measured contrast: 4.263:1

Expected minimum: 4.5:1

Affected labels/selectors:

- HTTP / HTTPS

  #architecture > .container > .architecture-diagram > .architecture-connector:nth-child(2) > span

- HTTP Requests / Fetch

  .architecture-connector:nth-child(4) > span

- Data Access / Parameterized Queries

  .architecture-connector:nth-child(8) > span

```

The Project-page axe test failed with one `color-contrast` rule violation affecting three nodes. The assertion expected zero automatically detectable violations and received one. This was an application defect, not a test-infrastructure failure.

### Affected Functionality
Architecture connector labels on `/project`, including **HTTP / HTTPS**, **HTTP Requests / Fetch**, and **Data Access / Parameterized Queries**. The defect is limited to label readability; navigation and content rendering were not the failed behavior.

### Related Coverage
- [TEST_CASES.md](TEST_CASES.md): **P-A11Y-002**, Project-page automated accessibility scan, failed before the fix and passed after the fix in local Chromium.

- [RTM.md](RTM.md): accessibility traceability links P-A11Y-002 pre-fix and post-fix results to DEF-004 without creating a new requirement ID.

- [REQUIREMENTS.md](REQUIREMENTS.md): **REQ-UI-005** provides related Project-page content scope only; it does not specify color contrast or WCAG conformance.

- The existing Playwright Project-page axe scan provided the passing regression retest and remains ongoing regression coverage.

### Root Cause
axe measured foreground `#64748b` against background `#eef3f8` for three small connector-label nodes. At the rendered normal-text size and weight, the resulting **4.263:1** ratio is below the **4.5:1** threshold.

### Workaround
No application-level workaround was verified.

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

- Automated axe checks do not establish full WCAG compliance.

- The initial five-test run confirmed DEF-003 and DEF-004 with 3 passed and 2 failed. The post-fix run passed all five implemented automated accessibility checks.

## DEF-005 — Insufficient color contrast on authentication navigation link
| Field | Value |
| --- | --- |
| Defect ID | DEF-005 |
| Status | Closed |
| Severity | Medium |
| Priority | High |
| Reproduction date | 2026-10-13 |

### Environment
- Current local QA Automation Portfolio application at `http\://localhost:3000` after a fresh authentication-client build and application restart.

- Local Windows environment using Playwright Chromium and the dedicated accessibility project.

- Project page: `http\://localhost:3000/project`.

- Visible link text: **Login** when unauthenticated or **Account** when authenticated.

- Selector used for reproduction: `a[href$="login"]`.

### Preconditions
- The current application source and authentication navigation changes are built and served.

- The Project page is reachable with the expanded desktop navigation visible.

- The shared authentication navigation link is rendered.

### Steps to Reproduce
1\. Build and start the current application using its normal local commands.

2\. Open `/project` in Chromium at the verified desktop viewport.

3\. Locate the shared **Login / Account** navigation link with `a[href$="login"]`.

4\. Run the existing Project-page axe accessibility scan and inspect the rendered link position and computed colors.

### Expected Result
The authentication navigation link should remain inside the dark navbar and meet the applicable WCAG AA minimum contrast ratio of **4.5:1** for normal text.

No standalone accessibility requirement is defined in [REQUIREMENTS.md](REQUIREMENTS.md). The reproduced contrast result is used as the defect acceptance condition.

### Actual Result
On `/project`, the crowded expanded navigation caused the authentication link to overflow beyond the dark navbar onto the white body background. The light link text was therefore evaluated against white and failed contrast.

The same shared link exists on `/` and `/project/automation`, but those pages did not reproduce the overflow because their navigation contains fewer links.

### Test Evidence
```text

Page: /project

Visible text: Login / Account

Selector: a[href$="login"]

Foreground: #cbd5e1

Effective background: #ffffff

Measured contrast: 1.48:1

Expected minimum: 4.5:1

```

The existing P-A11Y-002 Project-page accessibility scan detected the issue. The application had been freshly built and restarted before reproduction, ruling out a stale local process or stale authentication client build.

### Affected Functionality
The authentication navigation link on `/project` in the expanded desktop navigation. The defect is limited to contrast/layout; routing and authentication continued to work.

### Related Coverage
- [TEST_CASES.md](TEST_CASES.md): **P-A11Y-002**, existing Project-page axe scan used for detection and retest. DEF-005 did not create a new test ID.

- [RTM.md](RTM.md): accessibility traceability records the DEF-005 pre-fix and post-fix results.

- [REQUIREMENTS.md](REQUIREMENTS.md): **REQ-UI-005** and **REQ-UI-010** provide related Project/authentication-page scope only; they do not define a standalone color-contrast requirement.

### Root Cause
The Project navigation contained ten expanded links and exceeded the available dark navbar width. The authentication link overflowed onto the white body background. Its `#cbd5e1` color was intended for the dark `#0f1f35` navbar, where it has strong contrast, but produced only **1.48:1** against white.

### Workaround
No application-level workaround was verified. The link remained operable.

### Resolution
**Fixed.** [views/partials/header.ejs](../../views/partials/header.ejs) assigns a scoped Project-navigation class, and [public/styles/main.css](../../public/styles/main.css) allows that Project navigation to wrap within the navbar and keeps its right alignment.

No global navigation colors, authentication logic, routes, or unrelated layout rules changed.

Post-fix computed contrast:

```text

Normal foreground: #cbd5e1

Background: #0f1f35

Normal contrast: 11.15:1

Hover foreground: #38bdf8

Hover contrast: 7.73:1

```

### Retest Status
**Passed.** The focused DEF-005 retest passed **1/1** in Chromium. The existing P-A11Y-002 scan reported no color-contrast violation for the authentication link, and the then-current complete accessibility project passed **5/5**.

### Notes
- Status is Closed / Fixed / Retest Passed.

- DEF-005 reused P-A11Y-002 and did not increase the unique test-case count.

- The fix and automated result apply to the verified layout and Chromium accessibility scope; they do not establish complete WCAG compliance.

## DEF-006 — Insufficient text contrast on authentication navigation link during keyboard focus
| Field | Value |
| --- | --- |
| Defect ID | DEF-006 |
| Status | Closed |
| Severity | Medium |
| Priority | High |
| Reproduction date | 2026-10-13 |

### Environment
- Current DEF-005-fixed local application at `http\://localhost:3000`.

- Local Windows environment using Playwright Chromium and the dedicated accessibility project.

- Pages: `/`, `/project`, and `/project/automation`.

- Visible link text: **Login** when unauthenticated or **Account** when authenticated.

- Selector used for reproduction: `a[href$="login"]`.

### Preconditions
- The current application is built and running.

- The shared authentication navigation link is visible.

- Keyboard Tab navigation is used to focus the link without mouse hover.

### Steps to Reproduce
1\. Open a fresh unauthenticated page at `/`.

2\. Use keyboard Tab navigation until the **Login** link receives focus.

3\. Confirm the link is focused without applying mouse hover.

4\. Inspect the computed foreground/background colors and run axe while focus is retained.

5\. Repeat on `/project` and `/project/automation`.

6\. Press Enter to confirm the focused link still activates.

### Expected Result
The keyboard-focused authentication navigation text should meet the applicable WCAG AA minimum contrast ratio of **4.5:1** for normal text while retaining a visible focus indication and normal Enter activation.

No standalone accessibility requirement is defined in [REQUIREMENTS.md](REQUIREMENTS.md). The reproduced focused-state contrast result is used as the defect acceptance condition.

### Actual Result
The normal state passed, but keyboard focus and focus-visible changed the text to a nearly black effective color on the dark navbar, producing insufficient contrast on all three inspected pages.

The focus ring remained visible, and Enter activation continued to work. The defect concerned focused text contrast. Focus visibility and link activation continued to work.

### Test Evidence
```text

Pages: /, /project, /project/automation

Visible text: Login / Account

Selector: a[href$="login"]

Normal foreground: #cbd5e1

Normal background: #0f1f35

Normal contrast: 11.15:1 — PASS

Keyboard focus/focus-visible raw CSS color: rgba(0, 0, 0, 0.8)

Effective focused foreground: #03060b

Focused background: #0f1f35

Focused contrast: 1.22:1 — FAIL

Expected minimum: 4.5:1

```

### Affected Functionality
The shared Login/Account navigation link during keyboard focus on `/`, `/project`, and `/project/automation`, in both the unauthenticated Login presentation and the authenticated Account presentation.

### Related Coverage
- [TEST_CASES.md](TEST_CASES.md): **P-A11Y-006**, focused authentication-navigation contrast regression.

- [RTM.md](RTM.md): accessibility traceability records the DEF-006 pre-fix and post-fix results.

- [REQUIREMENTS.md](REQUIREMENTS.md): **REQ-UI-010** provides related authentication-navigation scope only; it does not define a standalone color-contrast requirement.

### Root Cause
Bootstrap 5.3.3 applies:

```css

.nav-link:focus,

.nav-link:hover {

  color: var(--bs-nav-link-hover-color);

}

```

The application already overrode hover color for the portfolio navbar but did not override focus. Bootstrap therefore applied the dark focused text color on the dark navbar. `:focus-visible` resolved to the same insufficient-contrast color.

### Workaround
No application-level workaround was verified. Focus ring and Enter activation remained functional.

### Resolution
**Fixed.** [public/styles/main.css](../../public/styles/main.css) adds a selector scoped to the shared portfolio navbar and authentication link:

```css

.portfolio-navbar .nav-link[href="/auth/login"]:focus,

.portfolio-navbar .nav-link[href="/auth/login"]:focus-visible {

  color: #38bdf8;

}

```

The change preserves the normal and hover colors, Bootstrap focus ring, React Account navigation styling, routing, and authentication behavior.

Post-fix focused contrast is **7.73:1** (`#38bdf8` on `#0f1f35`).

### Retest Status
**Passed.** P-A11Y-006 passed in the focused Chromium retest. The complete accessibility project passed **6/6**, and the final full Playwright run passed **100/100 configured executions** with 0 failed and 0 skipped.

### Notes
- Status is Closed / Fixed / Retest Passed.

- P-A11Y-006 is one new unique accessibility case and increased the Playwright accessibility catalogue from five to six.

- Manual reproduction covered `/`, `/project`, and `/project/automation`; P-A11Y-006 provides the automated focused-state regression on `/project` in Chromium. This does not establish complete accessibility of the React authentication pages or full WCAG compliance.
