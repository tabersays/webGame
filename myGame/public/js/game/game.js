var Game = {};

Game.fps = 30;

Game.initialize = function(JSON) {
    var map = new Map(JSON);
    var character = new Character(100, 100);
    this.entities = [];
    this.context = document.getElementById('game').getContext('2d');
    this.entities.push(map.ground);
    this.entities.push(map.detail);
    this.entities.push(map.blocked);
    this.entities.push(character);
    this.entities.push(map.over);
    this.map = map;
    this.character = character;
};

Game.draw = function(){
    this.context.clearRect(0, 0, 640, 480);
    for(var i = 0; i < this.entities.length; i++){
        this.entities[i].draw(this.context);
    }
};

Game.update = function(){
    var self = this;
    for(var i = 0; i < self.entities.length; i++){
        var event =  self.entities[i].update(self.context, self.map, self.character);
        if (event && event[2].type === 'transfer') {
            transfer(event[2], self);
        }
    }
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
