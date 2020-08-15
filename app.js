var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session =require('express-session');//for session and also install express-session

var indexRouter = require('./routes/index');
var appointmentRouter = require('./routes/appointment');
var historyRouter = require('./routes/phistory');
var consultRouter = require('./routes/consult');
var loginRouter = require('./routes/login');
var newclientRouter = require('./routes/newclient');
var pediatricRouter = require('./routes/pediatric');
var editsaveRouter = require('./routes/editsave');
var detailsRouter = require('./routes/details');
var logoutRouter = require('./routes/logout');
var testresultRouter = require('./routes/testresult');





//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());//
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'AAAA'}));//it is for session and use before router


app.use('/', indexRouter);
app.use('/appointment', appointmentRouter);
app.use('/phistory', historyRouter);
app.use('/consult', consultRouter);
app.use('/login', loginRouter);
app.use('/newclient', newclientRouter);
app.use('/pediatric', pediatricRouter);
app.use('/editsave', editsaveRouter);
app.use('/details', detailsRouter);
app.use('/logout', logoutRouter);
app.use('/testresult', testresultRouter);


//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
