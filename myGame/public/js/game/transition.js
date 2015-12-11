function transfer(event, self) {
    var map = new Map(event.location);
    self.stateStack[self.stateStack.length - 1] = [];
    self.stateStack[self.stateStack.length - 1].push(map.ground);
    self.stateStack[self.stateStack.length - 1].push(map.detail);
    self.stateStack[self.stateStack.length - 1].push(map.blocked);
    self.stateStack[self.stateStack.length - 1].push(map.npcs);
    self.stateStack[self.stateStack.length - 1].push(self.character);
    self.stateStack[self.stateStack.length - 1].push(map.over);
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
    self.character.map = event.location;
    console.log(map);
    $.ajax({
        url: '/api/save-location/' + window.myCharacterId,
        dataType: 'json',
        method: 'post',
        data: {
            location: {
                map: self.character.map,
                x: self.character.x,
                y: self.character.y
            }
        },
        success: function(result) {
            console.log(result);
        }
    });
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
}