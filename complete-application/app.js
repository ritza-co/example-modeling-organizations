var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require("passport");
var OAuth2Strategy = require("passport-oauth2").Strategy;
var session = require("express-session");
const { ensureLoggedIn } = require('connect-ensure-login');
const dotenv = require('dotenv');
dotenv.config();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var salesRouter = require('./routes/sales');
var billingRouter = require('./routes/billing');
var reportsRouter = require('./routes/reports');
var adminRouter = require('./routes/admin');

const FUSIONAUTH_URL = process.env.FUSIONAUTH_URL;
const FUSIONAUTH_APP_CLIENTID = process.env.FUSIONAUTH_APP_CLIENTID;
const FUSIONAUTH_APP_CLIENT_SECRET = process.env.FUSIONAUTH_APP_CLIENT_SECRET;
const FUSIONAUTH_API_KEY = process.env.FUSIONAUTH_API_KEY;
const FUSIONAUTH_LOGOUT_URL = process.env.FUSIONAUTH_LOGOUT_URL;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: "TOPSECRET" }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  req.logoutURL = FUSIONAUTH_LOGOUT_URL;
  next();
});



passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: `${FUSIONAUTH_URL}/oauth2/authorize`,
      tokenURL: `${FUSIONAUTH_URL}/oauth2/token`,
      clientID: FUSIONAUTH_APP_CLIENTID,
      clientSecret: FUSIONAUTH_APP_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      // Get the user profile from Fusion:
      try {
        const userResponse = await fetch(`${FUSIONAUTH_URL}/api/user`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const user = await userResponse.json();

        // Get the entity grants for the user:
        const grantsResponse = await fetch(`${FUSIONAUTH_URL}/api/entity/grant/search?userId=${user.user.id}`, {
          headers: {
            'Authorization': FUSIONAUTH_API_KEY
          }
        });
        const grants = await grantsResponse.json(); 

        user.grants = grants.grants;
        return cb(null, user);
      } catch (err) {
        console.error(err);
        cb(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  process.nextTick(function () {
    done(null, user);
  });
});

passport.deserializeUser(function (user, done) {
  process.nextTick(function () {
    done(null, user);
  });
});



app.use('/', indexRouter);
app.get("/login", passport.authenticate("oauth2"));
app.get("/auth/callback",
  passport.authenticate("oauth2", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect home.
    req.session.selectedGrant = req.user.grants[0];
    res.redirect("/");
  }
);

app.use('/users', ensureLoggedIn('/login'), usersRouter);
app.use('/sales', ensureLoggedIn('/login'), salesRouter);
app.use('/billing', ensureLoggedIn('/login'), billingRouter);
app.use('/reports', ensureLoggedIn('/login'), reportsRouter);
app.use('/admin', ensureLoggedIn('/login'), adminRouter);

app.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect(302, '/');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
