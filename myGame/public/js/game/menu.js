function menu(event, self) {
    var menuState = [];

    menuState.push({
        hero: self.character,
        choiceNumber: 0,
        update: function() {
            if (Key.isDown(Key.SELECT)) {
                return [0,1, {type: 'menuDone'}];
            }
            if (Key.isDown(Key.DOWN)){
                if (this.choiceNumber === 3)
                    return;
                this.choiceNumber = Math.abs((++this.choiceNumber % 4));
            }
            if (Key.isDown(Key.UP)) {
                if (this.choiceNumber === 0)
                    return;
                this.choiceNumber = Math.abs((--this.choiceNumber % 4));
            }
        },
        draw: function(context) {
            context.fillStyle = 'white';
            context.fillRect(0, 0, canvasWidth, canvasHeight);
            context.globalAlpha = 0.5;
            context.fillStyle = 'blue';
            context.fillRect(0, 0, canvasWidth, canvasHeight);
            context.globalAlpha = 1;
            context.fillStyle = 'white';
            context.strokeRect(0, 0, canvasWidth/3, canvasHeight);
            context.strokeRect(canvasWidth/3, 0, canvasWidth *(2/3), canvasHeight);
            //name
            context.fillStyle = 'black';
            context.font = '20px Arial';
            context.fillText(this.hero.name, canvasWidth/3 + 10, 20);
            context.fillText('View', 10, 20);
            context.fillText('Items', 10, 60);
            context.fillText('Abilities', 10, 100);
            context.fillText('Stats', 10, 140);
            //context.fillText('stats', 0, 150);
            //select rect
            context.strokeRect(0, 40*this.choiceNumber - 5, canvasWidth/3, 30);

            if (this.choiceNumber === 0) {
                context.fillStyle = 'black';
                context.font = '20px Arial';
                context.fillText('View', canvasWidth/3 + 10, 50);

                context.drawImage(this.hero.heroImage, 32, 36*2, 32, 36, canvasWidth/3 + 120, 50, 32, 36)
            }
            if (this.choiceNumber === 1) {
                context.fillStyle = 'black';
                context.font = '20px Arial';
                context.fillText('Items:', canvasWidth/3 + 10, 50);
            }
            if (this.choiceNumber === 2) {
                context.fillStyle = 'black';
                context.font = '20px Arial';
                context.fillText('Abilities:', canvasWidth/3 + 10, 50);

                context.fillText('Str:', canvasWidth/3 + 10, 80);
                context.fillText(this.hero.str, canvasWidth/3 + 80, 80);

                context.fillText('Dex:', canvasWidth/3 + 10, 110);
                context.fillText(this.hero.str, canvasWidth/3 + 80, 110);

                context.fillText('Spd:', canvasWidth/3 + 10, 140);
                context.fillText(this.hero.str, canvasWidth/3 + 80, 140);

                context.fillText('Con:', canvasWidth/3 + 10, 170);
                context.fillText(this.hero.str, canvasWidth/3 + 80, 170);

                context.fillText('End:', canvasWidth/3 + 10, 200);
                context.fillText(this.hero.str, canvasWidth/3 + 80, 200);

                context.fillText('Int:', canvasWidth/3 + 10, 230);
                context.fillText(this.hero.str, canvasWidth/3 + 80, 230);

                context.fillText('Sol:', canvasWidth/3 + 10, 260);
                context.fillText(this.hero.str, canvasWidth/3 + 80, 260);
            }
            if (this.choiceNumber === 3) {
                context.fillStyle = 'black';
                context.font = '20px Arial';
                context.fillText('Statistics:', canvasWidth/3 + 10, 50);
                context.fillText('Hp: ' + this.hero.hp + '/' + this.hero.maxHp, canvasWidth/3 + 10, 90);
                context.fillText('Mp: ' + this.hero.mp + '/' + this.hero.maxMp, canvasWidth/3 + 10, 130);
                context.fillText('Ep: ' + this.hero.ep + '/' + this.hero.maxEp, canvasWidth/3 + 10, 170);
                //hp
                context.fillStyle = 'gray';
                context.fillRect(canvasWidth/3 + 120, 90, (200), 10);
                context.fillStyle = 'red';
                context.fillRect(canvasWidth/3 + 120, 90, (200)*(this.hero.hp/this.hero.maxHp), 10);
                //mp
                context.fillStyle = 'gray';
                context.fillRect(canvasWidth/3 + 120, 130, (200), 10);
                context.fillStyle = 'blue';
                context.fillRect(canvasWidth/3 + 120, 130, (200)*(this.hero.mp/this.hero.maxMp), 10);
                //ep
                context.fillStyle = 'gray';
                context.fillRect(canvasWidth/3 + 120, 170, (200), 10);
                context.fillStyle = 'green';
                context.fillRect(canvasWidth/3 + 120, 170, (200)*(this.hero.ep/this.hero.maxEp), 10);
            }
        }
    });

    return menuState;
}