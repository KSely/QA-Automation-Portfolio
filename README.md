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

## Live Application

The deployed application is available at:

[Open Live QA Automation Portfolio](https://qa-automation-portfolio-production.up.railway.app)

### Application Status API

[GET /api/status](https://qa-automation-portfolio-production.up.railway.app/api/status)

The application is deployed on Railway and connected to a cloud PostgreSQL database.

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

Repository:

[QA-Portfolio-Selenium](https://github.com/KSely/QA-Portfolio-Selenium)

---

### Playwright Automation

JavaScript-based automation framework using:

- Playwright
- JavaScript
- UI testing
- API testing
- Database validation
- Regression testing
- Cross-browser testing

Repository:

[QA-Portfolio-Playwright](https://github.com/KSely/QA-Portfolio-Playwright)

---

### JMeter Performance Testing

Apache JMeter performance testing project covering:

- Smoke testing
- Baseline testing
- Load testing
- Stress testing
- Response time analysis
- Percentile analysis
- Throughput analysis
- Error rate analysis

Repository:

[QA-Portfolio-Performance](https://github.com/KSely/QA-Portfolio-Performance)

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

### Deployment

- Railway
- Railway PostgreSQL

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
- Response time
- Percentiles
- Throughput
- Error rate

---

## QA Documentation

The repository includes a structured QA documentation set created from the implemented application behavior and completed verification cycles.

### Test Plan

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

### Requirements

Documents source-derived application and verification requirements covering:

- User interface
- Navigation
- Contact form
- API
- Database
- Automation
- Verification expectations

### Test Design

Documents test design approaches and techniques including:

- Equivalence Partitioning
- Boundary Value Analysis
- Decision Table Testing
- State Transition Testing
- Use Case Testing
- Error Guessing
- Checklist-Based Testing

### Test Cases

Provides a consolidated test catalogue covering:

- Selenium UI testing
- Selenium API testing
- Selenium database testing
- Playwright UI testing
- Playwright API testing
- Playwright database testing
- JMeter performance testing

### Requirements Traceability Matrix

Maps:

- Requirements
- Test coverage
- Test execution evidence
- Defects
- Verification results

### Defect Log

Documents:

- Defect reproduction
- Severity and priority
- Expected and actual results
- Root-cause observations
- Regression coverage
- Fixes
- Retest results
- Remaining limitations

### Test Summary Report

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

- Identified during source review
- Reproduced in the browser
- Logged as a confirmed defect
- Covered with Playwright regression tests
- Reproduced automatically as a pre-fix failure
- Fixed using null-safe event binding
- Retested successfully
- Verified through broader Chromium regression testing
- Documented in the defect log, RTM, test design, requirements, test cases, test plan, and test summary report

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

- Reproduced using browser-valid input that failed server-side validation
- Logged as a confirmed defect
- Covered with a focused Playwright regression test
- Confirmed through a pre-fix automated failure
- Fixed by restoring the submit button after a valid JSON response
- Retested successfully
- Verified against the existing successful contact submission flow
- Verified through broader Chromium UI regression testing
- Documented through the QA reporting and traceability workflow

The defect workflow demonstrates:

```text
Identify
   ↓
Reproduce
   ↓
Document
   ↓
Automate
   ↓
Fail
   ↓
Fix
   ↓
Retest
   ↓
Regression
   ↓
Report
```

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
- Cross-browser execution across Chrome, Firefox, and Edge
- Allure test reporting

The Selenium framework includes a dedicated cross-browser suite that executes the UI regression coverage across all three supported browsers.

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

### `GET /api/status`

Checks whether the backend is running and returns the application status.

Example response:

```json
{
  "status": "ok",
  "message": "QA Automation Portfolio backend is running"
}
```

### `POST /contact`

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

Contact form submissions from the deployed application are stored in the Railway PostgreSQL database.

The `messages` table contains:

- `id` — unique message identifier
- `name` — sender name
- `email` — sender email address
- `message` — submitted message
- `created_at` — date and time of submission

The deployed Railway database stores `created_at` as a timezone-aware PostgreSQL timestamp (`TIMESTAMPTZ`).

Database testing verifies that:

- Valid contact form submissions are stored correctly
- Saved values match submitted values
- Data persists successfully between the application and PostgreSQL
- Rejected submissions do not create unexpected database records

---

## Cloud Deployment

The application is deployed on Railway.

The cloud deployment includes:

- Node.js / Express application service
- Railway PostgreSQL database
- Public HTTPS domain
- Environment-variable-based database configuration
- Private application-to-database connectivity

The deployed application uses:

```env
DATABASE_URL=postgresql://user:password@host:port/database
```

The actual database credentials are stored securely in Railway environment variables and are not committed to GitHub.

The application also reads the Railway-provided `PORT` environment variable:

```text
process.env.PORT
```

while continuing to use port `3000` for local development.

---

## Getting Started

### Prerequisites

Before running the application locally, make sure the following are installed:

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

Create a `.env` file based on `.env.example`.

For local PostgreSQL:

```env
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=qa_portfolio
DB_PASSWORD=your_password
DB_PORT=5432
```

For cloud PostgreSQL deployment, the application also supports:

```env
DATABASE_URL=postgresql://user:password@host:port/database
```

The Railway deployment uses `DATABASE_URL` to connect the application to its cloud PostgreSQL database.

Create the local database table using:

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

## Local and Cloud Environments

### Local Environment

```text
Browser
   ↓
Node.js / Express
   ↓
Local PostgreSQL
```

Local database configuration uses:

```text
DB_USER
DB_HOST
DB_DATABASE
DB_PASSWORD
DB_PORT
```

### Railway Cloud Environment

```text
Public Browser
   ↓
Railway HTTPS Domain
   ↓
Node.js / Express
   ↓
Railway Private Network
   ↓
Railway PostgreSQL
```

Cloud database configuration uses:

```text
DATABASE_URL
```

This allows the same application codebase to support both local development and cloud deployment.

---

## Related Testing Repositories

This application serves as the Application Under Test (AUT) for the following QA projects.

### Selenium Automation

Java-based automation framework covering UI, API, database, regression, smoke, and cross-browser testing.

[QA-Portfolio-Selenium](https://github.com/KSely/QA-Portfolio-Selenium)

### Playwright Automation

JavaScript-based automation framework covering UI, API, database, regression, smoke, defect regression, and cross-browser testing.

[QA-Portfolio-Playwright](https://github.com/KSely/QA-Portfolio-Playwright)

### JMeter Performance Testing

Apache JMeter project covering baseline, load, and stress performance testing with response time, percentile, throughput, and error rate analysis.

[QA-Portfolio-Performance](https://github.com/KSely/QA-Portfolio-Performance)

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
- CI/CD
- Cloud deployment

The source code and QA documentation are publicly available for review by potential employers and recruiters.

The live application is also publicly available through Railway:

[Open Live QA Automation Portfolio](https://qa-automation-portfolio-production.up.railway.app)

No open-source license is currently provided for this repository.