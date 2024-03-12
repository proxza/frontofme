const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serving static files from 'public' directory
app.use(express.static(path.join(__dirname, "..", "public")));

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: "your_secret_key", // Replace 'your_secret_key' with a real secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true when running over HTTPS
  })
);

// Database file path
const DB_FILE = path.join(__dirname, "..", "db", "posts.json");

// Read and write utility functions for the JSON database
const readDB = () => {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  } catch (error) {
    console.error("Error reading database file:", error);
    return [];
  }
};

const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing to database file:", error);
  }
};

// Authentication check middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.status(401).send("Not authenticated");
  }
};

// Routes
// Login endpoint
app.post("/login", (req, res) => {
  // Placeholder for authentication logic
  const { username, password } = req.body;
  if (username === "admin" && password === "password") {
    req.session.isAuthenticated = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Logout endpoint
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// Get posts with pagination
app.get("/posts", isAuthenticated, (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const posts = readDB();
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  res.json({
    currentPage: parseInt(page),
    totalPosts: posts.length,
    totalPages: Math.ceil(posts.length / limit),
    posts: posts.slice(startIndex, endIndex),
  });
});

// Create a new post
app.post("/posts", isAuthenticated, (req, res) => {
  const posts = readDB();
  const newPost = { id: Date.now().toString(), ...req.body };
  posts.unshift(newPost);
  writeDB(posts);
  res.status(201).json(newPost);
});

// Update a post
app.put("/posts/:id", isAuthenticated, (req, res) => {
  let posts = readDB();
  const index = posts.findIndex((post) => post.id === req.params.id);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...req.body };
    writeDB(posts);
    res.json(posts[index]);
  } else {
    res.status(404).send("Post not found");
  }
});

// Delete a post
app.delete("/posts/:id", isAuthenticated, (req, res) => {
  let posts = readDB();
  const filteredPosts = posts.filter((post) => post.id !== req.params.id);
  writeDB(filteredPosts);
  res.json({ success: true });
});

// Serve index.html for any other GET request
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
