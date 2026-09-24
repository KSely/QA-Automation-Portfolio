import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;


// ==================== DATABASE CONNECTION ====================

// Connect to PostgreSQL using environment variables (Database Configuration)
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect();


// ==================== APPLICATION SETUP ====================

// Handle form data and public files (Middleware Configuration)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// ==================== PAGE ROUTES ====================

// Set up the main portfolio pages (Page Routes)
app.get("/", (req, res) => {
  res.render("index.ejs", { page: "home" });
});

app.get("/project", (req, res) => {
  res.render("project.ejs", { page: "project" });
});

app.get("/project/automation", (req, res) => {
  res.render("automation.ejs", { page: "automation" });
});


// ==================== API ROUTES ====================

// Check that the backend is running (Status Endpoint)
app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    message: "QA Automation Portfolio backend is running"
  });
});


// ==================== CONTACT FORM ====================

// Handle contact form submissions (POST Request)
app.post("/contact", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  // Make sure all required fields are filled in (Input Validation)
  if (!name || !email || !message || !name.trim() || !email.trim() || !message.trim()) {
    return res.status(400).json({
      success: false,
      message: "All fields are required."
    });
  }

  // Check the email address format (Email Validation)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address."
    });
  }

  console.log("Name: " + name);
  console.log("Email: " + email);
  console.log("Message: " + message);

  // Save the submitted message to PostgreSQL (Database Insert)
  await db.query(
    "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)",
    [name, email, message]
  );

  res.json({
    success: true,
    message: "Message sent successfully!"
  });
});


// ==================== SERVER ====================

// Start the application server (Server Startup)
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});