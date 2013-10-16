tipJS.controller("offline_ctrl_init", {

	invoke : function(){

		var view = this.getView("offline_view");
		var $frmOffline = view.getForm();

		view.initialize();

		$frmOffline.submit(function(e) {
			e.preventDefault();
		});

		$("#div_btn_area")
		.on("click", "button", function(e) {
		
			var btnActName = $(this).attr("id").substring(4);

			if (btnActName === "join") {
				tipJS.action.offline_ctrl_insert();
			} else if  (btnActName === "cancel") {
				tipJS.action.offline_ctrl_update();
			}
		});

	}
});