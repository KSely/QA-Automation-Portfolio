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
