const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { sequelize } = require('./db/models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
//======Routers==========
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const deedsRouter = require('./routes/deeds');
const karmasRouter = require('./routes/karmas');
const myDeedsRouter = require('./routes/mydeeds');
const reviewsRouter = require('./routes/reviews');
const karmasToDeedsRouter = require('./routes/karmasToDeeds')

const { sessionSecret } = require('./config');
const { restoreUser } = require('./auth');

const app = express();

// view engine setup
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(sessionSecret));
const store = new SequelizeStore({ db: sequelize });
app.use(
  session({
    secret: sessionSecret,
    store,
    name: 'deed-app.sid',
    saveUninitialized: false,
    resave: false,
  })
  );
  app.use(express.static(path.join(__dirname, 'public')));

  // set up session middleware


  // create Session table if it doesn't already exist
  store.sync();

app.use(restoreUser);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/deeds', deedsRouter);
app.use('/karmas', karmasRouter);
app.use('/mydeeds', myDeedsRouter);
app.use('/reviews', reviewsRouter);
app.use('/karmastodeeds', karmasToDeedsRouter)


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
