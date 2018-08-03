// Import all required components
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');

// Import all application server-side routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var documentsRouter = require('./routes/documents');
var companyRouter = require('./routes/company');
var jobseekerRouter = require('./routes/jobseeker');
var joblistingRouter = require('./routes/joblisting');

// Application
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Component setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

// Server-side routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/documents', documentsRouter);
app.use('/company', companyRouter);
app.use('/jobseeker', jobseekerRouter);
app.use('/joblisting', joblistingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Headers', '*');


  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
