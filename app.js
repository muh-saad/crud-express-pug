const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const router = require('./routes/router')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  cookie: {maxAge: 60000},
  secret: 'woot',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());
app.use((req, res, next) => {
  res.locals.errors = req.flash("error");
  res.locals.successes = req.flash("success");
  next();
});

app.use(router)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
