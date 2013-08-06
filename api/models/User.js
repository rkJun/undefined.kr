/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {
  
    userId: {
      type: 'string',
      required: true,
      unique: true
    },
    userName: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      columnName: 'encryptedPassword'
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    birthDate: 'string',
    userUrl: 'string',
    userCompany: 'string',
    userLocation: 'string',
    ipAddress: 'string',
    githubId: 'string',
    twitterId: 'string',
    photoUrl: {
      type: 'string'
    },
    activityScore: {
      type: 'integer',
      defaultsTo: 0
    },
    isDelete: {
      type: 'boolean',
      defaultsTo: false
    },
    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }    
  }
};
