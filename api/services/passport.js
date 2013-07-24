var passport    = require('passport'),
    passwordHash = require('password-hash'),
    LocalStrategy = require('passport-local').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy;
  // bcrypt      = require('bcrypt');

// helper functions
function findById(id, fn) {
  User.findOne(id).done( function(err, user){
    if (err){
      return fn(null, null);
    }else{
      return fn(null, user);
    }
  });
}

function findByUserId(u, fn) {
  User.findOne({
    userId: u
  }).done(function(err, user) {
    // Error handling
    if (err) {
      return fn(null, null);
    // The User was found successfully!
    }else{
      console.log("The User was found successfully!"+JSON.stringify(user));
      return fn(null, user);
    }
  });
}

// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  // done(null, user.id);
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  // findById(id, function (err, user) {
    done(err, user);
  // });
});


// Use the LocalStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a username and password), and invoke a callback
// with a user object.
passport.use('local', new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // Find the user by username. If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message. Otherwise, return the
      // authenticated `user`.
      findByUserId(username, function(err, user) {
        console.log('findByUserId start');
        if (err) { return done(null, err); }
         console.log('findByUserId start err passed');
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
         console.log('findByUserId start !user passed');
        if (passwordHash.verify(password, user.password)) {
          console.log('findByUserId start verified');
          var returnUser = { username: user.username, createdAt: user.createdAt, id: user.id };
          return done(null, returnUser, { message: 'Logged In Successfully'} );
        } else {
          console.log('findByUserId start invalid password');
          return done(null, false, { message: 'Invalid Password'});
        }

    //     bcrypt.compare(password, user.password, function(err, res) {
    //     if (!res) return done(null, false, { message: 'Invalid Password'});
    //     var returnUser = { username: user.username, createdAt: user.createdAt, id: user.id };
    //     return done(null, returnUser, { message: 'Logged In Successfully'} );
    // });
      })
    });

  }
));

passport.use('twitter', new TwitterStrategy({
  consumerKey: ' ', //local.oauth.twitter.TWITTER_CONSUMER_KEY,
  consumerSecret: ' ', //local.oauth.twitter.TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://localhost:1337/auth/twitter/callback' //local.oauth.twitter.callbackURL
}, function(token, tokenSecret, profile, done) {
    console('hhhhhhhhhhhhhhhhhhhhhhhh');
    return done(null, profile, next);        
}));
