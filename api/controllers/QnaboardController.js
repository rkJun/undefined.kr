/**
 * QnaboardController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */
var check = require('validator').check,
    sanitize = require('validator').sanitize;

var resultJson = {
  type: '',
  message: '',
  json: {}
};

module.exports = {

  write: function(req, res) {
    return res.view();
  },
  writesend: function(req, res) {
    var qnaboard = {};
    qnaboard.authorId = req.user.userId;
    qnaboard.title = sanitize(req.param('title')).xss();
    qnaboard.contents = sanitize(req.param('contents')).xss();
    qnaboard.tag = req.param('tag').split(',');

    try {
      check(qnaboard.title, '제목은 필수항목입니다.').notEmpty();
      check(qnaboard.contents, '내용은 필수항목입니다.').notEmpty();
    } catch (e) {
      console.log('error:'+e.message);
      resultJson.type = 'error';
      resultJson.message = e.message;
      return res.json(resultJson);
    }

    Qnaboard.create(
      qnaboard
    ).done(function(err, user) {
        // Error handling
        if (err) {
          console.log(err);
          resultJson.type = 'error';
          resultJson.message = 'DB Error';
          return res.json(resultJson);
        }else {
	        console.log('qnaboard created:', qnaboard);
          return res.json( {type: "success", message : "정상등록했습니다." , qnaboard: qnaboard });
        }
    });
  },
  update: function(req, res) {

  },
  updateSend: function(req,res) {

  },
  deleteSend: function(req,res) {

  },
  view: function(req, res) {
    return res.json({retult:'view'});
  },
  list: function(req, res) {
    Qnaboard.find()
    .where({ isDelete: false })
    .limit(100)
    .sort( { 'createdAt': -1 } )
    .exec(function(err, users) {
    	console.log(users);
    	resultJson.type = 'success';
    	resultJson.message = '정상 조회되었습니다.';
    	resultJson.users = users;
    	console.log(resultJson);
      res.view('qnaboard/list', resultJson);
    });
  }


};