const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
          // Link Google account if not linked
          if (!user.googleId) {
            user.googleId = profile.id;
            user.provider = "google";
            await user.save();
          }

          return done(null, user);
        }

        // Create new Google user
        user = await User.create({
          name: profile.displayName,
          email,
          password: "",          // Required if password field exists
          googleId: profile.id,
          provider: "google",
        });

        return done(null, user);

      } catch (err) {
        console.error("Google Strategy Error:", err);
        return done(err, null);
      }
    }
  )
);

// Serialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize User
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;