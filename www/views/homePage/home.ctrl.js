(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['weatherService'];

    /* @ngInject */


    function HomeCtrl(weatherService) {
        var vm = this;  
        vm.title = 'HomeCtrl';
        vm.toggleInfo = function() {
            vm.info = !vm.info;
            vm.schedule = false;
            vm.social = false;
        }

        vm.toggleSchedule = function() {
            vm.schedule = !vm.schedule;
            vm.info = false;
            vm.social = false;
        }

        vm.toggleSocial = function() {
            vm.social = !vm.social;
            vm.info = false;
            vm.schedule = false;
        }


        var getWeather = function() {
            weatherService.getWeather().then(
                function(response) {
                    vm.weather = response.data;
                    console.log(vm.weather);
                 
        var skycons = new Skycons({"color": "black"});
        skycons.add("weatherIcon", vm.weather.currently.icon);

                     skycons.play();

                }

            )
        }


        function activate() {
            getWeather();
        }
        activate();
 
    }


})();
