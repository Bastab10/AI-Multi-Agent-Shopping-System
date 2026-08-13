const express = require("express");
const passport = require("passport");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const generateToken = require("../utils/generateToken");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://shopintel26.bastabsaikiabs10.workers.dev/login",
    session: false,
  }),
  async (req, res) => {
    try {
      const token = generateToken(req.user._id);

      const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      };

      const encodedUser = encodeURIComponent(JSON.stringify(user));

      res.redirect(
        `https://shopintel26.bastabsaikiabs10.workers.dev/auth-success?token=${token}&user=${encodedUser}`
      );
    } catch (err) {
      res.redirect("https://shopintel26.bastabsaikiabs10.workers.dev/login");
    }
  }
);

module.exports = router;