tipJS.controller("offline_ctrl_update", {

	invoke : function(){

		// var view = this.getView("offline_view");
		// var $frmOffline = view.getForm();

		// view.modalInitialize();

		$.ajax({
			type: "PUT",
			url: "/offline/cancel",
			data: {
				email : $("#txtEmail_mod").val(),
				password : $("#txtPassword_mod").val(),
				offlineNo : $("#hdn_offlineNo").val()
			}
		}).done(function( resultJson ) {
			$("#divAlert_mod").addClass("alert-"+resultJson.type).show();
			$("#returnType_mod").html(resultJson.type);
			$("#returnMessage_mod").html(" "+resultJson.message);
			
			if (resultJson.type === 'success') {
				$("#modalc").modal({'show':false});
			}			
		});

	}
});