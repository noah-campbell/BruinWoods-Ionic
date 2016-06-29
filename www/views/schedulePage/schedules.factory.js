(function() {
    'use strict';

    angular
        .module('app')
        .factory('scheduleFactory', scheduleFactory);

    scheduleFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function scheduleFactory($http, $q, apiUrl) {
        var service = {
            getSchedule: getSchedule
        };
        return service;

        ////////////////

        function getSchedule() {
        	var defer = $q.defer();
        	$http({
        		method: 'GET',
        		url: apiUrl + 'api/schedules',
        	}).then(function(response) {
                console.log(response.data);
        		defer.resolve(response.data);
        	},function(err) {
        		console.log(err);
        		defer.resolve(err);
        	});
        	return defer.promise;
        }
    }
})();
