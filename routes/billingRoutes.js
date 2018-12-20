const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const passport = require("passport"); // passport puts authenticated user object on req.user
const requireLogin = require("../middleware/requireLogin");

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    // confirm / create final charge
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id // token id provided by stripe for initiating the charge
    });

    req.user.credits += 5;
    const user = await req.user.save(); // can we save User model like this? apparently so!!!!
    res.send(user);
  });
};
