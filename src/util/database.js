const { Pool } = require('pg');

const config = require('../config/config.json');

const pool = new Pool({
    user: config.user,
    password: config.password,
    host: config.host,
    port: config.port,
    database: config.database
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