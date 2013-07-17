/*---------------------
	:: User 
	-> controller
---------------------*/

var UserController = {

    signup: function(req, res) {
      return res.view();
    },
    create: function(req, res) {

      var user = {};
      user.username = req.param('username');
      user.password = req.param('password');
      console.log('UserController.create');
  
      var passwordHash = require('password-hash');
      var hashedPassword = passwordHash.generate(user.password);

      User.create({
        username: user.username,
        password: hashedPassword 
      }).done(function(err, user) {
          // Error handling
          if (err) {
            return console.log(err);
          }else {
            console.log('User created:', user);
          }
      });
    },
    // find: function(req, res) {
    //     console.log('find nothing');
    // },

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