var Game = {};

Game.fps = 30;

Game.initialize = function(JSON) {
    var character = new Character();
    var map = new Map(character.map);

    this.context = document.getElementById('game').getContext('2d');
    this.stateStack = [];
    this.stateStack[0] = [];
    this.stateStack[0].push(map.ground);
    this.stateStack[0].push(map.detail);
    this.stateStack[0].push(map.blocked);
    this.stateStack[0].push(map.npcs);
    this.stateStack[0].push(character);
    this.stateStack[0].push(map.over);
    this.map = map;
    this.character = character;
};

Game.draw = function(){
    var self = this;
    self.context.clearRect(0, 0, 640, 480);
    for(var i = 0; i < self.stateStack[self.stateStack.length - 1].length; i++){
        self.stateStack[self.stateStack.length - 1][i].draw(self.context);
    }
};

Game.update = function(){
    var self = this;
    for(var i = 0; i < self.stateStack[self.stateStack.length - 1].length; i++){
        var event =  self.stateStack[self.stateStack.length - 1][i].update(self.context, self.map, self.character, self);
        if (event) {
            if (event[2].type === 'transfer') {
                transfer(event[2], self);
            }
            if (event[2].type === 'battle') {
                Game.fps = 10;
                self.stateStack.push( battle(event[2], self));
                //break;
            }
            if (event[2].type === 'menu') {
                Game.fps = 10;
                self.stateStack.push( menu(event[2], self));
                //break;
            }
            if (event[2].type === 'menuDone') {
                Game.fps = 30;
                self.stateStack.pop();
                //break;
            }
            if (event[2].type === 'battleDone') {
                Game.fps = 30;
                if (self.character.direction === 0)
                    self.character.y += 10;
                if (self.character.direction === 1)
                    self.character.x -= 10;
                if (self.character.direction === 2)
                    self.character.y -= 10;
                if (self.character.direction === 3)
                    self.character.x += 10;
                self.stateStack.pop();
            }
            if (event[2].type === 'conversation') {
                self.character.pause = true;
                Game.fps = 10;
                self.stateStack[self.stateStack.length - 1].push(conversation(event, self));
            }
            if (event[2].type === 'conversationDone') {
                self.character.pause = false;
                Game.fps = 30;
                self.stateStack[self.stateStack.length - 1].pop();
            }
        }
    }
};

Game.run = (function(){
    return function() {
        Game.update();
        Game.draw();
        window.setTimeout(Game.run, 1000/Game.fps);
    };
})();
