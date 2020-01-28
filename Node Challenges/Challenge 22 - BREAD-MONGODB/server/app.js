const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


const app = express();


const indexRouter = require('./routes/index');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mongobread';

// Create a new MongoClient
const client = new MongoClient(url);

client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  
  const db = client.db(dbName);
  const usersRouter = require('./routes/users')(db);
  app.use('/users', usersRouter);
});

module.exports = app;