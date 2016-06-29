(function() {
    'use strict';

    angular
        .module('app')
        .service('weatherService', weatherService);

    weatherService.$inject = ['$http', '$q', 'apiUrl', '$rootScope', '$location'];

    /* @ngInject */
    function weatherService($http, $q, apiUrl, $rootScope, $location) {
        var service = {
            getWeather: getWeather
        };

        return service;

        ////////////////

        function getWeather() {
            var defer = $q.defer();

            // Get weather
            $http.get(apiUrl + 'api/weather').then(
                function(response) {
                    if (typeof response.data === 'object') {
                        defer.resolve(response);
                    } else {
                        defer.reject(response);
                    }
                    
                },
                function(error) {

                }
            );
            return defer.promise;
        }

    }
})();
