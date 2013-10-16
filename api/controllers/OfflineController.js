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
    offline.offlineNo = "18";
    offline.email = req.param('email');

    offline.comment = req.param('comment');
   offline.ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

    try {
      check(offline.email, { len: '이메일주소는 최소 6자리, 최대 64자리입니다.', isEmail: '이메일 형식이 맞지 않습니다.'}).len(6,64).isEmail();
      check(offline.userName, '신청자명은 최소 3자리, 최대 30자리입니다.').len(3,30);
      check(offline.userNick, '닉네임은 최대 30자리입니다.').len(0,30);
      check(req.param('password'), '비밀번호는 최소 4자리, 최대 30자리입니다.').len(4,30);
    } catch (e) {
      console.log('warning:'+e.message);
      resultJson.type = 'warning';
      resultJson.message = e.message;
      return res.json(resultJson);
    }

    Offline.findOne({ email: offline.email }, function(err, existUser) {
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

    Offline.find()
    .limit(24)
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
  offline18: function(req, res) {
    Offline.find()
    .where({ isDelete: false })
    .limit(24)
    .sort('createdAt')
    .exec(function(err, offlines) {
      resultJson.type = 'success';
      resultJson.message = '정상조회했습니다.';
      resultJson.offlines = offlines;
      return res.view('offline/offline18', resultJson);
    });
  }

};
