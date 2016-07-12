angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
        .state('login', {
        url: '/login',
        templateUrl: 'views/loginPage/login.html',
        controller: 'LoginCtrl as login'
    })
    .state('signup', {
        url: '/signup',
        templateUrl: 'views/signupPage/signup.html',
        controller: 'SignupCtrl as signup'
    })

    .state('homepage', {
        url: '/homepage',
        templateUrl: 'views/homePage/home.html',
        controller: 'HomeCtrl as home'
    })

    .state('schedule', {
        url: '/schedule',
        templateUrl: 'views/schedulePage/schedule.html',
        controller: 'ScheduleCtrl as schedule'
    })
/*
    .state('info', {
        url: '/info',
        templateUrl: 'views/infoPage/info.html',
        controller: 'InfoCtrl'
    })

    .state('social', {
        url: '/social',
        templateUrl: 'views/socialPage/social.html',
        controller: 'SocialCtrl'
    })
*/
    .state('userSchedule', {
        url: '/userSchedule',
        templateUrl: 'views/userSchedule/userSchedule.html',
        controller: 'UserScheduleCtrl as user'
    })

    $urlRouterProvider.otherwise('/login')



});
