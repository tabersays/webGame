var mongoose = require('mongoose');

var characterSchema = mongoose.Schema({
    userId: String,
    name: String,
    gender: String,
    portrait: String,
    spriteSheet: String,
    attributes: {
        str: Number,
        dex: Number,
        spd: Number,
        end: Number,
        con: Number,
        mnd: Number,
        sol: Number
    },
    class: String,
    abilities: {
        combat: String,
        magic: String,
        skills: String
    },
    dialogs: mongoose.Schema.Types.Mixed,
    items: [],
    equipped: {
        armor: String,
        leftWeapon: String,
        rightWeapon: String,
        accessory: String
    },
    location: {
        map: String,
        x: Number,
        y: Number
    },
    hp: Number,
    ep: Number,
    mp: Number,
    maxHp: Number,
    maxEp: Number,
    maxMp: Number
});

module.exports = mongoose.model('character', characterSchema);