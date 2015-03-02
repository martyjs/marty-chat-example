var Marty = require('marty');
var Router = require('../router');

var NavigationActionCreators = Marty.createActionCreators({
  id: 'NavigationActionCreators',
  navigateHome: function () {
    navigateTo('home');
  },
  navigateToRoom: function (id) {
    navigateTo('room', { id: id });
  }
});

function navigateTo(route, params) {
  require('../router').transitionTo(route, params || {});
}

module.exports = NavigationActionCreators;