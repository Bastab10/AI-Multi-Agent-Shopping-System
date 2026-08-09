const express = require("express");
const passport = require("passport");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const generateToken = require("../utils/generateToken");

const router = express.Router();

// =========================
// Normal Authentication
// =========================

router.post("/register", registerUser);
router.post("/login", loginUser);

// =========================
// Google Login
// =========================

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// =========================
// Google Callback
// =========================

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect:
      "https://shopintel26.bastabsaikiabs10.workers.dev/login",
    session: false,
  }),
  async (req, res) => {
    try {
      // Generate JWT token
      const token = generateToken(req.user._id);

      // Send only required user information
      const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      };

      // Encode user object for URL
      const encodedUser = encodeURIComponent(JSON.stringify(user));

      // Redirect to frontend
      res.redirect(
        `https://shopintel26.bastabsaikiabs10.workers.dev/auth-success?token=${token}&user=${encodedUser}`
      );
    } catch (err) {
      res.redirect(
        "https://shopintel26.bastabsaikiabs10.workers.dev/login"
      );
    }
  }
);

module.exports = router;