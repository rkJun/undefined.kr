tipJS.controller("offline_ctrl_update", {

	invoke : function(){

		var view = this.getView("offline_view");
		var $frmOffline = view.getForm();

		view.Initialize();

		alert('hi, update');

	}
});