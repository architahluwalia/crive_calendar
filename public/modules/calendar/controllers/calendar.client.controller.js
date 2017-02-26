'use strict';

angular.module('calendar').controller('CalendarController', ['$scope', '$compile', 'Calendar', '$http', '$location', 'Users', 'Authentication',
	function($scope, $compile, Calendar , $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		if (!$scope.user) $location.path('/');

	    var date = new Date();
	    var d = date.getDate();
	    var m = date.getMonth();
	    var y = date.getFullYear();
		let vm = this;
    	$scope.clickedEvent = '';
    	$scope.addNew = true;
	    $scope.eventRender = function( event, element, view ) { 
	        element.attr({'tooltip': event.title,
	                     'tooltip-append-to-body': true});
	        $compile(element)($scope);
	    };

		var events = Calendar.query();

		$scope.events = [];
		
		events.$promise.then(function (response) {
			$scope.selectedDates = [];
			angular.forEach(response, function(event) {
				let d = moment(event.date);
				$scope.selectedDates.push(d);
				$scope.events.push({
			        title: event.title,
			        start: new Date(event.date),
			        className: ['openSesame']
				});
			});
		});

		$scope.eventSources = [$scope.events];

	    $scope.create = function() {
    		console.log('event', $scope.event);

			var cal = new Calendar ({
				title: $scope.event.name,
				date: $scope.event.date
			});

			// Redirect after save
			cal.$save(function(response) {
				$scope.events.push({
					title: $scope.event.name,
					start: $scope.event.date,
					// end:  this.event.date,
					className: ['openSesame']
				});
				$scope.selectedDates.push($scope.event.date);
				$scope.event.name = '';
    			swal('Success!', 'Slot Created', 'success');
			});
	    };

        $scope.remove = function() {
        	console.log($scope.clickedEvent);

			$scope.clickedEvent.$remove(function() {
	        	$scope.selectedDates.splice($scope.selectedDates.indexOf($scope.clickedEvent.date), 1);
				angular.forEach($scope.events, function(event, id) {
					if ( event._id === $scope.clickedEvent._id) {
						$scope.events.splice(id, 1);
					}
				});	
				$scope.addNew = true;
				$scope.clickedEvent = '';	
    			swal('Success!', 'Slot deleted', 'success');

			});
	    };

	    $scope.showAddNew = function () {
	    	$scope.addNew = true;
	    };

	
	    $scope.alertOnEventClick = function( date, jsEvent, view){
	        $scope.clickedEvent = date;
	        $scope.addNew = false;
	    };

	    $scope.uiConfig = {
	      calendar:{
	        height: 450,
	        editable: true,
	        header:{
	          left: 'title',
	          center: '',
	          right: 'today prev,next'
	        },
	        eventClick: $scope.alertOnEventClick,
	        // eventDrop: $scope.alertOnDrop,
	        eventResize: $scope.alertOnResize,
	        eventRender: $scope.eventRender
	      }
	    };

    	$scope.changeDate = function(d, e) {
    		e.hour(0);
    		e.minute(0);
    		e.seconds(0);
    		angular.forEach($scope.selectedDates, function (select) {
    			if (select.unix() === e.unix()) {

	    			swal('Error!', 'This slot already taken', 'error');
    				return false;
    			}
    		});
    	};
	}
]);