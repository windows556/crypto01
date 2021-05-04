const axios = require("axios");

class cryptoWatchlistService {
    constructor(knex) {
        this.knex = knex;
    }

    insertWatchlist(username, symbol, symbol_to) {
        this.knex("watchlist_crypto")
            .insert({
                username: username,
                symbol: symbol,
                symbol_to: symbol_to
            });
    }
}

module.exports = cryptoWatchlistService;