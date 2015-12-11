/**
 * Created by Taber on 12/11/2015.
 */
function Npc(iniArr) {
    this.x = iniArr[0];
    this.y = iniArr[1];
    this.npcImage = new Image();
    this.npcImage.src = iniArr[2];
}

Npc.prototype.draw = function(context) {
    context.drawImage(this.npcImage, this.x, this.y);
};

Npc.prototype.update = function(){
    return false;
};

function NpcArr() {
    this.npcs = [];
}

NpcArr.prototype.draw = function(context) {
    for (var i = 0; i < this.npcs.length; i++) {
        this.npcs[i].draw(context);
    }
};

NpcArr.prototype.update = function(){
    return false;
};