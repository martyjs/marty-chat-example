var Marty = require('marty');

var Application = Marty.createApplication(function () {
  this.register(require('./stores'));
  this.register(require('./actions'));
  this.register(require('./queries'));
  this.register(require('./sources'));
});

module.exports = Application;