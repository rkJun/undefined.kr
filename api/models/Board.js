/**
 * Board
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  
    authorId: {
      type: 'string',
      required: true
    }, 
    category: {
      type: 'string'
    },
    title: { 
      type: 'string',
      required: true
    },
    contents: 'string',
    tag: 'array',
    viewCount: {
    	type: 'integer',
    	defaultsTo: 0
    },
    likeCount: {
    	type: 'integer',
    	defaultsTo: 0
    },
    unlikeCount: {
    	type: 'integer',
    	defaultsTo: 0
    },
    isDelete: {
        type: 'boolean',
        defaultsTo: false
    }
  }

};
