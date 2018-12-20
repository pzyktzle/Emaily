const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

// use body parser to make requests have data accessible on req.body
app.use(bodyParser.json());

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
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // express will serve up production assets
  // like our main.js file, or main.css
  app.use(express.static("client/build"));

  // express will serve the index.html file if it doesn't understand the route (catch all case)
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
