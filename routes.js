const passport = require("passport");

module.exports = (app) => {
  function ensureAuthenticated(req, res, next) {
    req.isAuthenticated() ? next() : res.redirect("/heartbeat");
  }

  // define the first route
  app.route("/heartbeat").get(function (req, res) {
    res.send("<3");
  });

  app.route("/login").post(
    passport.authenticate("local", {
      successRedirect: "/prototype",
      failureRedirect: "/",
    })
  );

  app.route("/prototype").get(
    (req, res, next) => {
      if (req.isAuthenticated()) {
        console.log("logged in");
        next();
      } else {
        console.log("not logged in");
        res.redirect("/heartbeat");
      }
    }
    //(req, res) => {
    //  res.render("/public/prototype");
    // }
  );

  app.route("/logout").get(function (req, res) {
    req.logout();
    console.log("logout");
    res.redirect("/");
  });

  app.use((req, res, next) => {
    res.status(404).type("text").send("Not Found");
  });
};
