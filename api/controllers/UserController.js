/**
 * UserController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */
var check = require('validator').check;
var passport = require('passport');
var bcrypt = require('bcrypt');

var resultJson = {
  type: '',
  message: '',
  json: {}
};

module.exports = {

  signup: function(req, res) {
    return res.view();
  },
  create: function(req, res) {

    var user = {};
    var passwordHash = require('password-hash');

    user.userId = req.param('userId');
    user.userName = req.param('userName');
    //user.password = passwordHash.generate(req.param('password')); // hashedPassword
    user.password = req.param('password');
    user.email = req.param('email');
    user.birthDate = req.param('birthDate');
    user.ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

    try {
      check(user.userId, '아이디는 최소 5자리, 최대 20자리입니다.').len(5,20);
      check(user.userName, '사용자명은 최소 3자리, 최대 30자리입니다.').len(3,30);
      check(req.param('password'), '비밀번호는 최소 8자리, 최대 30자리입니다.').len(8,30);
      check(user.email, { len: '이메일주소는 최소 6자리, 최대 64자리입니다.', isEmail: '이메일 형식이 맞지 않습니다.'}).len(6,64).isEmail();
      // check(user.birthDate, '날짜 형식이 맞지 않습니다.').isDate();
    } catch (e) {
      console.log('error:'+e.message);
      //return res.view('user/signup', { errors: { type: 'error', message: e.message } } );
      resultJson.type = 'error';
      resultJson.message = e.message;
      return res.json(resultJson);
    }

    User.findOne({ userId: user.userId }, function(err, existUser) {
      // Error handling
      if (err) {
        console.log(err);
        // return res.view('500', { errors: {error:'DB Error'} });
        resultJson.type = 'error';
        resultJson.message = 'DB Error';
        return res.json(resultJson);
      }else {
        if(existUser) {
          console.log("동일 아이디가 존재합니다.:"+existUser);
          resultJson.type = 'error';
          resultJson.message = "동일 아이디가 존재합니다.";
          return res.json(resultJson);
          // return res.view('user/signup', { errors: { type: 'error', message: message } } );
        } else {
          console.log("callBackCreate");

          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
              if (err) {
                console.log(err);
              }else {
                console.log('hash::::'+hash);
                user.password = hash;
                callBackCreate(user);
              }
            })
          });

          
        }
      }
    });

    var callBackCreate = function(user) {
      User.create(
        user
      ).done(function(err, user) {
          // Error handling
          if (err) {
            console.log(err);
            // return res.view('500', { errors: {error:'DB Error'} });
            resultJson.type = 'error';
            resultJson.message = 'DB Error';
            return res.json(resultJson);
          }else {
            console.log('User created:', user);

            req.logIn(user, function(err){
              if(err) {
                resultJson.type = 'error';
                resultJson.message = 'DB Error';
                return res.json(resultJson);
              }

               // var returnUser = { userName: user.userName, userId: user.userId, id: user.id };
               return res.json( {type: "success", message : "정상등록했습니다." , user: user });
             });

            //return res.json( {type: "success", message : "정상등록했습니다." , user: user });
            //return res.redirect('/');
          }
      });
    }; //end of Callback
  },
  find: function(req, res) {
    User.findOne( {userId: req.param('userId')} ).done(function (err, user) {
        if (err) {
          return console.log(err);
            //res.send(500, { error: 'DB Error' });
        }else {
          console.log('User find:', user);
        }
      res.json(user);
    });
  },
  update: function(req, res) {

    /**
     * v0.1 Password Change 기능만 구현
     */
    var user = {};
    var passwordHash = require('password-hash');

    user.userId = req.param('id');


    user.password = passwordHash.generate(req.param('password')); // hashedPassword

    try {
      //check(user.userId, '아이디는 최소 5자리, 최대 20자리입니다.').len(5,20);
      check(req.param('password'), '비밀번호는 최소 8자리, 최대 30자리입니다.').len(8,30);
    } catch (e) {
      console.log('error:'+e.message);
      return res.view('user/signup', { errors: { type: 'error', message: e.message }} );
    }

    User.update( {userId: user.userId}, { pasword: user.password },
      function (err, user) {
          if (err) {
            return console.log(err);
              res.send(500, { error: 'DB Error' });
          }else {
            console.log('password changed', user);
            var message = 'password changed';
            res.view('home', { errors: { type: 'error', message: message }} );
          }
        //res.json(user);
      }
    );
  },
  login: function(req, res) {
    console.log('login');
    if (!req.user) {
      res.view('user/login'); //user/login
    } else {
      res.view('home');
    }

    console.log(req.session);
    console.log("passport:"+JSON.stringify(req.session.passport));
    console.log(req.user);
  },
  logout: function(req, res) {
    req.logout();
    res.send('logout successful');
  },

  auth: function(req, res) {
    var username = req.param('username');
    var password = req.param('password');

    try {
      /**
       * 추후, email 로도 로그인가능하도록 할꺼임.
       */
      check(username, '아이디는 최소 5자리, 최대 20자리입니다.').len(5,20);
      check(password, '비밀번호는 최소 8자리, 최대 30자리입니다.').len(8,30);
    } catch (e) {
      resultJson.type = 'error';
      resultJson.message = e.message;
      return res.json(resultJson);
    }

    // passport authenticate
    passport.authenticate('local', function(err, user, info){

      if ((err) || (!user)) {
        return res.json(info);
      }

      req.logIn(user, function(err){
        if(err) {
          // res.send(err);
          resultJson.type = 'error';
          resultJson.message = 'login Error';
          return res.json(resultJson);
        }
        return res.json(info);
        //return res.send({ message: 'login successful'});
      });
    })(req, res);
  },
  nothing: function(req, res) {
    console.log("nothing:acces denied");
    res.view('500', { errors: {error:'Access Denied'} });
  },
  twitter: function(req, res) {
    console.log('twitter start');

    passport.authenticate('twitter', { failureRedirect: '/login' },
        function (err, user) {
            req.logIn(user, function (err) {
                if (err) {
                    res.view();
                    return;
                }

                res.redirect('/');
                return;
            });
        })(req, res);

    console.log('twitter end');
    // return res.send('hi');

  },
  'twitter/callback': function(req, res) {
      console.log ('hello, twitterCallback')
      return passport.authenticate('twitter',
          function (req) {
              return res.send({message: 'ok'});
          })(req, res, new Function());
      return res.send({message: 'return'});
  },
  'github': function (req, res) {
      passport.authenticate('github', { failureRedirect: '/login' },
          function (err, user) {
              req.logIn(user, function (err) {
                  if (err) {
                      res.view();
                      return;
                  }

                  res.redirect('/');
                  return;
              });
          })(req, res);
  },
  'github/callback': function (req, res) {
      passport.authenticate('github',
          function (req) {
              return res.send({message: 'ok'});
          })(req, res, new Function() );
      return res.send({message: 'return'});
  }
};
