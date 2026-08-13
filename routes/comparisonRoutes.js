const express = require("express");

const router = express.Router();

const {
  compareProducts,
} = require("../controllers/comparisonController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, compareProducts);

module.exports = router;