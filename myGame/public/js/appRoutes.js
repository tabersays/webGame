angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
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
        .when('/game/play', {
         templateUrl: 'views/play.html',
         controller: 'PlayGameController'
         })

        .otherwise({
            redirectTo: '/'
        });
    $httpProvider.interceptors.push(function ($q, $location) {
        return {
            response: function (response) {
                // do something on success
                return response;
            }, responseError: function (response) {
                if (response.status === 401) $location.url('/login');
                return $q.reject(response);
            }
        };
    });
    $locationProvider.html5Mode(true);
}]);