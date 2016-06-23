(function() {
    'use strict';

    angular
        .module('app')
        .factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$http', '$q', 'apiUrl', '$rootScope', '$location'];

    /* @ngInject */
    function authenticationService($http, $q, apiUrl, $rootScope, $location) {
        var service = {
            login: login,
            signup: signup,
            facebook: facebook
        };
        return service;

        ////////////////

        function signup(newUser) {
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: apiUrl + 'auth/signup',
                data: newUser
            }).then(function(res) {
                console.log(res);
                if (res.data.state == 'success') {
                    defer.resolve(res.data.user);
                } else {
                    defer.reject(res);
                }
            }, function(err) {
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
                if (res.data.state == 'success') {
                    $rootScope.authenticated = true;
                    $rootScope.current_user = res.data.user.username;
                    console.log($rootScope.current_user);
                    $location.path('homepage');
                } else {
                    $location.path('loginPage');
                    defer.reject(res);
                }
                return defer.promise;
            });
        }

        function facebook() {
            var defer = $q.defer();

            facebookConnectPlugin.login(['public_profile', 'email'],
                function(response) {
                    $rootScope.authenticated = true;
                    defer.resolve(response);
                },
                function(err) {
                    defer.reject(err);
                }
            );

            return defer.promise;
        }
    }
})();
