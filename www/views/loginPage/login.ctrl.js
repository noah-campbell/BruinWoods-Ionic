(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['authenticationService', '$rootScope'];

    /* @ngInject */
    function LoginCtrl(authenticationService, $rootScope) {
        var vm = this;
        vm.title = 'LoginCtrl';
        vm.login = login;
        vm.facebook = facebook;


        /*activate();

        ////////////////

        function activate() {
        }*/

        function login(username, password) {
        	authenticationService.login(username, password)
        		.then(function(data) {
        			
        		});
        }
        function facebook() {
            authenticationService.facebook().then(
                function(response) {
                    console.log(JSON.stringify(response));
                },
                function(err) {
                    console.log('an error occured');
                    console.log(JSON.stringify(err));
                }
            );
        }
    }
})();