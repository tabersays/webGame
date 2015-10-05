angular.module('SignUpCtrl', []).controller('SignUpController', ['$scope', 'Account', function ($scope, Account) {
    $scope.userData = {
        email: '',
        password: ''
    };
    $scope.confirmPassword = '';
    $scope = false;
    $scope.signup = function (userData) {
        Account.create(userData).then(function (response) {
            console.log(response);
        });
    }
}]);