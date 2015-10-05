function Character(x, y){
    this.x = x;
    this.y = y;
    this.hero = new Image();
    this.hero.src = "js/game/assets/hero/test.png";
    this.sheetHeight = 144;
    this.sheetWidth = 96;
    this.charWidth = 32;
    this.charHeight = 36;
}
//32 x 36
Character.prototype.draw = function(context){
    if(this.hero.complete){
        context.drawImage(this.hero, 0, 0, 32, 36, this.x, this.y, 32, 36);
    }
};

Character.prototype.update = function(context){
    if (Key.isDown(Key.UP)) this.moveUp();
    if (Key.isDown(Key.LEFT)) this.moveLeft();
    if (Key.isDown(Key.DOWN)) this.moveDown();
    if (Key.isDown(Key.RIGHT)) this.moveRight();
};

Character.prototype.moveUp = function(){
    this.y -= 4;
};
Character.prototype.moveDown = function(){
    this.y += 4;
};
Character.prototype.moveLeft = function(){
    this.x -= 4;
};
Character.prototype.moveRight = function(){
    this.x += 4;
};