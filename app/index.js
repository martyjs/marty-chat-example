var React = require('react');
var Marty = require('marty');
var Router = require('./router');

window.React = React; // For React Developer Tools
window.Marty = Marty; // For Marty Developer Tools

if (process.env.NODE_ENV !== 'test') {
  Marty.rehydrate()

  if (Marty.isBrowser) {
    require('./sources/serverUpdatesSocket').open();
  }

  Router.run(function (Handler, state) {
    React.render(<Handler {...state.params} />, document.getElementById('app'));
  });
}