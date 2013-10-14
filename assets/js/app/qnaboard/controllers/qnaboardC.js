tipJS.controller("qnaboardC", {

	beforeInvoke: function() {
		// $("#divAlert").removeClass("alert-error").hide();
	},
	invoke: function(act){

		 switch (act) {
		 case "write": this.write();
		 	break;
		 case "update": this.update();
			break;
		case "delete": this.delete();
			break;
		}
	},

	write: function() {
		var reqData = $("#frmWrite").serialize();

		$.ajax({
			type: "POST",
			url: "/board/write",
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
	update: function() {

	},
	delete: function() {

	},
	callback: function(resultJson) {
		
	}

});
