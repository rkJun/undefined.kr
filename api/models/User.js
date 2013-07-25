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
      type: 'string'
      // required: true,
      // unique: true
    },

    userName: 'string',
    password: 'string',
    email: 'string',
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
      type: 'INTEGER',
      defaultsTo: 0
    },
    isDelete: {
      type: 'BOOLEAN',
      defaultsTo: false
    }
    
  }
};
