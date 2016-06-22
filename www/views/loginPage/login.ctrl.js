(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['authenticationService'];

    /* @ngInject */
    function LoginCtrl(authenticationService) {
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
        			console.log('logged in!');
        		});
        }
    }
})();