// create an express app
const express = require("express");
const passport = require("passport");
const auth = require("./auth.js");
const app = express();

function ensureAuthenticated(req, res, next) {
  req.isAuthenticated() ? next() : console.log("redirected");
  res.redirect("/");
}

// use the express-static middleware
app.use(express.static("public"));

// define the first route
app.get("/heartbeat", function (req, res) {
  res.send("<3");
});

auth(app);

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/prototype");
  }
);

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.get("/prototype", ensureAuthenticated, function (req, res) {
  res.render("/public/prototype");
});

app.use((req, res, next) => {
  res.status(404).type("text").send("Not Found");
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
