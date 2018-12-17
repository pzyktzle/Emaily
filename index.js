const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

// cookieSession extracts cookie data
// passport then automatically runs deserializeUser() which gives us an authenticated user (req.user)
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // lasts 30 days (declared in ms)
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
