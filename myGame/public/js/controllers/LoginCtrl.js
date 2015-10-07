angular.module('LoginCtrl', []).controller('LoginController', ['$scope', '$location', 'Account', function ($scope, $location, Account) {
        $scope.userData = {
            email: '',
            password: ''
        };
        $scope.login = function (userData) {
            Account.post(userData).then(function (response) {
                if (response.data.message === 'success') {
                    $location.url('/');
                    $scope.isLoggedIn = true;
                }
                console.log(response);
            });
        };
    }]);