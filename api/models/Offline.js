/**
 * Offline
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  
    userId: 'string',
    userName: 'string',
    userNick: 'string',
    offlineNo: 'string',
    isDelete: {
        type: 'boolean',
        defaultsTo: false
    },
    comment: 'string',
    email: 'string',
    password: {
      type: 'string',
      columnName: 'encryptedPassword'
    },
    ipAddress: 'string',
     toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      
      //email masking
      var emailAtPos = obj.email.indexOf('@');
      var maskingChar = "";
      for (var i = 2 ; i < emailAtPos; i++) {
        maskingChar += '*';
      }
      obj.email = obj.email.substring(0,2) + maskingChar + obj.email.substring(emailAtPos);

      return obj;
    }
  }

};
