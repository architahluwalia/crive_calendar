'use strict';

// Calendar module config
angular.module('calendar').run(['Menus',
	function(Menus) {
		// Config logic
		// ...
		Menus.addMenuItem('topbar', 'Calendars', 'calendar', 'dropdown', '/calendar(/create)?');
		Menus.addSubMenuItem('topbar', 'calendar', 'List Calendars', 'calendar');
	}
]);