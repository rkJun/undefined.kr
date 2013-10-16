tipJS.app({
	appPath:"/js/app/offline",
	noCache:true,
	noCacheParam:"tipJS",
	noCacheAuto:true,
	controllers:[
		"offline_ctrl_list.js",
		"offline_ctrl_search.js",
		"offline_ctrl_insert.js",
		"offline_ctrl_update.js",
		"offline_ctrl_init.js"
	],
	models:[
		"offline_model.js"
	],
	views:[
		"offline_view.js"
	],
	onLoad:function(){
		console.log('offline onload');
		tipJS.action.offline_ctrl_init();
	}
});

$(document).ready(function(e){
	tipJS.loadApp();
	console.log('hi offline');
}); 