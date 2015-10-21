var sheetHeight = 144;
var sheetWidth = 96;
var charWidth = 32;
var charHeight = 36;
var up = 0;
var right = 1;
var down = 2;
var left = 3;
function Character(x, y){
    this.x = x;
    this.y = y;
    this.heroImage = new Image();
    this.heroImage.src = "js/game/assets/hero/test.png";
    this.direction = down;
    this.step = 1;
}
//32 x 36
Character.prototype.draw = function(context){
    if(this.heroImage.complete){
        context.drawImage(this.heroImage, (32*this.step), (36*this.direction), charWidth, charHeight, this.x, this.y, charWidth, charHeight);
    }
};

Character.prototype.update = function(context){
    if (Key.isDown(Key.UP))
        this.moveUp();
    if (Key.isDown(Key.LEFT))
        this.moveLeft();
    if (Key.isDown(Key.DOWN))
        this.moveDown();
    if (Key.isDown(Key.RIGHT))
        this.moveRight();
};

Character.prototype.moveUp = function(){
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
    //if(intersectsBlockedPath())
    if (this.y < 0) {
        this.y = 0;
    }
};
Character.prototype.moveDown = function(){
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
    if (this.y > (480 - 36)) {
        this.y = (480 - 36);
    }
};
Character.prototype.moveLeft = function(){
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
    if (this.x < 0) {
        this.x = 0;
    }
};
Character.prototype.moveRight = function(){
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
    if (this.x > (640 - 32)) {
        this.x = (640 - 32);
    }
};