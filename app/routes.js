var React = require('react');
var Router = require('react-router/build/npm');
var Route = Router.Route;

module.exports = [
  <Route name="room" path="/rooms/:id" handler={require('./components/room')} />,
  <Route name="home" path="/" handler={require('./components/home')} />
];