(function() {
    'use strict';

    angular
        .module('app')
        .factory('infoService', infoService);

    infoService.$inject = ['$q', 'defer', 'apiUrl'];

    /* @ngInject */
    function infoService($q, defer, apiUrl) {
        var service = {
            func: func
        };
        return service;

        ////////////////

        function getInfos() {
        	var defer = $q.defer();
        	$http({
        		method: 'GET',
        		url: apiUrl + "api/infos/active"
        	}).then(function(response) {
        		defer.resolve(response);
        	},function(err) {
        		defer.reject(err);
        	})
        	return defer.promise;
        }
    }
})();