/*---------------------
	:: Comments
	-> model
---------------------*/
module.exports = {

	attributes: {

		 comments: [
		 	{
		 		superId: 'STRING',
		 		authorId: 'STRING',
		 		comment: 'STRING',
		 		viewCount: 'NUMBER',
		 		goodCount: 'NUMBER'
		 		// createdAt: 'DATE',
		 		// updatedAt: 'DATE'
		 	}
		 ]
		
	}

};
