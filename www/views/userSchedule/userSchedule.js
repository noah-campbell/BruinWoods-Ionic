(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserScheduleCtrl', UserScheduleCtrl);

    UserScheduleCtrl.$inject = ['userFactory'];

    /* @ngInject */
    function UserScheduleCtrl(userFactory) {
        var vm = this;
        vm.title = 'UserScheduleCtrl';

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
        				event.date = moment(event.startTime).format("MM/DD/YYYY");
        				event.startTime = moment(event.startTime).format("hh:mm A");
        				event.endTime = moment(event.endTime).format("hh:mm A");
        			})
 					console.log(vm.events);
        		}, function(err) {
        			console.log(err);
        		})
        }
    }
})();