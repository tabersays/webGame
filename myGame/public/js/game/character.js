var sheetHeight = 144;
var sheetWidth = 96;
var charWidth = 32;
var charHeight = 36;
var up = 0;
var right = 1;
var down = 2;
var left = 3;
function Character(){
    var self = this;
    $.ajax({
        url: '/api/characters/' + window.myCharacterId,
        contentType:'application/json; charset=utf-8',
        dataType: 'json',
        async: false
    }).complete(function(character) {
        character = character.responseJSON;
        self.id = character._id;
        self.x = character.location.x;
        self.y = character.location.y;
        self.map = character.location.map;
        self.heroImage = new Image();
        self.heroImage.src = 'js/game/assets/hero/' + character.spriteSheet + '.png';
        self.direction = down;
        self.step = 1;
        $.extend(true, self, character);
        $.extend(true, self, character.attributes);
        console.log(self);
    });
}
Character.prototype.draw = function(context){
    if(this.heroImage.complete){
        context.drawImage(this.heroImage, (32*this.step), (36*this.direction), charWidth, charHeight, this.x, this.y, charWidth, charHeight);
    }
};

Character.prototype.update = function(context, map){
    if (this.pause && this.pause === true)
        return;

    if (Key.isDown(Key.UP))
        this.moveUp(map);

    if (Key.isDown(Key.LEFT))
        this.moveLeft(map);

    if (Key.isDown(Key.DOWN))
        this.moveDown(map);

    if (Key.isDown(Key.RIGHT))
        this.moveRight(map);

    if (Key.isDown(Key.MENU))
        return [0, 1, {type: 'menu'}];

    if (Key.isDown((Key.SELECT))) {
        switch (this.direction) {
            case up:
                this.y -= 5;
                break;
            case down:
                this.y += 5;
                break;
            case left:
                this.x -= 5;
                break;
            case right:
                this.x += 5;
                break;
        }
        var touch = intersects(this, map.interact);
        switch (this.direction) {
            case up:
                this.y += 5;
                break;
            case down:
                this.y -= 5;
                break;
            case left:
                this.x += 5;
                break;
            case right:
                this.x -= 5;
                break;
        }
        if(touch)
            return touch;
    }

    var event = intersects(this, map.event);
    if (event) {
        return event;
    }
    else {
        return false;
    }
};

Character.prototype.moveUp = function(map){
    if(this.direction !== up) {
        this.step = 1;
        this.direction = up;
    }
    else {
        if (this.step < 2) {
            this.step++;
        }
        else {
            this.step = 0;
        }
    }
    this.y -= 4;
    if(intersects(this, map.blocked))
        this.y += 4;
    if (this.y < 0) {
        this.y = 0;
    }
};
Character.prototype.moveDown = function(map){
    if(this.direction !== down) {
        this.step = 1;
        this.direction = down;
    }
    else {
        if (this.step < 2) {
            this.step++;
        }
        else {
            this.step = 0;
        }
    }
    this.y += 4;
    if(intersects(this, map.blocked))
        this.y -= 4;
    if (this.y > (480 - 36)) {
        this.y = (480 - 36);
    }
};
Character.prototype.moveLeft = function(map){
    if(this.direction !== left) {
        this.step = 1;
        this.direction = left;
    }
    else {
        if (this.step < 2) {
            this.step++;
        }
        else {
            this.step = 0;
        }
    }
    this.x -= 4;
    if(intersects(this, map.blocked))
        this.x += 4;
    if (this.x < 0) {
        this.x = 0;
    }
};
Character.prototype.moveRight = function(map){
    if(this.direction !== right) {
        this.step = 1;
        this.direction = right;
    }
    else {
        if (this.step < 2) {
            this.step++;
        }
        else {
            this.step = 0;
        }
    }
    this.x += 4;
    if(intersects(this, map.blocked))
        this.x -= 4;
    if (this.x > (640 - 32)) {
        this.x = (640 - 32);
    }
};