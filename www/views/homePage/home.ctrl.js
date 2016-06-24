(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = [];

    /* @ngInject */
    function HomeCtrl() {
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



        activate();

        ////////////////

        function activate() {
        }
    }
})();