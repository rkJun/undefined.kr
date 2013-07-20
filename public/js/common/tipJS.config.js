// configuring tipJS
tipJS.config({
	commonLib:[
    "/js/common/require.js",
		"/js/common/jquery-2.0.3.js",
		"/js/common/bootstrap.min.js",
		"/js/common/plugins/jquery.pjax.js",
    "/js/common/plugins/plugins.js",
    "/js/common/validator/jquery.validate.min.js",
    "/js/common/validator/messages_ko.js"
	],
	applicationPath:{
		user : '/js/app/user',
		qnaboard : 'js/app/qnaboard'
 	}
});