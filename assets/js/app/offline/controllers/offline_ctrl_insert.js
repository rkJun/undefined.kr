tipJS.controller("offline_ctrl_insert", {

	invoke : function(){

		var view = this.getView("offline_view");
		var $frmOffline = view.getForm();

		view.Initialize();

		alert('hi, insert');

	}
});