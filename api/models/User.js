/*---------------------
	:: User
	-> model
---------------------*/
module.exports = {

	attributes: {

		// Simple attribute:
		_id: 'STRING',
		 username: 'STRING',
		 password: 'STRING',
		 email: 'STRING',
		 birthDate: 'STRING',
		 ipAddress: 'STRING',
		// Or for more flexibility:
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
