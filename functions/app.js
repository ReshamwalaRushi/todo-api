const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const routes = require('../src/routes');
const config = require('../src/database/config');
const cors = require('cors');
// const router = express.Router();
const serverless = require("serverless-http");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use('/api', routes);

const db = mysql.createConnection(config.mysql);

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use("/.netlify/functions/app", routes);
module.exports.handler = serverless(app);
