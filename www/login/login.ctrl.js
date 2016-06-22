(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['authenticationService', 'toastr'];

    /* @ngInject */
    function LoginController(authenticationService, toastr) {
        var vm = this;
        vm.title = 'LoginCtrl';
        vm.login = login;

        /*activate();

        ////////////////

        function activate() {
        }*/

        function login(username, password) {
        	authenticationService.login(username, password)
        		.then(function(data) {
        			toastr.success('logged in!');
        		});
        }
    }
})();