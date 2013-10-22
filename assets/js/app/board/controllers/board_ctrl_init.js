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

			if (btnActName === "btn_write") {
				alert('test');
				
				// tipJS.action.board_ctrl_insert();
			} else if (btnActName === "btn_cancel") {
				tipJS.action.board_ctrl_update();
			} else if (btnActName === "btn_update") {
				
			} else if (btnActName ==="btn_open_modalc" ) {
				$("#modalc").modal();
			} else if (btnActName ==="btn_open_modale" ) {

			}

		});

	}
});