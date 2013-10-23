tipJS.controller("board_ctrl_init", {

	invoke : function(){

		// var view = this.getView("board_view");
		// var $frmboard = view.getForm();
		// view.initialize();

		$("#frmBoard").submit(function(e) {
			e.preventDefault();
		});

		// add button event handler (tipJS.action)
		$("body")
		.on("click", "button", function(e) {
		
			var btnActName = $(this).attr("id");

			if (btnActName === "btn_write_view") {
				$("#write_area").toggle();
				$("#write_area").removeClass("hidden");
			} else if (btnActName === "btn_create") {
				alert("btn_create");
				tipJS.action.board_ctrl_insert();
			} else if (btnActName === "btn_cancel") {
				// tipJS.action.board_ctrl_update();
			} else if (btnActName === "btn_update") {
				
			} else if (btnActName ==="btn_open_modalc" ) {
				$("#modalc").modal();
			} else if (btnActName ==="btn_open_modale" ) {

			}

		});

	}
});