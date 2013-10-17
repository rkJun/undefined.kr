tipJS.controller("offline_ctrl_init", {

	invoke : function(){

		var view = this.getView("offline_view");
		var $frmOffline = view.getForm();

		view.initialize();

		$frmOffline.submit(function(e) {
			e.preventDefault();
		});

		// add button event handler (tipJS.action)
		$("body")
		.on("click", "button", function(e) {
		
			var btnActName = $(this).attr("id");

			if (btnActName === "btn_join") {
				tipJS.action.offline_ctrl_insert();
			} else if (btnActName === "btn_cancel") {
				tipJS.action.offline_ctrl_update();
			} else if (btnActName === "btn_update") {
				
			} else if (btnActName ==="btn_open_modalc" ) {
				$("#modalc").modal();
			} else if (btnActName ==="btn_open_modale" ) {

			}

		});

	}
});