var User = require('./models/user.js');
var path = require('path');

module.exports = function (app, passport) {
    app.use(function (req, res, next) {
        // do logging
        next(); // make sure we go to the next routes and don't stop here
    });
    //server routes go here
    // user test routes
    app.route('/api/users')
    .get(isAuthenticated, function (req, res) {
        User.find(function (err, users) {
            if (err) {
                console.log('shit got real!');
                return res.send(err);
            }
            res.json(users);
        });
    })
    //route for creating
    .post(function (req, res) {
        var user = new User();
        user.name = req.body.name;

        user.save(function (err) {
            if (err) {
                console.log('shit got real!');
                res.send(err);
            }
            res.json({ message: 'We made something' });
        });
    });
    //route for deleting
    app.route('/api/users/:user').delete(function (req, res) {
        User.remove({
            _id: req.params.user
        }, function (err, user) {
            if (err) {
                console.log('shit got real!');
            }
            res.json({ message: 'We destroyed something' });
        });
    });

    //signup login logout
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
        res.send(req.user);
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