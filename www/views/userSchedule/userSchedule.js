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
        }
        function getEvents() {
        	userFactory.getEvents()
        		.then(function(response) {
        			vm.events = response.data.eventIds;
 					console.log(vm.events);
        		}, function(err) {
        			console.log(err);
        		})
        }
    }
})();