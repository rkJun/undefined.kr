var passport    = require('passport'),
    passwordHash = require('password-hash'),
    LocalStrategy = require('passport-local').Strategy,
    GitHubStrategy = require('passport-github').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy;
  // bcrypt      = require('bcrypt');
var oauth = require('../../config/local').oauth;

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
  findById(id, function (err, user) {
    done(err, user);
  });
});


// Use the LocalStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a username and password), and invoke a callback
// with a user object.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // Find the user by username. If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message. Otherwise, return the
      // authenticated `user`.
      findByUserId(username, function(err, user) {
        if (err) {
          return done(null, err);
        }
        if (!user) {
          return done(null, false, { message: 'Unknown user ' + username }); 
        }
        if (passwordHash.verify(password, user.password)) {
          var returnUser = { userName: user.userName, userId: user.userId, id: user.id };
          return done(null, returnUser, { message: 'Logged In Successfully'} );
        } else {
          return done(null, false, { message: 'Invalid Password'});
        }
      })
    });

  }
));

var verifyHandler = function (token, tokenSecret, profile, done) {
    process.nextTick(function () {
        User.find({uid:profile.id}, function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                User.create({
                    provider: profile.provider,
                    uid: profile.id,
                    name: profile.displayName
                }).done(function (err, user) {
                        if (err) {
                            console.log(user);
                            throw err;
                        }
                        return done(null, user);
                    });
            }
        })
    })
};


passport.use(new TwitterStrategy({
  consumerKey: ' ', //local.oauth.twitter.TWITTER_CONSUMER_KEY,
  consumerSecret: ' ', //local.oauth.twitter.TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://localhost:1337/auth/twitter/callback' //local.oauth.twitter.callbackURL
}, verifyHandler
));

passport.use(new GitHubStrategy({
  clientID: oauth.github.clientID,
  clientSecret: oauth.github.clientSecret,
  callbackURL: oauth.github.callbackURL
}, function (token, tokenSecret, profile, done) {
    process.nextTick(function () {
      User.find({githubId:profile.id}, function (err, user) {
        if (user) {
          return done(null, user);
        } else {
          User.create({
            provider: profile.provider,
            githubId: profile.id,
            userName: profile.displayName
          }).done(function (err, user) {
            if (err) {
                console.log(user);
                throw err;
            }
            return done(null, user);
          });
        }
      })
    })
}));
