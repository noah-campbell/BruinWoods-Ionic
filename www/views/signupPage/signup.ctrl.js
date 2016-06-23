(function() {
    'use strict';

    angular
        .module('app')
        .controller('SignupCtrl', SignupCtrl);

    SignupCtrl.$inject = ['authenticationService', '$location'];

    /* @ngInject */
    function SignupCtrl(authenticationService, $location) {
        var vm = this;
        vm.title = 'SignupCtrl';
        vm.signup = signup;




        function signup(newUser) {
            var itsreal = {
                username: newUser.username,
                password: newUser.password
            }
            if (!newUser.password || !newUser.confirmPassword || !newUser.username) {
                return;
            }
            if (newUser.password !== newUser.confirmPassword) {
                newUser.password = "";
                newUser.confirmPassword = "";
                return;
            }
            authenticationService.signup(itsreal).
            then(function(res) {
                $location.url('/login');
                console.log('account successfully created!');
            }, function(err) {
                console.log('please try again later?');
            });
        }
    }
})();
