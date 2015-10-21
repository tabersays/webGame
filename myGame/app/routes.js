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
    newCharacter.class = character.class;
};

module.exports = function (app, passport) {
    app.use(function (req, res, next) {
        // do logging
        next(); // make sure we go to the next routes and don't stop here
    });
    //server routes go here
    app.route('/api/characters')
        .get(isAuthenticated, function (req, res) {
            Character.find({userId: req.user._id}, function (err, users) {
                if (err) {
                    console.log('shit got real!');
                    return res.send(err);
                }
                res.json(users);
            });
        })
        //route for creating
        .post(function (req, res) {
            var character = new Character();
            console.log(req);
            character.userId = req.user._id;
            makeCharacter(character, req.body);
            character.save(function (err) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                res.json({ message: 'We made something' });
            });
        });
    app.route('/api/characters/:character').delete(function (req, res) {
        Character.remove({
            _id: req.params.character
        }, function (err, user) {
            if (err) {
                console.log('shit got real!');
            }
            res.json({ message: 'We destroyed something' });
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