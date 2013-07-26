/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {

    authorId: {
      type: 'string',
      required: true
    }, 
    title: 'string',
    contents: 'string',
    tag: 'array',
    viewCount: {
    	type: 'integer',
    	defaultsTo: 0
    },
    goodCount: {
    	type: 'integer',
    	defaultsTo: 0
    },
    badCount: {
    	type: 'integer',
    	defaultsTo: 0
    },
    isDelete: {
        type: 'boolean',
        defaultsTo: false
    }

  }

};
