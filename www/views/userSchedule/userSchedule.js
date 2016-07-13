(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserScheduleCtrl', UserScheduleCtrl);

    UserScheduleCtrl.$inject = ['userFactory', '$scope'];

    /* @ngInject */
    function UserScheduleCtrl(userFactory, $scope) {
        var vm = this;
        vm.title = 'UserScheduleCtrl';
        vm.goBack = goBack;

        activate();

        ////////////////

        function activate() {
        	getEvents();
        }
        function getEvents() {
        	userFactory.getEvents()
        		.then(function(response) {
        			vm.events = response.data.eventIds;
        			vm.events.forEach(function(event) {
        				event.startTime = moment(event.startTime);
        				event.date = moment(event.startTime).format("MM/DD/YYYY");
        				event.startHour = moment(event.startTime).format("hh:mm A");
        				event.endHour = moment(event.endTime).format("hh:mm A");
        			})
 					console.log(vm.events);
        		}, function(err) {
        			console.log(err);
        		})
        }

        function goBack() {
        	$state.go('homepage');
        }
    }
})();