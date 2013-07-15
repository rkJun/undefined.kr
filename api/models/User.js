/*---------------------
	:: User
	-> model
---------------------*/
module.exports = {

	attributes: {

		// Simple attribute:
		 name: 'STRING',
		 email: 'STRING',
		 birthDate: 'DATE',
		// Or for more flexibility:
		 phoneNumber: {
			type: 'STRING',
			defaultsTo: '555-555-5555'
		}
		
	}

};
