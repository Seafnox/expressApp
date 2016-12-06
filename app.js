"use strict";

/** @see core/logger.js */
require("./core/logger");
const logger = process.logger;
const morgan = require('morgan');

const express = require('express');
const config = require('./core/config');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const stylus = require('stylus');
const gzip = require('compression');
const i18n = require('i18n-2');
const app = express();

logger("Environment - " + app.get('env'));

// view engine setup
logger.info("Use jade");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if(config.http.gzip) {
  logger.info("use GZip");
  app.use(gzip());
}

/** @see config/i18n.js */
i18n.expressBind(app, config.i18n);
if(config.i18n.useCookie) {
  logger.info("Use locales from cookies");
  // This is how you'd set a locale from req.cookies.
  app.use(function(req, res, next) {
    req.i18n.setLocaleFromCookie();
    next();
  });
}

/** @see config/stylus.js */
logger.info("Use stylus");
app.use(stylus.middleware(config.stylus));


app.use(express.static(path.join(__dirname, 'public')));

let index = require('./routes/index');
let users = require('./routes/users');

// setup the logger
app.use(logger.express);

logger.info(" ");
logger.info(" ");

/************************************************/
/************************************************/
/************************************************/

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use();

module.exports = app;
