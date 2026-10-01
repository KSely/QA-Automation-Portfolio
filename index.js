import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import { validateContactInput } from "./utils/contactValidation.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


// ==================== DATABASE CONNECTION ====================

const db = new pg.Client(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
      }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
      }
);


// ==================== APPLICATION SETUP ====================

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

  const validation = validateContactInput(name, email, message);

  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: validation.message
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

// Connect to PostgreSQL first, then start the application server
db.connect()
  .then(() => {
    console.log("Connected to PostgreSQL");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("PostgreSQL connection error:", error);
    process.exit(1);
  });
