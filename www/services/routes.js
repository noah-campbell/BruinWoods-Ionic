angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
        .state('login', {
        url: '/login',
        templateUrl: 'loginPage/login.html',
        controller: 'LoginCtrl as login'
    })
    .state('signup', {
        url: '/signup',
        templateUrl: 'signupPage/signup.html',
        controller: 'SignupCtrl as signup'
    })

    .state('homepage', {
        url: '/homepage',
        templateUrl: 'homePage/home.html',
        controller: 'HomeCtrl'
    })

    .state('schedule', {
        url: '/schedule',
        templateUrl: 'schedulePage/schedule.html',
        controller: 'ScheduleCtrl'
    })

    .state('info', {
        url: '/info',
        templateUrl: 'infoPage/info.html',
        controller: 'InfoCtrl'
    })

    .state('social', {
        url: '/social',
        templateUrl: 'socialPage/social.html',
        controller: 'SocialCtrl'
    })

    .state('contact', {
        url: '/contact',
        templateUrl: 'contactPage/contact.html',
        controller: 'ContactCtrl'
    })

    $urlRouterProvider.otherwise('/login')



});
