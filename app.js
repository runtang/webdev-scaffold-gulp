var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 业务代码，路由
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// 开发环境
if (app.get('env') === 'development') { 
  var viewPath = 'views/src';
  app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
  app.use('/public', express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'public')));
} 
// gulp build后的正式环境
else {
  var viewPath = 'views/dist';
  app.use(express.static(path.join(__dirname, 'dist')));
}

// view engine setup
app.set('views', path.join(__dirname, viewPath));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// 业务代码，路由
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
