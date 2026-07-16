const express = require("express");

const router = express.Router();

const {
  compareProducts,
} = require("../controllers/comparisonController");

const protect = require("../middleware/authMiddleware");

// Compare Products
router.post("/", protect, compareProducts);

module.exports = router;