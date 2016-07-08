(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['weatherService', '$ionicPopup', '$ionicModal', 'infoService'];

    /* @ngInject */

    function HomeCtrl(weatherService, $ionicPopup, $ionicModal, $scope, infoService) {
        var vm = this;
        vm.title = 'HomeCtrl';
        ////
        function activate() {
            getWeather();
            getInfos();
        }
        activate();

        vm.openInAppBrowser = function() {
                // Open in app browser
                var ref = window.open('https://docs.google.com/viewer?url=https://alumni.ucla.edu/wp-content/uploads/2015/05/map01.pdf&embedded=true', '_blank', 'location=no');
            }
            // Show and hide on homepage
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

        // Welcome popup

        vm.welcomeAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Welcome!',
                template: 'Here you can view the schedules and plan your day, access important information about the camp, or check us out on social media and view our photo stream!'
            });
        };

        // Additional weather info popup
        vm.weatherPopup = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Weather',
                template: '<p>' + vm.weather.daily.summary + '</p> Current wind speed is <span> ' + Math.round(vm.weather.currently.windSpeed) + ' mph</span> <br> The chance of rain today is ' + vm.weather.currently.precipProbability + '%</span>'
            });
        };

        // Getting weather function
        var getWeather = function() {
            weatherService.getWeather().then(
                function(response) {
                    vm.weather = response.data;
                    // Rounding current temperature to whole number
                    vm.temp = Math.round(vm.weather.currently.temperature);
                    console.log(vm.weather);

                    // Current weather icon
                    var skycons = new Skycons({ "color": "black" });
                    skycons.add("weatherIcon", vm.weather.currently.icon);

                    skycons.play();
                }
            );
        }

        function getInfos() {
            infoService.getInfos().then(function(response) {
                vm.infos = response.data;
                console.log(response.data);
            })
        }

    }
})();
