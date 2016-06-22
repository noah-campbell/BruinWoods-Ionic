(function() {
    'use strict';

    angular
        .module('app')
        .controller('ScheduleCtrl', ScheduleCtrl);

    ScheduleCtrl.$inject = [];

    /* @ngInject */
    function ScheduleCtrl() {
        var vm = this;
        vm.title = 'ScheduleCtrl';

        activate();

        ////////////////

        function activate() {
        }
    }
})();