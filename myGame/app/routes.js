var User = require('./models/user.js');
var Character = require('./models/character.js');
var path = require('path');

function makeCharacter(newCharacter, character) {
    newCharacter.name = character.name;
    newCharacter.gender = character.gender;
    newCharacter.attributes.str = character.str;
    newCharacter.attributes.dex = character.dex;
    newCharacter.attributes.spd = character.spd;
    newCharacter.attributes.end = character.end;
    newCharacter.attributes.con = character.con;
    newCharacter.attributes.mnd = character.mnd;
    newCharacter.attributes.sol = character.sol;
    newCharacter.hp = newCharacter.attributes.con * 10;
    newCharacter.mp = newCharacter.attributes.mnd * 10;
    newCharacter.ep = newCharacter.attributes.end * 10;
    newCharacter.maxHp = newCharacter.attributes.con * 10;
    newCharacter.maxMp = newCharacter.attributes.mnd * 10;
    newCharacter.maxEp = newCharacter.attributes.end * 10;
    newCharacter.class = character.class;
    newCharacter.dialogs = {};
    newCharacter.location.map = 'test';
    newCharacter.location.x = 100;
    newCharacter.location.y = 100;
    newCharacter.spriteSheet = character.spriteSheet;
}

module.exports = function (app, passport) {
    app.use(function (req, res, next) {
        next();
    });
    //server routes go here
    app.get('/api/characters/:id', isAuthenticated, function(req, res) {
        Character.findOne({userId: req.user._id, _id: req.params.id}, function (err, character) {
            if (err) {
                console.log('shit got real!');
                return res.send(err);
            }
            res.json(character);
        });
    });
    app.get('/api/characters', isAuthenticated, function (req, res) {
            Character.find({userId: req.user._id}, function (err, characters) {
                if (err) {
                    console.log('shit got real!');
                    return res.send(err);
                }
                res.json(characters);
            });
        });
    app.post('/api/characters', function (req, res) {
            var character = new Character();
            character.userId = req.user._id;
            makeCharacter(character, req.body);
            character.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'We made something' });
            });
        });
    app.delete('/api/characters/:id', function (req, res) {
        Character.remove({userId: req.user._id, _id: req.params.id}, function (err, user) {
            if (err) {
                console.log('shit got real!');
            }
            res.json({ message: 'We destroyed something' });
        });
    });
    app.post('/api/save-location/:id', function (req, res) {
        Character.findOne({userId: req.user._id, _id: req.params.id}, function(err, character) {
            if (err) {
                console.log('shit got real!');
            }
            else {
                character.location.x = req.body.location.x;
                character.location.y = req.body.location.y;
                character.location.map = req.body.location.map;
                character.save();
                res.json({message: 'success'});
            }
        });
    });
    //api and authentication
    app.get('/loggedin', function (req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });
    app.get('/api/logout', function (req, res) {
        req.logout();
        res.send(200);
    });
    app.post('/api/signup', function (req, res) {
        passport.authenticate('local-signup', function (err, user) {
            console.log(err);
            if (err) {
                return err;
            }
            else {
                res.json(user);
            }
        })(req, res);
    });
    app.post('/api/login', passport.authenticate('local-login'), function (req, res) {
        if(req.user) {
            res.send({message: 'success'});
        }
        else {
            res.send({message: 'failure'})
        }
    });

    //frontend routs
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });
};

function isAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.sendStatus(401);
    }
    next();
}