/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	boardId: {
  	  type: 'string',
  	  required: true
  	},
    authorProvider: {
      type: 'string',
      required: true
    },  
  	authorId: {
  	  type: 'string',
  	  required: true
  	},
    authorName: {
      type: 'string',
      required: true
    },
    authorDispName: {
      type: 'string',
      required: true
    },
  	comment: {
  		type: 'string',
  		required: true
  	},
  	isDelete: {
  	    type: 'boolean',
  	    defaultsTo: false
  	}
  }
};

