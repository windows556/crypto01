// Update with your config settings.
require("dotenv").config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      // database: process.env.DATABASE,
      // user: process.env.USERNAME,
      // password: process.env.PASSWORD,
      database: 'crypto01',
      user:     'crypto01',
      password: 'crypto01'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'crypto01',
      user:     'crypto01',
      password: 'crypto01'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
