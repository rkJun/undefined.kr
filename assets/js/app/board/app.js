tipJS.app({
	appPath:"/js/app/board",
	noCache:true,
	noCacheParam:"tipJS",
	noCacheAuto:true,
	controllers:[
		// "board_ctrl_list.js",
		// "board_ctrl_search.js",
		"board_ctrl_insert.js",
		// "board_ctrl_update.js",
		"board_ctrl_init.js"
	],
	models:[
		// "board_model.js"
	],
	views:[
		// "board_view.js"
	],
	onLoad:function(){
		tipJS.action.board_ctrl_init();
	}
});

$(document).ready(function(e){
	tipJS.loadApp();
}); 