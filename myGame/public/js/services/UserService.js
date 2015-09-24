angular.module('UserService', []).factory('User', ['$http', function ($http) {
        var userData;
        return {
            get: function () {
                return $http.get('/api/users').success(function (data) {
                    return data;
                });
            },
            delete: function (id) {
                return $http.delete('/api/users/' + id);
            }
        }
    }]);