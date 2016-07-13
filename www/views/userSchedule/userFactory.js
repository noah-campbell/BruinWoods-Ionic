(function() {
    'use strict';

    angular
        .module('app')
        .factory('userFactory', userFactory);

    userFactory.$inject = ['$q', '$http', 'apiUrl'];

    /* @ngInject */
    function userFactory($q, $http, apiUrl) {
        var service = {
            getEvents: getEvents
        };
        return service;

        ////////////////

        function getEvents() {
        	var defer = $q.defer();
        	$http({
        		method: 'GET',
        		url: apiUrl + 'api/users/events'
        	}).then(function(response) {
        		defer.resolve(response);
        	}, function(err) {
        		defer.reject(err);
        	})
        	return defer.promise;
        }
    }
})();