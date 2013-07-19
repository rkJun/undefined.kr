/*---------------------
	:: User
	-> model
---------------------*/
module.exports = {

	attributes: {

		// Simple attribute:
		 userId: 'STRING',
		 userName: 'STRING',
		 password: 'STRING',
		 email: 'STRING',
		 birthDate: 'STRING',
		 userUrl: 'STRING',
		 userCompany: 'STRING',
		 userLocation: 'STRING',
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
