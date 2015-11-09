var Key = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,

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

function transfer(event, self) {
    var map = new Map(event.location);
    self.entities = [];
    self.entities[0] = map.ground;
    self.entities[1] =map.detail;
    self.entities[2] = map.blocked;
    self.entities[3] = self.character;
    self.entities[4] = map.over;
    self.map = map;
    switch (event.direction) {
        case 'top':
            self.character.y = 480 - 72;
            break;
        case 'bottom':
            self.character.y = 38;
            break;
        case 'left':
            self.character.x = 640 - 64;
            break;
        case 'right':
            self.character.x = 34;
            break;
    }
}

function intersects(character, map) {
    var intersects = false;
    $.each(map.layerMap, function(rowIndex, row) {
        $.each(row, function(colIndex, tile) {
            if(tile !== -1) {
                var tileYMin = rowIndex*32,
                    tileYMax = (rowIndex*32) + 32,
                    tileXMin = colIndex*32,
                    tileXMax = (colIndex*32) + 32,
                    charYMin = (character.y+24),
                    charYMax = (character.y+36),
                    charXMin = character.x,
                    charXMax = (character.x+32);

                if( (tileXMin <= charXMax && charXMax <= tileXMax) && (tileYMin <= charYMax && charYMax <= tileYMax) ||
                    (tileXMin <= charXMax && charXMax <= tileXMax) && (tileYMin <= charYMin && charYMin <= tileYMax) ||
                    (tileXMin <= charXMin && charXMin <= tileXMax) && (tileYMin <= charYMax && charYMax <= tileYMax) ||
                    (tileXMin <= charXMin && charXMin <= tileXMax) && (tileYMin <= charYMin && charYMin <= tileYMax) )
                    intersects = [rowIndex, colIndex, tile];
            }
        });
    });
    return intersects;
};

window.addEventListener('keyup', function(event) {
    Key.onKeyup(event);
},
    false);
window.addEventListener('keydown', function(event) {
    Key.onKeydown(event);
}, false);