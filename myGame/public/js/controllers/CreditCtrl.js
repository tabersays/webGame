angular.module('CreditCtrl', []).controller('CreditController', function ($scope) {
    $scope.peopleWhoEarnCredits = [
        { name: 'Taber Storm', task: 'Software Developement' },
        { name: 'Cara H.', task: 'Artist' }
    ];
});