import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { page: "home" });
});

app.get("/project", (req, res) => {
  res.render("project.ejs", { page: "project" });
});

app.get("/project/automation", (req, res) => {
  res.render("automation.ejs", { page: "automation" });
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    message: "QA Automation Portfolio backend is running"
  });
});

app.post("/contact", async (req, res) => {

  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  if (!name || !email || !message || !name.trim() || !email.trim() || !message.trim()) {
    return res.status(400).json({
      success: false,
      message: "All fields are required."
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
  return res.status(400).json({
    success: false,
    message: "Invalid email address."
  });
}

  console.log("Name: " + name);
  console.log("Email: " + email);
  console.log("Message: " + message);

  await db.query(
    "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)",
    [name, email, message]
  );

  res.json({
    success: true,
    message: "Message sent successfully!"
  });

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});