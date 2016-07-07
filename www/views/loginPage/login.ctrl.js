(function() {
        'use strict';

        angular
            .module('app')
            .controller('LoginCtrl', LoginCtrl);

        LoginCtrl.$inject = ['authenticationService', '$rootScope', 'localStorageService', '$ionicPopup'];

        /* @ngInject */
        function LoginCtrl(authenticationService, $rootScope, localStorageService, $ionicPopup) {
            var vm = this;
            vm.title = 'LoginCtrl';
            vm.login = login;
            vm.facebook = facebook;


            /*activate();

            ////////////////

            function activate() {
            }*/

            function login(username, password) {
                /*localStorageService.remove('authorizationData');*/
                authenticationService.login(username, password)
                    .then(function(response) {


                            console.log("login sucess" + JSON.stringify(response));
                        },
                        function(err) {
                            
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Oops!',
                                    template: 'Wrong email or password, try again'
                                });
                                console.log("login error" + JSON.stringify(err));
                            })
                    }

                function facebook() {
                    authenticationService.facebook().then(
                        function(response) {
                            console.log(JSON.stringify(response));
                        },
                        function(err) {}
                    );
                }
            }
        })();
