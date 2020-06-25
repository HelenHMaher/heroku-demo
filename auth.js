const passport = require("passport");
const LocalStrategy = require("passport-local");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy((username, password, done) => {
      console.log("User " + username + " attempted to log in.");
      if (username !== "admin") {
        return done(null, false);
      }
      if (password !== "password") {
        return done(null, false);
      }
      return done(null, user);
    })
  );
};
