var Game = {};

Game.fps = 30;

Game.initialize = function(JSON) {
    var map = new Map(JSON);
    this.entities = [];
    this.context = document.getElementById("game").getContext("2d");
    this.entities.push(map.ground);
    this.entities.push(map.detail);
    this.entities.push(map.blocked);
    this.entities.push(new Character(100, 100));
    this.entities.push(map.over);


};

Game.draw = function(){
    this.context.clearRect(0, 0, 640, 480);
    for(var i = 0; i < this.entities.length; i++){
        this.entities[i].draw(this.context);
    }
};

Game.update = function(){
    this.entities[3].update(this.context);
};
Game.addMap = function(JSON) {
    Game.entities.push(new Map(JSON));

};
Game.addPlayer = function(x, y){
    Game.entities[3] = new Character(x, y);
};

Game.run = (function(){
    var loops = 0, skipTicks = 1000 / Game.fps,
        maxFrameSkip = 10,
        nextGameTick = (new Date).getTime();

    return function() {
        loops = 0;

        while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
            Game.update();
            nextGameTick += skipTicks;
            loops++;
        }

        Game.draw();
    };
})();
