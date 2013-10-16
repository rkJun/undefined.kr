tipJS.controller("offline_ctrl_insert", {

	invoke : function(){

		var view = this.getView("offline_view");
		var $frmOffline = view.getForm();

		view.initialize();

		// join
		var reqData = $frmOffline.serialize();

		$.ajax({
			type: "POST",
			url: "/offline",
			data: reqData
		}).done(function( resultJson ) {
			$("#divAlert").addClass("alert-"+resultJson.type).show();
			$("#returnType").html(resultJson.type);
			$("#returnMessage").html(" "+resultJson.message);

			if (resultJson.type === "success") {
				location.href = "/offline/off18";
			}
		});
	}
});