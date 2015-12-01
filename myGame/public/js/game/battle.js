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
        messages: [],
        update: function() {
            if (this.choice) {
                if (this.hero.hp <= 0 || this.enemy.hp <= 0) {
                    //someone died
                    if (this.hero.hp <= 0)
                        this.hero.hp = this.hero.maxHp;
                    return ([0, 1, {type: 'battleDone'}]);
                }
                this.choice = false;
                if (Key.isDown(Key.LEFT)){
                    if (this.choiceNumber === 0)
                        return;
                    this.choiceNumber = Math.abs((--this.choiceNumber % 2));
                    this.choice = true;
                }
                if (Key.isDown(Key.RIGHT)) {
                    if (this.choiceNumber === 1)
                        return;
                    this.choiceNumber = Math.abs((++this.choiceNumber % 2));
                    this.choice = true;
                }
                if (Key.isDown(Key.SELECT)) {
                    if (this.choiceNumber === 1) {
                        //escape
                        return ([0, 1, {type: 'battleDone'}]);
                    }
                    else {
                        console.log(this.hero);
                        var enemyAttack = this.enemy.attack();
                        var heroAttack = this.hero.attack();

                        this.hero.hp -= enemyAttack.damage;
                        this.enemy.hp -= heroAttack.damage;
                        this.messages.push(this.enemy.name + ' uses ' + enemyAttack.name + ' and deals ' + enemyAttack.damage + ' damage!');
                        this.messages.push(this.hero.name + ' uses ' + heroAttack.name + ' and deals ' + heroAttack.damage + ' damage!');

                        if (this.enemy.hp <= 0) {
                            this.enemy.hp = 0;
                            this.messages.push(this.enemy.name + ' was killed!');
                        }

                        if (this.hero.hp <= 0) {
                            this.hero.hp = 0;
                            this.messages.push(this.hero.name + ' was killed!');
                        }
                    }
                }
            }
            else {
                if(this.messages.length > 0) {
                    if (Key.isDown(Key.SELECT)) {
                        this.messages.shift();
                    }
                }
                else {
                    this.choice = true;
                }
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

            //character
            context.fillStyle = 'gray';
            context.fillRect(0, canvasHeight-20, (canvasWidth/2), 10);
            context.fillStyle = 'red';
            context.fillRect(0, canvasHeight-20, (canvasWidth/2)*(this.hero.hp/this.hero.maxHp), 10);
            context.fillStyle = 'black';
            context.font = '20px Arial';
            context.fillText(this.hero.name, 0, canvasHeight - 40);

            //enemy
            context.fillStyle = 'gray';
            context.fillRect(canvasWidth/2, 20, canvasWidth/2, 10);
            context.fillStyle = 'red';
            context.fillRect(canvasWidth/2, 20, (canvasWidth/2)*(this.enemy.hp/this.enemy.maxHp), 10);
            context.fillStyle = 'black';
            context.font = '20px Arial';
            context.fillText(this.enemy.name, canvasWidth/2, 20);

            if (this.messages.length > 0) {
                context.fillStyle = 'black';
                context.font = '20px Arial';
                context.fillText(this.messages[0], 10, canvasHeight-60);
            }

        }
    });
    return battleState;
}