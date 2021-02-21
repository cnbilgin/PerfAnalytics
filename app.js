require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

const analyticsRouter = require('./routes/analytics');


const db = require("./db");
db();

const compression = require('compression');
app.use(compression());

const cors = require('cors')
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/analytics', analyticsRouter);

//test page for creating data
app.use("/test", express.static(path.resolve(__dirname, "./PerfAnalytics.TestPage")));

["/", "/dashboard"].forEach(p=> app.use(p, express.static(path.resolve(__dirname, "./dashboard"))));

//for client use
app.get('/analytics.js', (req, res) => {
   res.sendFile(path.resolve(__dirname, './PerfAnalytics.JS', 'analytics.js'));
});

module.exports = app;
