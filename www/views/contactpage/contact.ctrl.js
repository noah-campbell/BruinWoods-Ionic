(function() {
    'use strict';

    angular
        .module('app')
        .controller('ContactCtrl', ContactCtrl);

    ContactCtrl.$inject = [];

    /* @ngInject */
    function ContactCtrl() {
        var vm = this;
        vm.title = 'ContactCtrl';

        activate();

        ////////////////

        function activate() {
        }
    }
})();