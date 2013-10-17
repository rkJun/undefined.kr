tipJS.view("offline_view", {

	getForm: function() {
		return $("#frmOffline");
	},
	initialize: function() {
		$("#div_alertType").html("");
		$("#div_alertMsg").html("");
		this.hideAlert();
	},
	hideAlert: function() {
		$(".alert").hide();
	},
	showAlert: function() {
		$(".alert").show();
	},
	modalInitialize: function() {
		$("#div_alertType_mod").html("");
		$("#div_alertMsg_mod").html("");
		this.hideAlert();
	},

});