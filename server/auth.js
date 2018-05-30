
require('dotenv').config();
const database = require('../db/helpers.js');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const configAuth = function(app, passport) {

  // these two are needed for sessions (using default storage)
  passport.serializeUser(function(user, done) {
    // user.id is used as a key to store the session
    done(null, user.id);
  });
  passport.deserializeUser(function(googleId, done) {
    database.getUsers(googleId, function(err, user) {
      if (user[0]) { return done(null, user[0]); }
      else if (err) { return done(err, null); }
    });
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
    database.checkWhitelist(profile.id, function(err, user) {
        if (err) { console.log(err); }
        if (!user) { 
          console.log('User not in whitelist!');
          // saveNonUser method used to record login attempts
          database.saveNonUser(profile, (err, result) => {
            if (err) { return done(err, null); }
            // In Passport, this return indicates invalid credentials 
            else { return done(null, false); } 
          });          
          // return done(null, false);
        } else {
          console.log('User in whitelist!');
          // save full profile (this might be user's first login)
          database.saveUser(profile, (err, result) => {
            if (err) { return done(err, null); }
            else { return done(null, result); } 
          });
        }
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
      scope: ['profile', 'email']
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
