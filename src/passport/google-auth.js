const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;



const GOOGLE_CLIENT_ID = 'yatusa';
const GOOGLE_CLIENT_SECRET = 'yatusabes';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));