const passport = require("passport");

module.exports = app => {
  // passport authenticates with google
  // in index.js, we set up passport to use session cookies which expire in 30 days
  // this cookie will be passed with every request and we can access the determined user with req.user
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout(); // destroys cookie
    res.redirect("/");
  });

  app.get("/api/current-user", (req, res) => {
    res.send(req.user); // returns user if logged in, otherwise it will return an empty string
  });
};
