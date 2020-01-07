/* eslint-disable no-console */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./config/db');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set(key, value) -- template engine (ejs)
app.set('view engine', 'ejs');
/*
App-level middleware (bind middleware to the app instance)
    1. No mount path middleware fn
    -- is executed every time the app receives the request
*/
app.use(logger('dev'));
app.use(express.json()); // -> express.json() parses incoming requests iwht JSON payloads
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // -> exptress.static() serves static assets such as HTML files, images
// __dirname -> absolute path to the current directory

/*
  2. Mounted on path '/' and '/users'
    -- is executed only when the path matches
*/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handling middleware
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
