const express = require("express");

class portfolioRouter {
    constructor(portfolioService, portfolioHoldingService, cryptoSymbolsService) {
        this.portfolioService = portfolioService;
        this.portfolioHoldingService = portfolioHoldingService;
        this.cryptoSymbolsService = cryptoSymbolsService;
    }

    router() {
        let router = express.Router();
        router.get("/symbols", this.getSymbols.bind(this));
        return router;
    }

    async getSymbols(request, response){
        let symbols = await this.cryptoSymbolsService.selectAllSymbolsOnly();
        console.log(symbols);
        // return response.json(symbols);

    }
}

module.exports = portfolioRouter;