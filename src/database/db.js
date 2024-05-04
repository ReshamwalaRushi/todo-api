// db.js

const mysql = require('mysql2');
const config = require('./config'); // Your database configuration file

// Create a MySQL connection pool
const pool = mysql.createPool(config.mysql);

// Function to execute SQL queries
exports.query = async (sql, params) => {
    try {
        return new Promise((resolve, reject) => {
            pool.query(sql, params, (error, results) => {
                return resolve({ error, results });
            });
        });
    } catch (error) {
        console.log(error);
    }
};
