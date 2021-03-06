// Config instructions: Fill out required fields and save as 'config.js'

var server = { // General server settings
  passportSecret: "random string", // REQUIRED, String. Random string used for passport module for encrypting JWT.
  loggerLevel: "debug", // REQUIRED, one of ('debug', 'warning', 'info', 'error')
  http: {
    active: true,
    port: 80,
  },
};

var fileProcessing = { // File processing API settings (runs on different port)
  port: 2002,
};

var database = {
  username: "root",
  password: "",
  database: "cacophony",
  host: "localhost",
  dialect: "postgres"
};

var s3 = {  // Used for storing audio & video recordings.
  publicKey: "",  // REQUIRED, String:
  privateKey: "", // REQUIRED, String
  bucket: "cacophony",   // REQUIRED, String
  endpoint: "http://localhost:9000", // REQUIRED, URL
};

exports.server = server;
exports.fileProcessing = fileProcessing;
exports.database = database;
exports.s3 = s3;

// This is needed because Sequelize looks for development by default when using db:migrate
exports.development = database;
