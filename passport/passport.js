const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const knexFile = require("./knexfile")["development"];
const knex = require("knex")(knexFile);


passport.use('local-signup', new LocalStrategy(
    async (username, password, done) => {
        console.log("signing up");
        console.log("Email", username);
        console.log("Password", password);
        try {
            let users = await knex('users').where({ username: username });
            if (users.length > 0) {
                return done(null, false, { message: 'Username is already taken' });
            }
            const newUser = {
                username: username,
                password: password
            };
            let userId = await knex('users').insert(newUser).returning('id');
            newUser.id = userId[0];
            done(null, newUser);
        } catch (err) {
            done(err);
        }

    })
);

passport.use('local-login', new LocalStrategy(
    async (email, password, done) => {
        try {
            let users = await knex('users').where({ username: username });
            if (users.length == 0) {
                return done(null, false, { message: 'Incorrect credentials.' });
            }
            let user = users[0];
            if (user.password === password) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect credentials.' });
            }
        } catch (err) {
            return done(err);
        }
    }
));

