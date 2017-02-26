'use strict';

module.exports = function(app) {
	var calendar = require('../../app/controllers/calendar.server.controller');
	
	app.route('/calendar')
		.get(calendar.list)
		.post(calendar.create);

	app.route('/calendar/:calendarId')
		.delete(calendar.delete);
		
	app.param('calendarId', calendar.calendarByID);
};