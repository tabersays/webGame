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

function battle(event, self) {
    var battleState = [];
    /////////////////////////////////////////////
    var testEnemy = {
        name: 'Wolf',
        hp: 10,
        mp: 10,
        ep: 10,
        maxHp: 10,
        maxMp: 10,
        maxEp: 10,
        str: 1,
        dex: 1,
        spd: 1,
        sol: 1,
        con: 1,
        end: 1,
        mnd: 1,
        exp: 1,
        monsterImage: new Image(),
        attack: function () {
            if (this.ep >= 10) {
                if (getRandomInt(0, 10) % 2 === 0) {
                    this.ep -= 10;
                    return {
                        name: 'razor fang',
                        type: 'physical',
                        damage: 15
                    }
                }
                else {
                    return {
                        name: 'bite',
                        type: 'physical',
                        damage: 5
                    }
                }
            }
            else {
                return {
                    name: 'bite',
                    type: 'physical',
                    damage: 5
                }
            }
        }
    };
    testEnemy.monsterImage.src = '/js/game/assets/enemies/wolf.png';
    ///////////////////////////////////////////////
    battleState.push({
        enemy: testEnemy,
        hero: self.character,
        choice: true,
        choiceNumber: 0,
        update: function() {
            if (this.choice) {
                this.choice = false;
                if (Key.isDown(Key.LEFT))
                    this.choiceNumber = Math.abs((--this.choiceNumber % 2));
                if (Key.isDown(Key.RIGHT))
                    this.choiceNumber = Math.abs((++this.choiceNumber % 2));
                if (Key.isDown(Key.SELECT)) {
                    if (this.choiceNumber === 1) {
                        //escape
                        return ([0, 1, {type: 'battleDone'}]);
                    }
                }

                this.choice = true;
            }
            else {

            }
        },
        draw: function(context) {
            var background = new Image();
            background.src = '/js/game/assets/backgrounds/grass.png';
            //context.fillStyle = 'green';
            context.drawImage(background, 0, 0, canvasWidth, canvasHeight);
            context.drawImage(this.enemy.monsterImage, canvasWidth*2/5, 150, 200, 100);
            context.fillStyle = 'blue';
            context.globalAlpha = 0.5;
            context.fillRect(0, canvasHeight/2, canvasWidth, canvasHeight/2);
            context.globalAlpha = 1.0;
            context.fillStyle = 'black';
            context.font = '48px Arial';
            context.fillText('Attack', 0, canvasHeight*3/5);
            context.fillText('Run', canvasWidth/2, canvasHeight*3/5);
            context.strokeRect(0, canvasHeight/2, canvasWidth, canvasHeight/2);
            context.strokeRect(this.choiceNumber*canvasWidth/2, canvasHeight/2, 200, 75);
            context.fillStyle = 'gray';
            context.fillRect(0, canvasHeight-20, (canvasWidth/2), 10);

            context.fillStyle = 'red';
            console.log(this.hero);
            context.fillRect(0, canvasHeight-20, (canvasWidth/2)*(this.hero.hp/this.hero.maxHp), 10);

        }
    });
    return battleState;
}

function transfer(event, self) {
    var map = new Map(event.location);
    self.stateStack[self.stateStack.length - 1] = [];
    self.stateStack[self.stateStack.length - 1][0] = map.ground;
    self.stateStack[self.stateStack.length - 1][1] = map.detail;
    self.stateStack[self.stateStack.length - 1][2] = map.blocked;
    self.stateStack[self.stateStack.length - 1][3] = self.character;
    self.stateStack[self.stateStack.length - 1][4] = map.over;
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