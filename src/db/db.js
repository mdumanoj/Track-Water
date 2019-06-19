const Nano = require('nano');

const config = require('../config/config');

const nano = Nano(config.cloudantUrl);
var db = nano.db.use(config.dbName);

module.exports = db;