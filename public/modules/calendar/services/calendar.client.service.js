'use strict';

angular.module('calendar').factory('Calendar', [ '$resource',
	function($resource) {
		return $resource('calendar/:calendarId', { calendarId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);