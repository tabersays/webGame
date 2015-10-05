var mongoose = require('mongoose');

var characterSchema = mongoose.Schema({
    userId: Number,
    name: String,
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
        combat: {},
        magic: {},
        skills: {}
    },
    dialogs: {},
    items: [],
    equipped: {
        armor: String,
        leftWeapon: String,
        rightWeapon: String,
        accessory: String
    }
});

module.exports = mongoose.model('character', characterSchema);