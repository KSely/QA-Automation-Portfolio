# QA Automation Portfolio

A full-stack QA portfolio and test application built to demonstrate practical software testing across the UI, API, database, accessibility, performance, and CI/CD layers.

The application combines a server-rendered portfolio, a React authentication area, a Node.js / Express backend, PostgreSQL, and server-side sessions. It is also used as the Application Under Test (AUT) for separate Selenium, Playwright, and JMeter projects.

## Live Application

[Open Live QA Automation Portfolio](https://qa-automation-portfolio-production.up.railway.app)

[GET /api/status](https://qa-automation-portfolio-production.up.railway.app/api/status)

The application is deployed on Railway with a PostgreSQL database.

---

## Project Overview

The application includes:

- Responsive portfolio pages built with EJS, Bootstrap, HTML, CSS, and JavaScript
- React authentication pages for registration, login, Account, and Admin access
- Node.js / Express backend
- REST APIs
- PostgreSQL persistence
- Server-side session management
- User / Admin role-based authorization
- Contact form validation and persistence
- Jest unit testing
- Selenium, Playwright, and JMeter automation projects
- Accessibility testing with Playwright and axe-core
- QA documentation, traceability, defect tracking, and test reporting
- GitHub Actions CI
- Railway deployment

### Application Flow

```text
EJS Portfolio + React Authentication
                ↓
         Node.js / Express
                ↓
     REST APIs / Sessions / RBAC
                ↓
            PostgreSQL
```

The backend is the security boundary for authentication and authorization. The React route guards provide client-side navigation control, while access to protected resources is enforced by Express middleware.

---

## Automation Coverage

The portfolio currently contains **129 unique automated cases**.

| Project | Unique Cases | Main Coverage |
|---|---:|---|
| Selenium | 42 | UI, API, database |
| Playwright | 52 | UI, API, database, accessibility, authentication |
| Jest | 28 | Contact and authentication validation |
| JMeter | 7 | Performance |
| **Total** | **129** | |

### Playwright

The Playwright framework contains:

- 24 UI cases
- 20 API cases
- 6 accessibility cases
- 2 database cases
- **52 unique cases**

The 24 UI tests run across Chromium, Firefox, and WebKit.

Full configured execution:

```text
24 UI × 3 browsers = 72
6 accessibility     =  6
20 API               = 20
2 database           =  2
────────────────────────
Total                = 100
```

Latest verified local full regression:

```text
100 passed
0 failed
0 skipped
```

Latest accessibility regression:

```text
6 passed
0 failed
0 skipped
```

The latest GitHub Actions Playwright workflow also completed successfully.

---

## Testing Repositories

### Selenium

Java-based automation framework using Selenium WebDriver, TestNG, Maven, REST Assured, JDBC, PostgreSQL, and Allure.

Coverage includes:

- UI testing
- API testing
- Database validation
- Smoke and regression testing
- Cross-browser execution across Chrome, Firefox, and Edge

[QA-Portfolio-Selenium](https://github.com/KSely/QA-Portfolio-Selenium)

### Playwright

JavaScript-based automation framework covering:

- UI and end-to-end testing
- API testing
- Database validation
- Registration, login, logout, and Account workflows
- Guest, user, and admin authorization scenarios
- Session persistence and invalidation
- Cross-browser testing across Chromium, Firefox, and WebKit
- Accessibility testing with axe-core
- Keyboard-focus and Enter activation checks
- Color-contrast regression testing
- Playwright HTML reporting
- GitHub Actions CI

[QA-Portfolio-Playwright](https://github.com/KSely/QA-Portfolio-Playwright)

### JMeter

Performance testing project covering:

- Smoke testing
- Baseline testing
- Load testing
- Stress testing
- Response time
- Percentiles
- Throughput
- Error rate

[QA-Portfolio-Performance](https://github.com/KSely/QA-Portfolio-Performance)

---

## Tech Stack

### Application

- JavaScript
- Node.js
- Express.js
- EJS
- React
- Vite
- Bootstrap 5
- HTML5
- CSS3
- PostgreSQL
- SQL
- `pg`
- `express-session`
- `connect-pg-simple`
- bcrypt
- dotenv

### Testing

- Selenium WebDriver
- Java
- TestNG
- Maven
- Playwright
- JavaScript
- Jest
- axe-core
- REST Assured
- Ajv
- JDBC
- Postman
- Apache JMeter
- Allure

### CI/CD and Tools

- GitHub Actions
- Git
- GitHub
- Visual Studio Code
- IntelliJ IDEA
- Railway

---

## Authentication and Authorization

The React authentication area supports:

- Registration
- Login
- Logout
- Protected Account access
- User / Admin role-based authorization
- Server-side sessions

Public registration creates a standard `user` account.

Passwords are stored as bcrypt hashes. The application stores only the authenticated user ID in the session.

Authentication uses an HttpOnly session cookie with SameSite=Lax. Secure cookies are enabled in production.

The backend endpoints are:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
GET  /api/auth/admin
```

The admin route distinguishes between:

- unauthenticated access
- authenticated standard-user access
- authenticated admin access

For local development and authorization testing, a user's role can be changed with the CLI utility:

```bash
npm run set-role -- user@example.com admin
```

To restore the account:

```bash
npm run set-role -- user@example.com user
```

Role changes are not exposed through the public application API.

---

## Testing Scope

### Unit Testing

Jest covers the pure server-side contact and authentication validation modules.

Current suite:

- 15 contact validation tests
- 13 authentication validation tests
- **28 total**

Coverage includes:

- Required fields
- Empty and whitespace-only input
- Email validation
- Email normalization
- Password complexity
- Password Boundary Value Analysis at 7, 8, 64, and 65 characters
- Password confirmation
- Registration and login validation

`contactValidation.js` has verified 100% statement, branch, function, and line coverage.

No whole-application coverage percentage is claimed.

### UI and Functional Testing

Coverage includes:

- Page content and navigation
- Contact form workflows
- Browser-side validation
- Registration
- Login
- Logout
- Protected Account access
- Guest / user / admin behavior
- Session persistence
- Responsive navigation
- JavaScript error detection
- Regression testing
- Cross-browser execution

### API Testing

Coverage includes:

- `GET /api/status`
- `POST /contact`
- Registration
- Login
- Logout
- Current-user session state
- Admin authorization
- Positive and negative scenarios
- HTTP status codes
- Response validation
- JSON Schema validation where implemented
- Database verification where applicable

### Database Testing

Coverage includes:

- Contact-message persistence
- User creation after registration
- Email normalization
- Default `user` role
- Password-hash verification
- Role updates for authorization scenarios
- Parameterized SQL
- Test-data cleanup
- Session-record cleanup

### Accessibility Testing

Playwright and axe-core are used for automated accessibility checks.

Coverage includes:

- WCAG-oriented full-page scans
- Color contrast
- Accessible names
- Form semantics
- Keyboard focus
- Enter activation
- Contact-form focus order
- Authentication navigation focus state
- Responsive navigation behavior

Current accessibility suite:

```text
6 passed
0 failed
0 skipped
```

Automated checks cover only part of accessibility. Manual testing is still needed for areas such as screen-reader behavior, zoom and reflow, reading order, and broader usability.

### Performance Testing

JMeter coverage includes:

- Smoke
- Baseline
- Load
- Stress
- Response time
- Percentiles
- Throughput
- Error rate

---

## Defect and Regression Examples

The project includes a documented defect lifecycle from reproduction through regression verification.

### DEF-001 — Shared Footer JavaScript Error

A shared JavaScript handler attempted to bind a contact-form listener on pages where the form did not exist.

The issue was reproduced, covered by Playwright, fixed with null-safe event binding, and retested successfully.

### DEF-002 — Contact Form Recovery After Server-Side Rejection

The backend correctly rejected invalid data, but the UI remained disabled in the `Sending...` state.

The issue was reproduced, covered by Playwright, fixed, and regression-tested.

### DEF-003 — Home Page CTA Contrast

axe-core detected that the text on the Home page project-details button did not have enough visual contrast against its background.

WCAG AA requires a contrast ratio of at least **4.5:1** for normal text. The original button contrast was only **2.48:1**, which made the text harder to read.

After the color update:

- Normal state: **5.473:1** — passed
- Hover / focus / active states: **7.584:1** — passed

The fix was retested successfully and the defect is closed.

### DEF-004 — Architecture Label Contrast

axe-core detected that the architecture connector labels on the Project page did not have enough visual contrast against their background.

WCAG AA requires a contrast ratio of at least **4.5:1** for normal text. The original contrast was **4.263:1**, which was slightly below the requirement.

After the text color was updated, the contrast increased to **5.152:1** and passed the accessibility check.

The fix was retested successfully and the defect is closed.

### DEF-005 — Authentication Navigation Contrast

The `Login / Account` link on the Project page extended outside the dark navigation bar and appeared over the white page background.

Because the light-colored link was displayed on a light background, its contrast dropped to only **1.48:1**, making the text difficult to read. WCAG AA requires at least **4.5:1** for normal text.

The responsive navigation layout was updated so the link remains inside the dark navbar.

After the fix:

- Normal state contrast: **11.15:1** — passed
- Hover / interactive state contrast: **7.73:1** — passed

The fix was retested successfully and remains covered by automated Playwright accessibility regression testing.

### DEF-006 — Authentication Link Keyboard-Focus Contrast

When the `Login / Account` link received keyboard focus, Bootstrap applied a very dark text color against the dark navigation background.

This produced a contrast ratio of only **1.22:1**, making the focused link difficult to read. WCAG AA requires at least **4.5:1** for normal text.

A dedicated focus style was added for the authentication link.

After the fix, the focused-state contrast increased to **7.73:1**, and the accessibility test passed.

The defect is closed and remains covered by automated Playwright regression testing.

All six documented defects are closed, and all fixes passed retesting.

---

## QA Documentation

The repository contains a complete QA documentation set:

- [Test Plan](docs/qa/TEST_PLAN.md)
- [Requirements](docs/qa/REQUIREMENTS.md)
- [Test Design](docs/qa/TEST_DESIGN.md)
- [Test Cases](docs/qa/TEST_CASES.md)
- [Requirements Traceability Matrix](docs/qa/RTM.md)
- [Defect Log](docs/qa/DEFECT_LOG.md)
- [Test Summary Report](docs/qa/TEST_SUMMARY_REPORT.md)

The documented catalogue contains **129 unique automated test cases** across Jest, Selenium, Playwright, and JMeter.

The documentation demonstrates:

- Requirements-based testing
- Equivalence Partitioning
- Boundary Value Analysis
- Decision Table Testing
- State Transition Testing
- Use Case Testing
- Error Guessing
- Checklist-Based Testing
- Traceability between requirements, tests, defects, and execution evidence

---

## Project Structure

```text
QA-Automation-Portfolio/
├── .github/
│   └── workflows/
│       └── unit-tests.yml
├── client/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── services/
├── database/
│   ├── initializeDatabase.js
│   ├── pool.js
│   └── schema.sql
├── docs/
│   └── qa/
├── middleware/
│   └── authMiddleware.js
├── public/
│   ├── auth/
│   ├── assets/
│   └── styles/
├── routes/
│   └── authRoutes.js
├── services/
│   └── userService.js
├── tests/
│   └── unit/
│       ├── authValidation.test.js
│       └── contactValidation.test.js
├── utils/
│   ├── authValidation.js
│   └── contactValidation.js
├── views/
│   ├── partials/
│   ├── index.ejs
│   ├── project.ejs
│   └── automation.ejs
├── .env.example
├── index.js
├── package.json
└── README.md
```

---

## Local Setup

### Prerequisites

- Node.js
- npm
- PostgreSQL

Clone the repository:

```bash
git clone https://github.com/KSely/QA-Automation-Portfolio.git
cd QA-Automation-Portfolio
```

Install dependencies:

```bash
npm install
npm --prefix client install
```

Create a `.env` file based on `.env.example`.

Example local configuration:

```env
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=qa_portfolio
DB_PASSWORD=your_password
DB_PORT=5432
SESSION_SECRET=replace_with_a_long_random_secret
```

Build and start the application:

```bash
npm run build
npm start
```

For development:

```bash
npm run dev
```

For separate Express and Vite development servers:

```bash
npm run dev:server
npm run dev:client
```

Run Jest:

```bash
npm test
```

Run Jest coverage:

```bash
npm run test:coverage
```

Local application:

```text
http://localhost:3000
```

---

## Deployment

The production application runs on Railway.

The deployment uses:

- Railway application service
- Railway PostgreSQL
- HTTPS
- Private application-to-database connectivity
- Environment variables for configuration

Required production variables include:

```text
DATABASE_URL
SESSION_SECRET
```

Real credentials and secret values are not committed to GitHub.

---

## Portfolio Purpose

This project was created to demonstrate practical QA and SDET work across:

- Test design
- UI automation
- API testing
- Database validation
- Authentication and authorization testing
- Accessibility testing
- Performance testing
- Cross-browser testing
- Defect investigation
- Regression testing
- Requirements traceability
- QA documentation
- CI/CD
- Cloud deployment

The live application, source code, test automation, and QA documentation are available for review.

No open-source license is currently provided for this repository.
