(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['weatherService', 'infoService', '$ionicPopup'];

    /* @ngInject */

    function HomeCtrl(weatherService, infoService, $ionicPopup ) {
        var vm = this;
        vm.title = 'HomeCtrl';
        vm.infos = [];
        vm.schedules = [];
        ////
        function activate() {
            getWeather();
            getInfos();
        };
        activate();

        vm.openInAppBrowser = function(url) {
            // Open in app browser
            var ref = window.open("https://docs.google.com/viewer?url="+url+"&embedded=true', '_blank', 'location=no");
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
        function getWeather() {
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
                response.data.forEach(function(info){
                    if(info.type == "schedule") {
                        vm.schedules.push(info);
                    }else {
                        vm.infos.push(info);
                    }
                })
                console.log(response.data);
            });
        }

    }
})();
