(function() {
    'use strict';

    angular
        .module('app')
        .controller('SignupCtrl', SignupCtrl);

    SignupCtrl.$inject = ['authenticationService', 'toastr'];

    /* @ngInject */
    function SignupCtrl(authenticationService, toastr) {
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
        			toastr.success('account successfully created!');
        		}, function(err) {
        			toastr.warning('please try again later?');
        		});
        }
    }
})();