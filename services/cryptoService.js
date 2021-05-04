// const knexConfig = require("../knexfile")["development"];
// const knex = require("knex")(knexConfig);
const axios = require("axios");
// import DBTimeToJSTime from "../utils/DBTimeToJSTime.js";

class cryptoService {
    constructor(knex) {
        this.knex = knex;
    }

    getCryptoInfo(tablename, limit = 2, order_by = "open_time", order = "desc") {
        if (order !== "") {
            return this.knex(tablename)
                .select()
                .limit(limit)
                .orderBy(order_by, order)
                .then((rows) => {
                    return rows;
                });
        }
        else {
            return this.knex(tablename)
                .select()
                .limit(limit)
                .orderBy(order_by)
                .then((rows) => {
                    return rows;
                });
        }
    }

    getAllCryptoSymbol() {
        return this.knex("crypto")
            .select()
            .then((rows) => {
                return rows;
            });
    }

    fetchSingleUpdate(symbol, interval, startTime, limit = 1000) {
        return axios
            .get(
                // `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&startTime=1576008000000&endTime=1576368000000`
                `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&startTime=${startTime}&limit=${limit}`
            )
            .then((info) => {
                console.log(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&startTime=${startTime}&limit=${limit}`);
                return info.data;
            });
    }

    getLatestTime(tablename) {
        return this.knex(tablename)
            .select("open_time")
            .limit(1)
            .orderBy("open_time", "desc")
            .then((row) => {
                // let tzoffset = (new Date()).getTimezoneOffset() * 60000;
                // let localISOTime = (new Date(new Date(row[0]["open_time"]) - tzoffset)).toISOString().slice(0, -1);
                // return new Date(localISOTime);
                return new Date(row[0]["open_time"]);
            });
    }

    insertFetchedData(tablename, data){
        this.knex.batchInsert(tablename, data)
            .then(() => {
                console.log(`${tablename} success`);
            })
    }
}

module.exports = cryptoService;