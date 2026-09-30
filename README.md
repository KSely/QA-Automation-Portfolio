# QA Automation Portfolio

A full-stack QA Automation Portfolio application created to showcase my software testing experience, technical skills, and automation projects.

The application also serves as an Application Under Test (AUT) for UI, API, database, integration, regression, cross-browser, and performance testing.

---

## About the Project

This project combines a professional QA portfolio with a testable full-stack web application.

The application includes:

- Responsive portfolio pages
- QA project and automation documentation
- REST API endpoints
- Contact form with input validation
- PostgreSQL database integration
- UI, API, database, integration, and performance testing
- Defect investigation and regression testing
- Requirements traceability and test reporting

The project is supported by separate Selenium, Playwright, and JMeter repositories that demonstrate different testing approaches and automation frameworks.

---

## Testing Repositories

### Selenium Automation

Java-based automation framework using:

- Java
- Selenium WebDriver
- TestNG
- Maven
- REST Assured
- JDBC
- PostgreSQL
- Allure

Repository: [QA-Portfolio-Selenium](https://github.com/KSely/QA-Portfolio-Selenium)

### Playwright Automation

JavaScript-based automation framework using:

- Playwright
- JavaScript
- UI testing
- API testing
- Database validation
- Regression testing
- Cross-browser testing

Repository: [QA-Portfolio-Playwright](https://github.com/KSely/QA-Portfolio-Playwright)

### JMeter Performance Testing

Apache JMeter performance testing project covering:

- Smoke testing
- Baseline testing
- Load testing
- Stress testing
- Endurance testing
- Response time analysis
- Percentile analysis
- Throughput analysis
- Error rate analysis

Repository: [QA-Portfolio-Performance](https://github.com/KSely/QA-Portfolio-Performance)

---

## Technologies Used

### Frontend

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- EJS
- Responsive Web Design

### Backend

- Node.js
- Express.js
- REST API
- dotenv

### Database

- PostgreSQL
- SQL

### Testing & Automation

- Selenium WebDriver
- Java
- TestNG
- Maven
- Playwright
- JavaScript
- REST Assured
- JDBC
- Postman
- Apache JMeter
- Allure

### Development Tools

- Visual Studio Code
- IntelliJ IDEA
- Git
- GitHub
- GitHub Actions

---

## Testing Scope

The portfolio demonstrates testing across multiple application layers and test levels.

### Functional Testing

Covers:

- Positive scenarios
- Negative scenarios
- Form validation
- Application workflows
- Smoke testing
- Regression testing

### UI Testing

Covers:

- User interface behavior
- Navigation
- Form interactions
- Responsive behavior
- Browser-side validation
- JavaScript error detection
- Cross-browser compatibility

### API Testing

Covers:

- REST endpoint validation
- HTTP status codes
- Response bodies
- Positive and negative scenarios
- Validation behavior
- Error responses

### Database Testing

Covers:

- PostgreSQL persistence validation
- Data verification
- Database schema expectations
- Contact form persistence
- Verification that rejected submissions are not stored

### Integration Testing

Validates data flow between:

- Browser UI
- Express backend
- REST endpoints
- PostgreSQL database

### Performance Testing

Covers:

- Smoke performance testing
- Baseline testing
- Load testing
- Stress testing
- Endurance testing
- Response time
- Percentiles
- Throughput
- Error rate

---

## QA Documentation

The repository includes a structured QA documentation set created from the implemented application behavior and completed verification cycles.

### [Test Plan](docs/qa/TEST_PLAN.md)

Defines:

- Testing scope
- Test strategy
- Test levels and types
- Risks
- Priorities
- Entry criteria
- Exit criteria
- Suspension and resumption criteria
- Environments
- Test deliverables
- Reporting approach

### [Requirements](docs/qa/REQUIREMENTS.md)

Documents source-derived application and verification requirements covering:

- User interface
- Navigation
- Contact form
- API
- Database
- Automation
- Verification expectations

### [Test Design](docs/qa/TEST_DESIGN.md)

Documents test design approaches and techniques including:

- Equivalence Partitioning
- Boundary Value Analysis
- Decision Table Testing
- State Transition Testing
- Use Case Testing
- Error Guessing
- Checklist-Based Testing

### [Test Cases](docs/qa/TEST_CASES.md)

Provides a consolidated test catalogue covering:

- Selenium UI testing
- Selenium API testing
- Selenium database testing
- Playwright UI testing
- Playwright API testing
- Playwright database testing
- JMeter performance testing

### [Requirements Traceability Matrix](docs/qa/RTM.md)

Maps:

- Requirements
- Test coverage
- Test execution evidence
- Defects
- Verification results

### [Defect Log](docs/qa/DEFECT_LOG.md)

Documents:

- Defect reproduction
- Severity and priority
- Expected and actual results
- Root-cause observations
- Regression coverage
- Fixes
- Retest results
- Remaining limitations

### [Test Summary Report](docs/qa/TEST_SUMMARY_REPORT.md)

Summarizes completed verification cycles including:

- Test execution results
- Defect verification
- Regression results
- Scope limitations
- Remaining coverage gaps

---

## Defect & Regression Workflow

The project includes documented defect lifecycles demonstrating a test-first regression workflow.

### DEF-001 — Shared Footer JavaScript Error

A shared JavaScript handler attempted to attach a contact-form event listener on pages where the contact form was not present.

The issue was:

1. Identified during source review
2. Reproduced in the browser
3. Logged as a confirmed defect
4. Covered with Playwright regression tests
5. Reproduced automatically as a pre-fix failure
6. Fixed using null-safe event binding
7. Retested successfully
8. Verified through broader Chromium regression testing
9. Documented in the defect log, RTM, test design, requirements, test cases, test plan, and test summary report

### DEF-002 — Contact Form Recovery After Server-Side Rejection

A server-side validation rejection returned:

```json
{
  "success": false,
  "message": "All fields are required."
}
```

The backend correctly rejected invalid data, but the UI remained disabled in the `Sending...` state.

The issue was:

1. Reproduced using browser-valid input that failed server-side validation
2. Logged as a confirmed defect
3. Covered with a focused Playwright regression test
4. Confirmed through a pre-fix automated failure
5. Fixed by restoring the submit button after a valid JSON response
6. Retested successfully
7. Verified against the existing successful contact submission flow
8. Verified through broader Chromium UI regression testing
9. Documented through the QA reporting and traceability workflow

The defect workflow demonstrates:

**Identify → Reproduce → Document → Automate → Fail → Fix → Retest → Regression → Report**

---

## Test Automation & Performance Projects

The application is tested through separate automation and performance testing projects.

### Selenium

Java-based automation framework covering:

- UI testing
- API testing with REST Assured
- Database validation with PostgreSQL and JDBC
- Smoke testing
- Regression testing
- Cross-browser test configuration for Chrome, Firefox, and Edge
- Allure test reporting

### Playwright

JavaScript-based automation framework covering:

- UI testing
- API testing
- Database validation
- Smoke testing
- Regression testing
- Defect regression coverage
- Cross-browser test configuration for Chromium, Firefox, and WebKit
- Playwright HTML reporting

### JMeter

Apache JMeter performance testing project covering:

- Smoke testing
- Baseline testing
- Load testing
- Stress testing
- Endurance testing
- Response time analysis
- Percentile analysis
- Throughput analysis
- Error rate analysis

---

## Project Structure

```text
QA-Automation-Portfolio/
│
├── database/
│   └── schema.sql
│
├── docs/
│   └── qa/
│       ├── DEFECT_LOG.md
│       ├── REQUIREMENTS.md
│       ├── RTM.md
│       ├── TEST_CASES.md
│       ├── TEST_DESIGN.md
│       ├── TEST_PLAN.md
│       └── TEST_SUMMARY_REPORT.md
│
├── public/
│   ├── assets/
│   │   └── images/
│   │       └── ImageLaptop.png
│   │
│   └── styles/
│       └── main.css
│
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   │
│   ├── index.ejs
│   ├── project.ejs
│   └── automation.ejs
│
├── .env.example
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

---

## Application Architecture

The portfolio application follows a simple server-rendered full-stack architecture.

```text
User Interface
      ↓
EJS / Bootstrap / JavaScript
      ↓
Node.js / Express
      ↓
Routes / REST API / Server-Side Validation
      ↓
PostgreSQL Database
```

The frontend provides the user interface and sends requests to the Express backend.

The backend:

- Handles application routes
- Provides REST API endpoints
- Performs server-side validation
- Communicates with PostgreSQL
- Returns JSON responses to the frontend

The same application is used as the Application Under Test for Selenium, Playwright, API, database, integration, and JMeter performance testing.

---

## API Endpoints

The application includes REST endpoints used for backend and API testing.

### GET `/api/status`

Checks whether the backend is running and returns the application status.

Example response:

```json
{
  "status": "ok",
  "message": "QA Automation Portfolio backend is running"
}
```

### POST `/contact`

Processes contact form submissions.

The endpoint:

- Validates required fields
- Validates the email address format
- Stores valid messages in PostgreSQL
- Rejects invalid submissions
- Returns JSON success or error responses

Example successful response:

```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

Example validation rejection:

```json
{
  "success": false,
  "message": "All fields are required."
}
```

---

## Database

PostgreSQL is used to store messages submitted through the contact form.

The `messages` table contains:

- `id` — unique message identifier
- `name` — sender name
- `email` — sender email address
- `message` — submitted message
- `created_at` — date and time of submission

Database testing verifies that:

- Valid contact form submissions are stored correctly
- Saved values match submitted values
- Data persists successfully between the application and PostgreSQL
- Rejected submissions do not create unexpected database records

---

## Getting Started

### Prerequisites

Before running the application, make sure the following are installed:

- Node.js
- npm
- PostgreSQL

### Installation

Clone the repository:

```bash
git clone https://github.com/KSely/QA-Automation-Portfolio.git
```

Navigate to the project directory:

```bash
cd QA-Automation-Portfolio
```

Install dependencies:

```bash
npm install
```

Create a `.env` file based on `.env.example` and configure your PostgreSQL connection:

```env
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=qa_portfolio
DB_PASSWORD=your_password
DB_PORT=5432
```

Create the database table using:

```text
database/schema.sql
```

Start the application:

```bash
npm start
```

For development with automatic server restart:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

---

## Related Testing Repositories

This application serves as the Application Under Test (AUT) for the following QA projects:

### Selenium Automation

Java-based automation framework covering UI, API, database, regression, smoke, and cross-browser testing.

Repository: [QA-Portfolio-Selenium](https://github.com/KSely/QA-Portfolio-Selenium)

### Playwright Automation

JavaScript-based automation framework covering UI, API, database, regression, smoke, defect regression, and cross-browser testing.

Repository: [QA-Portfolio-Playwright](https://github.com/KSely/QA-Portfolio-Playwright)

### JMeter Performance Testing

Apache JMeter project covering baseline, load, stress, and endurance performance testing with response time, percentile, throughput, and error rate analysis.

Repository: [QA-Portfolio-Performance](https://github.com/KSely/QA-Portfolio-Performance)

---

## Portfolio Use

This project was created for portfolio and demonstration purposes to showcase my experience in:

- Software testing
- QA automation
- Test design
- UI testing
- API testing
- Database testing
- Integration testing
- Performance testing
- Defect investigation
- Regression testing
- Requirements traceability
- QA documentation
- Test reporting

The source code and QA documentation are publicly available for review by potential employers and recruiters.

No open-source license is currently provided for this repository.