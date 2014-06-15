/**
 * BoardController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var validator = require('validator');
var markdown = require( "markdown" ).markdown;
var ent = require('ent');
var moment = require('moment');

var resultJson = {
  type: '',
  message: '',
};

module.exports = {
    
  view: function(req, res) {
    return res.view();
  },
  list: function(req, res) {

    var category = req.param('category');
    category = category ? category:'공지사항';

    Board.find()
    .where({ isDelete: false })
    .where({ category: category })
    .limit(25)
    .sort( { 'createdAt': -1 } )
    .exec(function(err, boards) {

      // for (var i=0; i < boards.length; i++) {

      //   User.findOne({provider: boards[i].authorProvider, userId: boards[i].authorId}
      //     ).done(function (err,user) {
      //       if(!err) {
      //         if(user) {
      //           boards[i].title = user.photoUrl;
      //         }
      //       } else {
      //         boards[i].title = '/favicon.ico';
      //       }
      //   });
      // } // end for

      resultJson.type = 'success';
      resultJson.message = '정상 조회되었습니다.';
      resultJson.boards = boards;
      // resultJson.category = category;
      console.log(resultJson);
      res.view('board/board', resultJson);
    });
  },
  find: function (req, res) {
    var isPjax = req.header('X-PJAX');

    var id = req.param('id') ? req.param('id') : '';

    Board.findOne(
      { id: id, 
        isDelete: false }
    ).done( function (err, board) {
      // Error handling
      if (err) {
        console.log(err);
        resultJson.type = 'error';
        resultJson.message = 'DB Error';
        return res.json(resultJson);
      }else {
        if (board) {
          resultJson.type = 'success';
          resultJson.message = '정상 조회되었습니다:'+board.id;
          resultJson.board = board;

          //조회수 증가
          board.viewCount++;
          board.save(function(err){});

          // date
          board.createdAt = moment( board.createdAt ).lang('ko').format( 'LLLL' );

          //text area 처리
          //board.contents = ent.decode(markdown.toHTML(board.contents));
          //resultJson.board = board;

          //댓글 가져오기
          Comment.find({ 
              boardId: board.id,
              isDelete: false 
          }).done(function(err, comments) {
            if(err){
              resultJson.type = 'error';
              resultJson.message = 'DB Error';
              return res.json(resultJson);
            }else {
              if(comments) {
                resultJson.comments = comments;
              }

              if(isPjax) {
                return res.view({'_layoutFile':'../blanklayout.ejs','board':board, 'comments':comments}, resultJson);
              } else {
                return res.view(resultJson);
              }
              
            }
          }); 
        
        } else {
          // 조회된 글이 없음 
          resultJson.type = 'error';
          resultJson.message = '조회된 게시물이 없습니다.';
          return res.json(resultJson);
        }
      }
    });
  },
  create: function(req, res) {
    var board = {};
    var category = req.param('category');
    category = category ? category:'공지사항';

    // board.authorProvider = 'github';
    // board.authorId = 'rkjun';
    // board.authorName = 'Juntai Park';
    board.authorProvider = req.user.provider;
    board.authorId = req.user.userId;
    board.authorName = req.user.userName;
    board.authorDispName = req.user.displayName;
    board.category = category;
    board.title = req.param('title');
    board.contents = req.param('contents');
    board.tags = req.param('tags').split(',');

    var rtnMsg = '';
    if (validator.isNull(board.title)) {
        rtnMsg = '제목은 필수항목입니다.';
    } else if (validator.isNull(board.contents)) {
        rtnMsg = '내용은 필수항목입니다.';
    }
    if ( rtnMsg !== '' ) {
      console.log('error:'+rtnMsg);
      resultJson.type = 'error';
      resultJson.message = rtnMsg;
      return res.json(resultJson);
    }

    Board.create(
      board
    ).done(function(err, user) {
        // Error handling
        if (err) {
          console.log(err);
          resultJson.type = 'error';
          resultJson.message = 'DB Error';
          return res.json(resultJson);
        }else {
          console.log('board created:', board);
          return res.json( {type: "success", message : "정상등록했습니다." , board: board });
        }
    });
  },
  update: function (req, res) {
  },
  delete: function (req, res) {

  },
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to BoardController)
   */
  _config: {}

  
};
