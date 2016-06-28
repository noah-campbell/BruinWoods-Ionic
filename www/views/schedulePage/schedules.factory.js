(function() {
    'use strict';

    angular
        .module('app')
        .factory('scheduleFactory', scheduleFactory);

    scheduleFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function scheduleFactory($http, $q) {
        var service = {
            getSchedule: getSchedule
        };
        return service;

        ////////////////

        function getSchedule() {
        	var defer = $q.defer();
        	$http({
        		method: 'GET',
        		url: apiUrl + 'schedules'
        	}).then(function(response) {
        		defer.resolve(response);
        	},function(err) {
        		console.log(err);
        		defer.resolve(err);
        	});
        	return defer.promise();
        }
    }
})();