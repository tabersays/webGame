angular.module('UserService', []).factory('User', ['$http', function ($http) {
        var userData;
        return {
            get: function () {
                return $http.get('/api/users').success(function (data) {
                    return data;
                });
            },
            
            create: function (userData) {
                return $http.post('/api/users', { name: userData });
            },

            delete: function (id) {
                return $http.delete('/api/users/' + id);
            }
        }
    }]);