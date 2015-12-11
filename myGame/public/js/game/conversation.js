/**
 * Created by Taber on 12/10/2015.
 */
function conversation (event, self) {
    var messages = [];
    event = event[2];
    if (self.character.dialogs && self.character.dialogs[event.convId]) {
        console.log('already talked');
        console.log(event.default[0]);
        for (var i = 0; i < event.default.length; i++) {
            messages.push(event.default[i]);
        }
    }
    else {
        console.log('first time');
        for (i = 0; i < event.newDialog.length; i++) {
            console.log(event.newDialog[i]);
            messages.push(event.newDialog[i]);
        }
        if (!self.character.dialogs)
            self.character.dialogs = {};
        self.character.dialogs[event.convId] = true;
    }
    return {
        count: 5,
        messages: messages,
        hero: self.hero,
        draw: function(context) {
            if(!this.messages[0])
                return;
            context.fillStyle = 'blue';
            context.fillRect(0, canvasHeight * 2/3, canvasWidth, canvasHeight/3);

            context.fillStyle = 'black';
            context.font = '20px Arial';

            context.fillText(this.messages[0], 10, canvasHeight*5/6);
        },
        update: function() {
            console.log(this.messages);
            if (this.messages.length === 0) {
                return [0,1, {type: 'conversationDone'}];
            }
            if (Key.isDown(Key.SELECT) && this.count == 0) {
                console.log('here');
                this.messages.shift();
            }
            if(this.count > 0) {
                this.count--;
            }
            console.log(Key.isDown(Key.SELECT && this.count == 0));
        }
    }
}