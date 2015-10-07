angular.module('CharacterService', []).factory('Character', ['$http', function ($http) {
        var userData;
        return {
            get: function () {
                return $http.get('/api/characters').success(function (data) {
                    return data;
                });
            },

            create: function (character) {
                return $http.post('/api/characters', character).success(function (data) {
                    return data;
                });
            },

            delete: function (id) {
                return $http.delete('/api/characters/' + id);
            }
        }
    }]);