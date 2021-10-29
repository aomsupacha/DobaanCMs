var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bcrypt = require('bcryptjs');
var session = require('express-session');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

var mongo=require('mongodb');
var mongoose=require('mongoose');
var db=mongoose.connection;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashboardsRouter = require('./routes/dashboards');
var searchsRouter = require('./routes/searchs');
var registerusersRouter = require('./routes/registerusers');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/javascript', express.static(__dirname + 'public/javascript'))
app.use('/uploads', express.static(__dirname + 'public/uploads'))



app.use(session({
  //secret: 'secret',
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(require('connect-flash')());

app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

/*Search */


app.get('*',function(req,res,next){
    res.locals.user = req.user || null;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboards', dashboardsRouter);
app.use('/searchs', searchsRouter);
app.use('/registerusers', registerusersRouter);

module.exports = app;
