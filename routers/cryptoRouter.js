const express = require("express");

class cryptoRouter {
    constructor(cryptoService, cryptoWatchlistService) {
        this.cryptoService = cryptoService;
        this.cryptoWatchlistService = cryptoWatchlistService;
    }


    router() {
        let router = express.Router();
        router.get("/", this.get.bind(this));
        router.get("/candlestick_graphs", this.get_candlestick.bind(this));
        router.post("/addcrypto", this.postCryptoWatchlist.bind(this));
        router.get("/testing", this.get_testing.bind(this))
        // return the router
        return router;
    }

    // postNote(request, response) {
    //     let content = request.body.content;
    //     // two knex calls here
    //     return this.noteService
    //         .postNote(content, request.auth.user)
    //         .then((data) => {
    //             return this.noteService.getUsers().then((users) => {
    //                 console.log("Users", users);
    //                 console.log("Data", data);
    //                 response.render("home", {
    //                     notes: data,
    //                     users: users,
    //                 });
    //             });
    //         });
    // }

    async get(request, response) {
        let allCrypto = await this.cryptoService.getAllCryptoSymbol();
        console.log(allCrypto);

        let results = [];
        for (let i = 0; i < allCrypto.length; i++) {
            // console.log(allCrypto[i]);
            let x = allCrypto[i];

            // crypto update
            let latestTime = await this.cryptoService.getLatestTime(`${x["symbol"]}${x["exchange_symbol"]}_${x["interval"]}`);
            let newData = await this.cryptoService.fetchSingleUpdate(`${x["symbol"]}${x["exchange_symbol"]}`, x["interval"], latestTime.getTime() + 1);
            let mappedNewData = newData.map((x) => {
                let tzoffset = (new Date()).getTimezoneOffset() * 60000;
                return {
                    open_time: (new Date(new Date(x[0]) - tzoffset)).toISOString().replace('/T/', ' ').replace('/\..+/', ''),
                    open: x[1],
                    high: x[2],
                    low: x[3],
                    close: x[4],
                    volume: x[5],
                    close_time: (new Date(new Date(x[6]) - tzoffset)).toISOString().replace('/T/', ' ').replace('/\..+/', ''),
                    quote_asset_volume: x[7],
                    no_of_trades: x[8],
                    taker_buy_base_asset_volume: x[9],
                    taker_buy_quote_asset_volume: x[10]
                }
            })
            let updateNewData = await this.cryptoService.insertFetchedData(`${x["symbol"]}${x["exchange_symbol"]}_${x["interval"]}`, mappedNewData);

            // crypto summary info
            let single_crypto_data = await this.cryptoService.getCryptoInfo(`${x["symbol"]}${x["exchange_symbol"]}_${x["interval"]}`); // BTCUSDT_6h
            let previous_close = single_crypto_data[0].close;
            let new_close = single_crypto_data[1].close;
            let change = ((new_close - previous_close) / previous_close * 100).toFixed(2);

            // crypto candlestick data
            let single_candlestick_data = await this.cryptoService.getCryptoInfo(`${x["symbol"]}${x["exchange_symbol"]}_${x["interval"]}`, 100, "open_time", ""); // BTCUSDT_6h
            let mapped_data = single_candlestick_data.map((item) => {
                let tzoffset = (new Date()).getTimezoneOffset() * 60000;
                let localISOTime = (new Date(new Date(item.open_time) - tzoffset)).toISOString().slice(0, -1);
                let res = {
                    // x: new Date(item.open_time),
                    x: new Date(localISOTime),
                    y: [item.open, item.high, item.low, item.close]
                }
                return res;
            })

            let result = {
                symbol: `${x["symbol"]}_${x["exchange_symbol"]}`, // BTC_USDT
                closing_price: new_close,
                change_of_percentage: `${change}%`,
                volume: single_crypto_data[1].volume,
                candlestick_data: mapped_data
            };

            results.push(result);
        }

        // console.log(results);

        // response.render("home", results);
        // response.send("success");
        return response.json(results);
    }

    async get_candlestick(request, response) {
        // let allCrypto = await this.cryptoService.getAllCryptoSymbol();

        let single_crypto_data = await this.cryptoService.getCryptoInfo("BTCUSDT_6h", 50, "open_time", ""); // BTCUSDT_6h
        // console.log(single_crypto_data);
        let mapped_data = single_crypto_data.map((item) => {
            let res = {
                x: new Date(item.open_time),
                y: [item.open, item.high, item.low, item.close]
            }

            return res;
        })

        return response.json(mapped_data);
    }

    async postCryptoWatchlist(request, response){
        await this.cryptoWatchlistService.insertWatchlist("windows_xp", "BTC", "USDT");
    }

    async fetchUpdate(request, response) {
        // if (req.isAuthenticated()) {
        //   //  console.log(req.user);
        //   // console.log("PASSPORT", req.session.passport.user.id);
        //   return this.reviewService
        //     .add(req.params.id, req.user.id, req.body.note, req.body.rating)
        //     .then(() => {
        //       console.log("OUT OF DATABASE redirect");
        //       res.redirect("/");
        //     })
        //     .catch((err) => res.status(500).json(err));

        //   // .then(() => {
        //   //   res.redirect("/");
        //   // });
        // }
    }

    async get_testing(request, response) {
        // console.log(req.auth.user);
        let a = await this.cryptoService.getLatestTime("BTCUSDT_6h");
        console.log(a);

        let b = await this.cryptoService.fetchSingleUpdate("BTCUSDT", "6h", a.getTime() + 1);
        let bb = b.map((x) => {
            let tzoffset = (new Date()).getTimezoneOffset() * 60000;
            return {
                open_time: (new Date(new Date(x[0]) - tzoffset)).toISOString().replace('/T/', ' ').replace('/\..+/', ''),
                open: x[1],
                high: x[2],
                low: x[3],
                close: x[4],
                volume: x[5],
                close_time: (new Date(new Date(x[6]) - tzoffset)).toISOString().replace('/T/', ' ').replace('/\..+/', ''),
                quote_asset_volume: x[7],
                no_of_trades: x[8],
                taker_buy_base_asset_volume: x[9],
                taker_buy_quote_asset_volume: x[10]
            }
        })
        console.log(bb);
        let c = await this.cryptoService.insertFetchedData("BTCUSDT_6h", bb);
        return response.json(a);
    }



    // post(request, response) {
    //     return this.noteService
    //         .postUser(request.body)
    //         .then(() => {
    //             // currently sending back actual user
    //             // response.send(request.body);
    //             return this.noteService.getUsers().then((data) => {
    //                 response.render("home", { users: data });
    //             });
    //         });
    // }
}
module.exports = cryptoRouter;