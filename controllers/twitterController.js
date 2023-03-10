const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

// Configure Passport to use TwitterStrategy
passport.use(new TwitterStrategy({
    consumerKey: 'your_consumer_key',
    consumerSecret: 'your_consumer_secret',
    callbackURL: 'http://localhost:3000/auth/twitter/callback',
}, function(token, tokenSecret, profile, done) {
    // This function is called when the user is authenticated via Twitter
    // You can save user details to a database, and return the user object to be stored in the session
    done(null, profile);
}));

// Define the route handler for the Twitter login
exports.twitterLogin = passport.authenticate('twitter');

// Define the route handler for the Twitter callback URL
exports.twitterCallback = passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
});
