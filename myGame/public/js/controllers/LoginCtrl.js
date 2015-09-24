angular.module('LoginCtrl', []).controller('LoginController', ['$scope', 'Account', function ($scope, Account) {
        $scope.userData = {
            email: '',
            password: ''
        };
        $scope.login = function (userData) {
            Account.post(userData).then(function (response) {
                console.log(response);
            });
        };
    }]);