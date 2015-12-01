angular.module('PlayGameCtrl', []).controller('PlayGameController', function ($scope, $routeParams) {
    window.myCharacterId = $routeParams.id;
    Game.initialize('test');
    Game.run();
    /*(function repeat(){
        Game._intervalId = setInterval(Game.run, 1000/10);
    })();*/

    console.log('game loaded');
});