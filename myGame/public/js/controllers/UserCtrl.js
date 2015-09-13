angular.module('UserCtrl', []).controller('UserController', ['$scope', 'User', function ($scope, User) {
        $scope.tagline = "Hehe nerds";
        $scope.getUsers = function () {
            console.log('getting users');
            User.get().then(function (response) {
                $scope.users = response.data;
            });
        }
        $scope.addUser = function (user) {
            console.log('Add called');
            User.create(user).then(function () { 
                User.get().then(function (response) {
                    $scope.users = response.data;
                });
            });

        }
        
        $scope.deleteUser = function (userId){
            console.log('deleting user');
            User.delete(userId).then(function () {
                User.get().then(function (response) {
                    $scope.users = response.data;
                });
            });
        }
    }]);