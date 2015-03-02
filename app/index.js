/** @jsx React.DOM */

var React = require('react');
var Marty = require('marty');
var Router = require('react-router');
var ServerUpdatesSocket = require('sources/serverUpdatesSocket');

window.React = React; // For React Developer Tools
window.Marty = Marty; // For Marty Developer Tools

var router = Router.create({
  routes: require('./routes'),
  location: Router.HistoryLocation
});

if (process.env.NODE_ENV !== 'test') {
  ServerUpdatesSocket.open();
  router.run(function (Handler, state) {
    React.render(<Handler {...state.params} />, document.getElementById('app'));
  });
}