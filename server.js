const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

dotenv.config();

// Database
const connectDB = require("./config/db");

// Passport configuration
require("./config/passport");

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const comparisonRoutes = require("./routes/comparisonRoutes");
const chatRoutes = require("./routes/chatRoutes");


// ==========================================
// DATABASE CONNECTION
// ==========================================

connectDB();


// ==========================================
// EXPRESS APP
// ==========================================

const app = express();


// ==========================================
// CORS CONFIGURATION
// ==========================================

const allowedOrigin =
  "https://shopintel26.bastabsaikiabs10.workers.dev";

app.use(
  cors({
    origin: allowedOrigin,

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);


// ==========================================
// BODY PARSER
// ==========================================

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// ==========================================
// SESSION
// ==========================================

app.use(
  session({
    secret: process.env.JWT_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {
      maxAge: 24 * 60 * 60 * 1000,

      httpOnly: true,

      // Required for HTTPS production
      secure: true,

      // Frontend and backend are on different origins
      sameSite: "none",
    },
  })
);


// ==========================================
// PASSPORT
// ==========================================

app.use(passport.initialize());

app.use(passport.session());


// ==========================================
// API ROUTES
// ==========================================

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.use("/api/comparison", comparisonRoutes);

app.use("/api/chat", chatRoutes);


// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/", (req, res) => {
  res.status(200).send(
    "AI Multi Agent Shopping API Running..."
  );
});


// ==========================================
// 404 HANDLER
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});


// ==========================================
// ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message:
      err.message || "Internal Server Error",
  });
});


// ==========================================
// START SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Server running on port ${PORT}`
  );
});