/*---------------------
	:: User 
	-> controller
---------------------*/
var UserController = {

    create: function(req, res) {
    	console.log('UserController.create');
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