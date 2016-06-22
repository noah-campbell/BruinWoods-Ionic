(function() {
    'use strict';

    angular
        .module('app')
        .factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$http', '$q', 'apiUrl', '$rootScope'];

    /* @ngInject */
    function authenticationService($http, $q, apiUrl, $rootScope) {
        var service = {
            login: login,
            signup: signup
        };
        return service;

        ////////////////

        function signup(newUser) {
        	var defer = $q.defer();
        	$http({
        		method: 'POST',
        		url: apiUrl + 'auth/signup',
        		data: newUser
        	}).then(function(res){
        		defer.resolve(res);
        	},function(err){
        		defer.reject(err);
        	});
        	return defer.promise;
        }

        function login(username, password) {
            /*logout();*/
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: apiUrl + 'auth/login',
                data: {
                    'username': username,
                    'password': password
                }
            }).then(function(res) {
            	$rootScope.authenticated = true;
        		$rootScope.current_user = res.user.username;
        		$location.path('page4');
            }, function(err) {
            	defer.reject(err);
            });
            return defer.promise;
        }

    }
})();
