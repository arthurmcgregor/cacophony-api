var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var path = require('path');
var winston = require('winston');
var AWS = require('aws-sdk');
var fs = require('fs');
var tcpPortUsed = require('tcp-port-used');

try {
  fs.statSync('./config.js');
} catch (error) {
  console.log("Config file is not setup. Read README.md for config setup.");
  return;
}
var config = require('./config');
var models = require('./models');
var log = require('./logging');

log.info('Starting Full Noise.');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
log.addExpressApp(app);

require('./api/V1')(app);
require('./router')(app);

log.info("Connecting to database.....");
models.sequelize
  .sync()
  .then(() => log.info("Connected to database."))
  .then(() => checkS3Connection())
  .then(() => listenToPort(app, config.server.port))
  .catch(function(error) {
    log.error(error);
  });

function listenToPort(app, port) {
  return tcpPortUsed.check(port)
    .then((used) => {
      if (used) throw new Error("Port in use");
      log.info("Trying to listen to port: " + port);
      try {
        app.listen(port);
        log.info("Listneing to port: " + port);
      } catch (err) {
        log.error("Failed to listen to port: " + port);
      }
    });
}

// Returns a Promise that will reolve if it could connect to the S3 file storage
// and reject if connection failed.
function checkS3Connection() {
  return new Promise(function(resolve, reject) {
    var s3 = new AWS.S3({
      endpoint: config.s3.endpoint,
      accessKeyId: config.s3.publicKey,
      secretAccessKey: config.s3.privateKey,
    });
    var params = { Bucket: config.s3.bucket, };
    log.info("Connecting to S3.....");
    s3.headBucket(params, function(err, data) {
      if (err) {
        log.error("Error with connecting to S3.");
        return reject(err);
      }
      log.info("Connected to S3.");
      return resolve();
    });
  });
}
