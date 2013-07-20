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

		if ( !$("#chkAgree").prop('checked') ) {
			alert("이용약관은 필수입니다.");
			return false;
		}
		var reqData = $("#frmSign").serialize();

		$.ajax({
			type: "POST",
			url: "/signup",
			data: reqData
		}).done(function( resultJson ) {
			if (resultJson.type === 'success') {
				alert(  resultJson.message );
				document.location.href = "/";
			} else {
				alert(  resultJson.message );
			}
		});

	},
	fieldCheck : function(check) {
		
		// var userModel = tipJS.loadModel("user.userM");
		// var userView  = this.loadView("userV");
		// $frmSign = userView.get$FrmSign();

	},
	reqAjax : function() {
	},
	callback : function(msg) {
	}
});
