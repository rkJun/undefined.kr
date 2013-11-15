/**
 * OfflineController
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

var check = require('validator').check;
var bcrypt = require('bcrypt');

var resultJson = {
  type: '',
  message: '',
  json: {}
};

module.exports = {

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to OfflineController)
   */
  _config: {},

  create: function(req, res) {

    var offline = {};
    var passwordHash = require('password-hash');

    offline.userId = req.param('userId');
    offline.userName = req.param('userName');
    offline.userNick = req.param('userNick');
    offline.password = req.param('password');
    offline.offlineNo = req.param('offlineNo');
    offline.email = req.param('email');

    offline.comment = req.param('comment');
   offline.ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

    try {
      check(offline.email, { len: '이메일주소는 최소 6자리, 최대 64자리입니다.', isEmail: '이메일 형식이 맞지 않습니다.'}).len(6,64).isEmail();
      check(offline.userName, '신청자명은 최소 2자리, 최대 30자리입니다.').len(2,30);
      check(offline.userNick, '닉네임은 최대 30자리입니다.').len(0,30);
      check(req.param('password'), '비밀번호는 최소 4자리, 최대 30자리입니다.').len(4,30);
    } catch (e) {
      console.log('warning:'+e.message);
      resultJson.type = 'warning';
      resultJson.message = e.message;
      return res.json(resultJson);
    }

    Offline.findOne({ offlineNo: offline.offlineNo, 
                      email: offline.email, 
                      isDelete: false }, function(err, existUser) {
      // Error handling
      if (err) {
        console.log(err);
        resultJson.type = 'error';
        resultJson.message = 'DB Error';
        return res.json(resultJson);
      }else {
        if(existUser) {
          console.log("동일 이메일이 존재합니다.:"+existUser);
          resultJson.type = 'warning';
          resultJson.message = "동일 이메일이 존재합니다. (기신청자)";
          return res.json(resultJson);
        } else {
          console.log("callBackCreate");

          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(offline.password, salt, function(err, hash) {
              if (err) {
                console.log(err);
              }else {
                console.log('hash::::'+hash);
                offline.password = hash;
                callBackCreate(offline);
              }
            })
          });
        }
      }
    });

    var callBackCreate = function(offline) {

      Offline.create(
        offline
      ).done(function(err, offline) {
          // Error handling
          if (err) {
            console.log(err);
            // return res.view('500', { errors: {error:'DB Error'} });
            resultJson.type = 'error';
            resultJson.message = 'DB Error';
            return res.json(resultJson);
          }else {
            Offline.publishCreate({ id:'offCreated', name:offline.userName});
            console.log('Offline created:', offline);
            return res.json( {type: "success", message : "정상등록했습니다." , offline: offline });
          }
        });
    }; //end of Callback
  }, // end of create:
  find: function(req, res) {

    var isRdy = req.param('isRdy') || false; //대기자조회여부
    var offlineNo = req.param('offlineNo') || '19';

    Offline.find({offlineNo: offlineNo, isDelete: false})
    .skip(isRdy?24:0)
    // .limit(24)
    .sort('createdAt')
    .exec(function(err, offlines) {
      if (err) {
        console.log(err);
        resultJson.type = 'error';
        resultJson.message = 'DB Error';
        return res.json(resultJson);
      }else {
        resultJson.type = 'success';
        resultJson.message = '정상조회했습니다.';
        resultJson.offlines = offlines;
        Offline.subscribe( req.socket );
        return res.json(resultJson);
      }
    });
  },
  off: function(req, res) {

    //pjax check
    var isPjax = req.header('X-PJAX');
    var offlineNo = req.param('no') || '19';

    if (offlineNo == '1') {
      return res.redirect('http://www.okjsp.net/seq/186829');
    } else if (offlineNo == '2') {
      return res.redirect('http://onoffmix.com/event/6842');
    } else if (offlineNo == '3') {
      return res.redirect('http://onoffmix.com/event/7596');
    } else if (offlineNo == '4') {
      return res.redirect('http://onoffmix.com/event/8080');
    } else if (offlineNo == '5') {
      return res.redirect('http://onoffmix.com/event/8861');
    } else if (offlineNo == '6') {
      return res.redirect('http://onoffmix.com/event/9574');
    } else if (offlineNo == '7') {
      return res.redirect('http://onoffmix.com/event/10613');
    } else if (offlineNo == '8') {
      return res.redirect('http://onoffmix.com/event/10917');
    } else if (offlineNo == '9') {
      return res.redirect('http://onoffmix.com/event/11813');
    } else if (offlineNo == '10') {
      return res.redirect('http://onoffmix.com/event/12375');
    } else if (offlineNo == '11') {
      return res.redirect('http://onoffmix.com/event/13177');
    } else if (offlineNo == '12') {
      return res.redirect('http://onoffmix.com/event/14242');
    } else if (offlineNo == '13') {
      return res.redirect('http://onoffmix.com/event/15462');
    } else if (offlineNo == '13plus') { // 13+
      return res.redirect('http://onoffmix.com/event/16077');
    } else if (offlineNo == '14') {
      return res.redirect('http://onoffmix.com/event/16335');
    } else if (offlineNo == '15') {
      return res.redirect('http://onoffmix.com/event/17274');
    } else if (offlineNo == '16') {
      return res.redirect('http://onoffmix.com/event/18469');
    } else if (offlineNo == '17') {
      return res.redirect('http://onoffmix.com/event/19253');
    }

    Offline.find()
    .where({ offlineNo: offlineNo, isDelete: false })
//    .limit(24)
    .sort('createdAt')
    .exec(function(err, offlines) {
      resultJson.type = 'success';
      resultJson.message = '정상조회했습니다.';
      resultJson.offlines = offlines;

      if(isPjax) {
        return res.view({'_layoutFile':'../blanklayout.ejs' ,'offlines':offlines}, resultJson);
      } else {
        return res.view('offline/offline'+offlineNo, resultJson);
      }
    });
  },
  offline18: function(req, res) {
    //pjax check
    var isPjax = req.header('X-PJAX');

    Offline.find()
    .where({ isDelete: false })
    .limit(24)
    .sort('createdAt')
    .exec(function(err, offlines) {
      resultJson.type = 'success';
      resultJson.message = '정상조회했습니다.';
      resultJson.offlines = offlines;

      if(isPjax) {
        return res.view({'_layoutFile':'../blanklayout.ejs' ,'offlines':offlines}, resultJson);
      } else {
        return res.view('offline/offline18', resultJson);
      }
    });
  },
  cancel: function(req, res) {

    var offlineInput = {};

    offlineInput.password = req.param('password');
    offlineInput.email = req.param('email');
    offlineInput.offlineNo = req.param('offlineNo');

     try {
       check(offlineInput.email, { len: '이메일주소는 최소 6자리, 최대 64자리입니다.', isEmail: '이메일 형식이 맞지 않습니다.'}).len(6,64).isEmail();
       check(offlineInput.password, '비밀번호는 최소 4자리, 최대 30자리입니다.').len(4,30);
     } catch (e) {
       console.log('warning:'+e.message);
       resultJson.type = 'warning';
       resultJson.message = e.message;
       return res.json(resultJson);
     }


    Offline.findOne({
       offlineNo: offlineInput.offlineNo,
       email: offlineInput.email,
       isDelete: false
    }).done(function(err, offline) {

      if(offline == undefined) {
        resultJson.type = 'warning';
        resultJson.message = '참가신청한 email이 아닙니다.';
         return res.json(resultJson);
      }

      if (err) {
        resultJson.type = 'warning';
        resultJson.message = 'DB error.';
         return res.json(resultJson);        
      } else {
        bcrypt.compare(req.param('password'), offline.password, function(err, pwdRes) {
        if (!pwdRes) {
          resultJson.type = 'warning';
          resultJson.message = '패스워드가 맞지 않습니다.';
           return res.json(resultJson);          
        }

          offline.isDelete = true;

          offline.save(function(err) {
            if (!err) {
              resultJson.type = 'success';
              resultJson.message = '정상 처리했습니다.';
              resultJson.offline = offline;
               return res.json(resultJson);
            }
          });


        });
      }

    });
  }

};
