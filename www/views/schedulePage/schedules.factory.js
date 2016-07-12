(function() {
    'use strict';

    angular
        .module('app')
        .factory('scheduleFactory', scheduleFactory);

    scheduleFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function scheduleFactory($http, $q, apiUrl) {
        var service = {
            getSchedule: getSchedule,
            saveEvent: saveEvent
        };
        return service;
        var authdata = localStorageService.get('authorizationData')
        ////////////////

        function getSchedule() {
        	var defer = $q.defer();
        	$http({
        		method: 'GET',
        		url: apiUrl + 'api/schedules',
        	}).then(function(response) {
        		defer.resolve(response.data);
        	},function(err) {
        		console.log("schedules error" + JSON.stringify(err));
        		defer.resolve(err);
        	});
        	return defer.promise;
        }
        function saveEvent(id) {
            var defer = $q.defer();
            $http({
                method: 'PUT',
                url: apiUrl + 'api/users/' + id,
            }).then(function(response){
                defer.resolve(response.data);
            },function(err){
                defer.reject(err)
            })
            return defer.promise;
        }
    }
})();
