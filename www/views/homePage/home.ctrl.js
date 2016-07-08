(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['weatherService', '$ionicPopup', '$ionicModal', '$scope'];


    /* @ngInject */

    function HomeCtrl(weatherService, $ionicPopup, $ionicModal, $scope) {
        var vm = this;
        vm.title = 'HomeCtrl';
        ////

        vm.openInAppBrowser = function() {
            // Open in app browser
            var ref = window.open('https://docs.google.com/viewer?url=https://alumni.ucla.edu/wp-content/uploads/2015/05/map01.pdf&embedded=true', '_blank', 'location=no');

        };
        // $scope.pdfURL = "https://alumni.ucla.edu/wp-content/uploads/2015/05/map01.pdf";

        // $scope.instance = pdf.Instance("viewer");

        /* $scope.nextPage = function() {
             $scope.instance.nextPage();
         };

         $scope.prevPage = function() {
             $scope.instance.prevPage();
         };

         $scope.gotoPage = function(page) {
             $scope.instance.gotoPage(page);
         };

         $scope.pageLoaded = function(curPage, totalPages) {
             $scope.currentPage = curPage;
             $scope.totalPages = totalPages;
         };

         $scope.loadProgress = function(loaded, total, state) {
             console.log('loaded =', loaded, 'total =', total, 'state =', state);
         };
             ////

             $ionicModal.fromTemplateUrl('my-modal.html', {
                 scope: $scope,
                 animation: 'slide-in-up'
             }).then(function(modal) {
                 $scope.modal = modal;
             });
             $scope.openModal = function() {
                 $scope.modal.show();
             };
             $scope.closeModal = function() {
                 $scope.modal.hide();
             };
             // Cleanup the modal when we're done with it!
             $scope.$on('$destroy', function() {
                 $scope.modal.remove();
             });
             // Execute action on hide modal
             $scope.$on('modal.hidden', function() {
                 // Execute action
             });
             // Execute action on remove modal
             $scope.$on('modal.removed', function() {
                 // Execute action
             });*/

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
            )
        }

        function activate() {
            getWeather();
        }
        activate();
    }
})();
