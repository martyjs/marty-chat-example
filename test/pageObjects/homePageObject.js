/** @jsx React.DOM */

var Home = require('components/home');
var PageObject = require('react-page-objects');

var HomePageObject = PageObject.extend({
  getComponent: function (params) {
    return <Home {...params} />;
  }
});

module.exports = HomePageObject;