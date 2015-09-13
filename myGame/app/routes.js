var User = require('./models/user.js');

module.exports = function (app) {
    app.use(function (req, res, next) {
        // do logging
        console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });
    //server routes go here
    //api and authentication
    
    app.get('/api/users', function (req, res) {
        User.find(function (err, users) {
            if (err) {
                res.send(err);
            }
            console.log(users);
            res.json(users);
        });
    });
    //route for creating
    app.post('/api/users', function (req, res) {
        var user = new User();
        console.log(req.body.name);
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
    app.delete('/api/users/:user', function (req, res) {
        User.remove({
            _id: req.params.user
        }, function (err, user) {
            if (err) {
                console.log('shit got real!');
            }
            res.json({ message: 'We destroyed something' });
        });
    });
    //frontend routs
    
    app.get('*', function (req, res) {
        res.sendfile('./public/views/index.html');
    });
};