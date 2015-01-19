var expect = require('chai').expect;
var Home = require('./pageObjects/homePageObject');

describe('Home', function () {
  var page;

  beforeEach(function () {
    page = new Home();
  });

  it('should have a title', function () {
    expect(page.title.value).to.equal('Hello world');
  });
});