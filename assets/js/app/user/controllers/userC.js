tipJS.controller({
	name : "user.userC",

	beforeInvoke : function () {
		$("#divAlert").removeClass("alert-error").hide();
	},
	invoke : function(act){

		switch (act) {
		case "sign": this.sign();
			break;
		case "login": this.login();
			break;
		case "fieldCheck": this.fieldCheck();
			break;
		}
	},
	login : function() {
		var reqData = $("#frmLogin").serialize();
		
		$.ajax({
			type: "POST",
			url: "/login",
			data: reqData
		}).done(this.callback);

	},
	sign : function() {

		/**
		 * 이용약관 체크 여부
		 */
		if ( !$("#chkAgree").prop('checked') ) {
			$("#divAlert").addClass("alert-error").show();
			$("#returnType").html("error!");
			$("#returnMessage").html(" 이용약관은 필수입니다.");
			return false;
		}
		var reqData = $("#frmSign").serialize();

		$.ajax({
			type: "POST",
			url: "/signup",
			data: reqData
		}).done(function( resultJson ) {
			if (resultJson.type === 'success') {
				alert( resultJson.message );
				document.location.href = "/";
			} else {
				$("#divAlert").addClass("alert-error").show();
				$("#returnType").html(resultJson.type +"!");
				$("#returnMessage").html(" "+resultJson.message);
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
	callback : function(resultJson) {
			if (resultJson.type === 'success') {
				alert(  resultJson.message );
				document.location.href = "/";
			} else {
				$("#divAlert").addClass("alert-error").show();
				$("#returnType").html(resultJson.type +"!");
				$("#returnMessage").html(" "+resultJson.message);
			}
	}
});