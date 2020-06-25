// create an express app
const express = require("express");
const passport = require("passport");
const app = express();

function ensureAuthenticated(req, res, next) {
  req.isAuthenticated() ? next() : console.log("redirected");
  res.redirect("/");
}

// use the express-static middleware
app.use(express.static("public"));

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/prototype");
  }
);

app.get("/prototype", ensureAuthenticated, function (req, res) {
  res.send("/public/prototype");
});

// define the first route
app.get("/heartbeat", function (req, res) {
  res.send("<3");
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
