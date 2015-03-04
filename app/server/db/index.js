var path = require('path');
var DB = require('super-simple-db');

module.exports = new DB(path.join(__dirname, 'blob.json'));