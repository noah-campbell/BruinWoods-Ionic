(function() {
    'use strict';

    angular
        .module('app')
        .controller('SignupCtrl', SignupCtrl);

    SignupCtrl.$inject = ['authenticationService'];

    /* @ngInject */
    function SignupCtrl(authenticationService) {
        var vm = this;
        vm.title = 'SignupCtrl';
        vm.signup = signup;

        activate();

        ////////////////

        function activate() {
        }

        function signup(newUser) {
        	authenticationService.signup(newUser).
        		then(function(res) {
        			console.log('account successfully created!');
        		}, function(err) {
        			console.log('please try again later?');
        		});
        }
    }
})();