tipJS.controller({
	name : "user.userC",

	beforeClickHandler : function () {
	},
	invoke : function($form, act){

		switch (act) {
		case "sign": this.sign($form);
			break;
		case "":
		}
	},

	sign : function($form) {
		alert('hello world'+$form);

	}
});
