tipJS.controller({
	name : "user.userC",

	beforeClickHandler : function () {
	},
	invoke : function(act){

		switch (act) {
		case "sign": this.sign();
			break;
		case "fieldCheck": this.fieldCheck();
			break;
		}
	},
	sign : function() {
		
		var reqData = $("#frmSign").serialize();

		$.ajax({
			type: "POST",
			url: "/signup",
			data: reqData
		}).done(function( msg ) {
			alert( "Data Saved: " + JSON.stringify(msg) );
		});

	},
	fieldCheck : function(check) {
		
		var userModel = tipJS.loadModel("user.userM");
		var userView  = this.loadView("userV");
		
	},
	reqAjax : function() {
	},
	callback : function(msg) {
	}
});
