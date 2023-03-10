const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

// Configure Passport to use FacebookStrategy
passport.use(new FacebookStrategy({
    clientID: 'your_app_id',
    clientSecret: 'your_app_secret',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email']
}, function(accessToken, refreshToken, profile, done) {
    // This function is called when the user is authenticated via Facebook
    // You can save user details to a database, and return the user object to be stored in the session
    done(null, profile);
}));

// Define the route handler for the Facebook login
exports.facebookLogin = passport.authenticate('facebook', { scope: ['email'] });

// Define the route handler for the Facebook callback URL
exports.facebookCallback = passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
});
