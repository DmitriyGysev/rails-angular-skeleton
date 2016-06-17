angular.module('RailsAngularSkeleton', ['ui.router', 'templates', 'Devise'])

    .config([
        '$stateProvider',
        '$urlRouterProvider',
        'AuthProvider',
        '$compileProvider',
        '$locationProvider',
        function($stateProvider, $urlRouterProvider, AuthProvider, $compileProvider, $locationProvider
    ) {
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/);


            AuthProvider.registerPath('users');

            $stateProvider
                
                .state('home', {
                    url: '/home',
                    templateUrl: 'home/_home.html',
                    controller: 'homeCtrl'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'auth/_login.html',
                    controller: 'AuthCtrl',
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                            $state.go('home');
                        })
                    }]
                })

                .state('register', {
                    url: '/register',
                    templateUrl: 'auth/_register.html',
                    controller: 'AuthCtrl',
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                            $state.go('home');
                        })
                    }]
                });

            // $urlRouterProvider.otherwise('home');
            $locationProvider.html5Mode(true).hashPrefix('*');
            $urlRouterProvider.otherwise("/");

        }
    ]).run(['$rootScope', function($rootScope) {

    $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
            console.log('error', error);
        })
}]);