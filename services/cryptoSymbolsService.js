const axios = require("axios");
const CRYPTO_SYMBOL = "crypto_symbol";

class cryptoSymbolsService {
    constructor(knex) {
        this.knex = knex;
    }

    /**
     * select crypto_symbol from crypto_symbol where is_custom = "isCustom";
     * @param {*} isCustom 
     * @returns 
     */
    selectAllSymbolsOnly(isCustom = false) {
        return this.knex(CRYPTO_SYMBOL)
            .select("crypto_symbol")
            .where("is_custom", isCustom)
            .then((rows) => {
                return rows;
            })
            .catch((error) => {
                console.log("error", error);
            });
    }
}

module.exports = cryptoSymbolsService;