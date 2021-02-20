const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.post("/apiTest", (req, res) => {
   let params = req.body;
   if(typeof params === 'string') {
      params = JSON.parse(params)
   }
   console.log(params);
   res.sendStatus(200);
})

//test page for creating data
app.use("/test", express.static(path.resolve(__dirname, "./PerfAnalytics.TestPage")));

//for client use
app.get('/analytics.js', (req, res) => {
   res.sendFile(path.resolve(__dirname, './PerfAnalytics.JS', 'analytics.js'));
});

module.exports = app;
