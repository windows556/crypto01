const axios = require("axios");
const PORTFOLIO = "portfolio";

class portfolioService {
    constructor(knex) {
        this.knex = knex;
    }

    /**
     * select * from portfolio where username = "username";
     * @param {String} username 
     * @returns 
     */
    selectUserPortfolio(username) {
        return this.knex(PORTFOLIO)
            .select()
            .where("username", username)
            .then((rows) => {
                return rows;
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    /**
     * insert into portfolio (username, title, description) values ("username", "title", "description")
     * @param {String} username not empty or null
     * @param {String} title not empty or null
     * @param {String} description can empty string
     * @returns 
     */
    createPortfolio(username, title, description) {
        return this.knex(PORTFOLIO)
            .insert({
                username: username,
                title: title,
                description: description
            })
            .then((id) => {
                console.log("createPortfolio");
                console.log(id);
                return id[0];
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    /**
     * update portfolio set title="title", description="description", updated_at="updated_at"
     * @param {String} portfolioID 
     * @param {object} changes 
     *  {title: title, description: description,
         updated_at: (new Date(Date.now() - tzoffset)).toISOString().replace('/T/', ' ').replace('/\..+/', '') // now}
     * @returns 
     */
    updatePortfolio(portfolioID, changes) {
        // let tzoffset = (new Date()).getTimezoneOffset() * 60000;
        return this.knex(PORTFOLIO)
            // .update({
            //     title: title,
            //     description: description,
            //     updated_at: (new Date(Date.now() - tzoffset)).toISOString().replace('/T/', ' ').replace('/\..+/', '') // now
            // })
            .update(changes)
            .where("id", portfolioID)
            .catch((error) => {
                console.log("error", error);
            });
    }

    /**
     * DELETE FROM portfolio WHERE id=portfolioID;
     * @param {String} portfolioID
     * @returns
     */
    deletePortfolio(portfolioID) {
        return this.knex(PORTFOLIO)
            .delete()
            .where("id", portfolioID)
            .catch((error) => {
                console.log("error", error);
            });
    }
}

module.exports = portfolioService;