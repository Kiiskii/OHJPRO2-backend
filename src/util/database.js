const { Pool } = require('pg');

const config = require('../config/config.json');

const pool = new Pool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password
});

pool.query("SELECT 1", (err, results) => {
    if (err) {
        console.log(err);
        console.log("Database connection unsuccessful");
    } else {
        console.log("Database connection successfull");
    }
});

module.exports = pool;