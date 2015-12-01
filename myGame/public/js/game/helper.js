function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var canvasWidth = 640;
var canvasHeight = 480;

var Key = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SELECT: 65,
    MENU: 67,

    isDown: function(keyCode){
        return this._pressed[keyCode];
    },

    onKeydown: function(event){
        this._pressed[event.keyCode] = true;
    },

    onKeyup: function(event){
        delete this._pressed[event.keyCode];
    }
};

window.addEventListener('keyup', function(event) {
        Key.onKeyup(event);
    },
    false);

window.addEventListener('keydown', function(event) {
    Key.onKeydown(event);
}, false);