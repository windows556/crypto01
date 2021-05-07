const passport = require("passport");

// Knex Setup
const knexConfig = require("../knexfile").development;
const knex = require("knex")(knexConfig);

module.exports = (express) => {
    const router = express.Router();

    // function isLoggedIn(req, res, next) {
    //     if (req.isAuthenticated()) {
    //         return next();
    //     }

    //     res.redirect('/login'); // or redirect to '/signup'
    // }

    module.exports.isLoggedIn = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/error");
        //res.render() {other layouts}
    };

    module.exports.isNotLoggedIn = function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect("/login");
        }
        return next();
    };


    // router.get('/secret',  isLoggedIn, (req, res) => {
    //     res.send('Here you go, a secret');
    // });

    // router.get('/login', (req, res) => {
    //     res.sendFile(__dirname + '/login.html');
    // });

    // router.post('/login', passport.authenticate('local-login', {
    //     successRedirect: '/',
    //     failureRedirect: '/error'
    // }));

    // router.get('/error', (req, res) => {
    //     res.send('You are not logged in!');
    // });

    // router.get('/', (req, res) => {
    //     res.sendFile(__dirname + '/index.html');
    // });



    // router.get('/signup', (req, res) => {
    //     res.sendFile(__dirname + '/signup.html');
    // });

    // router.post('/signup', passport.authenticate('local-signup', {
    //     successRedirect: '/',
    //     failureRedirect: '/error'
    // }));

    router.post('/login/signup', (req, res) => {
        res.send('You are signing up!');
    });

    //Logout redirect
    router.get("/logout", (req, res) => {
        // req.session = null;
        req.logout();
        res.redirect("/");
    });

    return router;
};