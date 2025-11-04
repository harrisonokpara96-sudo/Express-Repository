// Required dependencies
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts'); // ✅ enable layout support

// Route imports
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Initialize Express app
var app = express();

// ✅ View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);            // enable EJS layouts
app.set('layout', 'layout');        // default layout file (views/layout.ejs)

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// ✅ 404 handler
app.use(function (req, res, next) {
  next(createError(404));
});

// ✅ Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Export app
module.exports = app;
