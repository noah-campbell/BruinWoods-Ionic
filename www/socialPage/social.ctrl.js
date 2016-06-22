(function() {
    'use strict';

    angular
        .module('app')
        .controller('SocialCtrl', SocialCtrl);

    SocialCtrl.$inject = [];

    /* @ngInject */
    function SocialCtrl() {
        var vm = this;
        vm.title = 'SocialCtrl';

        activate();

        ////////////////

        function activate() {
        }
    }
})();