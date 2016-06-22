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

        activate();

        ////////////////

        function activate() {
        }
    }
})();