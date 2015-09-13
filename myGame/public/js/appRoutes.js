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
        });
        $locationProvider.html5Mode(true);
    }]);