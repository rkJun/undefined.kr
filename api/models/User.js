/*---------------------
	:: User
	-> model
---------------------*/
module.exports = {

	attributes: {

		// Simple attribute:
		 username: 'STRING',
		 password: 'STRING',
		 email: 'STRING',
		 birthDate: 'DATE',
		 ipAddress: 'STRING',
		// Or for more flexibility:
		activityScore: {
			type: 'NUMBER',
			defaultsTo: '0'
		}
	}

};
