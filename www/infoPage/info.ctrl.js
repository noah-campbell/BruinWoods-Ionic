(function() {
    'use strict';

    angular
        .module('app')
        .controller('InfoCtrl', InfoCtrl);

    InfoCtrl.$inject = [];

    /* @ngInject */
    function InfoCtrl() {
        var vm = this;
        vm.title = 'InfoCtrl';

        activate();

        ////////////////

        function activate() {
        }
    }
})();