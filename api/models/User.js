/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {
  
    userId: 'STRING',
    userName: 'STRING',
    password: 'STRING',
    email: 'STRING',
    birthDate: 'STRING',
    userUrl: 'STRING',
    userCompany: 'STRING',
    userLocation: 'STRING',
    ipAddress: 'STRING',
    activityScore: {
      type: 'NUMBER',
      defaultsTo: '0'
    },
    isDelete: {
      type: 'BOOLEAN',
      defaultsTo: false
    }
    
  }
};
