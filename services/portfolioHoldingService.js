const axios = require("axios");
const PORTFOLIO_HOLDING = "portfolio_holding";

class portfolioHoldingService {
    constructor(knex) {
        this.knex = knex;
    }

    /**
     * select * from portfolio_holding where id = "portfolio_id";
     * @param {int} portfolio_id 
     * @returns 
     */
    selectUserPortfolioHolding(portfolio_id) {
        return this.knex(PORTFOLIO_HOLDING)
            .select()
            .where("id", portfolio_id)
            .then((rows) => {
                return rows;
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    /**
     * insert into portfolio_holding (portfolio_id, cryptocurrency, trade_type, amount, price, trade_time) 
     *      values ("portfolio_id", "cryptocurrency", "trade_type", "amount", "price", "trade_time");
     * @param {int} portfolio_id 
     * @param {string} cryptocurrency 
     * @param {string} trade_type "long" or "short"
     * @param {float} amount 
     * @param {float} price 
     * @param {time} trade_time 
     * @returns 
     */
    createPortfolioHolding(portfolio_id, cryptocurrency, trade_type, amount, price, trade_time) {
        return this.knex(PORTFOLIO_HOLDING)
            .insert({
                portfolio_id: portfolio_id,
                cryptocurrency: cryptocurrency,
                trade_type: trade_type,
                amount: amount,
                price: price,
                trade_time: trade_time
            })
            .then((id) => {
                console.log("createPortfolioHolding");
                console.log(id);
                return id[0];
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    /**
     * UPDATE portfolio_holding SET cryptocurrency='?', "position"='?', amount=?, price=?, created_at=?;
     * @param {String} portfolioID 
     * @param {Object} changes
     * @returns 
     */
    updatePortfolioHolding(portfolioID, changes) {
        return this.knex(PORTFOLIO_HOLDING)
            .update(changes)
            .where("id", portfolioID)
            .catch((error) => {
                console.log("error", error);
            });
    }

    /**
     * DELETE FROM portfolio_holding WHERE id="portfolioID" AND cryptocurrency="cryptocurrency";
     * @param {String} portfolioID
     * @param {String} cryptocurrency
     * @returns
     */
    deleteSinglePortfolioHolding(portfolioID, cryptocurrency) {
        return this.knex(PORTFOLIO_HOLDING)
            .delete()
            .where("id", portfolioID)
            .andWhere('cryptocurrency', cryptocurrency)
            .catch((error) => {
                console.log("error", error);
            });
    }
}

module.exports = portfolioHoldingService;