angular.module('SignUpCtrl', []).controller('SignUpController', ['$scope', 'Account', '$location', function ($scope, Account, $location) {
    $scope.userData = {
        email: '',
        password: ''
    };
    $scope.confirmPassword = '';
    $scope.signUp = function (userData) {
        console.log('here');
        Account.create(userData).then(function (response) {
            $location.url('/');
        });
    }
}]);