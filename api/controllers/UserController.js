/*---------------------
	:: User 
	-> controller
---------------------*/

var UserController = {

    signup: function(req, res) {
      return res.view();
    },
    create: function(req, res) {

      var check = require('anchor');

      var passwordHash = require('password-hash');

      var user = {};
      user.username = req.param('username');
      user.password = passwordHash.generate(req.param('password')); // hashedPassword

      user.id = req.param('id');
      user.email = req.param('email');
      user.birthDate = req.param('birthDate');
      user.ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

      //Validate user input
      try {
        req.check('id', 'Please enter a valid id').len(5,20).isInt();
        req.check('password', 'Please enter a password').len(8,30);
        req.check('email', 'Please enter a valid email').len(6,64).isEmail();
      } catch (e) {
        console.log("error:"+e.message);
      }

      User.create(
        user
      ).done(function(err, user) {
          // Error handling
          if (err) {
            return console.log(err);
          }else {
            console.log('User created:', user);
          }
      });
    },
    find: function(req, res) {
      User.find().done(function (err, user) {
          if (err) {
            return console.log(err);
              res.send(500, { error: 'DB Error' });
          }else {
            console.log('User find:', user);
          }
        res.json(user);
      });
      
    },
    login: function(req, res) {
      console.log('login');
      res.view(); //user/login
    },

    auth: function(req, res) {
      var username = req.param('username');
      var password = req.param('password');

      User.find({'username': username}).done(function (err, user) {
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
    }

};
module.exports = UserController;