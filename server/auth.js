
require('dotenv').config();
const database = require('../db/index.js');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const whiteList = require('./whiteList.js');

console.log('whiteList is: ', whiteList);

const configAuth = function(app, passport) {

  // these two are needed for sessions (using default storage)
  passport.serializeUser(function(user, done) {
    // user.id is used as a key to store the session
    done(null, user.id);
  });
  passport.deserializeUser(function(googleId, done) {
    database.getUserById(googleId)
      .then(user => done(null, user))
      .catch(err => done(err, null));
  });

  // configure passport to use Google OAuth2
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    }, verifyCallback)
  );

  /**
    * This is the "verify callback" we use with OAuth2 and Google. 
    * See Passport docs for more info: <a href="http://www.passportjs.org/docs/authenticate/">http://www.passportjs.org/docs/authenticate/</a>.
    * @func verifyCallback
    * @param {string} accessToken
    * @param {string} refreshToken
    * @param {profile} object
    * @param {done} function
  */
  function verifyCallback(accessToken, refreshToken, profile, done) {
    // check that user is pre-approved (in our whitelist)
      console.log(profile.id);
    if (!whiteList[profile.id]) { 
      console.log('User not on whitelist!')
      return done(null, false); 
    }
    return database.getUserById(profile.id)
      .then(user => {
        console.log('Got user from db? ', user);
        if (user) { return done(null, user); } 
        return database.saveUser(profile)
          .then(user => {
            console.log('Saved user, will now return: ', user);
            return done(null, user)
          });
      })
      .catch(err => {
        console.log(err);
        return done(err, null);
      });
  }

  // using Google auth requires these two routes
  /*
  This function is required for OAuth2 with Google. 
  Sign-in requests are directed to this endpoint for processing by Google, 
  after which Google redirects the request to the callback endpoint with 
  the logged in user (if the login was successful).
  */
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/plus.login']
    })
  );
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/'
    })
  );

}

module.exports = configAuth;