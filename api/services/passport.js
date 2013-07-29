var passport    = require('passport'),
    passwordHash = require('password-hash'),
    LocalStrategy = require('passport-local').Strategy,
    GitHubStrategy = require('passport-github').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy;

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

        var returnInfo = {};

        if (err) {
          returnInfo = { type: 'error', message: 'DB오류입니다. 관리자에게 문의하세요.'};
          return done(err, false, returnInfo);
        }
        if (!user) {
          returnInfo = { type: 'error', message: '사용자가 없습니다.'};
          return done(null, false, returnInfo); 
        }
        console.log('verify:'+password);
        console.log('verify:'+user.password);
        if (passwordHash.verify(password, user.password)) {
          var returnUser = { userName: user.userName, userId: user.userId, id: user.id };
          returnInfo = { type: 'success', message: '정상 로그인 되었습니다.'};
          return done(null, returnUser, returnInfo);
        } else {
          returnInfo = { type: 'error', message: '사용자가 없거나, 패스워드가 맞지 않습니다.'};
          return done(null, false, returnInfo);
        }
      })
    });

  }
));

// var verifyHandler = function (token, tokenSecret, profile, done) {
//     process.nextTick(function () {
//         User.find({twitter:profile.id}, function (err, user) {
//             if (user) {
//                 return done(null, user);
//             } else {
//                 User.create({
//                     provider: profile.provider,
//                     uid: profile.id,
//                     name: profile.displayName
//                 }).done(function (err, user) {
//                         if (err) {
//                             console.log(user);
//                             throw err;
//                         }
//                         return done(null, user);
//                     });
//             }
//         })
//     })
// };


passport.use(new TwitterStrategy({
  consumerKey: oauth.twitter.TWITTER_CONSUMER_KEY,
  consumerSecret: oauth.twitter.TWITTER_CONSUMER_SECRET,
  callbackURL: oauth.twitter.callbackURL
}, function (token, tokenSecret, profile, done) {
    process.nextTick(function () {
      User.findOne({twitterId:profile.username}, function (err, user) {
        if (user) {
          return done(null, user);
        } else {
          User.create({
            twitterId: profile.username,  // id number
            userName: profile.displayName,
            email: profile._json.email,
            photoUrl: profile.photos[0].value
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
}
));

passport.use(new GitHubStrategy({
  clientID: oauth.github.clientID,
  clientSecret: oauth.github.clientSecret,
  callbackURL: oauth.github.callbackURL
}, function (token, tokenSecret, profile, done) {
    process.nextTick(function () {
      User.findOne( { githubId:profile.username }, function (err, user) {
        if (err) {
          console.log('github id findOne error');
          return done(null, user);
        }
        if (user) {
          return done(null, user);
        } else {
          User.create({
            // userId:   profile.username,
            githubId: profile.username, // id - number
            userName: profile.displayName,
            email: profile._json.email,
            photoUrl: profile._json.avatar_url
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