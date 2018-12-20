const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

// determines which data of the user object should be stored in the session.
// the result is attached to the session as req.session.passport.user
passport.serializeUser((user, done) => {
  done(null, user.id); // user.id references user._id in mongo
});

// get user object from user session (req.session.passport.user)
// ** user model instance added to the session as req.user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true // trust proxies with https redirects
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // existing user with profile ID
        return done(null, existingUser); // tells passport no errors (null) and returns existingUser
      }
      // otherwise create new user
      const newUser = await new User({ googleId: profile.id }).save();
      done(null, newUser); // tells passport no errors (null) and returns newUser
    }

    // (accessToken, refreshToken, profile, done) => {
    //   User.findOne({ googleId: profile.id }).then(existingUser => {
    //     if (existingUser) {
    //       // existing user with profile ID
    //       done(null, existingUser); // tells passport no errors (null) and returns existingUser
    //     } else {
    //       // otherwise create new user
    //       new User({ googleId: profile.id }).save().then(newUser => {
    //         done(null, newUser); // tells passport no errors (null) and returns newUser
    //       });
    //     }
    //   });
    // }
  )
);
