tipJS.controller("offline_ctrl_list", {

	invoke : function(){

		var view = this.getView("offline_view");
		var $frmOffline = view.getForm();

		view.initialize();

		// join
		var reqData = $frmOffline.serialize();

		$.ajax({
			type: "get",
			url: "/offline"
		}).done(function( resultJson ) {
			if (resultJson.type === "success") {
				//resultJson.offlines;
				//$("#ol_confirmlist)

			}
		});

	}
});