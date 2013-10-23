tipJS.controller("board_ctrl_insert", {

	invoke : function(){

		// var view = this.getView("offline_view");
		// var $frmOffline = view.getForm();

		// view.initialize();

		// join
		var reqData = $("#frmBoard").serialize();

		$.ajax({
			type: "POST",
			url: "/board/create",
			data: reqData
		}).done(function( resultJson ) {
			$("#divAlert").addClass("alert-"+resultJson.type).show();
			$("#returnType").html(resultJson.type);
			$("#returnMessage").html(" "+resultJson.message);

			if (resultJson.type === "success") {
				location.href = "/board/list";
			}
		});
	}
});