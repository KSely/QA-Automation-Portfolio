# QA Automation Portfolio

A full-stack QA Automation Portfolio application created to showcase my software testing experience, technical skills, and automation projects.

The application also serves as an Application Under Test (AUT) for UI, API, database, and performance testing.

## About the Project

This project combines a professional QA portfolio with a testable full-stack web application.

The application includes:

- Responsive portfolio pages
- QA project and automation documentation
- REST API endpoints
- Contact form with input validation
- PostgreSQL database integration
- UI, API, database, and performance testing

The project is supported by separate Selenium, Playwright, and JMeter repositories that demonstrate different testing approaches and automation frameworks.

### Testing Repositories

- [Selenium Automation](https://github.com/KSely/QA-Portfolio-Selenium) — Java, Selenium WebDriver, REST Assured, JDBC, Allure
- [Playwright Automation](https://github.com/KSely/QA-Portfolio-Playwright) — JavaScript, Playwright, UI, API, database, and cross-browser testing
- [JMeter Performance Testing](https://github.com/KSely/QA-Portfolio-Performance) — baseline, load, stress, and endurance testing

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
- Maven
- Playwright
- JavaScript
- REST Assured
- Postman
- Apache JMeter

### Development Tools

- Visual Studio Code
- IntelliJ IDEA
- Git
- GitHub

## Testing Scope

The portfolio demonstrates testing across multiple application layers and test levels:

- **Functional Testing:** positive and negative scenarios, form validation, smoke, and regression testing
- **UI Testing:** user interface, responsive behavior, and cross-browser compatibility
- **API Testing:** REST endpoint validation, status codes, response bodies, and error handling
- **Database Testing:** PostgreSQL data validation and persistence checks
- **Integration Testing:** validation of data flow between the UI, backend API, and database
- **Performance Testing:** baseline, load, stress, and endurance testing

## Test Automation & Performance Projects

The application is tested through separate automation and performance testing projects.

### Selenium

Java-based test automation framework covering:

- UI testing
- API testing with REST Assured
- Database validation with PostgreSQL and JDBC
- Smoke and regression testing
- Cross-browser testing with Chrome, Firefox, and Edge
- Allure test reporting

### Playwright

JavaScript-based test automation framework covering:

- UI testing
- API testing
- Database validation
- Smoke and regression testing
- Cross-browser testing with Chromium, Firefox, and WebKit
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
- Throughput and error rate analysis

## Project Structure

```text
QA-Automation-Portfolio/
│
├── database/
│   └── schema.sql
│
├── public/
│   ├── assets/
│   │   └── images/
│   │       └── ImageLaptop.png
│   └── styles/
│       └── main.css
│
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
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

## Application Architecture

The portfolio application follows a simple full-stack architecture:

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
The frontend provides the user interface and sends requests to the Express backend. The backend handles application routes, validates submitted data, communicates with PostgreSQL, and returns the appropriate response to the frontend.

The same application is used as the AUT for Selenium, Playwright, API, database, and JMeter performance testing.

## API Endpoints

The application includes REST endpoints used for backend and API testing.

### GET /api/status

Checks whether the backend is running and returns the application status.

Example response:

```json
{
  "status": "ok",
  "message": "QA Automation Portfolio backend is running"
}
```
### POST /contact

Processes contact form submissions.

The endpoint:

- Validates required fields
- Validates the email address format
- Stores valid messages in PostgreSQL
- Returns JSON success or error responses

Example successful response:

```json
{
  "success": true,
  "message": "Message sent successfully!"
}
``` 

## Database

PostgreSQL is used to store messages submitted through the contact form.

The `messages` table contains:

- `id` — unique message identifier
- `name` — sender name
- `email` — sender email address
- `message` — submitted message
- `created_at` — date and time of submission

Database testing verifies that contact form submissions are stored correctly in PostgreSQL. Automated tests validate that the saved name, email, and message values match the submitted data and confirm successful data persistence between the application and database.

## Getting Started

### Prerequisites

Before running the application, make sure the following are installed:

- Node.js
- npm
- PostgreSQL

### Installation

1. Clone the repository:

```bash
git clone https://github.com/KSely/QA-Automation-Portfolio.git
```

2. Navigate to the project directory:

```bash
cd QA-Automation-Portfolio
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file based on `.env.example` and configure your PostgreSQL connection:

```env
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=qa_portfolio
DB_PASSWORD=your_password
DB_PORT=5432
```

5. Create the database table using:

```text
database/schema.sql
```

6. Start the application:

```bash
npm start
```

For development with automatic server restart:

```bash
npm run dev
```

7. Open the application in your browser:

```text
http://localhost:3000
```
## Related Testing Repositories

This application serves as the Application Under Test (AUT) for the following QA projects:

### Selenium Automation

Java-based automation framework covering UI, API, database, regression, smoke, and cross-browser testing.

Repository: https://github.com/KSely/QA-Portfolio-Selenium

### Playwright Automation

JavaScript-based automation framework covering UI, API, database, regression, smoke, and cross-browser testing.

Repository: https://github.com/KSely/QA-Portfolio-Playwright

### JMeter Performance Testing

Apache JMeter project covering baseline, load, stress, and endurance performance testing with response time, percentile, throughput, and error rate analysis.

Repository: https://github.com/KSely/QA-Portfolio-Performance

## Portfolio Use

This project was created for portfolio and demonstration purposes to showcase my software testing and test automation experience.

The source code is publicly available for review by potential employers and recruiters. It is not provided as an open-source project for reuse or redistribution.