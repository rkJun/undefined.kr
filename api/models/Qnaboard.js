/*---------------------
	:: Qnaboard
	-> model
---------------------*/
module.exports = {

	attributes: {

		// Simple attribute:
		 authorId: 'STRING',
		 title: 'STRING',
		 contents: 'STRING',
		 tag: [ { type: 'STRING' }],
		 viewCount: 'NUMBER',
		 goodCount: 'NUMBER' //,
		 // comments: [
		 // 	{
		 // 		authorId: 'STRING',
		 // 		comment: 'STRING',
		 // 		viewCount: 'NUMBER',
		 // 		goodCount: 'NUMBER',
		 // 		createdAt: 'DATE',
		 // 		updatedAt: 'DATE'
		 // 	}
		 // ]
	}

};
