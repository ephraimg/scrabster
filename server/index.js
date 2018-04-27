
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const configAuth = require('./auth.js');
const session = require('express-session');
const passport = require('passport');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

configAuth(app, passport);

app.get('/user', (req, res) => {
    let user = {};
    // If user is logged in, send the user info back to the client
    if (req.isAuthenticated()) { user = req.user; }
    res.send(user);
});

// logout route added to work with passport
app.get('/signout', function (req, res) {
  req.logout();
  res.clearCookie('connect.sid');
  res.redirect('/');
  // req.session.destroy(function (err) {
  //   res.redirect('/home');
  // });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
