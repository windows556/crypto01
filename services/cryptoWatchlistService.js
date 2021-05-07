const axios = require("axios");

class cryptoWatchlistService {
    constructor(knex) {
        this.knex = knex;
    }

    getWatchlist(username) {
        return this.knex("watchlist_crypto")
            .select("symbol", "symbol_to")
            .where("username", username)
            .then((row) => {
                return row;
            });
    }

    insertWatchlist(username, symbol, symbol_to) {
        return this.knex("watchlist_crypto")
            .insert({
                username: username,
                symbol: symbol,
                symbol_to: symbol_to
            });
    }
}

module.exports = cryptoWatchlistService;