const express = require("express");
const dotenv = require("dotenv");

// Load .env FIRST
dotenv.config();

const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const comparisonRoutes = require("./routes/comparisonRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

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