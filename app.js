const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const passport = require("passport");
const knexFile = require("./knexfile")["development"];
const knex = require("knex")(knexFile);
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extneded: true}))
app.use(passport.initialize());
app.use(passport.session());

const cryptoService = require("./services/cryptoService");
const portfolioService = require("./services/portfolioService");
const portfolioHoldingService = require("./services/portfolioHoldingService");
const cryptoSymbolsService = require("./services/cryptoSymbolsService");
const cryptoWatchlistService = require("./services/cryptoWatchlistService");

const CryptoService = new cryptoService(knex);
const PortfolioService = new portfolioService(knex);
const PortfolioHoldingService = new portfolioHoldingService(knex);
const CryptoSymbolsService = new cryptoSymbolsService(knex);
const CryptoWatchlistService = new cryptoWatchlistService(knex);

const cryptoRouter = require("./routers/cryptoRouter");
const portfolioRouter = require("./routers/portfolioRouter");

const CryptoRouter = new cryptoRouter(CryptoService, CryptoWatchlistService);
const PortfolioRouter = new portfolioRouter(PortfolioService, PortfolioHoldingService, CryptoSymbolsService);

const users = require("./users");
const jwt = require("jwt-simple");
const config = require("./config");

app.use("/market", CryptoRouter.router());
app.use("/portfolio", PortfolioRouter.router());

app.post("/login", function (req, res) {
    if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;

        console.log(email, password);
        var user = users.find(u => {
            return u.email === email && u.password === password;
        });
        if (user) {
            var payload = {
                id: user.id
            };
            console.log(payload);
            var token = jwt.encode(payload, config.jwtSecret);
            console.log(token);
            res.json({
                token: token
            });
        } else {
            console.log("fail 1")
            res.sendStatus(401);
        }
    } else {
        console.log("fail 2")
        res.sendStatus(401);
    }
});


const loginRouter = require("./routers/loginRouter")(express);
app.use("/login", loginRouter);

app.listen(3001, () => {
    console.log("App running on 3001");
});

module.exports.app = app;


// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();

// const users = require("./users");

// const axios = require("axios");

// const jwt = require("jwt-simple");
// const config = require("./config");

// const cors = require('cors');

// app.use(cors());

// app.use(bodyParser.json());

// app.post("/api/login", function (req, res) {
//     if (req.body.email && req.body.password) {
//         var email = req.body.email;
//         var password = req.body.password;

//         console.log(email, password);
//         var user = users.find(u => {
//             return u.email === email && u.password === password;
//         });
//         if (user) {
//             var payload = {
//                 id: user.id
//             };
//             console.log(payload);
//             var token = jwt.encode(payload, config.jwtSecret);
//             console.log(token);
//             res.json({
//                 token: token
//             });
//         } else {
//             console.log("fail 1")
//             res.sendStatus(401);
//         }
//     } else {
//         console.log("fail 2")
//         res.sendStatus(401);
//     }
// });

// // this code is for facebook login - we cover this in the next section of the LMS
// app.post("/api/login/facebook", function (req, res) {
//     if (req.body.access_token) {
//         var accessToken = req.body.access_token;

//         axios
//             .get(`https://graph.facebook.com/me?access_token=${accessToken}`)
//             .then(data => {
//                 if (!data.data.error) {
//                     var payload = {
//                         id: accessToken
//                     };
//                     users.push({
//                         id: accessToken, // better to use DB auto increment ID
//                         name: "Facebook User", // better to use data or profile to check the facebook user name
//                         email: "placeholder@gmail.com", // better to use data or profile to check the email
//                         password: ""
//                     });
//                     // Return the JWT token after checking
//                     console.log("suckcess");
//                     var token = jwt.encode(payload, config.jwtSecret);
//                     res.json({
//                         token: token
//                         // optionally provide also the user id to frontend
//                     });
//                 } else {
//                     res.sendStatus(401);
//                 }
//             })
//             .catch(err => {
//                 console.log(err);
//                 res.sendStatus(401);
//             });
//     } else {
//         res.sendStatus(401);
//     }
// });

// //We actually dont need to serve anything.. We are just using this backend to authenticate through our local-jwt-login or through facebook.
// // Our frontend handles the pages that we will see.
// app.get("/", (req, res) => {
//     res.send("Hello World");
// });

// app.listen(3001, () => {
//     console.log(`Application listening to port 3001`);
// });
