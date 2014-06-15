/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var validator = require('validator');

var resultJson = {
  type: '',
  message: '',
};

module.exports = {

	create: function(req, res) {
 
	  var comment = {};
	  comment.authorProvider = req.user.provider;
	  comment.authorId = req.user.userId;
	  comment.authorName = req.user.userName;
	  comment.authorDispName = req.user.displayName;
	  comment.boardId = req.param('boardId');
	  comment.comment = req.param('comment');

	  var rtnMsg = '';
	  if (validator.isNull(comment.comment)) {
	      rtnMsg = '댓글 내용은 필수항목입니다.';
	  } else if (validator.isNull(req.user.userId)) {
	      rtnMsg = '로그인 사용자만 댓글을 남길 수 있습니다.';
	  }
	  if ( rtnMsg !== '' ) {
	    console.log('error:'+rtnMsg);
	    resultJson.type = 'error';
	    resultJson.message = rtnMsg;
	    return res.json(resultJson);
	  }

	  Comment.create(
	    comment
	  ).done(function(err, user) {
	      // Error handling
	      if (err) {
	        console.log(err);
	        resultJson.type = 'error';
	        resultJson.message = 'DB Error';
	        return res.json(resultJson);
	      }else {
	        console.log('comment created:', comment);
	        return res.json( {type: "success", message : "정상등록했습니다." , comment: comment });
	      }
	  });
	}
};

