var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');


var customersRouter = require('./routes/customersRoute');
var carsRouter = require('./routes/carsRoute');
var rentRouter = require('./routes/rentRoute');

var customerApiRouter = require('./routes/api/customerAPIRoute');
var carApiRouter = require('./routes/api/carAPIRoute');
var rentApiRouter = require('./routes/api/rentAPIRoute');
var authUtils = require('./util/authUtils');
const authApiRouter = require('./routes/api/authAPIRoute');

var app = express();

var cors = require('cors');

const i18n = require('i18n');
i18n.configure({
    locales: ['pl', 'en'], // languages available in the application. Create a separate dictionary for each of them
    directory: path.join(__dirname, 'locales'), // path to the directory where the dictionaries are located
    objectNotation: true, // enables the use of nested keys in object notation
    cookie: 'car-rent-lang', //the name of the cookie that our application will use to store information about the language currently selected by the user
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init); //initialization and connection to the application context
app.use(cors());
// add session
const session = require('express-session');
app.use(session( {
        secret: 'my_secret_password',
        resave: false
    }
));

app.use((req, res, next) => {
    if(!res.locals.lang) {
        const currentLang = req.cookies['car-rent-lang'];
        res.locals.lang = currentLang;
    }
    next();
});

// Adding a function that makes session data available to templates

app.use((req, res, next) =>{
    const loggedUser = req.session.loggedUser;
    res.locals.loggedUser = loggedUser;
    if(!res.locals.loginError){
        res.locals.loginError = undefined;
    }
    next();
});


app.use('/', indexRouter);
app.use('/customers', authUtils.permitAuthenticatedUser, customersRouter);
app.use('/cars', carsRouter);
app.use('/rent', rentRouter);

app.use('/api/customers', customerApiRouter);
app.use('/api/cars', carApiRouter);
app.use('/api/rent', rentApiRouter);
app.use('/api/auth', authApiRouter);

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
        console.log(err);
    });

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
