angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .when('/users', {
            templateUrl: 'views/user.html',
            controller: 'UserController'
        })
        .when('/credits', {
            templateUrl: 'views/credits.html',
            controller: 'CreditController'
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignUpController'
        })
        .when('/game', {
            templateUrl: 'views/game.html',
            controller: 'GameController'
        })

        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
}]);