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
         vm.facebook = facebook;



        function signup(newUser) {
            var user = {
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
            authenticationService.signup(user).
            then(function(res) {
                console.log('account successfully created!');
                $location.url('/login');
            }, function(err) {
                console.log('please try again later?');
            });
        }

        function facebook() {
            authenticationService.facebook()
                .then(function(data) {
                    console.log('logged in with facebook!');
                })
        }
    }
})();
