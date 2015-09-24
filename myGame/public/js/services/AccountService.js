angular.module('AccountService', []).factory('Account', ['$http', function ($http) {
        
        return {
            post: function (userData) {
                return $http.post('/api/login', { email: userData.email, password: userData.password }).success(function (data) {
                    return data;
                });
            },
            
            create: function (userData) {
                return $http.post('/api/signup', { email: userData.email, password: userData.password }).success(function (data) { 
                    return data;
                });
            }

        }
    }]);