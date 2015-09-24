angular.module('UserCtrl', []).controller('UserController', ['$scope', 'User', function ($scope, User) {
        $scope.tagline = "Friends";
        $scope.getUsers = function () {
            User.get().then(function (response) {
                $scope.users = response.data;
            });
        }
        
        $scope.deleteUser = function (userId){
            User.delete(userId).then(function () {
                User.get().then(function (response) {
                    $scope.users = response.data;
                });
            });
        }
    }]);