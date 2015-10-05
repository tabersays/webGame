window.onload = function(){
    Game.initialize();
    Game.addPlayer(30, 30);

    Game._intervalId = setInterval(Game.run, 0);
    console.log('game loaded');
};