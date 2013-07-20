/*---------------------
	:: User 
	-> controller
---------------------*/

var check = require('validator').check;

var resultJson = {
  type: '',
  message: ''
  json: {}  
};

var UserController = {

    signup: function(req, res) {
      return res.view();
    },
    create: function(req, res) {

      var user = {};      
      var passwordHash = require('password-hash');

      user.userId = req.param('userId');
      user.userName = req.param('userName');
      user.password = passwordHash.generate(req.param('password')); // hashedPassword
      user.email = req.param('email');
      user.birthDate = req.param('birthDate');
      user.ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

      try {
        check(user.userId, '아이디는 최소 5자리, 최대 20자리입니다.').len(5,20);
        check(user.userName, '사용자명은 최소 5자리, 최대 30자리입니다.').len(5,30);
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

      User.find({ userId: user.userId }, function(err, existUser) {
        // Error handling
        if (err) {
          console.log(err);
          return res.view('500', { errors: {error:'DB Error'} });
        }else {
          if(existUser) {
            console.log("동일 아이디가 존재합니다.");
            resultJson.type = 'error';
            resultJson.message = "동일 아이디가 존재합니다.";
            return res.json(resultJson);
            // return res.view('user/signup', { errors: { type: 'error', message: message } } );
          } else {
            console.log("callBackCreate");
            callBackCreate(user);
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
              return res.view('500', { errors: {error:'DB Error'} });
            }else {
              console.log('User created:', user);
              req.session.user = user;
              return res.json( { result : { type: "success", message : "정상등록했습니다." , user: user } } );
              //return res.redirect('/');
            }
        });
      }; //end of Callback
    },
    find: function(req, res) {
      User.findAll( {userId: req.param('userId')} ).done(function (err, user) {
          if (err) {
            return console.log(err);
              res.send(500, { error: 'DB Error' });
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
      res.view("user/login", { testJson : "hi"}); //user/login
    },

    auth: function(req, res) {
      var username = req.param('username');
      var password = req.param('password');

      User.find({'userName': username}).done(function (err, user) {
        if (err) {
           console.error(err);
           //res.send(500, { error: 'DB Error' });
           res.view('500', { errors: {error:'DB Error'} });
        }else {

          console.log('User find:', user);

          if (user) {
            var hasher = require('password-hash');
            if (hasher.verify(password, user.password)) {
                req.session.user = user;
                res.send(user);
            } else {
                res.send(400, { error: 'Wrong Password' });
                //res.redirect('/login');
                return;
            }
          }
        }
      });
 
      console.log('auth');
    },

    nothing: function(req, res) {
      console.log("nothing:acces denied");
      res.view('500', { errors: {error:'Access Denied'} });
    }

};
module.exports = UserController;