/*---------------------
	:: User 
	-> controller
---------------------*/
var UserController = {

    create: function(req, res) {

      var user = req.param(user);
      console.log('UserController.create');

        // For example
        User.create({
          name: 'Mike',
          age: 13,
          phoneNumber: '(512)-555-5555'
        }).done(function(err, user) {

          // Error handling
          if (err) {
            return console.log(err);

          // The User was created successfully!
          }else {
            console.log("User created:", user);
          }
        });
    },
    find: function(req, res) {
        console.log('find nothing');
    },

    destroy: function(req, res) {
    	console.log('UserController.destroy');
    },

    tag: function(req, res) {
    	console.log('UserController.tag');
    },

    like: function(req, res) {
    	console.log('UserController.like');
    }

};
module.exports = UserController;