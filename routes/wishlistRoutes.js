const express = require("express");

const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeWishlistItem,
  clearWishlist,
} = require("../controllers/wishlistController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, addToWishlist);
router.get("/", protect, getWishlist);
router.delete("/:id", protect, removeWishlistItem);
router.delete("/", protect, clearWishlist);
router.post("/", protect, addToWishlist);

router.get("/", protect, getWishlist);

router.delete("/:id", protect, removeWishlistItem);

router.delete("/", protect, clearWishlist);

module.exports = router;