tipJS.app({
	appPath:"/js/app/user",
	noCache:true,
	noCacheParam:"tipJS",
	noCacheAuto:true,
	controllers:[
		"userC.js"
	],
	models:[
		"userM.js"
	],
	views:[
		"userV.js"
	],
	onLoad:function(){
		console.log('user onload');
	}
});

$(document).ready(function(e){
	console.log ('hi, user');
}); 