/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {
  
    provider: {
      type: 'string',
      required: true
    },    
    userId: {
      type: 'string',
      required: true
    },
    userName: {
      type: 'string',
      required: true
    },
    displayName: {
      type: 'string'
    },
    password: {
      type: 'string',
      columnName: 'encryptedPassword'
    },
    email: {
      type: 'string',
      unique: true
    },
    profileUrl: 'string',
    photoUrl: 'string',
    blog: 'string',
    company: 'string',
    bio: 'string',
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
