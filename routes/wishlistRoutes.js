const express = require("express");

const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeWishlistItem,
  clearWishlist,
} = require("../controllers/wishlistController");

const protect = require("../middleware/authMiddleware");

// Add Product
router.post("/", protect, addToWishlist);

// Get Wishlist
router.get("/", protect, getWishlist);

// Remove One Product
router.delete("/:id", protect, removeWishlistItem);

// Clear Wishlist
router.delete("/", protect, clearWishlist);

module.exports = router;