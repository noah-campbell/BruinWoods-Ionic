(function() {
    'use strict';

    angular
        .module('app')
        .factory('infoService', infoService);

    infoService.$inject = ['$q', 'apiUrl', '$http'];

    /* @ngInject */
    function infoService($q, apiUrl, $http) {
        var service = {
            getInfos: getInfos
        };
        return service;

        ////////////////

        function getInfos() {
        	console.log("info factory reached");
        	var defer = $q.defer();
        	$http({
        		method: 'GET',
        		url: apiUrl + "api/infos/active"
        	}).then(function(response) {
        		console.log(response);
        		defer.resolve(response);
        	},function(err) {
        		console.log(err);
        		defer.reject(err);
        	});
        	return defer.promise;
        }
    }
})();