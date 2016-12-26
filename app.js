// Load dependencies
import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import indexRoute from './routes/index';
import passport from 'passport';
import session from 'express-session';
dotenv.load();

import PassportMiddleware from './middleware/PassportMiddleware'

// Initialize mongoDB connection
const MONGOURL = process.env.MONGODB_URI || process.env.MONGOLAB_URI || 'mongodb://localhost/chat-app';
mongoose.Promise = global.Promise;
mongoose.connect(MONGOURL, err => {
  console.log(err || `MongoDB connected to ${MONGOURL}`);
});

// Create an express instance
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
  next();
});

// General purpose middlewares and configurations
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(require('cookie-parser')('voldemort'));

const MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: 'voldemort',
    store: new MongoStore({
      url: 'mongodb://localhost/socketchat',
      ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    }),
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// Entry point for data routes (API)
app.use('/data', indexRoute);

//  404 Handler
app.use((req, res) => {
  res.status(404).render('404');
});

export default app;
