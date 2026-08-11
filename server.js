const express = require("express");
const dotenv = require("dotenv");

// Load .env FIRST
dotenv.config();

const cors = require("cors");
const connectDB = require("./config/db");
require("./config/passport");

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const comparisonRoutes = require("./routes/comparisonRoutes");
const passport = require("passport");
const session = require("express-session");

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://shopintel26.bastabsaikiabs10.workers.dev",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_SECRET,

    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/comparison", comparisonRoutes);

app.get("/", (req, res) => {
  res.send("AI Multi Agent Shopping API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
