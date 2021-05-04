const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const knexFile = require("./knexfile")["development"];
const knex = require("knex")(knexFile);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extneded: true}))


const cryptoService = require("./services/cryptoService");
const CryptoService = new cryptoService(knex);
const cryptoWatchlistService = require("./services/cryptoWatchlistService");
const CryptoWatchlistService = new cryptoWatchlistService(knex);

const cryptoRouter = require("./routers/cryptoRouter");
const CryptoRouter = new cryptoRouter(CryptoService, CryptoWatchlistService);

app.use("/market", CryptoRouter.router());

app.listen(3001, () => {
    console.log("App running on 3001");
});

module.exports.app = app;