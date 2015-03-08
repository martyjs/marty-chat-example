var Marty = require('marty');
var Router = require('react-router/build/npm');

module.exports = Router.create({
  routes: require('./routes'),
  location: location()
});

function location() {
  if (typeof window !== 'undefined') {
    return Router.HistoryLocation;
  }
}