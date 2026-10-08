import bodyParser from "body-parser";
import connectPgSimple from "connect-pg-simple";
import express from "express";
import session from "express-session";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { initializeDatabase } from "./database/initializeDatabase.js";
import { pool } from "./database/pool.js";
import { authRouter } from "./routes/authRoutes.js";
import { validateContactInput } from "./utils/contactValidation.js";

const app = express();
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";
const sessionSecret = process.env.SESSION_SECRET;
const publicDirectory = fileURLToPath(new URL("./public", import.meta.url));
const authIndexFile = path.join(publicDirectory, "auth", "index.html");

if (!sessionSecret) {
  throw new Error("SESSION_SECRET environment variable is required.");
}


// ==================== APPLICATION SETUP ====================

if (isProduction) {
  app.set("trust proxy", 1);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10kb" }));
app.use(express.static(publicDirectory));

const PostgreSqlStore = connectPgSimple(session);

app.use(
  session({
    name: "qa_portfolio.sid",
    store: new PostgreSqlStore({
      pool,
      tableName: "user_sessions",
      createTableIfMissing: true,
    }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);


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

app.use("/api/auth", authRouter);

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
  await pool.query(
    "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)",
    [name, email, message]
  );

  res.json({
    success: true,
    message: "Message sent successfully!"
  });
});


// ==================== REACT AUTHENTICATION SPA ====================

app.get(["/auth", "/auth/{*splat}"], (req, res, next) => {
  res.sendFile(authIndexFile, (error) => {
    if (error) next(error);
  });
});


// ==================== ERROR HANDLING ====================

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON request body.",
    });
  }

  console.error("Request error:", error.message);
  return res.status(500).json({
    success: false,
    message: "An unexpected server error occurred.",
  });
});


// ==================== SERVER ====================

// Initialize PostgreSQL first, then start the application server
initializeDatabase()
  .then(() => {
    console.log("Connected to PostgreSQL and verified the database schema");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("PostgreSQL connection error:", error.message);
    process.exit(1);
  });
