angular.module('PlayGameCtrl', []).controller('PlayGameController', function ($scope, $routeParams) {
    window.myCharacterId = $routeParams.id;
    Game.initialize("test");
    Game._intervalId = setInterval(Game.run, 0);
    console.log('game loaded');
});