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
    offlineNo: 'number',
    isDelete: 'boolean',
    comment: 'string',
    email: 'string',
    password: {
      type: 'string',
      columnName: 'encryptedPassword'
    }
  }

};
