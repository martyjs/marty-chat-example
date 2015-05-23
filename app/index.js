var React = require('react');
var Marty = require('marty');
var Router = require('./router');
var Application = require('./application');

window.React = React; // For React Developer Tools
window.Marty = Marty; // For Marty Developer Tools

if (process.env.NODE_ENV !== 'test') {
  var app = new Application();

  app.rehydrate();

  if (Marty.isBrowser) {
    app.serverUpdatesSocket.open();
  }

  Router.run(function (Handler, state) {
    React.render(<Handler app={app} {...state.params} />, document.getElementById('app'));
  });
}